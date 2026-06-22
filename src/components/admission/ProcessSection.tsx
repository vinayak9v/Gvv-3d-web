'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  {
    n: 1,
    title: 'Initial Enquiry',
    body:
      'Reach out via phone, email, or the enquiry form. Our admissions team will share school information and answer your questions.',
  },
  {
    n: 2,
    title: 'Application Submission',
    body:
      'Complete the online application form with student details and required documents. Schedule your campus visit.',
  },
  {
    n: 3,
    title: 'Campus Visit & Interaction',
    body:
      'Tour the campus, meet our facilitators, and have a brief interaction with the principal. Student and parents are both welcome.',
  },
  {
    n: 4,
    title: 'Welcome to Garima',
    body:
      'Upon confirmation, complete the enrollment formalities and receive your welcome kit. Begin your child’s learning journey with us.',
  },
]

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const st = { trigger: ref.current, start: 'top 80%' }

      gsap.set('.process-card', { y: 40, opacity: 0 })
      gsap.to('.process-card', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: st,
      })

      // Count-up for each step number (01 → 04)
      document.querySelectorAll<HTMLElement>('.process-num').forEach((el, i) => {
        const target = i + 1
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 0.8,
          ease: 'power1.out',
          delay: 0.3 + i * 0.2,
          onUpdate: () => {
            el.textContent = String(Math.floor(obj.val)).padStart(2, '0')
          },
          onComplete: () => {
            el.textContent = String(target).padStart(2, '0')
          },
          scrollTrigger: st,
        })
      })

      // Connecting lines draw in (stroke-dashoffset 100 → 0)
      gsap.set('.process-line path', { strokeDashoffset: 100 })
      gsap.to('.process-line path', {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
        stagger: 0.2,
        delay: 0.4,
        scrollTrigger: st,
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Your Journey Starts Here
        </h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 lg:gap-3 items-stretch">
          {steps.map((step, i) => (
            <div key={step.n} className="contents">
              <div className="process-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-1 hover:border-blue-400/70 transition-all duration-300">
                <div className="bg-gradient-to-b from-[#fae27c] to-[#d6ad44] w-16 h-16 rounded-full flex items-center justify-center text-blue-950 font-extrabold text-2xl shadow-[0_0_20px_rgba(238,209,101,0.4)]">
                  <span className="process-num">00</span>
                </div>
                <h3 className="mt-5 text-white text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-blue-100 text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="process-line hidden lg:flex items-center justify-center w-12">
                  <svg
                    viewBox="0 0 100 4"
                    preserveAspectRatio="none"
                    className="w-full h-1"
                  >
                    <path
                      d="M0 2 L100 2"
                      stroke="#5BC0EB"
                      strokeOpacity="0.55"
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
