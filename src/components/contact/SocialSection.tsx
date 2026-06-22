'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const socials = [
  {
    Icon: FaFacebookF,
    label: 'Facebook',
    href: 'https://www.facebook.com/GarimaVidyaViharSchool/',
  },
  {
    Icon: FaTwitter,
    label: 'Twitter',
    href: 'https://twitter.com/GVVSchool',
  },
  {
    Icon: FaYoutube,
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCwYBpcOBXCtx7U-JHmwdeOg',
  },
  {
    Icon: FaInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/garima_vidyavihar/',
  },
]

export default function SocialSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('.social-icon', { opacity: 0, rotate: -30 })
      gsap.to('.social-icon', {
        opacity: 1,
        rotate: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.6)',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold">Follow Us</h2>
        <div className="mt-8 flex justify-center gap-5">
          {socials.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="social-icon w-12 h-12 rounded-full bg-[#0a1445] border border-blue-500/40 flex items-center justify-center text-white hover:text-[#EED165] hover:border-[#EED165]/70 hover:shadow-[0_0_22px_rgba(238,209,101,0.55)] transition-all duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
