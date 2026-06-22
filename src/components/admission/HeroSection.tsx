'use client'
import { Fragment, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const TITLE = 'Admissions Open'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()
      tl.from('.hero-char', {
        y: 30,
        opacity: 0,
        stagger: 0.03,
        ease: 'power3.out',
        duration: 0.7,
      })
        .from(
          '.hero-subhead',
          { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' },
          0.8,
        )
        .from(
          '.hero-body',
          { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' },
          1.0,
        )
        .from(
          '.hero-cta',
          { y: 20, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out' },
          1.2,
        )
    },
    { scope: ref },
  )

  const words = TITLE.split(' ')

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
          {words.map((word, wi) => (
            <Fragment key={wi}>
              <span className="inline-block">
                {word.split('').map((char, ci) => (
                  <span key={ci} className="hero-char inline-block">
                    {char}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>
        <p className="hero-subhead mt-6 text-[#EED165] text-xl md:text-3xl font-semibold tracking-wide">
          2026-27 Academic Session
        </p>
        <p className="hero-body mt-8 text-blue-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Join Madhya Pradesh&apos;s leading CBSE school. Now accepting
          applications for Nursery through Class IX and Class XI.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#enquiry"
            className="hero-cta bg-gradient-to-b from-[#fae27c] to-[#d6ad44] text-black font-bold px-8 py-3 rounded-full hover:shadow-[0_0_30px_rgba(238,209,101,0.55)] transition-all duration-300"
          >
            Enquire Now
          </a>
          <a
            href="#"
            className="hero-cta bg-gradient-to-b from-[#fae27c] to-[#d6ad44] text-black font-bold px-8 py-3 rounded-full hover:shadow-[0_0_30px_rgba(238,209,101,0.55)] transition-all duration-300"
          >
            Download Brochure
          </a>
        </div>
      </div>
    </section>
  )
}
