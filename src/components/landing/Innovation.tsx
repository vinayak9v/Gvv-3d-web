'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ITEMS = [
  {
    title: 'G-VYAS Humanoid Robot',
    body: 'Our revolutionary AI-powered classroom assistant transforming interactive learning.',
  },
  {
    title: 'Robotics & AI Labs',
    body: 'State-of-the-art facilities for hands-on robotics engineering and programming.',
  },
  {
    title: 'Garima Innovation Club',
    body: 'A dedicated platform empowering student innovation, research, and collaboration.',
  },
  {
    title: 'STEM Programs',
    body: 'Deeply integrated science, technology, engineering, and mathematics curriculum.',
  },
]

function BulletIcon() {
  return (
    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#0a1233] border border-[#5BC0EB]/30 flex items-center justify-center shadow-[0_0_10px_rgba(91,192,235,0.25)]">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--brand-yellow)]" fill="currentColor" aria-hidden>
        <path d="M12 2 L14 9 L21 9 L15.5 13 L17.5 20 L12 16 L6.5 20 L8.5 13 L3 9 L10 9 Z" />
      </svg>
    </div>
  )
}

// Decorative corner ornaments (stylized geometry instruments)
function TopLeftOrnament() {
  return (
    <svg viewBox="0 0 120 120" className="absolute top-4 left-4 w-24 h-24 opacity-70" aria-hidden>
      <g transform="rotate(-25 60 60)">
        <line x1="60" y1="20" x2="60" y2="100" stroke="#F5C842" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="20" x2="40" y2="100" stroke="#c1140f" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="20" r="5" fill="#F5C842" />
        <circle cx="60" cy="100" r="3" fill="#a07c00" />
        <circle cx="40" cy="100" r="3" fill="#7a0000" />
      </g>
    </svg>
  )
}
function TopRightOrnament() {
  return (
    <svg viewBox="0 0 120 120" className="absolute top-4 right-4 w-24 h-24 opacity-70" aria-hidden>
      <g transform="rotate(20 60 60)">
        <path d="M20 80 A40 40 0 0 1 100 80" fill="none" stroke="#a679d8" strokeWidth="4" />
        <line x1="20" y1="80" x2="100" y2="80" stroke="#a679d8" strokeWidth="3" />
        <line x1="60" y1="40" x2="60" y2="80" stroke="#a679d8" strokeWidth="2" />
        {/* tick marks */}
        {[30, 45, 60, 75, 90].map((x) => (
          <line key={x} x1={x} y1="78" x2={x} y2="72" stroke="#a679d8" strokeWidth="1.5" />
        ))}
      </g>
    </svg>
  )
}
function BottomLeftOrnament() {
  return (
    <svg viewBox="0 0 120 120" className="absolute bottom-4 left-4 w-24 h-24 opacity-70" aria-hidden>
      <g transform="rotate(15 60 60)">
        <polygon points="20,100 100,100 20,30" fill="none" stroke="#F5C842" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="20,100 100,100 20,30" fill="#F5C842" fillOpacity="0.25" />
        {[40, 55, 70, 85].map((y, i) => (
          <line key={i} x1="22" y1={y} x2="28" y2={y} stroke="#a07c00" strokeWidth="1.4" />
        ))}
      </g>
    </svg>
  )
}
function BottomRightOrnament() {
  return (
    <svg viewBox="0 0 120 120" className="absolute bottom-4 right-4 w-24 h-24 opacity-70" aria-hidden>
      <g transform="rotate(-15 60 60)">
        <line x1="40" y1="20" x2="40" y2="100" stroke="#c1140f" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="20" x2="20" y2="100" stroke="#F5C842" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="20" r="5" fill="#c1140f" />
        <circle cx="40" cy="100" r="3" fill="#7a0000" />
        <circle cx="20" cy="100" r="3" fill="#a07c00" />
      </g>
    </svg>
  )
}

export default function Innovation() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.innovation-item', {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.from('.innovation-box', {
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.to('.innovation-box', {
        scale: 1.02,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      })

      gsap.from('.innovation-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 text-white overflow-hidden"
      style={{ background: '#1320b8' }}
    >
      <TopLeftOrnament />
      <TopRightOrnament />
      <BottomLeftOrnament />
      <BottomRightOrnament />

      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">
          Innovation At Garima
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <ul className="space-y-6">
            {ITEMS.map((it) => (
              <li
                key={it.title}
                className="innovation-item flex gap-4 items-start"
              >
                <BulletIcon />
                <div>
                  <div className="font-bold text-lg">{it.title}</div>
                  <div className="text-white/75 text-sm mt-1 leading-relaxed">
                    {it.body}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="innovation-box rounded-3xl overflow-hidden border border-[#5BC0EB]/40 bg-[#0a1aa8] shadow-[0_0_40px_rgba(91,192,235,0.2)]">
            {/* white image placeholder area */}
            <div
              className="aspect-[4/3] bg-white flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, #ffffff 0%, #e8eef5 100%)',
              }}
            >
              <svg viewBox="0 0 200 200" className="w-32 h-32 text-[#1320b8]/30" fill="currentColor" aria-hidden>
                <rect x="60" y="60" width="80" height="80" rx="10" />
                <circle cx="100" cy="40" r="6" />
              </svg>
            </div>
            {/* label */}
            <div className="px-6 py-5 text-center">
              <div className="text-2xl md:text-3xl font-extrabold">
                Meet G-VYAS
              </div>
              <div className="text-white/70 text-sm mt-1">
                MP&apos;s First Humanoid Robot Assistant
              </div>
            </div>
          </div>
        </div>

        <div className="innovation-cta mt-14 text-center">
          <Link
            href="/admission"
            className="inline-flex items-center gap-3 bg-[var(--brand-yellow)] text-[#0a1233] pl-7 pr-3 py-3 rounded-full font-bold text-base hover:bg-[var(--brand-yellow-hot)] transition-colors shadow-[0_8px_24px_rgba(245,200,66,0.35)]"
          >
            Apply For Admission
            <span className="inline-flex w-6 h-6 bg-[#0a1233] rounded items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M3 6 L6 9 L9 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
