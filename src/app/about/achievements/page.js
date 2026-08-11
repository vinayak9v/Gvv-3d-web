'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AchievementsWithImages() {
  const containerRef = useRef(null);

  // State for fetching dynamic data
  const [achievementDetails, setAchievementDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch('/api/achievements');
        const result = await res.json();
        if (result.success) {
          setAchievementDetails(result.data);
        }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  // GSAP Animation handles dynamic data via dependencies array
  useGSAP(() => {
    if (loading) return; // Wait for data to load before animating

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate Header
    tl.fromTo(
      ".achieve-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    );

    // Animate Cards (only if they exist)
    if (achievementDetails.length > 0) {
      tl.fromTo(
        ".achieve-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        "-=0.2"
      );
    }
  }, { scope: containerRef, dependencies: [loading, achievementDetails] });

  return (
   <PageShell>
     <section
      ref={containerRef}
      className="font-sans relative overflow-hidden min-h-screen pt-20 pb-20"
    >
      <div className="max-w-7xl mx-auto relative z-10 px-6">

        {/* Header Section */}
        <div className="text-center mb-16 opacity-0 achieve-header-elem">
          <h4 className="text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Achievements
          </h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Glimpses of Our Accolades
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Detailed snapshots of our proudest moments, showcasing the relentless pursuit of excellence by our incredible students.
          </p>
          <div className="w-24 h-[4px] bg-gradient-to-r from-[#E9C84A] to-[#F3E5AB] mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(233,200,74,0.4)]"></div>
        </div>

        {/* Loading / Empty States */}
        {loading ? (
          <div className="text-center py-20 text-white animate-pulse text-xl">Loading Achievements...</div>
        ) : achievementDetails.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No achievements added yet.</div>
        ) : (
          /* Masonry-style Grid for Achievement Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievementDetails.map((item, index) => {

              // Dynamic centering logic for the last row if it doesn't fill 3 columns perfectly
              const itemsCount = achievementDetails.length;
              const remainder = itemsCount % 3;
              const isLastRow = remainder !== 0 && index >= itemsCount - remainder;

              return (
                <div
                  key={item.id}
                  className={`achieve-card opacity-0 bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:-translate-y-2 hover:border-[#E9C84A]/40 hover:shadow-[0_20px_40px_rgba(233,200,74,0.15)] transition-all duration-500 group flex flex-col
                    ${isLastRow && remainder === 1 ? 'lg:col-start-2' : ''}
                    ${isLastRow && remainder === 2 && index === itemsCount - 2 ? 'lg:col-start-1 lg:ml-[50%]' : ''}
                    ${isLastRow && remainder === 2 && index === itemsCount - 1 ? 'lg:col-start-2 lg:ml-[50%]' : ''}
                  `}
                >
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a122e] to-transparent z-10 opacity-80"></div>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Category Badge over image */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-[#E9C84A] text-[#0a122e] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative flex-grow flex flex-col">

                    {/* Image Name / File Detail Tag */}
                    <div className="flex items-center gap-2 mb-4 text-[#00c6ff] bg-[#00c6ff]/10 w-max px-3 py-1.5 rounded border border-[#00c6ff]/20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-xs font-mono font-medium tracking-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                        {item.image_name}
                      </span>
                    </div>

                    {/* Title & Details */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#E9C84A] transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                      {item.details}
                    </p>

                    {/* Decorative line */}
                    <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-auto"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
   </PageShell>
  );
}
