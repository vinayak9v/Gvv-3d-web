"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const CurriculumPlanner = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Data provided in your prompt (corrected the duplicate S.No 4 to 5)
  const curriculumData = [
    { id: 1, title: "Syllabus NUR To UKG", link: "#" },
    { id: 2, title: "Syllabus 1 To 5", link: "#" },
    { id: 3, title: "Syllabus 6 To 8", link: "#" },
    { id: 4, title: "Syllabus 9 To 10", link: "#" },
    { id: 5, title: "Syllabus 11 To 12", link: "#" },
  ];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP Animation for the Header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // GSAP Staggered Animation for the Cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power3.out', 
        delay: 0.3 
      }
    );
  }, []);

  return (
    <div>
         <Navbar/>
    <div className="min-h-screen  py-20 px-6 font-sans relative overflow-hidden">
       
      
      {/* Background ambient glow matching the website theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-[#1E3A8A] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-blue-600"></span>
            <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm">Academic Resources</h2>
            <span className="h-[2px] w-12 bg-blue-600"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wide">
            Annual Curriculum Planner
            <span className="block mt-2 text-[#FACC15]">2025-26</span>
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {curriculumData.map((item, index) => (
            <div 
              key={item.id} 
              ref={addToRefs}
              // Hover effects handled by Tailwind for maximum performance
              className="group relative bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_0_15px_rgba(30,58,138,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
              {/* Step/S.No Badge (Matches your Step 01, Step 02 design) */}
              <div className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-6">
                STEP 0{item.id}
              </div>

              {/* Glowing Icon Circular Container */}
              <div className="w-20 h-20 rounded-full border border-blue-500/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Syllabus Title */}
              <h3 className="text-xl font-bold text-white mb-8 flex-grow">
                {item.title}
              </h3>

              {/* Download Button (Golden Yellow) */}
              <a 
                href={item.link}
                className="px-8 py-3 w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#020617] font-bold rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Download PDF
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default CurriculumPlanner;