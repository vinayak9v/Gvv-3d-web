'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function EstablishmentSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const st = { trigger: ref.current, start: 'top 80%' }

      gsap.from('.est-heading', {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: st,
      })
      gsap.from('.est-body', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.15,
        scrollTrigger: st,
      })
      gsap.from('.est-image', {
        x: 40,
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.25,
        scrollTrigger: st,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="est-heading text-white text-3xl md:text-4xl font-bold">
            Our Establishment
          </h2>
          <p className="est-body mt-6 text-blue-100 leading-relaxed">
            Founded in 2007 by our Honourable Director Mr. Santosh Bagora as an
            option for providing quality education at an affordable fee structure.
            The Little Garimayans for blooming buds was established in 2009.
          </p>
          <p className="est-body mt-4 text-blue-100 leading-relaxed">
            With 17+ years of teaching excellence, we focus on establishing
            character together with careers — guided by core values of love for
            our culture &amp; country, kindness, cooperation, respect for others
            &amp; moral ethics.
          </p>
        </div>
        <div className="est-image bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-4">
          <div
            className="w-full aspect-[4/3] rounded-xl flex items-center justify-center text-blue-200/60 text-xs tracking-widest uppercase"
            style={{
              background:
                'linear-gradient(135deg, rgba(65,25,220,0.25) 0%, rgba(10,20,69,0.9) 60%, rgba(3,5,16,0.95) 100%)',
            }}
          >
            Campus Image
          </div>
        </div>
      </div>
    </section>
  )
}
