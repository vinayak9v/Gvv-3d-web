import PageShell from '@/components/landing/PageShell'
import ScrollRefresh from '@/components/shared/ScrollRefresh'
import HeroSection from '@/components/contact/HeroSection'
import ContactMethodsSection from '@/components/contact/ContactMethodsSection'
import AddressSection from '@/components/contact/AddressSection'
import MapSection from '@/components/contact/MapSection'
import FormSection from '@/components/contact/FormSection'
import SocialSection from '@/components/contact/SocialSection'

export default function ContactPage() {
  return (
    <PageShell>
      <ScrollRefresh />
      <HeroSection />
      <ContactMethodsSection />
      <AddressSection />
      <MapSection />
      <FormSection />
      <SocialSection />
    </PageShell>
  )
}
