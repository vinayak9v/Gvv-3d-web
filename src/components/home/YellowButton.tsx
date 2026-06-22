import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  type?: 'button' | 'submit'
  className?: string
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#F5C842] px-6 py-2.5 text-sm font-semibold text-[#1a1a1a] shadow-[0_4px_20px_rgba(245,200,66,0.35)] transition hover:scale-[1.03] hover:bg-[#ffd454] active:scale-100'

export default function YellowButton({ children, href, type = 'button', className = '' }: Props) {
  if (href) {
    return (
      <Link href={href} className={`${BASE} ${className}`}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={`${BASE} ${className}`}>
      {children}
    </button>
  )
}
