import YellowButton from './YellowButton'

export default function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0a1233] to-[#1e2b75] px-6 pt-32 pb-16 text-white">
      <h1 className="max-w-5xl text-center text-4xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        Shaping Thinkers,
        <br />
        Building Innovaters
      </h1>

      <div className="mt-10">
        <YellowButton href="#admission">Admission Now</YellowButton>
      </div>

      <div
        className="mt-auto flex w-full max-w-2xl flex-col items-center pt-20"
        aria-hidden
      >
        <svg viewBox="0 0 600 40" className="w-full text-white/40">
          <path
            d="M 0 30 Q 150 5, 300 20 T 600 30"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <div className="-mt-3 flex flex-col items-center gap-2">
          <div className="h-6 w-6 rounded-full border border-white/60 bg-white/10 shadow-[0_0_16px_rgba(0,212,255,0.4)] backdrop-blur-sm" />
          <div className="text-xs tracking-[0.3em] text-white/60">&lt; DRAG TO VIEW &gt;</div>
        </div>
      </div>

      <div className="absolute inset-x-8 bottom-8 h-[280px] rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm" style={{ display: 'none' }}>
        <div className="flex h-full items-center justify-center text-sm text-white/40">
          Hero illustration
        </div>
      </div>
    </section>
  )
}
