'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SchoolWingsSection() {
  const containerRef = useRef(null);

  // Data for the different school wings, including descriptions and keywords as requested
  const wingsData = [
    {
      title: "Foundational Stage",
      grades: "Pre-school to Grade 2",
      description: "A nurturing and safe environment focused on play-based, discovery-oriented learning to build early cognitive, emotional, and motor skills.",
      keywords: ["Play-based Learning", "Motor Skills", "Phonics", "Curiosity"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      )
    },
    {
      title: "Preparatory Stage",
      grades: "Grades 3 to 5",
      description: "Transitioning to more structured, interactive classroom learning with a strong emphasis on foundational literacy, numeracy, and language development.",
      keywords: ["Interactive Learning", "Foundational Literacy", "Numeracy", "Exploration"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      title: "Middle Stage",
      grades: "Grades 6 to 8",
      description: "Introducing experiential learning within the sciences, mathematics, arts, and humanities. We focus on developing abstract thought and critical thinking.",
      keywords: ["Experiential Learning", "Critical Thinking", "Interdisciplinary", "Skill-building"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      )
    },
    {
      title: "Secondary Stage",
      grades: "Grades 9 & 10",
      description: "A multidisciplinary study approach preparing students for board examinations, focusing on deep analytical skills and vocational awareness.",
      keywords: ["Analytical Skills", "Subject Depth", "Board Prep", "Vocational Awareness"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      )
    },
    {
      title: "Senior Secondary",
      grades: "Grades 11 & 12",
      description: "Specialized academic streams offering deep theoretical knowledge and practical applications to prepare students for higher education and career pathways.",
      keywords: ["Specialization", "Career Pathways", "Advanced Academics", "Leadership"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
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
      ".wing-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    )
    // Animate Cards
    .fromTo(
      ".wing-card",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  return (
  <PageShell>
      <section
      ref={containerRef}
      className=" font-sans relative overflow-hidden"

    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h4 className="wing-header-elem text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Academic Structure
          </h4>
          <h2 className="wing-header-elem text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            School Wings
          </h2>
          <p className="wing-header-elem text-slate-300 max-w-2xl mx-auto text-lg">
            A progressive and carefully curated educational journey tailored to the cognitive and emotional development of students at every stage.
          </p>
          <div className="wing-header-elem w-24 h-[4px] bg-gradient-to-r from-[#E9C84A] to-[#F3E5AB] mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(233,200,74,0.4)]"></div>
        </div>

        {/* Wings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wingsData.map((wing, index) => {
            // Center the last two items on large screens for a balanced 5-item layout
            const isLastRow = index >= 3;

            return (
              <div
                key={index}
                className={`wing-card bg-white/[0.03] backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-[#00c6ff]/40 hover:shadow-[0_15px_40px_rgba(0,198,255,0.12)] transition-all duration-300 group flex flex-col
                  ${isLastRow ? 'lg:col-span-1 lg:transform lg:translate-x-1/2' : ''}
                `}
              >
                {/* Icon & Title Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00c6ff]/10 border border-[#00c6ff]/20 text-[#00c6ff] flex items-center justify-center shrink-0 group-hover:bg-[#00c6ff] group-hover:text-white transition-all duration-300 shadow-sm">
                    {wing.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[#E9C84A] transition-colors duration-300 mb-1">
                      {wing.title}
                    </h3>
                    <span className="inline-block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {wing.grades}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300/90 text-sm leading-relaxed mb-6 flex-grow">
                  {wing.description}
                </p>

                {/* Keywords (Pill Tags) */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {wing.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 text-slate-300 border border-white/10 group-hover:border-[#00c6ff]/30 group-hover:bg-[#00c6ff]/5 group-hover:text-[#00c6ff] transition-colors duration-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  </PageShell>
  );
}
