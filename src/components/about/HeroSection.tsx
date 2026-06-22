'use client'
import { Fragment, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const TITLE = 'About Garima Vidya Vihar'

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
          '.hero-subtitle',
          { y: 10, opacity: 0, duration: 0.6, ease: 'power2.out' },
          0.8,
        )
        .from(
          '.hero-intro',
          { y: 20, opacity: 0, duration: 0.7, ease: 'power2.out' },
          1.1,
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
        <p className="hero-subtitle mt-4 text-[#EED165] text-sm md:text-base tracking-widest uppercase">
          Sr. Sec. School • CBSE Affiliated • Since 2007
        </p>
        <p className="hero-intro mt-8 text-blue-100 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          GVV School comes under the top CBSE schools in Indore. In your child&apos;s
          learning journey, we at GVV are dedicated to being a friend, philosopher,
          and mentor by offering education that leads to excellence.
        </p>
      </div>
    </section>
  )
}
