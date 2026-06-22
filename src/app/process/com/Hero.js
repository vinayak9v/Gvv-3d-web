import Image from "next/image";

export default function Hero() {
  return (
    <>
      {/* Inline styles for custom animations */}
      <style>{`
        @keyframes fadeSlideRight {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-fade-slide-right { animation: fadeSlideRight 0.8s ease-out forwards; }
        .animate-fade-slide-up { animation: fadeSlideUp 0.8s ease-out forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-glow { animation: glowPulse 3s ease-in-out infinite; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      <section className="relative min-h-screen w-full overflow-hidden bg-[#020B3D] flex items-center">
        
        {/* Right Side Image (Background Layer) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[75%] z-0 h-full">
          {/* Mobile Dark Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020B3D] via-[#020B3D]/90 to-transparent lg:hidden z-10" />
          
          <Image
            src="/scc.png"
            alt="Students at Garima Vidhya Vihar"
            fill
            priority
            className="object-cover object-center lg:object-right"
          />
        </div>

        {/* ========================================= */}
        {/* DESKTOP SVG OVERLAY (The Curved Design) */}
        {/* ========================================= */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            <defs>
              <filter id="heavyGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="lightGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* 1. Main Dark Blue Angled/Curved Background */}
            <path 
              d="M0,0 L850,0 Q1050,450 700,900 L0,900 Z" 
              fill="#020B3D" 
            />

            {/* 2. Main Glowing Boundary Line */}
            <path 
              d="M850,0 Q1050,450 700,900" 
              fill="none" 
              stroke="url(#edgeGradient)" 
              strokeWidth="5" 
              filter="url(#heavyGlow)" 
              className="animate-glow"
            />

            {/* 3. Top-Left "60-Degree" Accent Sweep (Outer) */}
            <path 
              d="M0,450 C300,350 550,150 750,0" 
              fill="none" 
              stroke="#1D4ED8" 
              strokeWidth="12" 
              filter="url(#heavyGlow)" 
              opacity="0.3" 
            />

            {/* 4. Top-Left "60-Degree" Accent Sweep (Inner crisp line) */}
            <path 
              d="M0,350 C200,300 400,100 550,0" 
              fill="none" 
              stroke="#60A5FA" 
              strokeWidth="2" 
              filter="url(#lightGlow)" 
              opacity="0.6" 
            />
          </svg>
        </div>

        {/* Floating Top Right Badge */}
        <div className="absolute top-8 right-8 xl:top-12 xl:right-12 z-30 hidden lg:flex flex-col items-center gap-1 bg-[#020B3D]/95 backdrop-blur-md border border-blue-500/40 px-8 py-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-float">
          <svg className="w-10 h-10 text-[#E9C84A] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7" />
          </svg>
          <div className="text-white text-[11px] font-extrabold leading-tight text-center tracking-wider">
            SHAPING THINKERS<br />BUILDING INNOVATORS
          </div>
        </div>

        {/* Main Content Container */}
        <div className="container relative z-20 mx-auto px-6 lg:px-12 py-20 flex flex-col justify-center min-h-screen">
          <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
            
            {/* Heading */}
            <h1 className="font-extrabold leading-tight tracking-tight animate-fade-slide-right">
              <span className="block text-white text-5xl sm:text-6xl lg:text-7xl drop-shadow-md">
                ADMISSION PROCESS
              </span>
              <span className="block text-[#E9C84A] text-5xl sm:text-6xl lg:text-7xl mt-1 drop-shadow-md">
                2026-27
              </span>
            </h1>

            {/* Glowing Tagline Box */}
            <div className="mt-8 inline-block opacity-0 animate-fade-slide-right delay-100">
              <div className="px-6 py-3 border border-blue-400/60 rounded-lg bg-[#020B3D]/50 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                  Begin Your Child's Journey Towards Excellence
                </span>
              </div>
            </div>

            {/* Subheading */}
            <h2 className="mt-8 text-[#E9C84A] text-2xl lg:text-3xl font-bold opacity-0 animate-fade-slide-up delay-200">
              Admissions Open for Nursery to Class XII
            </h2>

            {/* Paragraph */}
            <p className="mt-5 text-gray-300 text-lg leading-relaxed max-w-xl opacity-0 animate-fade-slide-up delay-200">
              Join Garima Vidhya Vihar Sr. Secondary School and provide
              your child with a world-class education, advanced robotics
              learning, modern infrastructure, experienced faculty, and
              holistic development opportunities.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 mt-10 opacity-0 animate-fade-slide-up delay-300">
            

            </div>

          </div>
        </div>
      </section>
    </>
  );
}