import Link from 'next/link'
import YellowButton from './YellowButton'

const NAV = [
  { label: 'Admission', href: '#admission' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'About Us', href: '#about' },
]

function Caret() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-70">
      <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1200px,calc(100%-2rem))]">
      <div className="flex items-center justify-between gap-6 rounded-full border border-white/30 bg-white/80 px-4 py-2.5 shadow-[0_8px_32px_rgba(10,18,51,0.18)] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1e2b75] to-[#0a1233] ring-2 ring-white/60" />
          <div className="leading-tight">
            <div className="text-sm font-bold text-[#0a1233]">Garima Vidhya Vihar</div>
            <div className="text-[10px] tracking-[0.18em] text-[#1e2b75]/70">SR. SECONDARY SCHOOL</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <button
              key={n.label}
              className="flex items-center gap-1.5 text-sm font-medium text-[#0a1233] transition hover:text-[#1e2b75]"
            >
              {n.label}
              <Caret />
            </button>
          ))}
        </nav>

        <YellowButton href="#contact">Contact Us</YellowButton>
      </div>
    </header>
  )
}
