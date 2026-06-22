'use client'

import Link from 'next/link'

const navLinks = [
  { label: 'Admission', href: '#' },
  { label: 'Curriculum', href: '#' },
  { label: 'About Us', href: '#' },
]

function CrestLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 flex-shrink-0" aria-hidden>
      <defs>
        <radialGradient id="crest-bg" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#1f2f80" />
          <stop offset="100%" stopColor="#0a1233" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="28" r="22" fill="url(#crest-bg)" stroke="#F5C842" strokeWidth="1.5" />
      {/* simplified torch / book emblem */}
      <path d="M22 20 L32 14 L42 20 L32 26 Z" fill="#F5C842" />
      <path d="M22 20 L22 30 Q32 36 42 30 L42 20" fill="none" stroke="#F5C842" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="42" y1="20" x2="42" y2="30" stroke="#F5C842" strokeWidth="1" />
      {/* ribbon */}
      <path d="M12 46 L20 42 L44 42 L52 46 L44 52 L20 52 Z" fill="#1a3a8a" stroke="#F5C842" strokeWidth="0.6" />
      <text x="32" y="48.5" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.5">INDORE</text>
    </svg>
  )
}

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-1.5 opacity-80" aria-hidden>
      <path d="M2.5 3.5 L5 6 L7.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <span className="inline-flex w-5 h-5 bg-[#0a1233] rounded items-center justify-center ml-1">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
        <path d="M2 3 L5 6 L8 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 pt-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center justify-between rounded-full pl-3 pr-2 py-2 border border-white/15 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          style={{
            background:
              'linear-gradient(90deg, rgba(15,26,80,0.92) 0%, rgba(28,58,140,0.85) 60%, rgba(58,120,180,0.75) 100%)',
          }}
        >
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <CrestLogo />
            <div className="leading-tight hidden sm:block">
              <div className="text-white font-bold text-sm tracking-wide whitespace-nowrap">
                GARIMA VIDHYA VIHAR
              </div>
              <div className="text-white/70 text-[10px] tracking-[0.2em] whitespace-nowrap">
                SR. SECONDARY SCHOOL
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex gap-7 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-white/90 hover:text-white text-sm font-medium flex items-center transition-colors"
              >
                {l.label}
                <Chevron />
              </Link>
            ))}
          </nav>

          <Link
            href="#contact"
            className="bg-[var(--brand-yellow)] text-[#0a1233] pl-5 pr-2 py-2 rounded-full text-sm font-semibold flex items-center hover:bg-[var(--brand-yellow-hot)] transition-colors"
          >
            Contact Us
            <ContactIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}
