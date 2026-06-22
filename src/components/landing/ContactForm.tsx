'use client'

import { useRef, FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.contact-field', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    },
    { scope: sectionRef }
  )

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // No backend wired yet — visual-only.
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-white text-[#0a1233] py-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="contact-field text-3xl md:text-4xl font-extrabold text-center mb-3">
          Get In Touch
        </h2>
        <p className="contact-field text-center text-[#0a1233]/60 mb-12">
          Questions about admissions, curriculum, or visits? Drop us a line.
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="contact-field grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full rounded-xl border border-[#0a1233]/15 bg-white px-4 py-3 outline-none focus:border-[#1e2b75] transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full rounded-xl border border-[#0a1233]/15 bg-white px-4 py-3 outline-none focus:border-[#1e2b75] transition-colors"
            />
          </div>

          <input
            type="tel"
            placeholder="Phone Number"
            className="contact-field w-full rounded-xl border border-[#0a1233]/15 bg-white px-4 py-3 outline-none focus:border-[#1e2b75] transition-colors"
          />

          <textarea
            rows={5}
            placeholder="Your Message"
            required
            className="contact-field w-full rounded-xl border border-[#0a1233]/15 bg-white px-4 py-3 outline-none focus:border-[#1e2b75] transition-colors resize-none"
          />

          <div className="contact-field text-center pt-2">
            <button
              type="submit"
              className="submit-btn inline-block bg-[var(--brand-yellow)] text-[#0a1233] px-10 py-3 rounded-full font-bold text-base"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
