import Link from 'next/link';
import PageShell from '@/components/landing/PageShell';
import type { InfoPageDef } from '@/lib/infoPages';

export default function InfoPage({ page }: { page: InfoPageDef }) {
  return (
    <PageShell>
      <section className="relative flex min-h-[70svh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent pointer-events-none z-0" />
        <div className="relative z-10 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#EED165]">{page.section}</p>
          <h1 className="mb-6 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-900 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
            {page.title}
          </h1>
          <p className="mx-auto text-lg leading-relaxed text-blue-200/70 md:text-xl">{page.intro}</p>
          <p className="mx-auto mt-4 text-base text-blue-200/50">
            Details will be published here soon. For any query, please{' '}
            <Link href="/contact" className="text-[#FACC15] underline underline-offset-4 hover:text-white">
              contact the school
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
