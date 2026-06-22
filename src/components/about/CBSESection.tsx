'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CBSESection() {
  const ref = useRef<HTMLElement>(null)
  const code1Ref = useRef<HTMLSpanElement>(null)
  const code2Ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const st = { trigger: ref.current, start: 'top 80%', once: true }

      gsap.from('.cbse-card', {
        scale: 0.92,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: st,
      })

      const a = { val: 0 }
      gsap.to(a, {
        val: 1030329,
        duration: 2.0,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => {
          if (code1Ref.current) {
            code1Ref.current.textContent = Math.floor(a.val).toLocaleString()
          }
        },
      })

      const b = { val: 0 }
      gsap.to(b, {
        val: 50297,
        duration: 2.0,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => {
          if (code2Ref.current) {
            code2Ref.current.textContent = Math.floor(b.val).toLocaleString()
          }
        },
      })

      gsap.from('.cbse-status', {
        opacity: 0,
        y: 10,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: st,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="cbse-card bg-[#0a1445]/80 backdrop-blur-sm border-2 rounded-2xl p-8 md:p-12"
          style={{ borderColor: '#C79F32' }}
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
            CBSE Affiliated Since 2007
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-blue-200 text-sm uppercase tracking-widest">
                Affiliation Code
              </p>
              <p className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: '#EED165' }}>
                <span ref={code1Ref}>0</span>
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-sm uppercase tracking-widest">
                School Code
              </p>
              <p className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: '#EED165' }}>
                <span ref={code2Ref}>0</span>
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-sm uppercase tracking-widest">
                Status
              </p>
              <p
                className="cbse-status mt-3 text-3xl md:text-4xl font-bold"
                style={{ color: '#EED165' }}
              >
                2022–2027
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
