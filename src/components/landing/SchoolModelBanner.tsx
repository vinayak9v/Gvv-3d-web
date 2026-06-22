'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Html, useGLTF } from '@react-three/drei';
import { Menu } from 'lucide-react';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';

const MODEL_URL = '/models/school.glb';

// Default resting pose (tilted: school on top, flames streaming out the underside).
const DEFAULT_ROT_X = -0.5;
const DEFAULT_ROT_Y = 0.25;
// Pitch (X) is CLAMPED so the school never somersaults bottom-to-top / flips
// over — it keeps its "school on top, flames underneath" orientation. Yaw (Y) is
// left FREE so the island can be spun all the way around horizontally.
const ROT_X_MIN = -0.85;
const ROT_X_MAX = -0.15;

// Material name used by thrust cubes & cylinders in the GLB
const THRUST_MATERIAL_NAME = 'PaletteMaterial010';

// Only these materials keep a subtle emissive glow (actual light fixtures)
const EMISSIVE_WHITELIST: Record<string, number> = {
  'Light-Upper': 0.3,
};

// Custom shader recreating Blender's Emission + ColorRamp + Gradient for thrust
function createThrustMaterial(color: THREE.Color) {
  return new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    // Normal (alpha) blending, not additive: an additive blue jet is invisible
    // against the bright sky background. A bright translucent core reads anywhere.
    blending: THREE.NormalBlending,
    uniforms: {
      uColor: { value: color },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vLocalPos;
      void main() {
        vLocalPos = position;
        // Thrust cubes are an InstancedMesh; apply the per-instance transform
        // so all instances render at their own positions instead of collapsing
        // onto the base origin (which showed up as one stray blue rectangle).
        vec4 transformed = vec4(position, 1.0);
        #ifdef USE_INSTANCING
          transformed = instanceMatrix * transformed;
        #endif
        gl_Position = projectionMatrix * modelViewMatrix * transformed;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uTime;
      varying vec3 vLocalPos;
      void main() {
        // Cube local space is [-1,1]^3. The nozzle sits at the top (y=+1) and the
        // jet streams down toward the tip (y=-1). Build a soft tapering cone plume
        // instead of showing the raw box faces.

        // Axial param: 0 at nozzle (y=+1), 1 at plume tip (y=-1).
        float a = clamp((1.0 - vLocalPos.y) * 0.5, 0.0, 1.0);

        // Horizontal distance from the central axis.
        float r = length(vec2(vLocalPos.x, vLocalPos.z));

        // Flickering jet animation along the axis.
        float pulse = 0.92 + 0.08 * sin(uTime * 6.0 + a * 14.0);

        // --- Dense inner plume: a fat cone tapering to a point at the tip ---
        float coneR = mix(1.0, 0.12, a);
        float plume = 1.0 - smoothstep(coneR * 0.3, coneR, r);
        // Gentle axial falloff so the jet stays bright much further down the cone
        // (a longer streaming flame, not a compact stub).
        float axial = pow(1.0 - a, 0.55);
        float body = plume * axial * pulse;

        // --- Soft outer glow that fakes a bloom halo hugging the jet ---
        float haloR = mix(1.7, 0.35, a);
        float halo = (1.0 - smoothstep(haloR * 0.18, haloR, r)) * pow(1.0 - a, 0.85);

        if (body < 0.012 && halo < 0.012) discard;

        // Tight white-hot core at the nozzle that snaps quickly into a deep,
        // saturated cyan jet — a sharp hot-core → cyan transition for high contrast.
        vec3 hot = vec3(0.95, 1.0, 1.0);
        vec3 col = mix(hot, uColor, smoothstep(0.0, 0.10, a));
        // Saturate the body further down so the cyan reads vivid against the sky.
        col = mix(col, uColor * 1.15, smoothstep(0.18, 0.55, a));
        // Extra white-hot punch right at the nozzle core.
        col = mix(col, vec3(1.0), (1.0 - a) * plume * 0.7);

        // Composite: a near-solid bright body plus a translucent surrounding glow.
        float bodyA = clamp(pow(body, 0.45) * 1.35, 0.0, 0.98);
        float haloA = halo * 0.55;
        float alpha = clamp(bodyA + haloA, 0.0, 0.98);
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}

type RotationTarget = {
  x: number;
  y: number;
};

function SchoolModel({
  rotationTarget,
}: {
  rotationTarget: MutableRefObject<RotationTarget>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);
  const thrustMaterialsRef = useRef<THREE.ShaderMaterial[]>([]);

  const model = useMemo(() => {
    const cloned = scene.clone();
    const thrustMats: THREE.ShaderMaterial[] = [];

    const thrustMat = createThrustMaterial(new THREE.Color(0.0, 0.52, 1.0));
    thrustMats.push(thrustMat);

    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.InstancedMesh) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        const isThrust = mats.some(
          (m: THREE.Material) => m.name === THRUST_MATERIAL_NAME,
        );

        // Hide the bright white rectangle (baked.001 material on Robot.025)
        const isBrightWhite = mats.some(
          (m: THREE.Material) => m.name === 'baked.001',
        );
        if (isBrightWhite) {
          child.visible = false;
          return;
        }

        if (isThrust) {
          // Hide the elongated Cylinder beam, keep instanced cube thrusters
          if (child.name.startsWith('Cylinder')) {
            child.visible = false;
          } else {
            child.material = thrustMat;
            child.castShadow = false;
            child.receiveShadow = false;
            child.renderOrder = 1;
            // The baked thrust cubes are short (~0.5u tall), so the jet sits inside
            // the nozzle housing with nothing streaming out. Stretch each instance
            // along its local jet axis (-Y) while keeping the nozzle end (y=+1)
            // anchored, so a long flame extends downward out of the nozzle.
            if (child instanceof THREE.InstancedMesh) {
              const ELONGATE = 5.5;
              const offset = 1.0 - ELONGATE; // y' = ELONGATE*y + offset keeps y=+1 fixed
              const local = new THREE.Matrix4()
                .makeTranslation(0, offset, 0)
                .multiply(new THREE.Matrix4().makeScale(1, ELONGATE, 1));
              const m = new THREE.Matrix4();
              for (let i = 0; i < child.count; i++) {
                child.getMatrixAt(i, m);
                m.multiply(local);
                child.setMatrixAt(i, m);
              }
              child.instanceMatrix.needsUpdate = true;
            }
          }
        } else {
          child.visible = true;
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.material) {
            mats.forEach((mat: THREE.MeshStandardMaterial) => {
              // Blender baked-light emissive textures blow out in Three.js PBR.
              // Disable emissive on everything except whitelisted light fixtures.
              const allowed = EMISSIVE_WHITELIST[mat.name];
              if (allowed !== undefined) {
                mat.emissiveIntensity = allowed;
              } else {
                mat.emissiveIntensity = 0;
                mat.emissiveMap = null;
              }
              mat.needsUpdate = true;
            });
          }
        }
      }
    });

    thrustMaterialsRef.current = thrustMats;

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    // Pitch is clamped (no vertical flip), so the only full 360° turn is the
    // horizontal yaw. Fit to the HORIZONTAL span (x–z diagonal) rather than the
    // full 3D diagonal: that keeps the model as large as possible (viewable up
    // close) while still guaranteeing a full horizontal spin stays in-frame.
    const MODEL_FIT = 7.6;
    const horizSpan = Math.hypot(size.x, size.z) || 1;
    const scale = MODEL_FIT / horizSpan;

    cloned.position.set(-center.x, -center.y, -center.z);

    return {
      object: cloned,
      scale,
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      rotationTarget.current.x,
      7,
      delta,
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      rotationTarget.current.y,
      7,
      delta,
    );
    for (const mat of thrustMaterialsRef.current) {
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={groupRef} scale={model.scale} position={[0, -1.4, 0]}>
      <Center>
        <primitive object={model.object} />
      </Center>
    </group>
  );
}

function ModelLoader() {
  return (
    <Html center>
      <div className="h-9 w-9 rounded-full border-2 border-white/20 border-t-[#EED165] animate-spin" />
    </Html>
  );
}

export default function SchoolModelBanner() {
  // Default view: tilted so the school sits on top and the thruster flames stream
  // out of the underside below the cloud layer (matches the reference composition).
  const rotationTarget = useRef<RotationTarget>({ x: DEFAULT_ROT_X, y: DEFAULT_ROT_Y });
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  // `isDesktop` no longer gates whether the Canvas mounts (it always does now) —
  // it only selects the render QUALITY: phones get a lighter GL budget (dpr 1,
  // no shadows, no HDR env) so the real model can run without OOM-crashing them.
  // (This component is `ssr:false`, so `window` is available on first client
  // render — no hydration flash.)
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 768px)').matches
      : true,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Free the WebGL context + all its GPU memory (16MB GLB + HDR PMREM) once the
  // hero scrolls out of view, and recreate it when it comes back. This is what
  // lets the scroll-scrubbed robot/lab videos further down the page survive on
  // mobile: by the time you reach them, the heavy hero canvas is unmounted, so the
  // GPU/decoder isn't fighting it for memory (which was OOM-crashing the page on
  // scroll). The drag rotation lives in a ref, so it's preserved across remounts.
  const heroRef = useRef<HTMLDivElement>(null);
  const [canvasMounted, setCanvasMounted] = useState(true);
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setCanvasMounted(entry.isIntersecting),
      // Keep it alive a bit beyond the viewport so a small scroll wobble near the
      // edge doesn't thrash mount/unmount.
      { rootMargin: '250px 0px 250px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const startDrag = (clientX: number, clientY: number) => {
    dragging.current = true;
    lastX.current = clientX;
    lastY.current = clientY;
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragging.current) return;
    const deltaX = clientX - lastX.current;
    const deltaY = clientY - lastY.current;

    lastX.current = clientX;
    lastY.current = clientY;

    // Yaw is free (spin all the way around); pitch is clamped so the school
    // can't flip over vertically. Sensitivity is high so a small drag turns it a
    // lot (less effort to spin).
    rotationTarget.current.y += deltaX * 0.026;
    rotationTarget.current.x = THREE.MathUtils.clamp(
      rotationTarget.current.x + deltaY * 0.018,
      ROT_X_MIN,
      ROT_X_MAX,
    );
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto flex flex-col items-center mt-10 sm:mt-14"
      onPointerMove={(event) => moveDrag(event.clientX, event.clientY)}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onPointerLeave={stopDrag}
    >
      <div
        ref={heroRef}
        className="relative w-full h-[380px] sm:h-[500px] md:h-[600px] lg:h-[680px] overflow-visible"
      >
        <img
          src="/claud_clean.png?v=3"
          alt=""
          className="school-cloud pointer-events-none absolute left-[12%] top-[-30%] z-30 w-[60%] max-w-[600px] animate-[school-cloud-drift_5.5s_ease-in-out_infinite_alternate] opacity-80 sm:left-[16%] sm:top-[-26%] md:left-[20%] md:top-[-22%] lg:w-[50%]"
          aria-hidden
        />

        {/* The REAL 3D model renders on every device at FULL quality — antialiasing,
            retina dpr, and the HDR `<Environment>` (sunset) that gives the school its
            warm lighting + material reflections (this is what made it "look great";
            dropping it made mobile look flat/poor). The ONLY thing dropped on mobile
            is real-time SHADOWS (2K shadow map + depth pass) — the heaviest GPU cost
            and barely visible on a small floating island.

            CRUCIAL: the model and the Environment are in SEPARATE <Suspense>
            boundaries. The HDR is a CDN fetch; when it shared the model's Suspense it
            blocked the model from EVER painting (stuck on the spinner). Now the model
            paints as soon as its GLB loads, and the HDR lighting pops in a moment
            later when it arrives. `touch-action: pan-y` lets a vertical swipe scroll
            the page while a horizontal drag spins the model. */}
        <div
          className="absolute inset-x-0 bottom-4 top-0 z-0"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={(event) => startDrag(event.clientX, event.clientY)}
        >
          {canvasMounted && (
          <Canvas
            shadows={isDesktop}
            dpr={[1, 2]}
            camera={{ position: [0, 2.8, 6.6], fov: 38 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: isDesktop ? 'high-performance' : 'low-power',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.05,
            }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.55} color="#FFF1DD" />

            <directionalLight
              castShadow={isDesktop}
              position={[8, 12, -8]}
              intensity={1.5}
              color="#FFDCA8"
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0005}
            />

            <Suspense fallback={<ModelLoader />}>
              <SchoolModel rotationTarget={rotationTarget} />
            </Suspense>

            {/* Own Suspense (fallback: nothing) so the HDR loads WITHOUT blocking
                the model paint — fixes the mobile "stuck on spinner" freeze. */}
            <Suspense fallback={null}>
              <Environment preset="sunset" background={false} />
            </Suspense>
          </Canvas>
          )}
        </div>
      </div>

      {/* Drag controls sit right under the model (the wavy separator was removed
          and the section height tightened) so the handle is in view on first load
          on both phone and desktop. */}
      <button
        type="button"
        className="drag-handle mt-3 z-10 mx-auto w-12 h-12 bg-[#e2e8f0] rounded-full flex items-center justify-center cursor-ew-resize shadow-md touch-none"
        aria-label="Rotate school model"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          startDrag(event.clientX, event.clientY);
        }}
        onPointerMove={(event) => moveDrag(event.clientX, event.clientY)}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);
          stopDrag();
        }}
      >
        <Menu className="text-gray-500" size={24} strokeWidth={2.5} />
      </button>

      <p className="drag-text text-white text-xs sm:text-sm mt-3 font-bold tracking-wide">
        &lt; Drag To View &gt;
      </p>
    </div>
  );
}

// Every device now mounts the Canvas and renders the real model, so prefetch the
// GLB everywhere to shorten time-to-first-paint of the hero.
if (typeof window !== 'undefined') {
  useGLTF.preload(MODEL_URL);
}
