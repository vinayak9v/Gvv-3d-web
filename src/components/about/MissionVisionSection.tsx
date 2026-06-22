'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function MissionVisionSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const st = { trigger: ref.current, start: 'top 80%' }

      gsap.from('.mv-mission', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: st,
      })
      gsap.from('.mv-vision', {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: st,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="mv-mission bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-white text-3xl font-bold">Our Mission</h2>
          <p className="mt-6 text-blue-100 leading-relaxed">
            The Garima School is, first and foremost, a family. Teachers
            enthusiastically support and guide students to become confident
            person and passionate learners with the core values of kindness,
            cooperation, and respect. The inclusion of rigorous academics,
            co-curricular activities, critical thinking, creativity, and daily
            assignments enriches both mind and heart.
          </p>
        </div>
        <div className="mv-vision bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-white text-3xl font-bold">Our Vision</h2>
          <p className="mt-6 text-blue-100 leading-relaxed">
            To Create better human-being with ethical behavior &amp; enrich them
            with Indian values, respect for others, cooperation &amp; love for
            their parents. The Garima School seeks to inspire confidence,
            passion, and a love of learning in every child. Our school focuses
            on skills and imparts knowledge that is Competency-Based through
            Experiential Learning to prepare students to take up future
            challenges.
          </p>
        </div>
      </div>
    </section>
  )
}
