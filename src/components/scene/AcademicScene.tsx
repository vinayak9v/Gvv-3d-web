'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Volume2, VolumeX } from 'lucide-react'
import Character from './Character'
import { DIALOGUE_STAGES } from './academicContent'

type Dialogue = { title?: string; text: string } | null

// Robot is scaled 8x vs the boy's 0.3x, so at a shared feet-at-y=0 baseline
// its head/torso run well above the camera's lookAt height (2.2) and read as
// sitting too high in frame. Pull it down; the boy needs no correction.
const ROBOT_Y_OFFSET = -1.8
const BOY_Y_OFFSET = 0

// How much characters "punch in" while actively talking/reacting, and how
// long that zoom gets to play before the caption text follows it in.
const ACTIVE_SCALE = 1.12
const DIALOGUE_DELAY_MS = 350

function SceneWithAnimations() {
  const [dialogue, setDialogue] = useState<Dialogue>(null)
  const [robotAnim, setRobotAnim] = useState('idle')
  const [boyAnim, setBoyAnim] = useState('idle')
  const [modelsReady, setModelsReady] = useState(false)
  const [openingComplete, setOpeningComplete] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [muted, setMuted] = useState(false)
  const robotGroup = useRef<THREE.Group>(null!)
  const boyGroup = useRef<THREE.Group>(null!)
  const podiumRing = useRef<THREE.Mesh>(null!)
  const scrollProgress = useRef(0)
  const sceneWrapper = useRef<HTMLDivElement>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const mutedRef = useRef(false)
  const handleModelsReady = useCallback(() => {
    setModelsReady(true)
  }, [])

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  // Short two-note chime, synthesised on the fly so no audio asset is needed.
  const playChime = useCallback(() => {
    if (mutedRef.current) return
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext
      if (!Ctx) return
      const ctx = audioCtxRef.current ?? new Ctx()
      audioCtxRef.current = ctx
      if (ctx.state === 'suspended') ctx.resume()

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(640, now)
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.14)
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.42)
    } catch {
      // Web Audio unsupported/blocked — fail silently, sound is a nice-to-have.
    }
  }, [])

  // Browsers require a user gesture before audio can play — unlock/create
  // the AudioContext on the first scroll/touch/click inside the scene.
  useEffect(() => {
    const unlock = () => {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext
      if (!Ctx) return
      const ctx = audioCtxRef.current ?? new Ctx()
      audioCtxRef.current = ctx
      if (ctx.state === 'suspended') ctx.resume()
    }
    window.addEventListener('wheel', unlock, { once: true, passive: true })
    window.addEventListener('touchstart', unlock, { once: true, passive: true })
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => {
      window.removeEventListener('wheel', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('pointerdown', unlock)
    }
  }, [])

  const dialogueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Let the character's zoom-in punch play for a beat before the caption
  // text swaps in, so the scale change reads as leading the text change.
  const handleDialogueChange = useCallback((next: Dialogue) => {
    if (dialogueTimeoutRef.current) clearTimeout(dialogueTimeoutRef.current)
    dialogueTimeoutRef.current = setTimeout(() => {
      setDialogue(next)
      if (next && next.text) playChime()
    }, DIALOGUE_DELAY_MS)
  }, [playChime])

  useEffect(() => {
    return () => {
      if (dialogueTimeoutRef.current) clearTimeout(dialogueTimeoutRef.current)
    }
  }, [])

  // Drive scene progress from real window scroll over the tall wrapper (0→1),
  // replacing drei ScrollControls' nested scroll area.
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

  // Opening gate: lock window scroll until the greeting finishes.
  useEffect(() => {
    if (openingComplete) return
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => { document.body.style.overflow = '' }
  }, [openingComplete])

  useEffect(() => {
    if (!modelsReady) return

    setDialogue({
      title: 'Welcome',
      text: 'Welcome to Garima Vidya Vihar. Scroll through this academic walkthrough to explore our school, values, mission, and vision.',
    })
    playChime()
    setRobotAnim('wave')
    setBoyAnim('idle')

    const toBoyWave = setTimeout(() => {
      setRobotAnim('idle')
      setBoyAnim('wave')
    }, 2200)
    const toIdle = setTimeout(() => {
      setRobotAnim('idle')
      setBoyAnim('idle')
      setDialogue(null)
      setOpeningComplete(true)
      setShowHint(true)
    }, 4200)
    return () => {
      clearTimeout(toBoyWave)
      clearTimeout(toIdle)
    }
  }, [modelsReady, playChime])

  useEffect(() => {
    if (!openingComplete) return
    const handleScroll = () => setShowHint(false)
    window.addEventListener('wheel', handleScroll, { once: true })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [openingComplete])

  const handleAnimationChange = (robot: string, boy: string) => {
    setRobotAnim(robot)
    setBoyAnim(boy)
  }

  return (
    <div ref={sceneWrapper} className="relative w-full" style={{ height: '300vh' }}>
      <section className="sticky top-0 h-[100svh] w-full overflow-hidden bg-transparent">
        <Canvas
          camera={{ position: [0, 1.8, 10], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 4]} intensity={1.0} />
          <pointLight position={[-3, 2, 2]} intensity={0.4} color="#00d4ff" />

          <ScrollDriver
            openingComplete={openingComplete}
            onDialogueChange={handleDialogueChange}
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

        {showHint && (
          <ScrollCue />
        )}

        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-[#07103a]/82 p-2.5 text-white/80 shadow-lg backdrop-blur-md transition-colors hover:text-white"
          aria-label={muted ? 'Unmute narration sound' : 'Mute narration sound'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </section>

      <style jsx global>{`
        @keyframes fadeInPanel {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(1.3); }
        }
        @keyframes cue-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
      `}</style>
    </div>
  )
}

function SceneLoader() {
  return (
    <Html center>
      <div className="min-w-44 rounded-full border border-white/15 bg-[#07103a]/85 px-5 py-3 text-center text-white shadow-2xl backdrop-blur-md">
        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#EED165]">
          Loading Tour
        </div>
        <div className="mx-auto mt-3 h-8 w-8 rounded-full border-2 border-white/20 border-t-[#EED165] animate-spin" />
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
          <div className="h-full w-2/3 rounded-full bg-[#EED165]/70" />
        </div>
      </div>
    </Html>
  )
}

function CharacterStage({
  robotGroup,
  boyGroup,
  robotAnim,
  boyAnim,
  onReady,
}: {
  robotGroup: React.RefObject<THREE.Group>
  boyGroup: React.RefObject<THREE.Group>
  robotAnim: string
  boyAnim: string
  onReady: () => void
}) {
  const robotSpinTarget = useRef(0)
  const boySpinTarget = useRef(0)

  useEffect(() => {
    onReady()
  }, [onReady])

  useFrame((_, delta) => {
    if (robotGroup.current) {
      robotGroup.current.rotation.y = THREE.MathUtils.damp(
        robotGroup.current.rotation.y,
        robotSpinTarget.current,
        8,
        delta,
      )
      const robotTargetScale = robotAnim === 'talk' || robotAnim === 'wave' ? ACTIVE_SCALE : 1
      const robotScale = THREE.MathUtils.damp(robotGroup.current.scale.x, robotTargetScale, 4, delta)
      robotGroup.current.scale.setScalar(robotScale)
    }
    if (boyGroup.current) {
      boyGroup.current.rotation.y = THREE.MathUtils.damp(
        boyGroup.current.rotation.y,
        boySpinTarget.current,
        8,
        delta,
      )
      const boyTargetScale = boyAnim === 'wave' || boyAnim === 'clap' ? ACTIVE_SCALE : 1
      const boyScale = THREE.MathUtils.damp(boyGroup.current.scale.x, boyTargetScale, 4, delta)
      boyGroup.current.scale.setScalar(boyScale)
    }
  })

  const setCursor = (value: string) => {
    document.body.style.cursor = value
  }

  return (
    <>
      <group
        ref={robotGroup}
        position={[-80, 0, -2]}
        onPointerEnter={() => {
          robotSpinTarget.current += Math.PI * 2
          setCursor('pointer')
        }}
        onPointerLeave={() => setCursor('')}
      >
        <Character
          url="/models/robot.glb"
          scale={8}
          rotation={[0, Math.PI / 6, 0]}
          animationName={robotAnim}
          dimEmissiveMaterials={['eyes']}
        />
      </group>
      <group
        ref={boyGroup}
        position={[80, 0, -2]}
        onPointerEnter={() => {
          boySpinTarget.current += Math.PI * 2
          setCursor('pointer')
        }}
        onPointerLeave={() => setCursor('')}
      >
        <Character
          url="/models/boy.glb"
          scale={0.3}
          rotation={[0, Math.PI - Math.PI / 0.7, 0]}
          animationName={boyAnim}
        />
      </group>
    </>
  )
}

// Inner component runs inside Canvas — drives all the per-frame logic
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

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Keep both characters inside the frustum and centred at any aspect ratio.
    // The horizontal FOV is vfov × aspect, so on narrow/portrait screens the
    // characters fell off the sides / got cut (esp. iPhone portrait). Pull them
    // toward centre as the viewport narrows AND dolly the camera back so both
    // (each ~±46u wide around its centre) stay fully on-screen. Landscape/desktop
    // hits the z=200 floor, so its framing is unchanged.
    const aspect = state.size.width / Math.max(state.size.height, 1)
    const sep = Math.min(80, Math.max(30, 60 * aspect))
    const vfov = THREE.MathUtils.degToRad((state.camera as THREE.PerspectiveCamera).fov)
    const halfNeeded = sep + 46
    const dist = Math.max(200, halfNeeded / (Math.tan(vfov / 2) * Math.max(aspect, 0.01)))
    state.camera.position.set(0, 2.4, dist)
    state.camera.lookAt(0, 2.2, -2)

    if (robotGroup.current) {
      robotGroup.current.position.x = -sep
      robotGroup.current.position.y = ROBOT_Y_OFFSET + Math.sin(t * 1.2) * 0.04
    }
    if (boyGroup.current) {
      boyGroup.current.position.x = sep
      boyGroup.current.position.y = BOY_Y_OFFSET + Math.sin(t * 0.9 + 1) * 0.03
    }

    if (!openingComplete) {
      if (podiumRing.current) {
        const material = podiumRing.current.material as THREE.MeshBasicMaterial
        material.opacity = 0.2
      }
      return
    }

    const o = progressRef.current ?? 0

    if (podiumRing.current) {
      const material = podiumRing.current.material as THREE.MeshBasicMaterial
      const isSpeaking = o > 0.08 && o < 0.95
      material.opacity = isSpeaking
        ? 0.35 + Math.sin(t * 3) * 0.25
        : 0.2
    }

    let robotAnim = 'idle'
    let boyAnim = 'idle'

    if (o < 0.08) {
      // Opening sequence already handled the greeting — sit idle until the user scrolls in
    } else if (o < 0.78) {
      // Robot is explaining philosophy/stages/methodology, boy listens thoughtfully
      robotAnim = 'talk'
      boyAnim = 'idle'
    } else if (o < 0.92) {
      // Robot reveals academic outcomes — boy claps in excitement
      robotAnim = 'talk'
      boyAnim = 'clap'
    } else {
      // Final stage — robot back to idle, boy still happy
      robotAnim = 'idle'
      boyAnim = 'clap'
    }

    if (robotAnim !== lastAnimState.current.robot || boyAnim !== lastAnimState.current.boy) {
      lastAnimState.current = { robot: robotAnim, boy: boyAnim }
      onAnimationChange(robotAnim, boyAnim)
    }

    const currentIndex = DIALOGUE_STAGES.findIndex(
      (s) => o >= s.range[0] && o < s.range[1]
    )
    if (currentIndex !== -1 && currentIndex !== lastDialogueIndex.current) {
      lastDialogueIndex.current = currentIndex
      const stage = DIALOGUE_STAGES[currentIndex]
      onDialogueChange(stage.text ? { title: stage.title, text: stage.text } : null)
    }
  })

  return null
}

function GuidePanel({ title, text }: { title?: string; text: string }) {
  return (
    <aside
      className="pointer-events-none absolute inset-x-4 bottom-24 z-10 rounded-xl border border-[#5BC0EB]/35 bg-[#07103a]/82 p-4 text-left text-white shadow-[0_0_28px_rgba(91,192,235,0.18)] backdrop-blur-xl md:bottom-auto md:left-1/2 md:right-auto md:top-6 md:w-[min(470px,38vw)] md:-translate-x-1/2 md:p-4"
      style={{ animation: 'fadeInPanel 0.45s ease-out' }}
    >
      <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#5BC0EB]">
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#5BC0EB]"
          style={{ animation: 'pulse 1.5s infinite' }}
        />
        Robot explaining to student
      </div>
      {title && (
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/85 md:text-sm">
          {title}
        </h2>
      )}
      <p className="mt-2 text-sm leading-6 text-blue-50 md:text-[15px] md:leading-6">
        {text}
      </p>
      <span className="absolute -bottom-3 left-8 hidden h-6 w-6 rotate-45 border-b border-r border-[#5BC0EB]/35 bg-[#07103a]/82 md:block" />
    </aside>
  )
}

function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
        <span className="relative h-7 w-4 rounded-full border border-white/40">
          <span
            className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#EED165]"
            style={{ animation: 'cue-bob 1.4s infinite' }}
          />
        </span>
        <span>Scroll the tour</span>
      </div>
    </div>
  )
}

export default function AcademicScene() {
  return <SceneWithAnimations />
}
