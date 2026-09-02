import { getSiteImageUrl } from '@/lib/siteImages';
import ManagementClient from './com/ManagementClient';

export default async function Management() {
  const [presidentImage, directorSantoshImage, directorRamaImage, principalImage] = await Promise.all([
    getSiteImageUrl('about_management_president'),
    getSiteImageUrl('about_management_director_santosh'),
    getSiteImageUrl('about_management_director_rama'),
    getSiteImageUrl('about_management_principal'),
  ]);

  return (
    <ManagementClient
      presidentImage={presidentImage}
      directorSantoshImage={directorSantoshImage}
      directorRamaImage={directorRamaImage}
      principalImage={principalImage}
    />
  );
}
