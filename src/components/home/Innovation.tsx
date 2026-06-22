import YellowButton from './YellowButton'

const ITEMS = [
  {
    title: 'G-VYAS Humanoid Robot',
    desc: "MP's first humanoid robot assistant — built and trained in-house.",
  },
  {
    title: 'Robotics & AI Labs',
    desc: 'Hands-on lab spaces for circuits, microcontrollers, and machine-learning experiments.',
  },
  {
    title: 'Garima Innovation Club',
    desc: 'Student-led club tackling real-world problems through prototyping.',
  },
  {
    title: 'STEM Programs',
    desc: 'Integrated science, technology, engineering, and math tracks from middle school onward.',
  },
]

export default function Innovation() {
  return (
    <section className="bg-[#0a1233] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Innovation At Garima
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
          <ol className="space-y-6">
            {ITEMS.map((item, i) => (
              <li key={item.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#00d4ff]/40 bg-[#00d4ff]/10 text-sm font-bold text-[#00d4ff]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex h-[400px] items-center justify-center rounded-3xl border border-white/15 bg-white/[0.04] p-6 text-center backdrop-blur-sm">
            <div>
              <div className="text-sm tracking-[0.3em] text-white/40">ROBOT PREVIEW</div>
              <div className="mt-2 text-lg font-semibold text-white/80">
                Meet G-VYAS
              </div>
              <div className="text-sm text-white/60">
                MP's First Humanoid Robot Assistant
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <YellowButton href="#admission">Apply For Admission</YellowButton>
        </div>
      </div>
    </section>
  )
}
