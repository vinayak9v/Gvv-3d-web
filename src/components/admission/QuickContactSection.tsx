'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const cards = [
  {
    Icon: Phone,
    title: 'Call',
    lines: [
      { text: '+91 7049494919', href: 'tel:+917049494919' },
      { text: '+91 9009600032', href: 'tel:+919009600032' },
    ],
  },
  {
    Icon: Mail,
    title: 'Email',
    lines: [
      {
        text: 'principal@garimaschool.com',
        href: 'mailto:principal@garimaschool.com',
      },
      { text: 'info@garimaschool.com', href: 'mailto:info@garimaschool.com' },
    ],
  },
  {
    Icon: MapPin,
    title: 'Visit',
    lines: [{ text: 'Paul Hill, Airport Road' }, { text: 'Shakti Nagar, Indore 452005' }],
  },
]

export default function QuickContactSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.qc-card', { y: 30, opacity: 0 })
      gsap.to('.qc-card', {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.7,
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
          Or Reach Us Directly
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ Icon, title, lines }) => (
            <div
              key={title}
              className="qc-card bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-6 hover:-translate-y-1 hover:border-blue-400/70 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: '#EED165', border: '1px solid #C79F32' }}
              >
                <Icon className="text-black" size={22} />
              </div>
              <h3 className="mt-5 text-white text-xl font-semibold">{title}</h3>
              <ul className="mt-4 space-y-2">
                {lines.map((line, i) => (
                  <li
                    key={i}
                    className="text-blue-100 text-sm leading-relaxed"
                  >
                    {'href' in line && line.href ? (
                      <a
                        href={line.href}
                        className="hover:text-[#EED165] transition-colors"
                      >
                        {line.text}
                      </a>
                    ) : (
                      line.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
