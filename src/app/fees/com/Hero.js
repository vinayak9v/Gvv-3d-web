import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>

      <section className="relative w-full bg-white flex flex-col">
        
        {/* ========================================= */}
        {/* HERO SECTION CONTAINER                    */}
        {/* ========================================= */}
        <div className="relative w-full min-h-[600px] lg:min-h-[650px] flex items-center overflow-hidden bg-[#020B3D]">
          
          {/* Right Side Background Image */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] z-0 h-full">
            {/* Mobile Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020B3D] via-[#020B3D]/95 to-transparent lg:hidden z-10" />
            <Image
              src="/io - Copy.png" // Replace with your actual student/school background image
              alt="Student at Garima Vidhya Vihar"
              fill
              priority
              className="object-cover object-center lg:object-right"
            />
          </div>

          {/* ========================================= */}
          {/* DESKTOP CURVED SPLIT & NETWORK EFFECT     */}
          {/* ========================================= */}
          <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
            
            {/* 1. Main Blue Shape */}
            <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
              <path 
                d="M0,0 L850,0 Q1000,450 750,900 L0,900 Z" 
                fill="#020B3D" 
              />
              {/* Subtle blue edge glow */}
              <path 
                d="M850,0 Q1000,450 750,900" 
                fill="none" 
                stroke="#1E3A8A" 
                strokeWidth="8" 
                filter="blur(4px)"
              />
            </svg>

            {/* 2. Abstract Network Constellation Effect */}
            <div className="absolute inset-0 w-[55%] h-full overflow-hidden">
              <div className="absolute top-[20%] right-[10%] w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60A5FA] animate-pulse-glow" />
              <div className="absolute top-[40%] right-[20%] w-3 h-3 bg-blue-300 rounded-full shadow-[0_0_15px_#93C5FD] animate-pulse-glow delay-1000" />
              <div className="absolute top-[60%] right-[5%] w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3B82F6] animate-pulse-glow delay-2000" />
              <div className="absolute top-[80%] right-[25%] w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#60A5FA] animate-pulse-glow" />
              
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" stroke="#60A5FA" strokeWidth="1">
                <line x1="90%" y1="20%" x2="80%" y2="40%" />
                <line x1="80%" y1="40%" x2="95%" y2="60%" />
                <line x1="80%" y1="40%" x2="75%" y2="80%" />
              </svg>
            </div>
          </div>

          {/* ========================================= */}
          {/* MAIN CONTENT                              */}
          {/* ========================================= */}
          <div className="container relative z-20 mx-auto px-6 lg:px-12 py-20 pb-32">
            <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
              
              {/* Title */}
              <h1 className="font-extrabold leading-tight tracking-tight">
                <span className="block text-white text-5xl sm:text-6xl drop-shadow-md">
                  FEES STRUCTURE
                </span>
                <span className="block text-[#E9C84A] text-5xl sm:text-6xl mt-1 drop-shadow-md">
                  2026-27
                </span>
              </h1>

              {/* Tagline & Gold Line */}
              <div className="mt-6 mb-8">
                <h2 className="text-white text-xl sm:text-2xl font-semibold tracking-wide">
                  Affordable Quality Education For Every Student
                </h2>
                <div className="h-[2px] w-full max-w-sm bg-gradient-to-r from-[#E9C84A] to-transparent mt-3"></div>
              </div>

              {/* Paragraph */}
              <p className="text-gray-200 text-[17px] leading-relaxed max-w-lg mb-10">
                At Garima Vidhya Vihar, we believe in providing world-class education with the perfect blend of academics, innovation and holistic development.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-[#E9C84A]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base leading-tight">
                    Quality<br />Education
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-[#E9C84A]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base leading-tight">
                    Experienced<br />Faculty
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 text-[#E9C84A]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base leading-tight">
                    Holistic<br />Development
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* BOTTOM SWEEPING WAVE (White & Gold)       */}
          {/* ========================================= */}
          <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
            <svg 
              viewBox="0 0 1440 120" 
              preserveAspectRatio="none" 
              className="w-full h-[50px] sm:h-[80px] lg:h-[120px] block"
            >
              {/* White Fill */}
              <path 
                fill="#ffffff" 
                d="M0,120 L1440,120 L1440,40 C1000,-40 400,80 0,80 Z" 
              />
              {/* Gold Stroke/Border on top of the wave */}
              <path 
                fill="none" 
                stroke="#E9C84A" 
                strokeWidth="5" 
                d="M0,80 C400,80 1000,-40 1440,40" 
              />
            </svg>
          </div>
        </div>

        {/* ========================================= */}
        {/* WHITE BOTTOM BAR WITH CHART TITLE         */}
        {/* ========================================= */}
        <div className="bg-white w-full py-8 sm:py-10 flex flex-col items-center justify-center relative z-20">
          <h2 className="text-[#020B3D] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide text-center px-4">
            TUITION FEE CHART FOR SESSION <span className="text-[#020B3D]">2026-27</span>
          </h2>
          
          {/* Decorative Diamond Ornament */}
          <div className="flex items-center gap-3 mt-4">
            <div className="w-12 h-[2px] bg-gray-200"></div>
            <div className="w-2.5 h-2.5 rotate-45 bg-[#E9C84A] shadow-sm"></div>
            <div className="w-12 h-[2px] bg-gray-200"></div>
          </div>
        </div>

      </section>
    </>
  );
}