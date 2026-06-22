'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function UniformSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.uniform-card', { y: 30, opacity: 0 })
      gsap.to('.uniform-card', {
        y: 0,
        opacity: 1,
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
          GVV School Uniform
        </h2>

        <div className="uniform-card mt-12 max-w-4xl mx-auto bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-8 md:p-10">
          <p className="text-blue-100 text-base md:text-lg leading-relaxed text-center">
            Our uniform reflects pride and discipline. Available in summer and
            winter variants, with separate sports uniform for physical
            education days.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="https://www.garimaschool.com/gvv-uniform-2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-b from-[#fae27c] to-[#d6ad44] text-black font-bold px-8 py-3 rounded-full hover:shadow-[0_0_30px_rgba(238,209,101,0.55)] transition-all duration-300"
            >
              View Uniform Details
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
