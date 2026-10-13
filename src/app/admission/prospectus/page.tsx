import type { Metadata } from 'next';
import InfoPage from '@/components/shared/InfoPage';
import { PROSPECTUS_PAGE } from '@/lib/infoPages';

export const metadata: Metadata = {
  title: `${PROSPECTUS_PAGE.title} | Garima Vidhya Vihar`,
  description: PROSPECTUS_PAGE.intro,
};

export default function Page() {
  return <InfoPage page={PROSPECTUS_PAGE} />;
}
