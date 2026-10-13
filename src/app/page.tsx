import Hero from '@/components/landing/Hero'
import GarimaImpact from '@/components/landing/GarimaImpact'
import KnowledgePartners from '@/components/landing/KnowledgePartners'
import HomeGallery, { type GalleryItem } from '@/components/landing/HomeGallery'
import Madok from '@/components/landing/Madok'
import Footer from '@/components/landing/Footer'
import ScrollRefresh from '@/components/shared/ScrollRefresh'
import pool from '@/lib/db'
import { getSiteImageUrl } from '@/lib/siteImages'

async function getLatestGallery(): Promise<GalleryItem[]> {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, image_url FROM gallery ORDER BY id DESC LIMIT 8'
    )
    return Array.isArray(rows) ? (rows as GalleryItem[]) : []
  } catch {
    return []
  }
}

export default async function Home() {
  const [lifePhotos, partnerLogos, gallery] = await Promise.all([
    Promise.all([1, 2, 3, 4].map((i) => getSiteImageUrl(`home_life_${i}`))),
    Promise.all([1, 2, 3, 4, 5, 6, 7, 8].map((i) => getSiteImageUrl(`home_partner_${i}`))),
    getLatestGallery(),
  ])

  return (
    <main
      className="min-h-screen overflow-hidden font-sans bg-[#060d24]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 0% 30%, rgba(65,25,220,0.4) 0%, transparent 55%),
          radial-gradient(circle at 100% 10%, rgba(0,170,255,0.25) 0%, transparent 45%),
          linear-gradient(to bottom, #0a122e, #030510)
        `,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-9xl mx-auto relative z-10">
        <ScrollRefresh />

        <Hero />
        <GarimaImpact lifePhotos={lifePhotos.filter(Boolean)} />
        <KnowledgePartners logos={partnerLogos.filter(Boolean)} />
        <HomeGallery items={gallery} />
        <Madok />
        <Footer />
      </div>
    </main>
  )
}
