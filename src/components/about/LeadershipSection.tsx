'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const leadership = [
  {
    name: 'Mr. Santosh Bagora',
    role: 'Director & Founder',
    note: 'Founded GVV in 2007 with a vision of quality education at an affordable fee structure.',
  },
  {
    name: 'Mr. Mohanlal Bagora',
    role: 'President',
    note: 'At the very center of our school ethos is our commitment to personalized, rigorous education alongside the development of the whole child.',
  },
  {
    name: 'Ms. Rama Sharma',
    role: 'Principal',
    note: 'Leading the academic community with care, discipline, and a focus on holistic growth.',
  },
]

function PhotoPlaceholder() {
  return (
    <div
      className="w-full aspect-square rounded-xl flex items-center justify-center text-blue-200/60 text-xs tracking-widest uppercase border border-blue-500/30"
      style={{
        background:
          'linear-gradient(135deg, rgba(65,25,220,0.25) 0%, rgba(10,20,69,0.9) 60%, rgba(3,5,16,0.95) 100%)',
      }}
    >
      Portrait
    </div>
  )
}

export default function LeadershipSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.leader-card', { y: 60, opacity: 0 })
      gsap.to('.leader-card', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.4)',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Our Leadership
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((person) => (
            <div
              key={person.name}
              className="leader-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 hover:-translate-y-[6px] hover:border-blue-400/70 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              <PhotoPlaceholder />
              <h3 className="mt-6 text-white text-xl font-semibold">
                {person.name}
              </h3>
              <p className="text-[#EED165] text-sm mt-1">{person.role}</p>
              <p className="mt-4 text-blue-100 text-sm leading-relaxed">
                {person.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
