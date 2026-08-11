'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function EstablishmentLegacy() {
  const containerRef = useRef(null);

  const legacyItems = [
    {
      title: "School History",
      description: "Discover the roots of our institution, our foundational philosophy, and the core values that have guided us since our inception.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      title: "20+ Years of Excellence",
      description: "Celebrating over two decades of academic brilliance, holistic development, and unwavering commitment to student success.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.114-1.059.777l-4.69-2.997a.563.563 0 00-.536 0l-4.69 2.997c-.528.337-1.207-.156-1.059-.777l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.95.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    {
      title: "Founder Details",
      description: "Learn about the visionaries whose dedication, foresight, and passion laid the strong foundation of our beloved school.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      title: "Major Milestones",
      description: "A look back at our proudest achievements, national awards, and the educational benchmarks we have set over the years.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      title: "Timeline of Growth",
      description: "Trace our remarkable journey of expansion, from humble beginnings to becoming a premier educational institution.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Starts animating when the top of the section hits 80% down the viewport
        toggleActions: "play none none reverse",
      }
    });

    // Animate Header Texts
    tl.fromTo(
      ".legacy-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    )
    // Animate the Featured Card
    .fromTo(
      ".legacy-featured-card",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
      "-=0.2"
    )
    // Animate Grid Items (staggered effect)
    .fromTo(
      ".legacy-grid-item",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  return (
    <div>
      <Navbar/>
     <section
  ref={containerRef}
  className="py-20 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden"
  style={{
    background: `radial-gradient(circle at 0% 30%, rgba(65,25,220,0.4) 0%, transparent 55%),
                 radial-gradient(circle at 100% 10%, rgba(0,170,255,0.25) 0%, transparent 45%),
                 linear-gradient(to bottom, #0a122e, #030510)`
  }}
>

      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00c6ff] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h4 className="legacy-header-elem text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Our Heritage
          </h4>
          <h2 className="legacy-header-elem text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Establishment & Legacy
          </h2>
          <div className="legacy-header-elem w-24 h-[4px] bg-[#E9C84A] mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(233,200,74,0.3)]"></div>
        </div>

        {/* Featured Co-Founder Card */}
        <div className="legacy-featured-card mb-12 relative overflow-hidden bg-gradient-to-br from-white/10 to-transparent rounded-3xl p-[1px]">
          {/* Inner Card Background with Glassmorphism */}
          <div className="relative bg-[#0A1128]/80 backdrop-blur-xl rounded-[23px] px-8 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 rounded-[23px] pointer-events-none"></div>

            <div className="text-center md:text-left mb-6 md:mb-0 relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-[#E9C84A]/10 text-[#E9C84A] text-xs font-bold tracking-widest uppercase mb-4 border border-[#E9C84A]/30">
                Leadership
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Mrs. Rama Sharma
              </h3>
              <p className="text-[#00c6ff] text-lg font-medium tracking-wide">Co-Founder & Director</p>
            </div>

            {/* Divider Line */}
            <div className="hidden md:block w-[1px] h-20 bg-white/10 mx-8 relative z-10"></div>

            <div className="max-w-md text-center md:text-left text-slate-300 text-sm md:text-base leading-relaxed relative z-10">
              Leading with vision, empathy, and an unwavering commitment to educational excellence. Her pioneering efforts continue to shape the bright futures of our students and the enduring legacy of our institution.
            </div>
          </div>
        </div>

        {/* Legacy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legacyItems.map((item, index) => (
            <div
              key={index}
              className={`legacy-grid-item bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:-translate-y-2 hover:bg-white/10 hover:border-[#00c6ff]/30 hover:shadow-[0_10px_30px_rgba(0,198,255,0.1)] transition-all duration-300 group ${index === legacyItems.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 text-[#00c6ff] flex items-center justify-center mb-6 group-hover:bg-[#00c6ff] group-hover:text-white transition-all duration-300 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00c6ff] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
      <Footer/>
    </div>
  );
}
