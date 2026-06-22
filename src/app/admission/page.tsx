import PageShell from '@/components/landing/PageShell'
import ScrollRefresh from '@/components/shared/ScrollRefresh'
import HeroSection from '@/components/admission/HeroSection'
import WhoCanApplySection from '@/components/admission/WhoCanApplySection'
import ProcessSection from '@/components/admission/ProcessSection'
import StagesSection from '@/components/admission/StagesSection'
import FeeStructureSection from '@/components/admission/FeeStructureSection'
import DocumentsSection from '@/components/admission/DocumentsSection'
import UniformSection from '@/components/admission/UniformSection'
import EnquiryForm from '@/components/landing/EnquiryForm'
import QuickContactSection from '@/components/admission/QuickContactSection'
import AdmissionForm from '../process/com/AdmissionForm'

export default function AdmissionPage() {
  return (
    <PageShell>
      <ScrollRefresh />
      <HeroSection />
      <WhoCanApplySection />
      <ProcessSection />
      <StagesSection />
      <FeeStructureSection />
      <DocumentsSection />
      <UniformSection />
      {/* <EnquiryForm />  */}
      <AdmissionForm/>
      <QuickContactSection />
    </PageShell>
  )
}
