const STATS = [
  { icon: '🏫', value: '38+', label: 'YEARS LEGACY' },
  { icon: '🎓', value: '5000+', label: 'STUDENTS' },
  { icon: '🤝', value: '25000+', label: 'ALUMNI' },
  { icon: '🤖', value: '1st', label: "MP'S FIRST HUMANOID ROBOT" },
  { icon: '🔬', value: '★', label: 'ADVANCED ROBOTICS LABS' },
]

export default function Stats() {
  return (
    <section className="bg-white px-6 py-20">
      <h2 className="text-center text-3xl font-bold text-[#0a1233] sm:text-4xl">
        Garima Impact
      </h2>
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2 text-center">
            <div className="text-4xl">{s.icon}</div>
            <div className="text-3xl font-extrabold text-[#1e2b75]">{s.value}</div>
            <div className="text-[11px] font-semibold tracking-[0.18em] text-[#0a1233]/70">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
