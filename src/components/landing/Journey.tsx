'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const MILESTONES = [
  { year: '2024', event: 'Guinness World Record event achieved.' },
  { year: '2007', event: 'Garima Vidya Vihar CBSE School launched.' },
  { year: '2009', event: 'Little Garimayans Preschool started.' },
  { year: '1988', event: 'Shree Garima Vidya Mandir founded.' },
  { year: '2025', event: 'Humanoid robot learning innovation introduced.' },
]

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.journey-card', {
        opacity: 0,
        y: 60,
        scale: 0.92,
        stagger: 0.4,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })

      gsap.fromTo(
        '.journey-progress-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 text-white"
      style={{ background: '#0a1233' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">
          Our Journey
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {MILESTONES.map((m) => (
            <div
              key={m.year}
              className="journey-card rounded-2xl border border-white/15 bg-gradient-to-br from-[#142068]/60 to-[#0a1233]/60 backdrop-blur-sm p-5"
              style={{ minHeight: '140px' }}
            >
              <div className="text-2xl md:text-3xl font-extrabold text-white">
                {m.year}
              </div>
              <div className="mt-3 text-sm text-white/75 leading-snug">
                {m.event}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 h-1.5 w-full rounded-full overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px dashed rgba(255,255,255,0.2)',
          }}
        >
          <div
            className="journey-progress-fill h-full w-full origin-left"
            style={{
              background:
                'linear-gradient(90deg, #aee3fb 0%, #1f6cd1 50%, #1320b8 100%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
