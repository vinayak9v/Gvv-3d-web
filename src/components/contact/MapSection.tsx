'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function MapSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.map-wrap', { scale: 0.96, opacity: 0 })
      gsap.to('.map-wrap', {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-10">
          Find Us on the Map
        </h2>
        <div className="map-wrap bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-2 overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=Garima+Vidya+Vihar+Indore&output=embed"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: '1rem' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Garima Vidya Vihar — Main Campus"
          />
        </div>
      </div>
    </section>
  )
}
