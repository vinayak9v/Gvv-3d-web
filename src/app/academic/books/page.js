"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';
// import { ScrollSmoother } from 'gsap/ScrollSmoother'; // Requires GSAP Club License

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(ScrollSmoother); 

const BookList = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  // Data provided in your prompt
  const bookListData = [
    { id: 1, classes: "NURSERY", link: "#" },
    { id: 2, classes: "LKG", link: "#" },
    { id: 3, classes: "UKG", link: "#" },
    { id: 4, classes: "I", link: "#" },
    { id: 5, classes: "II", link: "#" },
    { id: 6, classes: "III", link: "#" },
    { id: 7, classes: "IV", link: "#" },
    { id: 8, classes: "V", link: "#" },
    { id: 9, classes: "VI", link: "#" },
    { id: 10, classes: "VII", link: "#" },
    { id: 11, classes: "VIII", link: "#" },
    { id: 12, classes: "IX", link: "#" },
    { id: 13, classes: "X", link: "#" },
    { id: 14, classes: "XI", link: "#" },
    { id: 15, classes: "XII", link: "#" },
  ];

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    /* 
    // Uncomment this block if you have the premium GSAP Club License for ScrollSmoother
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
    });
    */

    // Header Initial Animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    // ScrollTrigger Animation for the Cards
    // Cards will smoothly fade and slide up as you scroll down the page
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%', // Animation starts when top of card hits 90% of viewport
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      // Cleanup ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    // Wrapper and Content divs are set up for ScrollSmoother if you activate it later
    <div>
        <Navbar/>
    <div ref={wrapperRef} className="bg-[#020617] min-h-screen font-sans selection:bg-blue-500 selection:text-white">
        
      <div ref={contentRef} className="relative w-full pb-20">
        
        {/* Colorful Top Banner Image */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          {/* Using a high-quality abstract colorful image as a placeholder */}
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
            alt="Colorful Abstract Banner" 
            className="w-full h-full object-cover opacity-60"
          />
          
          {/* Gradient Overlay to blend the image seamlessly into the dark background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/60 to-[#020617]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-20">
          
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-[2px] w-12 bg-blue-600"></span>
              <h2 className="text-blue-500 font-semibold tracking-widest uppercase text-sm">Session 2026-27</h2>
              <span className="h-[2px] w-12 bg-blue-600"></span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wide drop-shadow-lg">
              Book List
            </h1>
          </div>

          {/* 15 Cards Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
            {bookListData.map((item) => (
              <div 
                key={item.id} 
                ref={addToRefs}
                className="group relative bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_0_15px_rgba(30,58,138,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                {/* Book Icon Circular Container */}
                <div className="w-16 h-16 rounded-full border border-blue-500/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                {/* Class Title */}
                <h3 className="text-lg font-bold text-gray-400 mb-1">
                  Class
                </h3>
                <p className="text-2xl font-extrabold text-white tracking-wide mb-6 flex-grow">
                  {item.classes}
                </p>

                {/* Download Button */}
                <a 
                  href={item.link}
                  className="px-6 py-2.5 w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#020617] font-bold text-sm rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  Download
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default BookList;