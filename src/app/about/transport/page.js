'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TransportSection() {
  const containerRef = useRef(null);

  // Data for the transport section including images, titles, and detailed text
  const transportData = [
    {
      title: "Transport Routes",
      imageUrl: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=800&auto=format&fit=crop",
      description: "Our comprehensive transport network covers a wide radius across the city and neighboring suburbs, ensuring that no student is left without a safe and comfortable commuting option to our campus.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.247s-1.5-2.247-4.5-2.247C1.5 18 1.5 21 1.5 21h12s0-3-3-3-4.5 2.247-4.5 2.247zM18.75 3a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 015.25 3h13.5zM12 9v6m-3-3h6" />
        </svg>
      )
    },
    {
      title: "Route List",
      imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop",
      description: "Access the detailed directory of all designated pick-up and drop-off points. Our route list includes specific timing schedules to help parents and students plan their daily routines efficiently.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    },
    {
      title: "Transport Guidelines",
      imageUrl: "https://images.unsplash.com/photo-1611019056285-d60f58cdcbdb?q=80&w=800&auto=format&fit=crop",
      description: "Strict safety protocols and a code of conduct are enforced on all school buses. These guidelines ensure a disciplined, respectful, and highly secure environment for every child during transit.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      title: "GPS-enabled Transport Information",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
      description: "Stay connected and stress-free with our live GPS tracking system. Parents can monitor bus locations in real-time, receive ETA alerts, and ensure total peace of mind through our dedicated mobile portal.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      )
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate Header Elements
    tl.fromTo(
      ".transport-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    )
    // Animate Grid Cards
    .fromTo(
      ".transport-card",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  return (
   <PageShell>
    <section
      ref={containerRef}
      className="py-8 font-sans relative overflow-hidden"

    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h4 className="transport-header-elem text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Safety & Convenience
          </h4>
          <h2 className="transport-header-elem text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Transport
          </h2>
          <p className="transport-header-elem text-slate-300 max-w-2xl mx-auto text-lg">
            Providing a highly secure, reliable, and technology-driven commuting experience for our students every single day.
          </p>
          <div className="transport-header-elem w-24 h-[4px] bg-gradient-to-r from-[#E9C84A] to-[#F3E5AB] mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(233,200,74,0.4)]"></div>
        </div>

        {/* 2x2 Grid Layout for Transport Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {transportData.map((item, index) => (
            <div
              key={index}
              className="transport-card bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:-translate-y-2 hover:border-[#00c6ff]/40 hover:shadow-[0_20px_40px_rgba(0,198,255,0.15)] transition-all duration-500 group flex flex-col sm:flex-row"
            >
              {/* Image Section - Takes up left side on larger screens, top on mobile */}
              <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0a122e] to-transparent z-10 opacity-70"></div>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Floating Icon over Image */}
                <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-[#0a122e]/80 backdrop-blur-sm border border-white/20 text-[#00c6ff] flex items-center justify-center group-hover:bg-[#00c6ff] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-8 relative flex-grow flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00c6ff] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Action Link (View Details / Access) */}
                <div className="mt-auto flex items-center text-[#E9C84A] text-sm font-semibold group-hover:text-[#00c6ff] transition-colors duration-300 cursor-pointer w-max">
                  View Details
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
   </PageShell>
  );
}
