"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Affiliation = () => {
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Header Initial Entrance Animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    // Scroll-triggered animations for alternating sections
    sectionsRef.current.forEach((section, index) => {
      // Determine if the initial state should be pushed left or right
      const xOffset = index % 2 === 0 ? -60 : 60; 

      gsap.fromTo(
        section,
        { opacity: 0, x: xOffset, y: 40 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%', 
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
        <Navbar/>
    <main className=" min-h-screen font-sans selection:bg-blue-500 selection:text-white pb-20 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#1E3A8A] rounded-full blur-[250px] opacity-10 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24">
        
        {/* Header Section */}
        <header ref={headerRef} className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-blue-600"></span>
            <p className="text-blue-500 font-semibold tracking-widest uppercase text-sm">Official Accreditations</p>
            <span className="h-[2px] w-12 bg-blue-600"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wide">
            CBSE <span className="text-[#FACC15]">Affiliation</span>
          </h1>
        </header>

        {/* Section 1: Affiliation Details (Image Left, Text Right) */}
        <section ref={addToRefs} className="flex flex-col lg:flex-row items-center gap-12 mb-28">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
              alt="School Campus showing official accreditation status" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full h-[400px]"
            />
          </div>
          
          <article className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#FACC15] rounded-full block"></span>
              CBSE Affiliation Code
            </h2>
            <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
              <p>
                The Board has provided CBSE affiliation to the GVV School, which is controlled by the government as per the By-laws of the Board.
              </p>
              
              {/* Highlighted Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#0B113A] border border-[#1E2B7A] p-5 rounded-xl shadow-inner">
                  <p className="text-sm text-blue-400 uppercase tracking-wider mb-1">Affiliated Since</p>
                  <p className="text-2xl font-bold text-white">2007</p>
                </div>
                <div className="bg-[#0B113A] border border-[#1E2B7A] p-5 rounded-xl shadow-inner">
                  <p className="text-sm text-[#FACC15] uppercase tracking-wider mb-1">Affiliation Code</p>
                  <p className="text-2xl font-bold text-white">1030329</p>
                </div>
                <div className="bg-[#0B113A] border border-[#1E2B7A] p-5 rounded-xl shadow-inner">
                  <p className="text-sm text-blue-400 uppercase tracking-wider mb-1">School Code</p>
                  <p className="text-2xl font-bold text-white">50297</p>
                </div>
                <div className="bg-[#0B113A] border border-[#1E2B7A] p-5 rounded-xl shadow-inner">
                  <p className="text-sm text-[#FACC15] uppercase tracking-wider mb-1">Affiliation Status</p>
                  <p className="text-xl font-bold text-white">2022 to 2027</p>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Section 2: Infrastructure & Standards (Text Left, Image Right) */}
        <section ref={addToRefs} className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-28">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-[#FACC15] rounded-2xl blur-xl opacity-10 group-hover:opacity-30 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
              alt="Modern school infrastructure" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full h-[400px]"
            />
          </div>

          <article className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#FACC15] rounded-full block"></span>
              Infrastructure & Guidelines
            </h2>
            <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
              <p>
                The By-laws include many standard features, which have to be satisfied by the institutions that are affiliated with the Board. At GVV School, we strictly adhere to these mandates:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-4 bg-[#0B113A] border border-[#1E2B7A]/50 rounded-lg">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  </div>
                  <p><strong>Infrastructure Facilities:</strong> We completely fulfill CBSE & the Government norms needed for all infrastructural requirements.</p>
                </li>
                <li className="flex items-start gap-4 p-4 bg-[#0B113A] border border-[#1E2B7A]/50 rounded-lg">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  </div>
                  <p><strong>Administrative Maintenance:</strong> Proper Office Maintenance along with accurate maintenance of Admission and Withdrawal Registers.</p>
                </li>
                <li className="flex items-start gap-4 p-4 bg-[#0B113A] border border-[#1E2B7A]/50 rounded-lg">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#FACC15]/20 border border-[#FACC15] flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 bg-[#FACC15] rounded-full"></span>
                  </div>
                  <p><strong>Faculty Management:</strong> Excellent maintenance of Service Records of the Faculties with proper appointment procedures, pay scales, and different allowances.</p>
                </li>
              </ul>
            </div>
          </article>
        </section>

        {/* Section 3: Quality of Education (Image Left, Text Right) */}
        <section ref={addToRefs} className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
              alt="Students focused on quality education" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full h-[400px]"
            />
          </div>
          
          <article className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#FACC15] rounded-full block"></span>
              Quality of Education
            </h2>
            <div className="bg-gradient-to-br from-[#0B113A] to-[#020617] border border-[#1E2B7A] rounded-2xl p-8 shadow-[0_0_30px_rgba(30,58,138,0.3)]">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <div className="flex gap-4">
                  <div className="text-[#FACC15]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p>
                    The GVV School rigorously follows the By-laws of the Board in implementing the <strong className="text-white">Competency Based Education System</strong> as per <strong className="text-[#FACC15]">NEP - 2020</strong>. This includes the proper maintenance of records for both Internal Assessments and academics.
                  </p>
                </div>
                
                <div className="w-full h-[1px] bg-[#1E2B7A]"></div>
                
                <div className="flex gap-4">
                  <div className="text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p>
                    The average result of the school for the last three years aligns perfectly with the prescribed Board’s average for <strong className="text-white">Class X and XII Board Examinations</strong>, ensuring consistent academic excellence.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

      </div>
    </main>
    <Footer/>
    </div>
  );
};

export default Affiliation;