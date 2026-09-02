import PageShell from '@/components/landing/PageShell';
import { getSiteImageUrl } from '@/lib/siteImages';
import RoboticsPageClient from './com/RoboticsPageClient';

export default async function RoboticsPage() {
  const [aboutImage, project1, project2, project3, project4] = await Promise.all([
    getSiteImageUrl('robotics_about'),
    getSiteImageUrl('robotics_project_1'),
    getSiteImageUrl('robotics_project_2'),
    getSiteImageUrl('robotics_project_3'),
    getSiteImageUrl('robotics_project_4'),
  ]);

  return (
    <PageShell>
      <RoboticsPageClient
        aboutImage={aboutImage}
        projectImages={[project1, project2, project3, project4]}
      />
    </PageShell>
  );
}
