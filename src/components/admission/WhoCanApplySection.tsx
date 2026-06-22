'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const items = [
  {
    title: 'Nursery to Class IX',
    note: 'General Admission',
  },
  {
    title: 'Class XI',
    note: 'Stream Selection (Science, Commerce, Humanities)',
  },
  {
    title: 'Transfer Cases',
    note: 'Write to Principal at principal@garimaschool.com',
  },
]

export default function WhoCanApplySection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const st = { trigger: ref.current, start: 'top 85%' }

      gsap.set('.apply-card', { scale: 0.95, opacity: 0 })
      gsap.to('.apply-card', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: st,
      })

      gsap.set('.apply-item', { x: -20, opacity: 0 })
      gsap.to('.apply-item', {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.3,
        clearProps: 'transform',
        scrollTrigger: st,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="apply-card relative bg-[#0a1445]/80 backdrop-blur-sm border-2 border-[#EED165]/70 rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(238,209,101,0.15)]">
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
            Now Accepting Applications
          </h2>
          <ul className="mt-10 space-y-5 max-w-3xl mx-auto">
            {items.map((item) => (
              <li
                key={item.title}
                className="apply-item flex items-start gap-4 text-white"
              >
                <CheckCircle
                  className="shrink-0 mt-1 text-[#EED165]"
                  size={28}
                />
                <div>
                  <p className="text-lg md:text-xl font-semibold">
                    {item.title}
                  </p>
                  <p className="text-blue-100 text-sm md:text-base mt-1">
                    {item.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
