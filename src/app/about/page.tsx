import PageShell from '@/components/landing/PageShell'
import HeroSection from '@/components/about/HeroSection'
import EstablishmentSection from '@/components/about/EstablishmentSection'
import LeadershipSection from '@/components/about/LeadershipSection'
import MissionVisionSection from '@/components/about/MissionVisionSection'
import CBSESection from '@/components/about/CBSESection'
import StagesSection from '@/components/about/StagesSection'
import AchievementsSection from '@/components/about/AchievementsSection'
import CTASection from '@/components/about/CTASection'
import ScrollRefresh from '@/components/shared/ScrollRefresh'

export default function AboutPage() {
  return (
    <PageShell>
      <ScrollRefresh />
      <HeroSection />
      <EstablishmentSection />
      <LeadershipSection />
      <MissionVisionSection />
      <CBSESection />
      <StagesSection />
      <AchievementsSection />
      <CTASection />
    </PageShell>
  )
}
