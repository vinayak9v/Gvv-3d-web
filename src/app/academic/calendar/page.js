"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const AcademicCalendar = () => {
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  // Data provided in your prompt
  const calendarData = [
    { id: 1, title: "NURSERY TO 12 TH", link: "#" }
  ];

  useEffect(() => {
    // GSAP Animation for the Header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // GSAP Animation for the Single Card
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: 'power3.out', 
        delay: 0.3 
      }
    );
  }, []);

  return (
    <div>
        <Navbar/>
    <div className="min-h-screen  py-20 px-6 font-sans relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-[#1E3A8A] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-blue-600"></span>
            <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm">Important Dates</h2>
            <span className="h-[2px] w-12 bg-blue-600"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wide">
            Academic Calendar
            <span className="block mt-2 text-[#FACC15]">2025-26</span>
          </h1>
        </div>

        {/* Single Card Centered Layout */}
        <div className="flex justify-center">
          {calendarData.map((item) => (
            <div 
              key={item.id} 
              ref={cardRef}
              className="w-full max-w-sm group relative bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-10 flex flex-col items-center text-center shadow-[0_0_15px_rgba(30,58,138,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
              {/* Glowing Icon Circular Container */}
              <div className="w-24 h-24 rounded-full border border-blue-500/50 flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Classes Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                Classes
              </h3>
              <p className="text-blue-300 text-lg font-medium tracking-wide mb-8">
                {item.title}
              </p>

              {/* Download Button */}
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

export default AcademicCalendar;