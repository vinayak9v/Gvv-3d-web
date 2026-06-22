'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function FeeStructureSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.fee-card', { scale: 0.95, opacity: 0 })
      gsap.to('.fee-card', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
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
          Fee Structure 2026-27
        </h2>

        <div className="fee-card mt-12 bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <p className="text-blue-100 text-base md:text-lg leading-relaxed text-center">
            Garima Vidya Vihar is committed to providing world-class education
            at an affordable fee structure. We are proud to be among the best
            CBSE schools in Indore with reasonable fees.
          </p>

          <div className="mt-8 border-2 border-[#EED165]/60 rounded-xl p-6 bg-[#EED165]/5">
            <p className="text-white text-center text-base md:text-lg font-medium">
              For detailed fee structure and payment plans by class, please
              contact the admissions office.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="tel:+917049494919"
              className="flex items-start gap-3 bg-[#060d24]/60 border border-blue-500/30 rounded-xl p-4 hover:border-blue-400/70 transition-colors"
            >
              <div
                className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: '#EED165' }}
              >
                <Phone className="text-black" size={18} />
              </div>
              <div>
                <p className="text-blue-300/80 text-xs uppercase tracking-wider">
                  Call
                </p>
                <p className="text-white text-sm font-medium mt-1">
                  +91 7049494919
                </p>
              </div>
            </a>

            <a
              href="mailto:info@garimaschool.com"
              className="flex items-start gap-3 bg-[#060d24]/60 border border-blue-500/30 rounded-xl p-4 hover:border-blue-400/70 transition-colors"
            >
              <div
                className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: '#EED165' }}
              >
                <Mail className="text-black" size={18} />
              </div>
              <div>
                <p className="text-blue-300/80 text-xs uppercase tracking-wider">
                  Email
                </p>
                <p className="text-white text-sm font-medium mt-1">
                  info@garimaschool.com
                </p>
              </div>
            </a>

            <div className="flex items-start gap-3 bg-[#060d24]/60 border border-blue-500/30 rounded-xl p-4">
              <div
                className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: '#EED165' }}
              >
                <MapPin className="text-black" size={18} />
              </div>
              <div>
                <p className="text-blue-300/80 text-xs uppercase tracking-wider">
                  Visit
                </p>
                <p className="text-white text-sm font-medium mt-1 leading-snug">
                  Paul Hill, Airport Road, Shakti Nagar, Indore
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-blue-200/70 text-xs text-center leading-relaxed">
            Fee structure is subject to revision. One-time admission charges,
            annual tuition, and other fees applicable.
          </p>
        </div>
      </div>
    </section>
  )
}
