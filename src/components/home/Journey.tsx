const MILESTONES = [
  { year: '1986', event: 'Garima Vidhya Vihar founded in Indore.' },
  { year: '1998', event: 'Senior secondary wing established under CBSE.' },
  { year: '2010', event: 'First robotics lab opens for middle and high school.' },
  { year: '2020', event: 'Garima Innovation Club launches; STEM curriculum overhauled.' },
  { year: '2024', event: "G-VYAS unveiled — MP's first humanoid robot assistant." },
]

export default function Journey() {
  return (
    <section className="bg-[#0a1233] px-6 py-24 text-white">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">Our Journey</h2>

      <div className="mx-auto mt-14 max-w-6xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {MILESTONES.map((m) => (
            <div
              key={m.year}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e2b75]/40 to-[#0a1233]/40 p-5 backdrop-blur-sm"
            >
              <div className="text-2xl font-extrabold text-[#00d4ff]">{m.year}</div>
              <p className="mt-3 text-sm text-white/70">{m.event}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full bg-gradient-to-r from-[#00d4ff] via-[#5ce1ff] to-[#00d4ff]" />
        </div>
      </div>
    </section>
  )
}
