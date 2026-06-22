'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  title: string
  href: string
  icon: ReactNode
}

export default function GateCard({ title, href, icon }: Props) {
  return (
    <Link
      href={href}
      className="gate-card relative block w-full aspect-[3/4] max-w-[320px] mx-auto rounded-[24px] overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #18256e 0%, #0c1542 100%)',
        border: '1px solid rgba(91, 192, 235, 0.2)',
      }}
    >
      {/* TITLE at top of card */}
      <div className="absolute top-5 left-0 right-0 text-center text-white font-bold text-xl tracking-wide">
        {title}
      </div>

      {/* GATE assembly */}
      <div
        className="absolute"
        style={{ top: '13%', bottom: '22%', left: '10%', right: '10%' }}
      >
        {/* Outer metal frame */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              'linear-gradient(180deg, #1c2776 0%, #0d1645 50%, #1c2776 100%)',
            boxShadow:
              'inset 0 0 28px rgba(0,0,0,0.55), 0 0 14px rgba(91,192,235,0.18)',
            border: '1px solid rgba(91,192,235,0.28)',
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-2 left-[14%] right-[14%] h-3 rounded-sm flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #2a3a8a, #0f1a4a)',
            border: '1px solid rgba(91,192,235,0.4)',
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.6)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#7dd3f7',
              boxShadow: '0 0 6px #5BC0EB',
            }}
          />
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-2 left-[14%] right-[14%] h-3 rounded-sm flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #0f1a4a, #2a3a8a)',
            border: '1px solid rgba(91,192,235,0.4)',
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.6)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#7dd3f7',
              boxShadow: '0 0 6px #5BC0EB',
            }}
          />
        </div>

        {/* Left neon tube light */}
        <div
          className="absolute"
          style={{ top: '12%', bottom: '12%', left: '7%', width: '6px' }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                'linear-gradient(180deg, #aee3fb 0%, #4aa1d5 50%, #aee3fb 100%)',
              boxShadow:
                '0 0 8px #5BC0EB, 0 0 16px rgba(91,192,235,0.65), 0 0 28px rgba(91,192,235,0.35)',
            }}
          />
        </div>

        {/* Right neon tube light */}
        <div
          className="absolute"
          style={{ top: '12%', bottom: '12%', right: '7%', width: '6px' }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                'linear-gradient(180deg, #aee3fb 0%, #4aa1d5 50%, #aee3fb 100%)',
              boxShadow:
                '0 0 8px #5BC0EB, 0 0 16px rgba(91,192,235,0.65), 0 0 28px rgba(91,192,235,0.35)',
            }}
          />
        </div>

        {/* Bolts at corners */}
        <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#7dd3f7]/70" />
        <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#7dd3f7]/70" />
        <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-[#7dd3f7]/70" />
        <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-[#7dd3f7]/70" />

        {/* Door area — sliding doors over the icon */}
        <div
          className="absolute overflow-hidden rounded-md"
          style={{
            top: '14%',
            bottom: '14%',
            left: '18%',
            right: '18%',
          }}
        >
          {/* back wall — what is revealed when the doors open */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                'radial-gradient(circle at center, rgba(91,192,235,0.4) 0%, #020618 75%)',
            }}
          >
            <div className="text-[#7dd3f7] drop-shadow-[0_0_20px_rgba(91,192,235,1)]">
              {icon}
            </div>
          </div>

          {/* Left door */}
          <div
            className="gate-door gate-door-left absolute top-0 bottom-0 left-0 w-1/2"
            aria-hidden
          />
          {/* Right door */}
          <div
            className="gate-door gate-door-right absolute top-0 bottom-0 right-0 w-1/2"
            aria-hidden
          />
        </div>
      </div>

      {/* Divider line above button */}
      <div
        className="absolute left-8 right-8 h-px"
        style={{
          bottom: '17%',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
        }}
      />

      {/* Discover button */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <span className="bg-[var(--brand-yellow)] text-[#0a1233] px-7 py-2 rounded-full font-semibold text-sm shadow-[0_4px_14px_rgba(245,200,66,0.35)]">
          Discover
        </span>
      </div>
    </Link>
  )
}
