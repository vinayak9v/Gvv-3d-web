import { getSiteImageUrl } from '@/lib/siteImages';
import AffiliationClient from './com/AffiliationClient';

export default async function Affiliation() {
  const [detailsImage, infrastructureImage, qualityImage] = await Promise.all([
    getSiteImageUrl('about_affiliation_details'),
    getSiteImageUrl('about_affiliation_infrastructure'),
    getSiteImageUrl('about_affiliation_quality'),
  ]);

  return (
    <AffiliationClient
      detailsImage={detailsImage}
      infrastructureImage={infrastructureImage}
      qualityImage={qualityImage}
    />
  );
}
