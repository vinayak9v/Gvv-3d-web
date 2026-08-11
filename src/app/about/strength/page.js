'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function StudentLifeSection() {
  const containerRef = useRef(null);

  const studentLifeData = [
    {
      title: "Life at School",
      description: "A vibrant, inclusive campus environment where every day brings new opportunities for learning, lasting friendships, and personal growth.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      title: "Laboratories",
      description: "State-of-the-art facilities across Physics, Chemistry, Biology, and Computer Science, encouraging hands-on experimentation and scientific inquiry.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.325 18.25A10.15 10.15 0 0112 21.312a10.15 10.15 0 01-7.325-3.062M19.325 18.25c.162-.161.32-.326.47-.497M5.675 18.25a12.016 12.016 0 01-.47-.497m14.12 0c.234-.249.458-.51.67-.783M5.205 17.256a12.186 12.186 0 01-.67-.783M19.8 15.3l-.225-.262M5 14.5l.225-.262" />
        </svg>
      )
    },
    {
      title: "Scouts & Guides",
      description: "Instilling core values of discipline, teamwork, and community service through outdoor adventures and structured skill-building activities.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      )
    },
    {
      title: "School Innovation Council",
      description: "A dedicated incubation hub promoting design thinking, tinkering, and entrepreneurial skills among our young creative minds.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316V18" />
        </svg>
      )
    },
    {
      title: "Collaboration with UNICEF",
      description: "Partnering for impactful global citizenship initiatives, promoting child rights, social awareness, and sustainable development goals.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      title: "Collaboration with IIT Madras",
      description: "An exclusive academic tie-up offering advanced mentorship, technology workshops, and early exposure to premier higher-education standards.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      )
    },
    {
      title: "Clubs",
      description: "Diverse student-led clubs ranging from literary and eco-clubs to coding and performing arts, designed to foster holistic development.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      )
    },
    {
      title: "Leadership Programmes",
      description: "Empowering tomorrow's leaders through active Student Council roles, Model United Nations (MUN), and public speaking workshops.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.148.621-.531 1.114-1.059.777l-4.69-2.997a.563.563 0 00-.536 0l-4.69 2.997c-.528.337-1.207-.156-1.059-.777l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.95.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
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
      ".student-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    )
    // Animate Cards
    .fromTo(
      ".student-card",
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
          <h4 className="student-header-elem text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Beyond the Classroom
          </h4>
          <h2 className="student-header-elem text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Student Strength & Life
          </h2>
          <p className="student-header-elem text-slate-300 max-w-2xl mx-auto text-lg">
            Discover a dynamic ecosystem designed to nurture curiosity, foster innovation, and build the holistic leaders of tomorrow.
          </p>
          <div className="student-header-elem w-24 h-[4px] bg-gradient-to-r from-[#E9C84A] to-[#F3E5AB] mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(233,200,74,0.4)]"></div>
        </div>

        {/* Student Life Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentLifeData.map((item, index) => {
            // Logic to center the last row items perfectly if they don't fill the 3-column grid
            const isLastRowTwoItems = index >= 6;

            return (
              <div
                key={index}
                className={`student-card bg-white/[0.03] backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-[#00c6ff]/40 hover:shadow-[0_15px_40px_rgba(0,198,255,0.12)] transition-all duration-300 group flex flex-col items-start text-left
                  ${isLastRowTwoItems ? 'lg:col-span-1 lg:transform lg:translate-x-1/2' : ''}
                `}
              >
                {/* Icon Wrapper */}
                <div className="w-14 h-14 mb-6 rounded-xl bg-white/5 border border-white/10 text-[#00c6ff] flex items-center justify-center shrink-0 group-hover:bg-[#00c6ff] group-hover:text-white group-hover:border-[#00c6ff] transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-[#E9C84A] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-slate-300/80 text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300 flex-grow">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
   </PageShell>
  );
}
