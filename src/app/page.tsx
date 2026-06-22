import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import VisionCards from '@/components/landing/VisionCards'
import GarimaImpact from '@/components/landing/GarimaImpact'
import Madok from '@/components/landing/Madok'
import Footer from '@/components/landing/Footer'
import ScrollRefresh from '@/components/shared/ScrollRefresh'

export default function Home() {
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
        <VisionCards />
        <GarimaImpact />
        <Madok />
        <Footer />
      </div>
    </main>
  )
}
