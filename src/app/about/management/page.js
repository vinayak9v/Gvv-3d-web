"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Management = () => {
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);
  const cardsRef = useRef([]);

  const addToSections = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Header Animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    // Alternating Sections Animation
    sectionsRef.current.forEach((section, index) => {
      const xOffset = index % 2 === 0 ? -60 : 60; 
      gsap.fromTo(
        section,
        { opacity: 0, x: xOffset, y: 30 },
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

    // Grid Cards Staggered Animation
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0], // Trigger when the first card hits viewport
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
        <Navbar/>
    <main className=" min-h-screen font-sans selection:bg-blue-500 selection:text-white pb-24 overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[600px] bg-[#1E3A8A] rounded-full blur-[250px] opacity-10 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24">
        
        {/* Header Section */}
        <header ref={headerRef} className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-blue-600"></span>
            <p className="text-blue-500 font-semibold tracking-widest uppercase text-sm">Leadership Team</p>
            <span className="h-[2px] w-12 bg-blue-600"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wide">
            Our School <span className="text-[#FACC15]">Management</span>
          </h1>
        </header>

        {/* 1. President's Message (Image Left, Text Right) */}
        <section ref={addToSections} className="flex flex-col lg:flex-row items-center gap-12 mb-28">
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
              alt="Mr. Mohanlal Ji Bagora" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full aspect-[4/5]"
            />
          </div>
          <article className="w-full lg:w-7/12">
            <h2 className="text-3xl font-bold text-[#FACC15] mb-2 uppercase tracking-wide">President’s Message</h2>
            <h3 className="text-4xl font-extrabold text-white mb-8">MR. MOHANLAL JI BAGORA</h3>
            <div className="bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-8 shadow-inner relative">
              <span className="absolute -top-6 -left-4 text-7xl text-blue-500/20 font-serif">"</span>
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                Garima Group "Knowledge is Power", this statement is universally acknowledged truth. It assumes greater importance in the 21st Century where the entire world is shaping into knowledge world. So a school must aim at empowering its students with knowledge which enables them to compete in the present competitive world.
              </p>
            </div>
          </article>
        </section>

        {/* 2. Director's Message (Text Left, Image Right) */}
        <section ref={addToSections} className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-28">
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute inset-0 bg-[#FACC15] rounded-2xl blur-xl opacity-10 group-hover:opacity-30 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" 
              alt="Mr. Santosh Bagora" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full aspect-[4/5]"
            />
          </div>
          <article className="w-full lg:w-7/12 text-left lg:text-right">
            <h2 className="text-3xl font-bold text-[#FACC15] mb-2 uppercase tracking-wide">Director’s Message</h2>
            <h3 className="text-4xl font-extrabold text-white mb-8">MR. SANTOSH BAGORA</h3>
            <div className="bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-8 shadow-inner relative text-left">
              <span className="absolute -top-6 -right-4 text-7xl text-[#FACC15]/20 font-serif">"</span>
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                Garima Vidya Vihar continues to lead the way in the field of quality education. It has progressed in the task of imparting education which is not only modern in its approach but also based on the ideals and rich culture of our country. Our aim is to develop young minds by spreading knowledge and dispelling the darkness within and thus illuminating world outside.
              </p>
            </div>
          </article>
        </section>

        {/* 3. Director's Message - Mrs. Rama Sharma (Image Left, Text Right) */}
        <section ref={addToSections} className="flex flex-col lg:flex-row items-center gap-12 mb-28">
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
              alt="Mrs. Rama Sharma" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full aspect-[4/5]"
            />
          </div>
          <article className="w-full lg:w-7/12">
            <h2 className="text-3xl font-bold text-[#FACC15] mb-2 uppercase tracking-wide">Director’s Message</h2>
            <h3 className="text-4xl font-extrabold text-white mb-8">MRS. RAMA SHARMA</h3>
            <div className="bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-8 shadow-inner relative">
              <span className="absolute -top-6 -left-4 text-7xl text-blue-500/20 font-serif">"</span>
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                This institution was created with an objective of providing an outstanding 360 degree education in character building, leadership, and co-curricular activities along with academics, with a very strong, dedicated and capable team of Educators who became the driving force in the growth of the School. It is rightly said that <strong className="text-white">"A dream becomes a goal when action is taken towards its achievement"</strong> and we are committed in taking constructive and purposeful actions to produce optimistic, independent compassionate, life-long learners and leaders who will bring glory to the School, State, Nation, and the World.
              </p>
            </div>
          </article>
        </section>

        {/* 4. Principal's Message (Text Left, Image Right) */}
        <section ref={addToSections} className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-28">
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute inset-0 bg-[#FACC15] rounded-2xl blur-xl opacity-10 group-hover:opacity-30 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070&auto=format&fit=crop" 
              alt="Mr. Madhav Mantri" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full aspect-[4/5]"
            />
          </div>
          <article className="w-full lg:w-7/12 text-left lg:text-right">
            <h2 className="text-3xl font-bold text-[#FACC15] mb-2 uppercase tracking-wide">Principal’s Message</h2>
            <h3 className="text-4xl font-extrabold text-white mb-8">MR. MADHAV MANTRI</h3>
            <div className="bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-8 shadow-inner relative text-left">
              <span className="absolute -top-6 -right-4 text-7xl text-[#FACC15]/20 font-serif">"</span>
              <div className="text-gray-300 space-y-4 text-lg leading-relaxed relative z-10">
                <p>Dear Parents, Teachers and Students,</p>
                <p>One of the greatest Indian teachers, Swami Vivekananda believed in the infinite potential of humankind. According to him, “Education is the manifestation of perfection already in men.” But, it is also true that no educational methodology can have its desired effect without the ability of the person disposed to employ it, that is, the teacher.</p>
                
                {/* Sanskrit Shloka Block */}
                <blockquote className="bg-[#020617] border-l-4 border-[#FACC15] p-4 my-6 text-center shadow-md">
                  <p className="text-[#FACC15] font-semibold text-xl leading-loose tracking-wider">
                    ज्ञानं ज्ञेयं परिज्ञाता त्रिविधा कर्मचोदना।<br/>
                    करणं कर्म कर्तेति त्रिविधः कर्मसंग्रहः।।
                  </p>
                </blockquote>
                
                <p>is, the knower (student), the knowing (teacher) and the known (knowledge) constitute the triune stimulus to action. To create right action, teachers and students must work together on the battleground of values.</p>
                <p>Mindful of our heritage as a nation that is revered for its ideal “Guru-Shishya” dynamic, we, at Garima Vidya Vihar are conscious of our responsibility and the trust placed in us by our parent and student community.</p>
                <p className="mt-6">Warm regards,<br/><strong className="text-white">Madhav Mantri</strong></p>
              </div>
            </div>
          </article>
        </section>

        {/* 5. Executive Board (3 Column Grid) */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
              Executive <span className="text-blue-500">Board</span>
            </h2>
            <div className="h-[2px] w-24 bg-[#FACC15] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Executive Director */}
            <div ref={addToCards} className="group bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-8 relative overflow-hidden shadow-[0_0_15px_rgba(30,58,138,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 rounded-bl-full opacity-10"></div>
              <h4 className="text-[#FACC15] text-sm font-bold uppercase tracking-widest mb-2">Executive Director</h4>
              <h3 className="text-2xl font-bold text-white mb-6">MR. PRAKHAR BAGORA</h3>
              <p className="text-gray-300 leading-relaxed flex-grow">
                "We have established an institution that will have a lasting impact on Indore and its future generations by not only imparting academic knowledge but also by building sound values, strong ethics and a sense of community spirit."
              </p>
            </div>

            {/* Treasurer */}
            <div ref={addToCards} className="group bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-8 relative overflow-hidden shadow-[0_0_15px_rgba(30,58,138,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FACC15] rounded-bl-full opacity-10"></div>
              <h4 className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-2">Treasurer</h4>
              <h3 className="text-2xl font-bold text-white mb-6">MRS. GARIMA OSTWAL</h3>
              <p className="text-gray-300 leading-relaxed flex-grow">
                "We have created an environment which is happy and cheerful. Children are respected and have equal opportunity. The school is a community of students, teachers and parents. We aim to make every child blossom to his/her full potential."
              </p>
            </div>

            {/* Chief Executive Officer */}
            <div ref={addToCards} className="group bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-8 relative overflow-hidden shadow-[0_0_15px_rgba(30,58,138,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 rounded-bl-full opacity-10"></div>
              <h4 className="text-[#FACC15] text-sm font-bold uppercase tracking-widest mb-2">Chief Executive Officer</h4>
              <h3 className="text-2xl font-bold text-white mb-6">MRS. RAVINA MEHTA</h3>
              <p className="text-gray-300 leading-relaxed flex-grow">
                "I am elated that the Garima Group has added an Institution of creative and Innovative learning to Indore that provide an avenue for young minds to experience well rounded holistic development."
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
    <Footer/>
    </div>
  );
};

export default Management;