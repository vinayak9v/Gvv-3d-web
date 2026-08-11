'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WhatWeOffer() {
  const containerRef = useRef(null);

  // --- Data Extraction from Image ---
  const academicStreams = [
    {
      title: "Mathematics",
      subjects: ["English Core", "Physics", "Chemistry", "Mathematics", "Physical Education"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    },
    {
      title: "Science",
      subjects: ["English Core", "Physics", "Chemistry", "Biology", "Physical Education"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      )
    },
    {
      title: "Commerce",
      subjects: ["English Core", "Accountancy", "Business Studies", "Economics", "Physical Education"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      )
    },
    {
      title: "Humanities",
      subjects: ["English Core", "Economics", "History", "Political Science", "Physical Education"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      )
    }
  ];

  const optionalSubjects = [
    "Hindi", "Informatics Practices", "Computer Science", "Math",
    "Biology", "Applied Mathematics", "Entrepreneurship", "Artificial Intelligence"
  ];

  const coCurricularGroups = [
    {
      title: "Group A - Creative Studios",
      categories: [
        { name: "Dance Studio", items: ["Classical Dance (Kathak)", "Western Dance", "Folk Dance"] },
        { name: "Art Studio", items: ["Art & Craft", "Drawing & Painting"] },
        { name: "Music Studio", items: ["Vocal Music", "Instrumental Music"] }
      ]
    },
    {
      title: "Group B - Sports & Wellness",
      categories: [
        { name: "Sports", items: ["Kabaddi", "Skating", "Cricket (Boys)", "Kho-Kho", "Volleyball", "Badminton", "Table Tennis", "Chess / Carrom", "Athletics", "Martial Arts", "Basketball"] },
        { name: "Wellness & Life Skills", items: ["Yoga", "Swimming", "Sports Education", "Life Skills"] }
      ]
    }
  ];

  // --- Animations ---
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate section header
    tl.fromTo(
      ".offer-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    )
    // Animate academic streams
    .fromTo(
      ".academic-card",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    )
    // Animate optional subjects title & pills
    .fromTo(
      ".optional-elem",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
      "-=0.1"
    )
    // Animate Co-curricular sections
    .fromTo(
      ".activity-group",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.2"
    );
  }, { scope: containerRef });

  return ( <PageShell>
     <section
      ref={containerRef}
      className=" sm:px-6 lg:px-8 font-sans relative overflow-hidden"

    >

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h4 className="offer-header-elem text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Academic & Co-curricular
          </h4>
          <h2 className="offer-header-elem text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            What We Offer
          </h2>
          <div className="offer-header-elem w-24 h-[4px] bg-[#E9C84A] mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(233,200,74,0.3)]"></div>
        </div>

        {/* --- 1. ACADEMIC STREAMS --- */}
        <h3 className="offer-header-elem text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#00c6ff]"></span>
          Academic Streams
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {academicStreams.map((stream, idx) => (
            <div
              key={idx}
              className="academic-card bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:-translate-y-1 hover:bg-white/[0.06] hover:border-[#00c6ff]/40 hover:shadow-[0_10px_30px_rgba(0,198,255,0.15)] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#00c6ff]/10 text-[#00c6ff] flex items-center justify-center border border-[#00c6ff]/20 group-hover:bg-[#00c6ff] group-hover:text-white transition-colors duration-300">
                  {stream.icon}
                </div>
                <h4 className="text-xl font-bold text-white tracking-wide">{stream.title}</h4>
              </div>
              <ul className="space-y-3">
                {stream.subjects.map((subject, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-3 text-slate-300/90 text-sm">
                    <span className="text-[#E9C84A] mt-1 text-lg leading-none">•</span>
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- 2. OPTIONAL SUBJECTS --- */}
        <div className="mb-16">
          <h3 className="optional-elem text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#00c6ff]"></span>
            Optional Subjects
          </h3>
          <div className="flex flex-wrap gap-3">
            {optionalSubjects.map((subject, idx) => (
              <span
                key={idx}
                className="optional-elem inline-flex items-center justify-center bg-white/5 border border-white/10 text-blue-100 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:bg-[#00c6ff]/20 hover:border-[#00c6ff]/50 hover:text-white transition-all duration-300 cursor-default"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* --- 3. CO-CURRICULAR ACTIVITIES --- */}
        <div>
          <h3 className="offer-header-elem text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#00c6ff]"></span>
            Co-curricular Activities
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coCurricularGroups.map((group, idx) => (
              <div
                key={idx}
                className="activity-group bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-sm rounded-3xl p-1 border border-white/10"
              >
                <div className="bg-[#0a122e]/60 rounded-[23px] p-8 h-full">
                  <h4 className="text-xl font-bold text-[#E9C84A] mb-8 border-b border-white/10 pb-4">
                    {group.title}
                  </h4>
                  <div className="space-y-8">
                    {group.categories.map((category, cIdx) => (
                      <div key={cIdx}>
                        <h5 className="text-[#00c6ff] font-semibold text-sm uppercase tracking-wider mb-3">
                          {category.name}
                        </h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {category.items.map((item, iIdx) => (
                            <li key={iIdx} className="text-slate-300 text-sm flex items-center gap-2">
                              <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  </PageShell>

  );
}
