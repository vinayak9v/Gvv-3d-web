'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import GateCard from './GateCard'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const AcademicIcon = () => (
  <svg viewBox="0 0 64 64" className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M8 18 L32 8 L56 18 L32 28 Z" />
    <path d="M16 22 L16 38 C16 38 22 44 32 44 C42 44 48 38 48 38 L48 22" />
    <line x1="56" y1="18" x2="56" y2="34" />
  </svg>
)

const RoboticsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="18" y="20" width="28" height="26" rx="4" />
    <line x1="32" y1="14" x2="32" y2="20" />
    <circle cx="32" cy="12" r="2" />
    <circle cx="26" cy="30" r="2" fill="currentColor" />
    <circle cx="38" cy="30" r="2" fill="currentColor" />
    <line x1="26" y1="38" x2="38" y2="38" />
    <line x1="12" y1="28" x2="18" y2="28" />
    <line x1="46" y1="28" x2="52" y2="28" />
    <line x1="24" y1="46" x2="24" y2="54" />
    <line x1="40" y1="46" x2="40" y2="54" />
  </svg>
)

const CoCurricularIcon = () => (
  <svg viewBox="0 0 64 64" className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="32" cy="32" r="22" />
    <circle cx="22" cy="24" r="3" fill="currentColor" />
    <circle cx="42" cy="24" r="3" fill="currentColor" />
    <circle cx="46" cy="36" r="3" fill="currentColor" />
    <circle cx="32" cy="44" r="3" fill="currentColor" />
    <path d="M32 32 L40 52 C44 52 48 48 48 44 L46 38" />
  </svg>
)

const gates = [
  { title: 'Academic', href: '/academic', icon: <AcademicIcon /> },
  { title: 'Robotics', href: '/robotics', icon: <RoboticsIcon /> },
  { title: 'Co-curricular', href: '/co-curricular', icon: <CoCurricularIcon /> },
]

export default function Gates() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.gate-card-wrapper', {
        y: 40,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="bg-brand-gradient py-20 px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {gates.map((g) => (
          <div key={g.title} className="gate-card-wrapper">
            <GateCard title={g.title} href={g.href} icon={g.icon} />
          </div>
        ))}
      </div>
    </section>
  )
}
