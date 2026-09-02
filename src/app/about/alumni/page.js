'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AlumniSection() {
  const containerRef = useRef(null);

  // Data for the Alumni section
  const alumniData = [
    {
      title: "Alumni Registration Portal",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
      description: "Stay connected with your alma mater. Join our exclusive global network to access career opportunities, mentorship programs, and upcoming reunion events.",
      actionText: "Register Now",
      href: "/contact",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      title: "Alumni Stories",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      description: "Discover the inspiring journeys of our past students. Read firsthand accounts of how their foundational years shaped their professional and personal lives.",
      actionText: "Read Stories",
      href: "/contact",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },
    {
      title: "Alumni Achievements",
      imageUrl: "https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=800&auto=format&fit=crop",
      description: "Celebrate the exceptional milestones and global accolades earned by our distinguished alumni across diverse industries, from technology to the arts.",
      actionText: "View Achievements",
      href: "/about/achievements",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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

    // Animate Header Elements
    tl.fromTo(
      ".alumni-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    )
    // Animate Grid Cards
    .fromTo(
      ".alumni-card",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  return (
   <PageShell>
    <section
      ref={containerRef}
      className="py-8 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h4 className="alumni-header-elem text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Our Legacy
          </h4>
          <h2 className="alumni-header-elem text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Alumni
          </h2>
          <p className="alumni-header-elem text-slate-300 max-w-2xl mx-auto text-lg">
            A thriving global community of leaders, innovators, and changemakers united by their shared roots at our institution.
          </p>
          <div className="alumni-header-elem w-24 h-[4px] bg-gradient-to-r from-[#E9C84A] to-[#F3E5AB] mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(233,200,74,0.4)]"></div>
        </div>

        {/* 3-Column Grid for Alumni Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumniData.map((item, index) => (
            <div
              key={index}
              className="alumni-card bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:-translate-y-2 hover:border-[#00c6ff]/40 hover:shadow-[0_20px_40px_rgba(0,198,255,0.15)] transition-all duration-500 group flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a122e] to-transparent z-10 opacity-80"></div>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Floating Icon over Image */}
                <div className="absolute top-4 left-4 z-20 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[#E9C84A] flex items-center justify-center group-hover:bg-[#E9C84A] group-hover:text-[#0a122e] transition-colors duration-300 shadow-lg">
                  {item.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 relative flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00c6ff] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>

                {/* Action Button/Link */}
                <div className="mt-auto">
                  <a href={item.href} className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-[#00c6ff] hover:border-[#00c6ff] hover:shadow-[0_10px_20px_rgba(0,198,255,0.3)] transition-all duration-300 flex items-center justify-center gap-2">
                    {item.actionText}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
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
