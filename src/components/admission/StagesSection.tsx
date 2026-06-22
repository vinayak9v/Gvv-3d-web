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
    body:
      'First steps in formal learning. Play-based foundation, social skills development, joyful learning environment.',
    age: '3-7 years',
  },
  {
    name: 'Lower Stage',
    range: 'Class III to V',
    body:
      'Building literacy and numeracy. Structured learning with creative exploration. Foundation for all future learning.',
    age: '8-10 years',
  },
  {
    name: 'Middle Stage',
    range: 'Class VI to VIII',
    body:
      'Conceptual depth across subjects. Critical thinking, project-based learning, leadership development.',
    age: '11-13 years',
  },
  {
    name: 'Upper Stage',
    range: 'Class IX to XII',
    body:
      'Rigorous academics with career readiness. CBSE board preparation, stream selection in XI, competitive exam coaching.',
    age: '14-17 years',
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
          Choose the Right Stage
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.name}
              className="stage-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:border-blue-400/70 transition-all duration-300"
            >
              <h3 className="text-white text-xl font-semibold">{stage.name}</h3>
              <p className="mt-2 text-[#EED165] text-sm font-medium">
                {stage.range}
              </p>
              <p className="mt-4 text-blue-100 text-sm leading-relaxed flex-1">
                {stage.body}
              </p>
              <p className="mt-4 text-blue-300/80 text-xs uppercase tracking-wider">
                Age range: {stage.age}
              </p>
              <a
                href="#enquiry"
                className="mt-5 inline-block text-[#EED165] hover:text-[#fae27c] font-semibold text-sm transition-colors"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
