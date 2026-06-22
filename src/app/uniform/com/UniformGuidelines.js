'use client';

import React from 'react';
import { 
  Download, 
  Shirt, 
  Scissors, 
  SunSnow, 
  Droplets, 
  Users, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import Image from 'next/image';

export default function UniformGuidelines() {
  // Function to handle downloading the page as a PDF
  const handleDownload = () => {
    window.print();
  };

  // Custom Shield Icon Component for the numbered notes
  const ShieldNumber = ({ num }) => (
    <div className="relative w-12 h-14 flex items-center justify-center text-[#facc15] flex-shrink-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute inset-0 w-full h-full">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span className="relative z-10 font-bold text-[15px] mt-1">{num}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6fbff] text-[#0a1930] font-sans pb-12 print:bg-white print:pb-0">
      
      {/* Top Action Bar - Hidden during printing */}
      <div className="flex justify-end p-4 print:hidden">
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 bg-[#0a1930] hover:bg-[#1a2d4c] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-md"
        >
          <Download size={18} />
          Download Guidelines
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* --- Top Section: Highlights --- */}
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          
          {/* Left Title & Shirt Illustration */}
          <div className="lg:w-1/3 w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#0a1930] mb-3 uppercase">
              Uniform <br /> Highlights
            </h1>
            <div className="flex items-center mb-8">
              <div className="h-[2px] bg-[#facc15] w-12"></div>
              <div className="w-2 h-2 bg-[#facc15] rotate-45 mx-2"></div>
              <div className="h-[2px] bg-[#facc15] w-12"></div>
            </div>
            
            {/* Placeholder for the line-art shirt - Using a large Lucide icon for demo */}
           <div className="flex justify-center w-full py-8">
  <Image
    src="/dss.png" // public folder me image rakho
    alt="School Uniform"
    width={250}
    height={250}
    className="object-contain"
  />
</div>
          </div>

          {/* Right Features Grid */}
          <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 relative">
            {/* Vertical dashed divider for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-blue-200"></div>

            {/* Feature 1 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#0a1930] p-3 rounded-full text-[#facc15] flex-shrink-0">
                <Shirt size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">PREMIUM QUALITY FABRIC</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Durable, breathable and comfortable fabric for all-day ease.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#0a1930] p-3 rounded-full text-[#facc15] flex-shrink-0">
                <Droplets size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">EASY MAINTENANCE</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Fabric that is easy to wash, dry and maintain.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#0a1930] p-3 rounded-full text-[#facc15] flex-shrink-0">
                <Scissors size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">SMART & MODERN DESIGN</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Tailored to perfection with a neat and elegant look.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#0a1930] p-3 rounded-full text-[#facc15] flex-shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">IDENTITY & EQUALITY</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Promotes equality, unity and a strong school identity.</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#0a1930] p-3 rounded-full text-[#facc15] flex-shrink-0">
                <SunSnow size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">ALL SEASON COMFORT</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Suitable for all weather conditions with summer and winter options.</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-4 items-start">
              <div className="bg-[#0a1930] p-3 rounded-full text-[#facc15] flex-shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[15px] mb-1">DISCIPLINE & CONFIDENCE</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Instills discipline, builds confidence and prepares students for success.</p>
              </div>
            </div>

          </div>
        </div>

        {/* --- Middle Section: Important Notes Box --- */}
        <div className="bg-[#0a1930] text-white rounded-2xl p-10 md:p-14 mb-12 shadow-xl print:shadow-none print:break-inside-avoid">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl font-bold tracking-wider text-[#facc15] uppercase mb-3">
              Important Notes
            </h2>
            <div className="flex items-center">
              <div className="h-[1px] bg-[#facc15] w-10"></div>
              <div className="w-1.5 h-1.5 bg-[#facc15] rotate-45 mx-2"></div>
              <div className="h-[1px] bg-[#facc15] w-10"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12 relative">
             {/* Divider Lines (Dashed) */}
             <div className="hidden md:block absolute left-[33%] top-0 bottom-0 w-px border-l border-dashed border-slate-600/50"></div>
             <div className="hidden md:block absolute left-[66%] top-0 bottom-0 w-px border-l border-dashed border-slate-600/50"></div>
             <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-slate-600/50"></div>

            <div className="flex gap-4 items-center relative z-10 bg-[#0a1930] pr-2">
              <ShieldNumber num="01" />
              <p className="text-sm text-slate-200 leading-snug">Uniform is mandatory for all students on all working days.</p>
            </div>
            <div className="flex gap-4 items-center relative z-10 bg-[#0a1930] px-2">
              <ShieldNumber num="02" />
              <p className="text-sm text-slate-200 leading-snug">Students must wear complete and proper uniform.</p>
            </div>
            <div className="flex gap-4 items-center relative z-10 bg-[#0a1930] pl-2">
              <ShieldNumber num="03" />
              <p className="text-sm text-slate-200 leading-snug">Uniform should be neat, clean and well maintained.</p>
            </div>
            <div className="flex gap-4 items-center relative z-10 bg-[#0a1930] pr-2">
              <ShieldNumber num="04" />
              <p className="text-sm text-slate-200 leading-snug">Sports uniform to be worn only on sports days & events.</p>
            </div>
            <div className="flex gap-4 items-center relative z-10 bg-[#0a1930] px-2">
              <ShieldNumber num="05" />
              <p className="text-sm text-slate-200 leading-snug">Winter uniform is compulsory during winter season.</p>
            </div>
            <div className="flex gap-4 items-center relative z-10 bg-[#0a1930] pl-2">
              <ShieldNumber num="06" />
              <p className="text-sm text-slate-200 leading-snug">Non-compliance may lead to disciplinary action.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Banner --- */}
      <div className="w-full bg-[#031554] bg-gradient-to-r from-[#031554] via-[#05217e] to-[#031554] text-white py-6 mt-auto border-t-[6px] border-[#facc15] print:break-inside-avoid">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-4">
            <div className="border border-white p-2 rounded-full hidden md:block">
              <Shirt size={28} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider mb-1">A Uniform That Represents</p>
              <p className="text-2xl font-bold text-[#facc15] uppercase tracking-wide">Our Values And Vision</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-slate-400/30"></div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-lg font-semibold uppercase tracking-wider">Today's Students,</p>
              <p className="text-lg font-semibold uppercase tracking-wider">Tomorrow's Leaders</p>
            </div>
            <div className="text-[#facc15]">
               <GraduationCap size={48} strokeWidth={1.5} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}