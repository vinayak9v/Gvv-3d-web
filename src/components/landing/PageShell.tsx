import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col overflow-x-clip font-sans bg-[#060d24]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 0% 30%, rgba(65,25,220,0.4) 0%, transparent 55%),
          radial-gradient(circle at 100% 10%, rgba(0,170,255,0.25) 0%, transparent 45%),
          linear-gradient(to bottom, #0a122e, #030510)
        `,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-9xl mx-auto relative z-10 w-full flex flex-col flex-1">
        <Navbar />
        <main className="min-h-screen pt-32 flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
