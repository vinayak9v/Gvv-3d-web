'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactUs from '@/components/landing/ContactUs'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function FormSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const fieldSel = 'input, textarea, button[type="submit"]'
      gsap.set(fieldSel, { y: 30, opacity: 0 })
      gsap.to(fieldSel, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-white text-3xl md:text-4xl font-bold">
          Send Us a Message
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden border border-blue-500/40 shadow-2xl shadow-blue-900/40">
          <ContactUs />
        </div>
      </div>
    </section>
  )
}
