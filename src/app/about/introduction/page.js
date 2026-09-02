import { getSiteImageUrl } from '@/lib/siteImages';
import IntroductionClient from './com/IntroductionClient';

export default async function Introduction() {
  const [learningJourneyImage, establishmentImage, cbseQualityImage] = await Promise.all([
    getSiteImageUrl('about_intro_learning_journey'),
    getSiteImageUrl('about_intro_establishment'),
    getSiteImageUrl('about_intro_cbse_quality'),
  ]);

  return (
    <IntroductionClient
      learningJourneyImage={learningJourneyImage}
      establishmentImage={establishmentImage}
      cbseQualityImage={cbseQualityImage}
    />
  );
}
