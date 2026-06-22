'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CTASection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const st = { trigger: ref.current, start: 'top 85%' }

      gsap.from('.cta-heading', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: st,
      })
      gsap.from('.cta-sub', {
        y: 12,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: st,
      })
      gsap.from('.cta-button', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: st,
      })
      gsap.from('.cta-address', {
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: st,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="cta-heading text-white text-3xl md:text-4xl font-bold">
          Come See It For Yourself
        </h2>
        <p className="cta-sub mt-4 text-blue-100">
          We&apos;d love to show you around our campus.
        </p>
        <div className="cta-button mt-8 flex justify-center">
          <Link
            href="/contact"
            className="bg-[#EED165] border border-[#C79F32] text-black px-8 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-3 shadow-md hover:bg-[#E3C556] hover:shadow-[0_0_30px_rgba(238,209,101,0.55)] transition-all duration-300"
          >
            Visit Our Campus
            <span className="w-3.5 h-3.5 bg-[#005AA3] inline-block" />
          </Link>
        </div>
        <p className="cta-address mt-6 text-blue-200 text-sm">
          Paul Hill, Airport Road, Shakti Nagar, Indore
        </p>
      </div>
    </section>
  )
}
