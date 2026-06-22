'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type CountItem = {
  kind: 'count'
  value: number
  suffix: string
  label: string
}
type StaticItem = {
  kind: 'static'
  label1: string
  label2: string
}
type Item = (CountItem | StaticItem) & { icon: React.ReactNode }

function TrophyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden>
      <defs>
        <linearGradient id="cup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD76A" />
          <stop offset="100%" stopColor="#E8A810" />
        </linearGradient>
      </defs>
      {/* wings */}
      <path d="M14 22 Q4 28 8 36 L14 34 Q12 28 18 24 Z" fill="#FFD76A" />
      <path d="M50 22 Q60 28 56 36 L50 34 Q52 28 46 24 Z" fill="#FFD76A" />
      {/* cup */}
      <path d="M20 14 L44 14 L42 36 Q42 44 32 44 Q22 44 22 36 Z" fill="url(#cup)" stroke="#8a5a00" strokeWidth="1" />
      {/* star */}
      <path d="M32 20 L34 26 L40 26 L35 30 L37 36 L32 33 L27 36 L29 30 L24 26 L30 26 Z" fill="#c1140f" stroke="#8a0000" strokeWidth="0.5" />
      {/* base */}
      <rect x="27" y="44" width="10" height="4" fill="#8a5a00" />
      <rect x="20" y="48" width="24" height="6" rx="1" fill="#FFD76A" stroke="#8a5a00" strokeWidth="0.5" />
    </svg>
  )
}

function StudentsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden>
      {/* head A */}
      <circle cx="24" cy="22" r="8" fill="#f4a87f" />
      <path d="M16 18 Q24 8 32 18 Q32 14 24 12 Q16 14 16 18" fill="#d35400" />
      {/* head B */}
      <circle cx="42" cy="22" r="8" fill="#f4c8a0" />
      <path d="M34 18 Q42 8 50 18 Q50 14 42 12 Q34 14 34 18" fill="#7a3c10" />
      {/* uniforms */}
      <path d="M14 38 L18 30 Q24 32 30 30 L34 38 L34 50 L14 50 Z" fill="#3a5cc0" />
      <path d="M32 38 L36 30 Q42 32 48 30 L52 38 L52 50 L32 50 Z" fill="#c1140f" />
      {/* desk */}
      <rect x="10" y="50" width="44" height="6" rx="1" fill="#8b5a2b" />
      <rect x="10" y="56" width="44" height="2" fill="#5a3a1a" />
    </svg>
  )
}

function AlumniIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden>
      <circle cx="32" cy="32" r="16" fill="#3a5cc0" />
      <path d="M16 32 Q32 14 48 32 Q32 50 16 32 Z" fill="none" stroke="#F5C842" strokeWidth="1.4" />
      <ellipse cx="32" cy="32" rx="16" ry="6" fill="none" stroke="#F5C842" strokeWidth="1.4" />
      <line x1="32" y1="16" x2="32" y2="48" stroke="#F5C842" strokeWidth="1.4" />
      {/* nodes */}
      {[
        [32, 16],
        [32, 48],
        [16, 32],
        [48, 32],
        [22, 22],
        [42, 22],
        [22, 42],
        [42, 42],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#5BC0EB" />
      ))}
    </svg>
  )
}

function HumanoidIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden>
      {/* head */}
      <rect x="18" y="14" width="28" height="22" rx="6" fill="#e8eef5" stroke="#5a728c" strokeWidth="1" />
      {/* antenna */}
      <line x1="32" y1="14" x2="32" y2="8" stroke="#5a728c" strokeWidth="1.5" />
      <circle cx="32" cy="7" r="2" fill="#5BC0EB" />
      {/* eyes */}
      <rect x="22" y="22" width="8" height="6" rx="1" fill="#0a1233" />
      <rect x="34" y="22" width="8" height="6" rx="1" fill="#0a1233" />
      <circle cx="26" cy="25" r="1.2" fill="#5BC0EB" />
      <circle cx="38" cy="25" r="1.2" fill="#5BC0EB" />
      {/* mouth */}
      <rect x="28" y="31" width="8" height="2" rx="0.5" fill="#5a728c" />
      {/* neck/body hint */}
      <rect x="28" y="36" width="8" height="4" fill="#a6b4c4" />
      <rect x="20" y="40" width="24" height="14" rx="3" fill="#c8d3e0" stroke="#5a728c" strokeWidth="1" />
      <circle cx="32" cy="47" r="3" fill="#5BC0EB" />
    </svg>
  )
}

function RobotArmIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-16 h-16" aria-hidden>
      {/* base */}
      <rect x="16" y="50" width="32" height="6" rx="1" fill="#F5C842" />
      {/* shoulder */}
      <rect x="26" y="36" width="12" height="14" rx="2" fill="#3a5cc0" stroke="#0a1233" strokeWidth="0.8" />
      {/* upper arm */}
      <rect x="30" y="22" width="6" height="16" fill="#5a72c8" stroke="#0a1233" strokeWidth="0.8" />
      {/* joint */}
      <circle cx="33" cy="22" r="3" fill="#0a1233" />
      {/* forearm */}
      <rect x="33" y="14" width="14" height="6" rx="2" fill="#5a72c8" stroke="#0a1233" strokeWidth="0.8" />
      {/* gripper */}
      <path d="M47 12 L52 8 L52 14" stroke="#F5C842" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M47 20 L52 24 L52 18" stroke="#F5C842" strokeWidth="2" fill="none" strokeLinejoin="round" />
    </svg>
  )
}

const ITEMS: Item[] = [
  { kind: 'count', value: 38, suffix: '+', label: 'YEARS LEGACY', icon: <TrophyIcon /> },
  { kind: 'count', value: 5000, suffix: '+', label: 'STUDENTS', icon: <StudentsIcon /> },
  { kind: 'count', value: 25000, suffix: '+', label: 'ALUMNI', icon: <AlumniIcon /> },
  { kind: 'static', label1: "MP'S FIRST", label2: 'HUMANOID ROBOT', icon: <HumanoidIcon /> },
  { kind: 'static', label1: 'ADVANCED', label2: 'ROBOTICS LABS', icon: <RobotArmIcon /> },
]

export default function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      gsap.from('.impact-icon', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.from('.impact-label', {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        delay: 0.15,
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          ITEMS.forEach((item, i) => {
            if (item.kind !== 'count') return
            const el = numberRefs.current[i]
            if (!el) return
            const counter = { val: 0 }
            gsap.to(counter, {
              val: item.value,
              duration: 1.5,
              ease: 'power2.out',
              delay: 0.15,
              onUpdate: () => {
                el.textContent =
                  Math.floor(counter.val).toLocaleString() + item.suffix
              },
            })
          })
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="bg-white text-[#0a1233] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">
          Garima Impact
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          {ITEMS.map((item, i) => (
            <div
              key={item.kind === 'count' ? item.label : item.label1}
              className="flex flex-col items-center text-center"
            >
              <div className="impact-icon mb-4">{item.icon}</div>
              {item.kind === 'count' ? (
                <div className="impact-label">
                  <div className="text-3xl md:text-4xl font-extrabold text-[#0a1233]">
                    <span
                      ref={(el) => {
                        numberRefs.current[i] = el
                      }}
                    >
                      0{item.suffix}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]">
                    {item.label}
                  </div>
                </div>
              ) : (
                <div className="impact-label">
                  <div className="text-base md:text-lg font-extrabold uppercase tracking-[0.12em]">
                    {item.label1}
                  </div>
                  <div className="text-base md:text-lg font-extrabold uppercase tracking-[0.12em]">
                    {item.label2}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
