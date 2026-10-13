import type { Metadata } from 'next';
import InfoPage from '@/components/shared/InfoPage';
import { EDUCATORS_PAGE } from '@/lib/infoPages';

export const metadata: Metadata = {
  title: `${EDUCATORS_PAGE.title} | Garima Vidhya Vihar`,
  description: EDUCATORS_PAGE.intro,
};

export default function Page() {
  return <InfoPage page={EDUCATORS_PAGE} />;
}
