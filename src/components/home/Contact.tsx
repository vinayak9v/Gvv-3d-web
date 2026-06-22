import YellowButton from './YellowButton'

function Field({
  label,
  type = 'text',
  textarea,
}: {
  label: string
  type?: string
  textarea?: boolean
}) {
  const base =
    'w-full rounded-lg border border-[#0a1233]/15 bg-white px-3 py-2.5 text-sm text-[#0a1233] outline-none transition focus:border-[#1e2b75] focus:ring-2 focus:ring-[#1e2b75]/15'
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-[#0a1233]/70">
        {label}
      </span>
      {textarea ? (
        <textarea rows={5} className={base} />
      ) : (
        <input type={type} className={base} />
      )}
    </label>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <form className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" />
            <Field label="Last name" />
          </div>
          <Field label="Email" type="email" />
          <Field label="Subject" />
          <Field label="Your message" textarea />
          <div>
            <YellowButton type="submit">Submit</YellowButton>
          </div>
        </form>

        <div>
          <h2 className="text-3xl font-bold text-[#0a1233] sm:text-4xl">Contact Us</h2>
          <p className="mt-5 text-base leading-relaxed text-[#0a1233]/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#0a1233]/70">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </section>
  )
}
