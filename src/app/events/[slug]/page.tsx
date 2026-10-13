import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InfoPage from '@/components/shared/InfoPage';
import { EVENT_PAGES } from '@/lib/infoPages';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(EVENT_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = EVENT_PAGES[(await params).slug];
  return page ? { title: `${page.title} | Garima Vidhya Vihar`, description: page.intro } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = EVENT_PAGES[(await params).slug];
  if (!page) notFound();
  return <InfoPage page={page} />;
}
