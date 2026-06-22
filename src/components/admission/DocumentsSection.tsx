'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const allStudents = [
  'Birth Certificate (original + photocopy)',
  'Aadhaar Card of student',
  'Aadhaar Cards of both parents',
  'Passport-size photographs (4)',
  'Address proof (any one)',
  'Recent passport photo of family',
]

const transferStudents = [
  'Transfer Certificate from previous school (original)',
  'Mark sheet of last class passed',
  'Migration certificate (if applicable)',
  'Character certificate',
  'All documents listed for general admission',
]

export default function DocumentsSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const st = { trigger: ref.current, start: 'top 85%' }

      gsap.set('.docs-card', { y: 30, opacity: 0 })
      gsap.to('.docs-card', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: st,
      })

      gsap.set('.docs-item', { x: -16, opacity: 0 })
      gsap.to('.docs-item', {
        x: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.3,
        clearProps: 'transform',
        scrollTrigger: st,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Documents You&apos;ll Need
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="docs-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 md:p-8">
            <h3 className="text-white text-xl font-semibold">
              For All Students
            </h3>
            <ul className="mt-5 space-y-3">
              {allStudents.map((doc) => (
                <li
                  key={doc}
                  className="docs-item flex items-start gap-3 text-blue-100 text-sm md:text-base leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#EED165]" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="docs-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 md:p-8">
            <h3 className="text-white text-xl font-semibold">
              For Transfer Students
            </h3>
            <ul className="mt-5 space-y-3">
              {transferStudents.map((doc) => (
                <li
                  key={doc}
                  className="docs-item flex items-start gap-3 text-blue-100 text-sm md:text-base leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#EED165]" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-blue-200/80 text-sm text-center max-w-3xl mx-auto leading-relaxed">
          All documents to be carried during admission interview. Original
          documents will be returned after verification.
        </p>
      </div>
    </section>
  )
}
