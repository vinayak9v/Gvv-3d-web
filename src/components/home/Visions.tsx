import YellowButton from './YellowButton'

const CARDS = [
  { title: 'Academic', href: '/academic' },
  { title: 'Robotics', href: '/robotics' },
  { title: 'Co-curricular', href: '/co-curricular' },
]

export default function Visions() {
  return (
    <section className="bg-gradient-to-b from-[#1e2b75] to-[#0a1233] px-6 py-24 text-white">
      <h2 className="text-center text-3xl font-bold uppercase tracking-[0.4em] sm:text-4xl">
        Our Visions
      </h2>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <div
            key={c.title}
            className="group flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition duration-300 hover:scale-[1.02] hover:border-[#00d4ff]/50 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]"
          >
            <h3 className="text-2xl font-semibold">{c.title}</h3>

            <div className="relative h-72 w-full overflow-hidden rounded-2xl border-2 border-[#00d4ff]/30 bg-gradient-to-b from-[#0a1233] to-[#020817] shadow-[inset_0_0_60px_rgba(0,212,255,0.15)] transition group-hover:border-[#00d4ff]/60 group-hover:shadow-[inset_0_0_80px_rgba(0,212,255,0.25)]">
              <div className="absolute inset-4 rounded-xl border border-[#00d4ff]/20" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xs tracking-[0.3em] text-white/30">
                GATE FRAME
              </div>
            </div>

            <YellowButton href={c.href}>Discover</YellowButton>
          </div>
        ))}
      </div>
    </section>
  )
}
