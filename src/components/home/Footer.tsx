import Link from 'next/link'

const OUT_LINKS = ['Home', 'Course', 'About', 'Contact']
const OFFERINGS = ['Math', 'Science']
const TOUCH = ['+91 00000 00000', 'hello@garimavv.in', 'Writing']

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold tracking-[0.2em] text-white">{title}</h4>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i}>
            <Link href="#" className="text-sm text-white/60 transition hover:text-white">
              {i}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0a1233] px-6 pt-20 pb-8 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1e2b75] to-[#00d4ff] ring-2 ring-white/20" />
            <div className="text-base font-bold">Garima Vidhya Vihar</div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            A CBSE senior-secondary school in Indore — shaping confident learners
            through experiential and competency-based education since 1986.
          </p>
        </div>
        <Column title="OUT LINKS" items={OUT_LINKS} />
        <Column title="WHAT WE OFFER" items={OFFERINGS} />
        <Column title="GET IN TOUCH" items={TOUCH} />
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Garima Vidhya Vihar. All rights reserved.
      </div>
    </footer>
  )
}
