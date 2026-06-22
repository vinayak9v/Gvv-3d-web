'use client'

import { useRef, FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CLASS_OPTIONS = [
  'Nursery',
  'LKG',
  'UKG',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'XI Science',
  'XI Commerce',
  'XI Humanities',
]

const inputCls =
  'w-full rounded-xl border border-[#0a1233]/15 bg-white px-4 py-3 outline-none focus:border-[#1e2b75] transition-colors'

export default function EnquiryForm() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.enquiry-field', { y: 30, opacity: 0 })
      gsap.to('.enquiry-field', {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    },
    { scope: sectionRef },
  )

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // No backend wired yet — visual-only.
  }

  return (
    <section
      ref={sectionRef}
      id="enquiry"
      className="bg-white text-[#0a1233] py-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="enquiry-field text-3xl md:text-4xl font-extrabold text-center mb-3">
          Have Questions? We&apos;d Love to Help.
        </h2>
        <p className="enquiry-field text-center text-[#0a1233]/60 mb-12">
          Fill the form and our admissions team will reach out within 24 hours.
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Parent's Name *"
            required
            className={`enquiry-field ${inputCls}`}
          />

          <input
            type="tel"
            placeholder="Parent's Mobile Number *"
            required
            className={`enquiry-field ${inputCls}`}
          />

          <input
            type="email"
            placeholder="Email *"
            required
            className={`enquiry-field ${inputCls}`}
          />

          <input
            type="text"
            placeholder="Student's Name *"
            required
            className={`enquiry-field ${inputCls}`}
          />

          <select
            required
            defaultValue=""
            className={`enquiry-field ${inputCls} appearance-none bg-white`}
          >
            <option value="" disabled>
              Applying for Which Class? *
            </option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="How did you hear about us? (optional)"
            className={`enquiry-field ${inputCls}`}
          />

          <textarea
            rows={5}
            placeholder="Message"
            className={`enquiry-field ${inputCls} resize-none`}
          />

          <div className="enquiry-field text-center pt-2">
            <button
              type="submit"
              className="submit-btn inline-block bg-gradient-to-b from-[#fae27c] to-[#d6ad44] text-black px-10 py-3 rounded-full font-bold text-base"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
