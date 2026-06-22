"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP ScrollTrigger प्लगइन को रजिस्टर करें
gsap.registerPlugin(ScrollTrigger);

const AnnualReport = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);

  const addToSections = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    // हेडर एनिमेशन (शुरुआती लोड पर)
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
    );

    // सभी सेक्शन्स के लिए स्क्रॉल-ट्रिगर एनिमेशन
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // जब सेक्शन का टॉप स्क्रीन के 80% भाग पर आएगा
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      // क्लीनअप
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020617] min-h-screen text-white font-sans selection:bg-blue-600 selection:text-white pb-24 overflow-hidden relative">
      
      {/* बैकग्राउंड एम्बिएंट ग्लो इफ़ेक्ट */}
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[100%] h-[500px] bg-gradient-to-b from-blue-900/30 to-transparent blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-950/20 blur-[200px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 pt-20">
        
        {/* मुख्य हेडर */}
        <header ref={headerRef} className="text-center mb-24 border-b border-blue-900/40 pb-12">
          <p className="text-[#FACC15] font-bold tracking-widest uppercase text-sm mb-3">
            GARIMA VIDYA VIHAR SENIOR SECONDARY SCHOOL
          </p>
          <p className="text-blue-400 text-xs tracking-wider uppercase mb-4">
            AIRPORT ROAD, INDORE (M.P.) | SESSION: 2024-25
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide uppercase">
            ANNUAL <span className="text-[#FACC15]">REPORT</span>
          </h1>
          <div className="w-24 h-[3px] bg-blue-500 mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        </header>

        {/* 1. स्वागत भाषण और प्रस्तावना */}
        <section ref={addToSections} className="mb-20 bg-[#0B113A] border border-[#1E2B7A] p-8 md:p-12 rounded-3xl shadow-[0_0_20px_rgba(30,58,138,0.2)]">
          <h2 className="text-2xl font-bold text-[#FACC15] mb-6 border-l-4 border-[#FACC15] pl-4">
            Good Evening, Everyone!
          </h2>
          <blockquote className="border-l-2 border-blue-500 italic pl-6 my-6 text-gray-300 text-lg bg-[#020617]/50 p-4 rounded-r-xl">
            “Education is not the amount of information that is put into your brain and runs riot there, undigested, all your life. We must have life-building, man-making, and character-making assimilation of ideas.”
            <span className="block text-right text-xs text-[#FACC15] mt-2 not-italic">— Swami Vivekananda</span>
          </blockquote>
          <div className="text-gray-300 space-y-4 leading-relaxed text-md">
            <p>
              भारत में शिक्षा की जड़ें प्राचीन काल में देखी जा सकती हैं, गुरुकुल प्रणाली समग्र शिक्षा पर प्रारंभिक जोर देने के प्रमाण के रूप में खड़ी है। गुरुकुल प्रणाली में, छात्र अपने शिक्षकों के साथ रहते थे, न केवल शैक्षणिक ज्ञान बल्कि अथाह जीवन कौशल और मूल्यों को भी आत्मसात करते थे।
            </p>
            <p>
              सदियों से, तक्षशिला और नालंदा जैसे औपचारिक संस्थानों के आगमन के साथ शिक्षा प्रणाली विकसित हुई। एनईपी 2020, एक ऐतिहासिक नीतिगत बदलाव है, जिसका उद्देश्य पाठ्यक्रम में बहु-विषयक शिक्षा को बढ़ावा देना और रचनात्मकता और महत्वपूर्ण सोच को प्रोत्साहित करके शिक्षा प्रणाली को पुनर्जीवित करना है।
            </p>
            <p className="text-white font-medium bg-[#020617] p-4 rounded-xl border border-blue-900/30 mt-6">
              It’s our immense pleasure to heartily welcome you all to our 18th Annual Function, <span className="text-[#FACC15]">‘Yugantar – Paramparik se Navachar’</span>.
            </p>
          </div>
        </section>

        {/* 2. शैक्षणिक उपलब्धियां (Academic Toppers) */}
        <section ref={addToSections} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-wide">
              Academic <span className="text-[#FACC15]">Performance</span> (2023-24)
            </h2>
            <p className="text-gray-400 text-sm mt-2">X & XII Boards Spectacular Results</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl text-center shadow-[0_0_15px_rgba(30,58,138,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition duration-300">
              <p className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-2">Class XII Topper (PCB)</p>
              <h3 className="text-xl font-bold text-white mb-1">Vaishnavi Gehlot</h3>
              <span className="text-xs px-3 py-1 bg-[#020617] text-[#FACC15] rounded-full border border-yellow-500/20">Merit Holder</span>
            </div>
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl text-center shadow-[0_0_15px_rgba(30,58,138,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition duration-300">
              <p className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-2">Class XII Topper (PCM)</p>
              <h3 className="text-xl font-bold text-white mb-1">Vedant Dadhich</h3>
              <span className="text-xs px-3 py-1 bg-[#020617] text-[#FACC15] rounded-full border border-yellow-500/20">Merit Holder</span>
            </div>
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl text-center shadow-[0_0_15px_rgba(30,58,138,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition duration-300">
              <p className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-2">Class XII Topper (Comm.)</p>
              <h3 className="text-xl font-bold text-white mb-1">Pihoo Parakh</h3>
              <span className="text-xs px-3 py-1 bg-[#020617] text-[#FACC15] rounded-full border border-yellow-500/20">Merit Holder</span>
            </div>
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl text-center shadow-[0_0_15px_rgba(30,58,138,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition duration-300">
              <p className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-2">Class X Topper</p>
              <h3 className="text-xl font-bold text-white mb-1">Nitin Raj Tiwari</h3>
              <span className="text-xs px-3 py-1 bg-[#020617] text-[#FACC15] rounded-full border border-yellow-500/20">Merit Holder</span>
            </div>
          </div>
        </section>

        {/* 3. खेल उपलब्धियां (Sports Champions) */}
        <section ref={addToSections} className="mb-20 bg-gradient-to-br from-[#0B113A] to-[#020617] border border-[#1E2B7A] p-8 md:p-12 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-white">
              Sports <span className="text-blue-500">Champions</span> (2024-25)
            </h2>
            <div className="h-[1px] w-20 bg-blue-500 mx-auto mt-3"></div>
          </div>

          <div className="space-y-8">
            {/* योग */}
            <div className="border-b border-blue-900/40 pb-6">
              <h3 className="text-lg font-bold text-[#FACC15] mb-4 uppercase tracking-wider flex items-center gap-2">🧘‍♂️ Yog Champions (SGFI & State)</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <li className="bg-[#020617] p-4 rounded-xl border border-blue-900/30"><strong className="text-white">Bhoomika Sengar:</strong> 2nd Position, Silver Medal (67th Balaghat Competition)</li>
                <li className="bg-[#020617] p-4 rounded-xl border border-blue-900/30"><strong className="text-white">Aadesh Nigam:</strong> 3rd Position (Bronze) & 2nd Position (Silver in 68th SGFI)</li>
                <li className="bg-[#020617] p-4 rounded-xl border border-blue-900/30"><strong className="text-white">Priya Gurung:</strong> 3rd Position, Bronze Medalist</li>
                <li className="bg-[#020617] p-4 rounded-xl border border-blue-900/30"><span className="text-[#FACC15]">State Participation:</span> Kusum Gurung & Raj Sanki represented at Shivpuri State Meet.</li>
              </ul>
            </div>

            {/* स्केटिंग */}
            <div className="border-b border-blue-900/40 pb-6">
              <h3 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">🛼 Skating Champions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-[#020617] p-4 rounded-xl border border-blue-900/20"><p className="text-xs text-gray-400">Yagya Soni</p><p className="font-bold text-white">🥇 Gold Medal</p></div>
                <div className="bg-[#020617] p-4 rounded-xl border border-blue-900/20"><p className="text-xs text-gray-400">Aadarsh Sahu</p><p className="font-bold text-white">🥈 Silver Medal</p></div>
                <div className="bg-[#020617] p-4 rounded-xl border border-blue-900/20"><p className="text-xs text-gray-400">Lakshya Mehta</p><p className="font-bold text-white">🥈 Silver Medal</p></div>
                <div className="bg-[#020617] p-4 rounded-xl border border-blue-900/20"><p className="text-xs text-gray-400">Sanidhy Nigam</p><p className="font-bold text-white">🥉 Bronze Medal</p></div>
              </div>
            </div>

            {/* एथलेटिक्स, बॉक्सिंग, कुश्ती */}
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-4 uppercase tracking-wider flex items-center gap-2">🏋️‍♂️ Athletics, Boxing & Wrestling</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="bg-[#020617] p-4 rounded-xl border border-blue-900/30">
                  <strong className="text-white">Imran Ishaq (Athletics):</strong> 100m Race (Gold - Selected for Nationals), 4×100 Relay (Gold), 200m Race (Silver) at Chhatarpur.
                </li>
                <li className="bg-[#020617] p-4 rounded-xl border border-blue-900/30">
                  <strong className="text-white">Anmol Jain (Boxing):</strong> 1st Position & Gold Medal at State Level SGFI Championship.
                </li>
                <li className="bg-[#020617] p-4 rounded-xl border border-blue-900/30">
                  <strong className="text-white">Aakashi Awasthi:</strong> 2nd Position & Silver Medal in Discus Throw (Khelo M.P. & State).
                </li>
                <li className="bg-[#020617] p-4 rounded-xl border border-blue-900/30">
                  <strong className="text-white">Ravi Jat Sir (Faculty):</strong> 1st Position in National Wrestling Championship held at Vidisha.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. महत्वपूर्ण कार्यक्रम एवं उपलब्धियां (Milestones Grid) */}
        <section ref={addToSections} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-wide">
              Major <span className="text-[#FACC15]">Milestones</span> & Activities
            </h2>
            <div className="h-[2px] w-16 bg-[#FACC15] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl shadow-md">
              <h4 className="text-[#FACC15] font-bold text-lg mb-2">UNICEF Life Skill Courses</h4>
              <p className="text-gray-300 text-sm">Collaboration with UNICEF: One of the only two schools in Indore to offer lifelong free access to vital skills.</p>
            </div>
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl shadow-md">
              <h4 className="text-blue-400 font-bold text-lg mb-2">Innovative School Council</h4>
              <p className="text-gray-300 text-sm">Established an Innovative Council to develop leadership, decision-making, and student-centric environments.</p>
            </div>
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl shadow-md">
              <h4 className="text-purple-400 font-bold text-lg mb-2">Advanced Labs Launch</h4>
              <p className="text-gray-300 text-sm">Inauguration of State-of-the-art Robotics Lab and Language Lab by Shri Rasraj Ji Maharaj.</p>
            </div>
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl shadow-md">
              <h4 className="text-[#FACC15] font-bold text-lg mb-2">एक पेड़ माँ के नाम</h4>
              <p className="text-gray-300 text-sm">Environmental conservation drive creating a record by planting 10,000 saplings on campus.</p>
            </div>
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl shadow-md">
              <h4 className="text-blue-400 font-bold text-lg mb-2">ISO 9001-2015 Certified</h4>
              <p className="text-gray-300 text-sm">Achieved the prestigious ISO certification, reinforcing our systematic quality processes.</p>
            </div>
            <div className="bg-[#0B113A] border border-[#1E2B7A] p-6 rounded-2xl shadow-md">
              <h4 className="text-purple-400 font-bold text-lg mb-2">Cyber Paathshaala</h4>
              <p className="text-gray-300 text-sm">Organised in collaboration with M.P. Police and Srajan NGO to spread awareness about digital safety.</p>
            </div>
          </div>
        </section>

        {/* 5. पुरस्कार एवं सम्मान (Awards) */}
        <section ref={addToSections} className="mb-20 bg-[#0B113A] border border-[#1E2B7A] p-8 md:p-12 rounded-3xl shadow-inner">
          <h2 className="text-2xl font-bold text-white text-center mb-8 uppercase tracking-wide">
            National <span className="text-[#FACC15]">Awards</span> & Prestige
          </h2>
          <div className="space-y-4">
            <div className="bg-[#020617] border-l-4 border-yellow-500 p-5 rounded-r-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h4 className="font-bold text-lg text-white">Best School of India</h4>
                <p className="text-sm text-gray-400">Recognised by the prestigious Career 360° Magazine.</p>
              </div>
              <span className="text-xs px-3 py-1 bg-yellow-500/10 text-[#FACC15] font-bold rounded border border-yellow-500/30">Winner</span>
            </div>

            <div className="bg-[#020617] border-l-4 border-blue-500 p-5 rounded-r-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h4 className="font-bold text-lg text-white">Most Trusted School in Central India</h4>
                <p className="text-sm text-gray-400">Awarded at the सुशिक्षा M.P. Event, organised by News18.</p>
              </div>
              <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 font-bold rounded border border-blue-500/30">Honour</span>
            </div>

            <div className="bg-[#020617] border-l-4 border-purple-500 p-5 rounded-r-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h4 className="font-bold text-lg text-white">Women’s Achiever Award & National Principal’s Award</h4>
                <p className="text-sm text-gray-400">Director Ma'am received from Mr. Gajendra Singh Shekhawat & Swami Vivekanand Award in Bhopal.</p>
              </div>
              <span className="text-xs px-3 py-1 bg-purple-500/10 text-purple-400 font-bold rounded border border-purple-500/30">Leadership</span>
            </div>
          </div>
        </section>

        {/* 6. नन्हे-मुन्ने गरिमायंस (Pre-Primary Block) */}
        <section ref={addToSections} className="mb-20">
          <div className="bg-gradient-to-r from-blue-950/40 via-[#0B113A] to-blue-950/40 border border-[#1E2B7A] p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-[#FACC15] mb-4 uppercase tracking-wide">Segment of the Little Ones</h3>
            <p className="text-gray-300 leading-relaxed text-md mb-6">
              Our motto speaks – <strong className="text-white">'First Safety, Then Education'</strong>. We take extreme care that the little blooming buds are nourished and nurtured into a proper atmosphere. Teachers try to imbibe the rich and varied culture by celebrating Guru-purnima, Rakhi, Janmashtmi, Navratri, and activities like Toran Making, Matki Decoration, Pool Party, and excursions to <strong className="text-white">Wiggly World</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-[#020617] px-3 py-1.5 rounded-full border border-blue-900/50 text-gray-400">Fruit Chat Party</span>
              <span className="text-xs bg-[#020617] px-3 py-1.5 rounded-full border border-blue-900/50 text-gray-400">Garba Competition</span>
              <span className="text-xs bg-[#020617] px-3 py-1.5 rounded-full border border-blue-900/50 text-gray-400">Poem Recitation</span>
              <span className="text-xs bg-[#020617] px-3 py-1.5 rounded-full border border-blue-900/50 text-gray-400">Blue Day Celebration</span>
            </div>
          </div>
        </section>

        {/* निष्कर्ष (Footer Note) */}
        <footer ref={addToSections} className="text-center border-t border-blue-900/40 pt-12">
          <p className="text-xl font-semibold text-[#FACC15] tracking-wider uppercase mb-4">
            Arise, Awake, and Stop Not, till the goal is reached.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed mb-6">
            हमें यह समझना चाहिए कि सभी विद्यार्थियों में एक जैसी प्रतिभा नहीं होती, इसलिए हर कोई अलग–अलग तरह से सफलता हासिल करेगा। हम, गरिमायन के रूप में, समाज के लिए अपना योगदान देने के लिए प्रतिबद्ध हैं और यह प्रक्रिया अनवरत जारी रखेंगे।
          </p>
          <p className="text-blue-500 font-bold tracking-widest text-sm uppercase">
            धन्यवाद | जय हिंद, जय भारत !!!
          </p>
        </footer>

      </div>
    </div>
  );
};

export default AnnualReport;