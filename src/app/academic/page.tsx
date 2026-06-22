'use client'
import dynamic from 'next/dynamic'
import PageShell from '@/components/landing/PageShell'
import ScrollRefresh from '@/components/shared/ScrollRefresh'

const AcademicScene = dynamic(
  () => import('@/components/scene/AcademicScene'),
  { ssr: false }
)

export default function AcademicPage() {
  return (
    <PageShell>
      <ScrollRefresh />
      <AcademicScene />
    </PageShell>
  )
}
