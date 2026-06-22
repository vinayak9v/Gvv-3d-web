'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const MAIN_QUERY = 'Garima+Vidya+Vihar+School+Indore'
const CITY_QUERY = '32+Kila+Road+Indore'

export default function AddressSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.addr-left', { x: -40, opacity: 0 })
      gsap.set('.addr-right', { x: 40, opacity: 0 })
      gsap.to('.addr-left', {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
      gsap.to('.addr-right', {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="addr-left bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
          <h3 className="text-white text-2xl font-bold">Main Campus</h3>
          <p className="mt-4 text-blue-100 leading-relaxed flex-1">
            Paul Hill, Airport Road, Opposite Bijasan Mata Temple, Shakti Nagar,
            Indore, Madhya Pradesh 452005
          </p>
          <a
            href={`https://maps.google.com/?q=${MAIN_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 self-start bg-[#EED165] border border-[#C79F32] text-black px-6 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#E3C556] transition-colors shadow-sm"
          >
            Get Directions
            <ExternalLink size={14} />
          </a>
        </div>
        <div className="addr-right bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300 flex flex-col">
          <h3 className="text-white text-2xl font-bold">City Office</h3>
          <p className="mt-4 text-blue-100 leading-relaxed flex-1">
            32 Kila Road, Indore, Madhya Pradesh 452015
          </p>
          <a
            href={`https://maps.google.com/?q=${CITY_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 self-start bg-[#EED165] border border-[#C79F32] text-black px-6 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#E3C556] transition-colors shadow-sm"
          >
            Get Directions
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
