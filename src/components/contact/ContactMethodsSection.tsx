'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const methods = [
  {
    Icon: Phone,
    title: 'Call Us',
    lines: ['+91 7049494919', '+91 9009600032', '0731-2635000'],
  },
  {
    Icon: Mail,
    title: 'Email Us',
    lines: [
      { text: 'info@garimaschool.com', tag: 'general' },
      { text: 'principal@garimaschool.com', tag: "principal's office" },
      { text: 'redressal@garimaschool.com', tag: 'grievances' },
    ],
  },
  {
    Icon: MapPin,
    title: 'Visit Us',
    lines: ['Mon–Sat: 8:00 AM – 3:00 PM', 'Closed on Sundays & public holidays'],
  },
]

export default function ContactMethodsSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.method-card', { y: 40, opacity: 0 })
      gsap.to('.method-card', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.4)',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {methods.map(({ Icon, title, lines }) => (
          <div
            key={title}
            className="method-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 hover:-translate-y-1 hover:border-blue-400/70 transition-all duration-300"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: '#EED165', border: '1px solid #C79F32' }}
            >
              <Icon className="text-black" size={22} />
            </div>
            <h3 className="mt-5 text-white text-xl font-semibold">{title}</h3>
            <ul className="mt-4 space-y-2">
              {lines.map((line, i) => {
                if (typeof line === 'string') {
                  return (
                    <li key={i} className="text-blue-100 text-sm leading-relaxed">
                      {line}
                    </li>
                  )
                }
                return (
                  <li key={i} className="text-blue-100 text-sm leading-relaxed">
                    <span className="text-white">{line.text}</span>
                    <span className="text-blue-300/80"> — {line.tag}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
