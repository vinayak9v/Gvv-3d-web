'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CommitteesSection() {
  const containerRef = useRef(null);

  const committees = [
    {
      title: "Executive Board Members",
      description: "Guiding the strategic direction and overall vision of the institution.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      )
    },
    {
      title: "Committee Members",
      description: "Dedicated individuals working together to uphold our core educational values.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      title: "School Management Committee",
      description: "Overseeing day-to-day operations, academic planning, and school administration.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      )
    },
    {
      title: "POSH Committee",
      description: "Ensuring a safe, respectful, and harassment-free environment for all staff and students.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      title: "Child Protection Committee",
      description: "Dedicated to the welfare, emotional support, and absolute safety of every child.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    },
    {
      title: "Internal Committees",
      description: "Specialized focus groups handling internal audits, grievance redressal, and events.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
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

    // Animate Header
    tl.fromTo(
      ".committee-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    )
    // Animate Highlight Card
    .fromTo(
      ".committee-highlight",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    )
    // Animate Grid Cards
    .fromTo(
      ".committee-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
  }, { scope: containerRef });

  return (

    <PageShell>
         <section
      ref={containerRef}
      className="  font-sans relative overflow-hidden"

    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h4 className="committee-header text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Leadership & Governance
          </h4>
          <h2 className="committee-header text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Committees
          </h2>
          <div className="committee-header w-24 h-[4px] bg-[#E9C84A] mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(233,200,74,0.3)]"></div>
        </div>

        {/* Featured Leader Card */}
        <div className="committee-highlight mb-12 bg-gradient-to-r from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-[1px] border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow inside the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E9C84A]/10 to-transparent pointer-events-none"></div>

          <div className="relative px-8 py-10 md:px-12 flex flex-col md:flex-row items-center gap-8 justify-center md:justify-start">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E9C84A]/20 flex items-center justify-center border-2 border-[#E9C84A]/50 text-[#E9C84A] shadow-[0_0_20px_rgba(233,200,74,0.2)] shrink-0">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
               </svg>
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-[#E9C84A]/10 text-[#E9C84A] text-xs font-bold tracking-widest uppercase mb-3 border border-[#E9C84A]/30">
                Key Leadership
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Mr. Mohan Lal G Bagora
              </h3>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl">
                Spearheading the vision and governance of our institution, ensuring excellence across all administrative and academic boards.
              </p>
            </div>
          </div>
        </div>

        {/* Committees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((committee, index) => (
            <div
              key={index}
              className="committee-card bg-white/[0.03] backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-[#00c6ff]/30 hover:shadow-[0_10px_30px_rgba(0,198,255,0.15)] transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[#00c6ff] flex items-center justify-center shrink-0 group-hover:bg-[#00c6ff] group-hover:text-white transition-all duration-300 shadow-sm">
                  {committee.icon}
                </div>
                <h3 className="text-lg font-bold text-white leading-tight group-hover:text-[#00c6ff] transition-colors duration-300">
                  {committee.title}
                </h3>
              </div>
              <p className="text-slate-300/80 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                {committee.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
    </PageShell>

  );
}
