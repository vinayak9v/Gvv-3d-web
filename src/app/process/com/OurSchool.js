import React from 'react';
import Image from 'next/image';

export default function OurSchool() {
  // Array of facilities
  const facilities = [
    { name: "Modern Campus", image: "/facilities/campus.jpg" },
    { name: "Smart Classrooms", image: "/facilities/classrooms.jpg" },
    { name: "Robotics Lab", image: "/facilities/robotics.jpg" },
    { name: "Science Lab", image: "/facilities/science.jpg" },
    { name: "Library", image: "/facilities/library.jpg" },
    { name: "Sports Ground", image: "/facilities/sports.jpg" },
    { name: "Annual Function", image: "/facilities/function.jpg" },
    { name: "Computer Lab", image: "/facilities/computer.jpg" },
  ];

  // Dusri row ke liye hum array ko reverse kar rahe hain taaki design thoda alag lage
  const reversedFacilities = [...facilities].reverse();

  // Ek common component Card ke liye taaki code clean rahe
  const FacilityCard = ({ item }) => (
    <div className="flex flex-col items-center gap-4 group cursor-pointer w-[240px] sm:w-[280px] shrink-0">
      <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-[#E9C84A] overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(233,200,74,0.4)]">
        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors z-10 duration-300"></div>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 240px, 280px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-white font-medium text-[15px] sm:text-base tracking-wide text-center group-hover:text-[#E9C84A] transition-colors duration-300">
        {item.name}
      </h3>
    </div>
  );

  return (
    <>
      {/* Custom Animations for Infinite Marquee */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-marquee-left {
          animation: marqueeLeft 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 35s linear infinite;
        }
        
        /* Pause animation when user hovers */
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="bg-[#020B3D] py-20 overflow-hidden">
        
        {/* Header Section */}
        <div className="flex items-center justify-center gap-3 mb-16 px-4">
          <svg className="w-6 h-6 text-[#E9C84A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
          </svg>
          <h2 className="text-white text-xl sm:text-3xl font-extrabold tracking-widest uppercase">
            OUR SCHOOL
          </h2>
          <div className="flex gap-1 ml-2">
            <div className="w-8 h-[2px] bg-blue-500 rounded-full"></div>
            <div className="w-2 h-[2px] bg-blue-400 rounded-full"></div>
          </div>
        </div>

        {/* ========================================= */}
        {/* ROW 1: Auto Moving LEFT                   */}
        {/* ========================================= */}
        <div className="flex w-max animate-marquee-left pause-on-hover mb-12">
          {/* List 1 */}
          <div className="flex gap-8 pr-8">
            {facilities.map((item, index) => (
              <FacilityCard key={`row1-a-${index}`} item={item} />
            ))}
          </div>
          {/* List 2 (Duplicated for seamless infinite loop) */}
          <div className="flex gap-8 pr-8">
            {facilities.map((item, index) => (
              <FacilityCard key={`row1-b-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* ========================================= */}
        {/* ROW 2: Auto Moving RIGHT                  */}
        {/* ========================================= */}
        <div className="flex w-max animate-marquee-right pause-on-hover">
          {/* List 1 */}
          <div className="flex gap-8 pr-8">
            {reversedFacilities.map((item, index) => (
              <FacilityCard key={`row2-a-${index}`} item={item} />
            ))}
          </div>
          {/* List 2 (Duplicated for seamless infinite loop) */}
          <div className="flex gap-8 pr-8">
            {reversedFacilities.map((item, index) => (
              <FacilityCard key={`row2-b-${index}`} item={item} />
            ))}
          </div>
        </div>

      </section>
    </>
  );
}