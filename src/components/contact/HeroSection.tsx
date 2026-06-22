'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.from('.hero-heading', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.3)
        .from('.hero-blurb', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="hero-heading text-white text-4xl md:text-6xl font-bold leading-tight">
          Get in Touch
        </h1>
        <p className="hero-subtitle mt-4 text-[#EED165] text-base md:text-lg tracking-wide">
          We&apos;d love to hear from you. Reach out anytime.
        </p>
        <p className="hero-blurb mt-8 text-blue-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Whether you&apos;re enquiring about admissions, planning a campus visit, or
          have a question about our programs — our team is here to help.
        </p>
      </div>
    </section>
  )
}
