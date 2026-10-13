import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InfoPage from '@/components/shared/InfoPage';
import { ACADEMIC_PAGES } from '@/lib/infoPages';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ACADEMIC_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = ACADEMIC_PAGES[(await params).slug];
  return page ? { title: `${page.title} | Garima Vidhya Vihar`, description: page.intro } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = ACADEMIC_PAGES[(await params).slug];
  if (!page) notFound();
  return <InfoPage page={page} />;
}
