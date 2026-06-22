'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const stages = [
  {
    name: 'Early Stage',
    range: 'Nursery to II',
    note: 'Play-based foundations and joyful first experiences in school.',
  },
  {
    name: 'Lower Stage',
    range: 'Class III to V',
    note: 'Building literacy, numeracy, and curiosity through structured learning.',
  },
  {
    name: 'Middle Stage',
    range: 'Class VI to VIII',
    note: 'Conceptual depth, independent thinking, and broadening horizons.',
  },
  {
    name: 'Upper Stage',
    range: 'Class IX to XII',
    note: 'Rigorous academics with career readiness and board excellence.',
  },
]

export default function StagesSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.stage-card', { y: 40, opacity: 0 })
      gsap.to('.stage-card', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
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
          Stages of Education
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="stage-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 hover:-translate-y-1 hover:border-blue-400/70 transition-all duration-300"
            >
              <h3 className="text-white text-xl font-semibold">{stage.name}</h3>
              <p className="mt-2 text-[#EED165] text-sm font-medium">
                {stage.range}
              </p>
              <p className="mt-4 text-blue-100 text-sm leading-relaxed">
                {stage.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
