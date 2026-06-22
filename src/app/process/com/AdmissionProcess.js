"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function AdmissionProcess() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Trigger animation when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run animation only once
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      step: "STEP 01",
      title: "Submit Online\nApplication",
      description: "Complete the admission enquiry or application form on our website.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#E9C84A]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 3v4a1 1 0 001 1h4" />
          <circle cx="16" cy="16" r="4" fill="#020B3D" stroke="#E9C84A" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 16l1 1 2-2" stroke="#E9C84A" strokeWidth="2" />
        </svg>
      )
    },
    {
      step: "STEP 02",
      title: "Document\nVerification",
      description: "Submit required academic and identity documents for verification.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#E9C84A]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          <circle cx="16" cy="16" r="4" fill="#020B3D" stroke="#E9C84A" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 16l1 1 2-2" stroke="#E9C84A" strokeWidth="2" />
        </svg>
      )
    },
    {
      step: "STEP 03",
      title: "Interaction /\nAssessment",
      description: "Student interaction and age-appropriate assessment process.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#E9C84A]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      step: "STEP 04",
      title: "Admission\nConfirmation",
      description: "Fee payment and admission confirmation. Welcome to the Garima family!",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#E9C84A]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Custom Keyframes for the Sequence */}
      <style>{`
        @keyframes slideUpCard {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawConnector {
          0% { width: 0%; opacity: 0; }
          1% { opacity: 1; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes fadeInArrow {
          0% { opacity: 0; transform: translate(-5px, -50%); }
          100% { opacity: 1; transform: translate(0, -50%); }
        }
        
        .card-animate {
          animation: slideUpCard 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .connector-animate {
          animation: drawConnector 0.4s ease-out forwards;
        }
        .arrow-animate {
          animation: fadeInArrow 0.2s ease-out forwards;
        }
      `}</style>

      <section ref={sectionRef} className="bg-[#020B3D] py-20 px-6 lg:px-12 relative overflow-hidden">
        
        {/* Decorative Heading */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-[1px] w-8 sm:w-16 bg-blue-500/50 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-sm"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide text-center">
            ADMISSION PROCESS
          </h2>
          <div className="h-[1px] w-8 sm:w-16 bg-blue-500/50 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-sm"></div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-10 relative">
            
            {steps.map((step, index) => {
              // Timeline calculations for staggered effect
              const cardDelay = index * 0.8; 
              const connectorDelay = cardDelay + 0.5;
              const arrowDelay = connectorDelay + 0.3;

              return (
                <div 
                  key={index} 
                  className={`relative flex flex-col group opacity-0 ${isVisible ? 'card-animate' : ''}`}
                  style={{ animationDelay: `${cardDelay}s` }}
                >
                  
                  {/* Card Container */}
                  <div className="flex-1 flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-[#061456] to-[#020B3D] border border-blue-500/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.05),0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[inset_0_0_30px_rgba(59,130,246,0.15),0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500 z-10">
                    
                    {/* Step Number */}
                    <h3 className="text-blue-400 font-bold text-sm tracking-widest mb-6">
                      {step.step}
                    </h3>

                    {/* Glowing Icon Container */}
                    <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-blue-500/20 border-t-blue-400 border-r-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[spin_4s_linear_infinite]" />
                      <div className="absolute inset-2 rounded-full border border-blue-500/30" />
                      <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h4 className="text-white font-bold text-lg mb-4 whitespace-pre-line leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting Dashed Arrow Sequence (Desktop Only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 xl:-right-5 w-6 xl:w-10 z-0 transform -translate-y-1/2">
                      {/* Expanding Dashed Line */}
                      <div 
                        className={`w-0 border-t border-dashed border-blue-400/60 relative ${isVisible ? 'connector-animate' : 'opacity-0'}`}
                        style={{ animationDelay: `${connectorDelay}s` }}
                      >
                        {/* Appearing Arrow Head */}
                        <div 
                          className={`absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-l-[6px] border-l-[#E9C84A] border-b-[5px] border-b-transparent opacity-0 ${isVisible ? 'arrow-animate' : ''}`}
                          style={{ animationDelay: `${arrowDelay}s` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </section>
    </>
  );
}