# Task #1 — 3D Integration & Scroll Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the lab as a scroll-scrubbed pre-rendered fly-through on `/co-curricular`, the real robot model as a scroll-rotated 3D showcase on `/robotics`, make the home cards fully clickable, and convert the `/academic` scene from a nested scroll area to browser-scroll with a lowered (centered) model.

**Architecture:** The lab camera is on rails, so it ships as a pre-rendered `public/lab.webm` scrubbed by GSAP ScrollTrigger (same pattern the robotics page uses today). The robot has no baked animation, so a react-three-fiber `Canvas` renders `final_robot.glb` and scroll progress drives `rotation.y` in a pinned section. The academic scene drops drei `ScrollControls` for a tall sticky section whose window-scroll progress feeds the existing `ScrollDriver`.

**Tech Stack:** Next.js 16 (App Router, webpack), React, @react-three/fiber + drei, three, GSAP + ScrollTrigger, Tailwind v4, Blender 5.1 (offline render), ffmpeg (offline encode).

## Global Constraints

- Render 3D with **three.js / @react-three/fiber only** — never Babylon.js (a second 3D engine hurts load time).
- This is **NOT a git repository** — there are no commit steps. Each task ends with a **screenshot verification checkpoint** instead.
- This is **Next.js 16 with breaking changes** — per `AGENTS.md`, read the relevant guide in `node_modules/next/dist/docs/` before writing app-router code if unsure.
- Verify every visual change with `node tools/caplan.mjs <url>` (dev server on port 3000) and **look at the produced `lan-full.png`** before claiming done.
- Dev server: `npm run dev` (port 3000). Blender: `C:\Program Files\Blender Foundation\Blender 5.1\blender.exe`.
- Keep all existing dark-blue theme colors (`#050b14`, `#0a1445`, blue/cyan accents).

---

## Task 1: Render the lab fly-through → `public/lab.webm`

Offline, one-time. Produces the asset the `/co-curricular` page consumes. No app code.

**Files:**
- Create: `tools/render_lab.py` (Blender headless render script)
- Produce: `public/lab.webm`
- Source: `../camera lab.blend` (repo-root, i.e. `C:\Users\Administrator\Documents\Vinayak\camera lab.blend`)

**Interfaces:**
- Produces: `public/lab.webm` — a VP9 WebM of the camera animation (frames 1–360), ~720p, a few MB. Task 2 consumes it as `/lab.webm`.

- [ ] **Step 1: Confirm tooling is reachable**

Run:
```bash
"/c/Program Files/Blender Foundation/Blender 5.1/blender.exe" --version
ffmpeg -version | head -1 || echo "NO_FFMPEG"
```
Expected: Blender prints `Blender 5.1.x`. If ffmpeg prints `NO_FFMPEG`, the script (Step 2) falls back to Blender's built-in FFMPEG muxer — note which path you're on.

- [ ] **Step 2: Write the render script `tools/render_lab.py`**

```python
import bpy, os, sys

OUT_DIR = os.path.abspath(sys.argv[-1])  # passed after `--`
os.makedirs(OUT_DIR, exist_ok=True)

sc = bpy.context.scene
sc.frame_start = 1
sc.frame_end = 360

# Fast engine for a 15M-tri scene. EEVEE Next is the 5.1 id.
try:
    sc.render.engine = 'BLENDER_EEVEE_NEXT'
except Exception:
    sc.render.engine = 'BLENDER_EEVEE'

sc.render.resolution_x = 1280
sc.render.resolution_y = 720
sc.render.resolution_percentage = 100
sc.render.fps = 30
sc.render.film_transparent = False

# Render PNG frames (best quality source for ffmpeg). Encode separately.
sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = os.path.join(OUT_DIR, 'frame_')

bpy.ops.render.render(animation=True)
print("RENDER_DONE", OUT_DIR)
```

- [ ] **Step 3: Run the render (this is slow — 360 frames)**

Run:
```bash
cd "C:/Users/Administrator/Documents/Vinayak"
"/c/Program Files/Blender Foundation/Blender 5.1/blender.exe" -b "camera lab.blend" \
  --python "Gvv-website--main/tools/render_lab.py" -- "/tmp/lab_frames"
```
Expected: ends with `RENDER_DONE`. `/tmp/lab_frames/` contains `frame_0001.png … frame_0360.png`. (Run in background if it exceeds the foreground timeout; this can take many minutes.)

- [ ] **Step 4: Encode frames → `public/lab.webm`**

Run (ffmpeg path):
```bash
cd "C:/Users/Administrator/Documents/Vinayak/Gvv-website--main"
ffmpeg -y -framerate 30 -i /tmp/lab_frames/frame_%04d.png \
  -c:v libvpx-vp9 -b:v 0 -crf 32 -pix_fmt yuv420p -an public/lab.webm
ls -la public/lab.webm
```
Expected: `public/lab.webm` exists, ideally < ~8 MB.

If `NO_FFMPEG` (no system ffmpeg), instead change `tools/render_lab.py` Step 2 lines to output video directly and re-run Step 3:
```python
sc.render.image_settings.file_format = 'FFMPEG'
sc.render.ffmpeg.format = 'WEBM'
sc.render.ffmpeg.codec = 'WEBM'   # VP9
sc.render.ffmpeg.constant_rate_factor = 'MEDIUM'
sc.render.filepath = os.path.join(OUT_DIR, 'lab')  # produces lab####.webm or lab.webm
```
then copy the produced file to `Gvv-website--main/public/lab.webm`.

- [ ] **Step 5: Checkpoint — sanity-check the video**

Run:
```bash
cd "C:/Users/Administrator/Documents/Vinayak/Gvv-website--main"
ffmpeg -i public/lab.webm 2>&1 | grep -E "Duration|Video:" || echo "check manually"
```
Expected: Duration ≈ 12s (360 frames / 30fps), a VP9 video stream at 1280x720. The asset is ready for Task 2.

---

## Task 2: Lab page → scroll-scrubbed video on `/co-curricular`

**Files:**
- Modify (full rewrite): `src/app/co-curricular/page.js`
- Test/verify: `node tools/caplan.mjs http://localhost:3000/co-curricular`

**Interfaces:**
- Consumes: `/lab.webm` (Task 1).
- Produces: a working `/co-curricular` page. The home page's 3rd card already links here — no change needed to routing.

- [ ] **Step 1: Replace `src/app/co-curricular/page.js`**

Mirrors the proven robotics video-scrub. Full file:

```jsx
'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CoCurricularPage() {
  const container = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.lab-title', { y: 100, opacity: 0, duration: 1, ease: 'power4.out' })
      .from('.lab-desc', { y: 50, opacity: 0, duration: 0.8 }, '-=0.5');

    const video = videoRef.current;
    if (video) {
      const setupVideoScrub = () => {
        const duration = video.duration;
        const frameObj = { frame: 0 };
        gsap.to(frameObj, {
          frame: duration,
          ease: 'none',
          scrollTrigger: {
            trigger: '.lab-section',
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            onUpdate: () => { video.currentTime = frameObj.frame; },
          },
        });
      };
      if (video.readyState >= 1) setupVideoScrub();
      else video.addEventListener('loadedmetadata', setupVideoScrub);
    }
  }, { scope: container });

  return (
    <main ref={container} className="w-full bg-[#050b14] text-white overflow-hidden font-sans">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050b14] to-[#050b14] pointer-events-none z-0"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          <h1 className="lab-title text-6xl md:text-8xl lg:text-[100px] font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-blue-300 via-blue-500 to-blue-900 tracking-tight">
            CO-CURRICULAR
          </h1>
          <p className="lab-desc text-lg md:text-2xl text-blue-200/70 max-w-3xl mx-auto mb-16">
            Step inside our labs and activity spaces. Scroll to take the full tour.
          </p>
        </div>
      </section>

      <section className="lab-section h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-black border-y border-blue-500/20">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/lab.webm"
          muted
          playsInline
          preload="auto"
        ></video>
        <div className="relative z-10 text-center mix-blend-difference pointer-events-none">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            INSIDE THE LAB
          </h2>
          <p className="text-lg md:text-2xl text-blue-300 font-mono mt-4">
            [ SCROLL TO EXPLORE ]
          </p>
        </div>
      </section>

      <section className="min-h-[60vh] flex items-center justify-center px-6 py-24">
        <p className="max-w-3xl text-center text-blue-200/70 text-lg leading-relaxed">
          Our co-curricular program blends robotics, science, arts, and sport into one connected campus experience.
        </p>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify the page renders and scrubs**

Run (dev server must be up):
```bash
cd "C:/Users/Administrator/Documents/Vinayak/Gvv-website--main"
node tools/caplan.mjs http://localhost:3000/co-curricular
```
Then **Read `lan-full.png`**. Expected: the "CO-CURRICULAR" hero (not the old "hello"), no console PAGEERR/REQFAIL for `/lab.webm`.

- [ ] **Step 3: Checkpoint** — confirm `/lab.webm` loaded (no `REQFAIL> .../lab.webm` in the caplan console output). Page is done.

---

## Task 3: Robot showcase → `/robotics`

**Files:**
- Move: `../final_robot.glb` → `public/models/final_robot.glb`
- Create: `src/components/scene/RobotShowcase.jsx`
- Modify: `src/app/robotics/page.js` (replace the `.video-section` + remove video-scrub code)
- Verify: `node tools/caplan.mjs http://localhost:3000/robotics`

**Interfaces:**
- Consumes: `/models/final_robot.glb`.
- Produces: `RobotShowcase` — default export, props `{ progress: number }` where `progress` is 0→1 scroll progress; sets robot `rotation.y = progress * Math.PI * 2`.

- [ ] **Step 1: Move the robot model into public**

Run:
```bash
cd "C:/Users/Administrator/Documents/Vinayak"
cp "final_robot.glb" "Gvv-website--main/public/models/final_robot.glb"
ls -la "Gvv-website--main/public/models/final_robot.glb"
```
Expected: file present (~4.8 MB).

- [ ] **Step 2: Create `src/components/scene/RobotShowcase.jsx`**

```jsx
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';

function Robot({ progressRef }) {
  const group = useRef(null);
  const { scene } = useGLTF('/models/final_robot.glb');
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = (progressRef.current || 0) * Math.PI * 2;
    }
  });
  return <primitive ref={group} object={scene} scale={1.5} position={[0, -1.2, 0]} />;
}

useGLTF.preload('/models/final_robot.glb');

export default function RobotShowcase({ progressRef }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 6], fov: 40 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#02040c']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} />
      <pointLight position={[-4, 2, 3]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[4, -2, -3]} intensity={0.8} color="#3b82f6" />
      <Suspense fallback={null}>
        <Robot progressRef={progressRef} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
```

Note: `progressRef` is a React ref (a mutable `{ current: number }`) so scroll updates don't re-render the Canvas — the scroll handler in Task 3 Step 3 writes `progressRef.current` and `useFrame` reads it.

- [ ] **Step 3: Edit `src/app/robotics/page.js` — swap the video section for the robot**

3a. Add the dynamic import + a progress ref at the top of the component. After the existing imports add:
```jsx
import dynamic from 'next/dynamic';
const RobotShowcase = dynamic(() => import('@/components/scene/RobotShowcase'), { ssr: false });
```
Inside `RoboticsPage`, replace `const videoRef = useRef(null);` with:
```jsx
  const robotProgress = useRef(0);
```

3b. **Remove** the entire video-scrub block inside `useGSAP` (the `const video = videoRef.current; if (video) { ... }` section, currently lines ~38–72). Replace it with a ScrollTrigger that pins the robot section and writes progress:
```jsx
    ScrollTrigger.create({
      trigger: '.robot-section',
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
      onUpdate: (self) => { robotProgress.current = self.progress; },
    });
```

3c. Replace the entire `{/* ===== VIDEO SCROLL SECTION ===== */}` `<section className="video-section ...">…</section>` (currently lines ~141–160) with:
```jsx
      {/* ================= ROBOT SHOWCASE SECTION ================= */}
      <section className="robot-section h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-[#02040c] border-y border-blue-500/20">
        <div className="absolute inset-0 z-0">
          <RobotShowcase progressRef={robotProgress} />
        </div>
        <div className="relative z-10 text-center mix-blend-difference pointer-events-none">
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
            MECHANICS IN MOTION
          </h2>
          <p className="text-xl md:text-2xl text-blue-300 font-mono mt-4">
            [ SCROLL TO ROTATE ]
          </p>
        </div>
      </section>
```

- [ ] **Step 4: Verify robot renders and the old video is gone**

Run:
```bash
cd "C:/Users/Administrator/Documents/Vinayak/Gvv-website--main"
node tools/caplan.mjs http://localhost:3000/robotics
```
**Read `lan-full.png`.** Expected: no console errors; `/vid.webm` no longer requested. (Hero is at top; scroll into the robot section happens via scrub — to confirm the model, add a temporary `?` check or trust no REQFAIL on `/models/final_robot.glb`.)

- [ ] **Step 5: Checkpoint** — confirm no `REQFAIL> .../final_robot.glb` and no `PAGEERR` in caplan output. Robot section is wired.

---

## Task 4: Whole-card click on home `VisionCards`

**Files:**
- Modify: `src/components/landing/VisionCards.tsx`
- Verify: `node tools/caplan.mjs http://localhost:3000`

**Interfaces:**
- Consumes: existing `handleCardClick(e, href, id)` (unchanged).
- Produces: clicking anywhere on a card triggers the black-hole transition.

- [ ] **Step 1: Move the click handler to the card wrapper**

In `src/components/landing/VisionCards.tsx`, in the `.map` render, add `onClick` to the inner card `div` (the one with `className="group flex flex-col items-center ..."`). Change its opening tag to include:
```jsx
            <div
              onClick={(e) => handleCardClick(e, card.href, card.id)}
              className="group flex flex-col items-center bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-[#1a1f6b] hover:via-[#111880] hover:to-[#070b2d] hover:shadow-[0_0_35px_rgba(59,130,246,0.45)] hover:border-[#1D129E] cursor-pointer"
            >
```

- [ ] **Step 2: Make the Discover button defer to the card (avoid double-trigger)**

Change the `<button onClick={...}>` to remove its own handler so its click bubbles to the card wrapper:
```jsx
              <button
                type="button"
                className="cursor-pointer bg-gradient-to-b from-[#fae27c] to-[#d6ad44] text-blue-950 font-bold text-sm tracking-wide px-8 py-2.5 rounded-full shadow-[0_0_15px_rgba(250,226,124,0.3)] group-hover:shadow-[0_0_25px_rgba(250,226,124,0.6)] group-hover:scale-105 hover:brightness-110 transition-all duration-300"
              >
                Discover
              </button>
```
(The button no longer calls `handleCardClick`; the click bubbles up to the card `div`. `handleCardClick` still calls `e.preventDefault()` which is harmless here.)

- [ ] **Step 3: Verify the cards still render**

Run:
```bash
cd "C:/Users/Administrator/Documents/Vinayak/Gvv-website--main"
node tools/caplan.mjs http://localhost:3000
```
**Read `lan-full.png`.** Expected: the three cards render normally, no console errors. (The transition itself is animation; the structural change is the click target.)

- [ ] **Step 4: Checkpoint** — cards render, no `PAGEERR`. Whole-card click is wired (button bubbles to wrapper).

---

## Task 5: `/academic` — browser scroll + lower model

**Files:**
- Modify: `src/components/scene/AcademicScene.tsx`
- Verify: `node tools/caplan.mjs http://localhost:3000/academic`

**Interfaces:**
- Consumes: existing `ScrollDriver`, `CharacterStage`, `DIALOGUE_STAGES` (unchanged logic).
- Produces: scene driven by window scroll over a ~300vh wrapper instead of drei `ScrollControls`; model centered/lowered.

- [ ] **Step 1: Replace drei scroll with a window-scroll progress ref**

In `src/components/scene/AcademicScene.tsx`:

1a. Remove `ScrollControls, useScroll` from the drei import; keep `Html`:
```tsx
import { Html } from '@react-three/drei'
```

1b. In `SceneWithAnimations`, add a progress ref and a tall wrapper. Add near the other refs:
```tsx
  const scrollProgress = useRef(0)
  const sceneWrapper = useRef<HTMLDivElement>(null)
```

1c. Add an effect that maps window scroll over the wrapper to 0→1:
```tsx
  useEffect(() => {
    const onScroll = () => {
      const el = sceneWrapper.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      scrollProgress.current = total > 0 ? scrolled / total : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
```

- [ ] **Step 2: Replace the `<section>`/`ScrollControls` JSX with a tall wrapper + sticky Canvas**

Change the returned markup so the Canvas is sticky inside a ~300vh wrapper, and remove `<ScrollControls>` (children become direct Canvas children). Replace the outer `<section …>` opening through `</ScrollControls>` with:
```tsx
    <div ref={sceneWrapper} className="relative w-full" style={{ height: '300vh' }}>
      <section className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a1233]">
        <Canvas
          camera={{ position: [0, 1.8, 10], fov: 45 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#0a1233']} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 4]} intensity={1.0} />
          <pointLight position={[-3, 2, 2]} intensity={0.4} color="#00d4ff" />

          <ScrollDriver
            openingComplete={openingComplete}
            onDialogueChange={setDialogue}
            onAnimationChange={handleAnimationChange}
            robotGroup={robotGroup}
            boyGroup={boyGroup}
            podiumRing={podiumRing}
            progressRef={scrollProgress}
          />

          <Suspense fallback={<SceneLoader />}>
            <CharacterStage
              robotGroup={robotGroup}
              boyGroup={boyGroup}
              robotAnim={robotAnim}
              boyAnim={boyAnim}
              onReady={handleModelsReady}
            />
          </Suspense>

          <mesh ref={podiumRing} rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0.01, -2]}>
            <ringGeometry args={[0.7, 0.9, 64]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
          </mesh>
        </Canvas>

        {dialogue && dialogue.text && <GuidePanel title={dialogue.title} text={dialogue.text} />}
        {showHint && <ScrollCue />}
      </section>
```
and change the matching closing `</section>` of the original to `</div>` (the wrapper close). Keep the `<style jsx global>` block — move it just before the final `</div>`.

- [ ] **Step 3: Update `ScrollDriver` to read the ref instead of `useScroll`**

3a. Change its props type to add `progressRef` and remove the `useScroll` usage:
```tsx
function ScrollDriver({
  openingComplete,
  onDialogueChange,
  onAnimationChange,
  robotGroup,
  boyGroup,
  podiumRing,
  progressRef,
}: {
  openingComplete: boolean
  onDialogueChange: (dialogue: Dialogue) => void
  onAnimationChange: (robot: string, boy: string) => void
  robotGroup: React.RefObject<THREE.Group>
  boyGroup: React.RefObject<THREE.Group>
  podiumRing: React.RefObject<THREE.Mesh>
  progressRef: React.RefObject<number>
}) {
  const lastDialogueIndex = useRef(-1)
  const lastAnimState = useRef({ robot: '', boy: '' })
```

3b. Inside `useFrame`, replace `const o = scroll.offset` with `const o = progressRef.current ?? 0`, and **delete** the `if (scroll.el) scroll.el.scrollTop = 0` line in the `!openingComplete` branch (there is no drei scroll element now). To keep the opening gate, lock the page at top while the greeting plays — in `SceneWithAnimations` add:
```tsx
  useEffect(() => {
    if (openingComplete) return
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => { document.body.style.overflow = '' }
  }, [openingComplete])
```

- [ ] **Step 4: Lower / center the model**

In `ScrollDriver`'s `useFrame`, the camera currently does `state.camera.lookAt(0, 1.5, -2)`. To move the models lower in frame, raise the look target so the camera tilts down onto them. Change to:
```tsx
    state.camera.position.set(0, 2.4, 200)
    state.camera.lookAt(0, 2.2, -2)
```
This is a starting value — confirm against the screenshot in Step 5 and nudge `position.y` / `lookAt` y by ±0.3 until the robot+boy sit centered, slightly below middle.

- [ ] **Step 5: Verify scroll + model position**

Run:
```bash
cd "C:/Users/Administrator/Documents/Vinayak/Gvv-website--main"
node tools/caplan.mjs http://localhost:3000/academic
```
**Read `lan-full.png`.** Expected: the academic scene renders, the welcome guide panel shows, models are centered (slightly lower) — not pushed to the top. No `PAGEERR` (especially no "useScroll must be used within ScrollControls").

- [ ] **Step 6: Checkpoint** — page scrolls the tour via the browser scrollbar (no nested scroll area), model is centered. Tune camera y if needed and re-screenshot.

---

## Final verification

- [ ] All four routes screenshot cleanly: `/` (cards), `/co-curricular` (lab hero), `/robotics` (robot section), `/academic` (centered, browser-scrolled).
- [ ] No `REQFAIL`/`PAGEERR` in any caplan run.
- [ ] Update `docs/TODO.md` / `docs/PROGRESS.md`: mark the revised Task #1 items done; note the lab is a pre-rendered scroll fly-through (not real-time 3D) and the robot is scroll-rotated.

## Self-review notes (coverage vs spec)

- Spec §1 lab fly-through → Tasks 1–2. ✔
- Spec §2 robot showcase → Task 3. ✔
- Spec §3 whole-card click → Task 4. ✔
- Spec §4 academic browser-scroll + lower model → Task 5. ✔
- Out-of-scope (Babylon/school.glb/prisma/docs) correctly excluded. ✔
- No git commits (not a repo) — verification checkpoints used instead, per Global Constraints. ✔
