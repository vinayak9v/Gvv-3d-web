'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const achievements = [
  {
    title: 'Economic Times Changemaker',
    detail: 'First MP school to introduce humanoid robots in education.',
  },
  {
    title: 'Kho-Kho Gold Medal',
    detail: 'CBSE Cluster-Level Competition.',
  },
  {
    title: 'Innovation Distinction 2025–26',
    detail: 'Dr. B. K. Passi Memorial Bal Vigyan.',
  },
  {
    title: 'Bronze in Kabaddi',
    detail: 'Khelo MP Youth Games, Bhopal.',
  },
  {
    title: 'Vande Mataram',
    detail: '2nd place at Matra Mandir — 200-student performance.',
  },
]

export default function AchievementsSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.achieve-card', { y: 40, opacity: 0 })
      gsap.to('.achieve-card', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })

      gsap.to('.achieve-star', {
        scale: 1.08,
        duration: 1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'center center',
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Recent Achievements
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="achieve-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 hover:-translate-y-1 hover:border-[#EED165]/60 transition-all duration-300"
            >
              <div
                className="achieve-star w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg"
                style={{ background: '#EED165', border: '1px solid #C79F32' }}
              >
                ★
              </div>
              <h3 className="mt-5 text-white text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-blue-100 text-sm leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
