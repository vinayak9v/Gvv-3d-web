"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Header Animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    );

    // Scroll-triggered animations for each section
    sectionsRef.current.forEach((section, index) => {
      // Determine if image is on the left or right based on index to create sliding effect
      const xOffset = index % 2 === 0 ? -50 : 50; 

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
            start: 'top 85%', // Triggers when the top of the section is 85% down the viewport
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
    <main className="min-h-screen font-sans selection:bg-blue-500 selection:text-white pb-20 overflow-hidden">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[120%] h-96 bg-[#1E3A8A] rounded-full blur-[200px] opacity-10 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24">
        
        {/* Header Section */}
        <header ref={headerRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[2px] w-12 bg-blue-600"></span>
            <p className="text-blue-500 font-semibold tracking-widest uppercase text-sm">Discover Our Journey</p>
            <span className="h-[2px] w-12 bg-blue-600"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-wide">
            About <span className="text-[#FACC15]">Garima Vidya Vihar</span>
          </h1>
        </header>

        {/* Section 1: About Our School (Image Left, Text Right) */}
        <section ref={addToRefs} className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            {/* Replace src with your actual school image */}
            <img 
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
              alt="Students learning at Garima Vidya Vihar School" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full h-[400px]"
            />
          </div>
          <article className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#FACC15] rounded-full block"></span>
              Learning Journey towards Excellence
            </h2>
            <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
              <p>
                GVV School comes under the top CBSE schools in Indore. In your child’s “learning journey,” we at GVV are dedicated to being a friend, philosopher, and mentor by offering education that leads to excellence, which in turn prepares the way for empowerment.
              </p>
              <p>
                We provide learning opportunities that help your kid develop holistically, foster a culture of positivity, intellect, and innovation, and promote the joy of learning via Cooperation, Collaboration, Experiential Learning and Competency Based Education.
              </p>
              <p>
                Our highly competent, experienced and well-versed facilitators, under the expert leadership of our Educational Leaders, Our Director <strong className="text-white">Mr. Santosh Bagora</strong> & Principal <strong className="text-white">Ms. Rama Sharma</strong>, inspires knowledge, learning, and personal growth in our students.
              </p>
              <p>
                Our goal is to provide kids with the life skills, emotional intelligence, and moral foundation they need to succeed in the future. It is our endeavor to develop responsible young ‘global citizens’. We also strive to be the best schools in Indore with an affordable fees structure.
              </p>
            </div>
          </article>
        </section>

        {/* Section 2: Establishment (Text Left, Image Right) */}
        <section ref={addToRefs} className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-[#FACC15] rounded-2xl blur-xl opacity-10 group-hover:opacity-30 transition duration-500"></div>
            {/* Replace src with your actual school building image */}
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
              alt="Garima Vidya Vihar School Building and Campus" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full h-[450px]"
            />
          </div>
          <article className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#FACC15] rounded-full block"></span>
              Our Establishment & Legacy
            </h2>
            <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
              <p>
                The Establishment year of GVV was <strong>2007</strong>, run by the Society <em>“Garima Vidya Vihar Shiksha Avam Samaj Sewa Sanstha”</em>.
              </p>
              <p>
                The GVV School was founded by our Honourable Director Mr. Santosh Bagora as an option for providing quality education at an affordable fee structure. It is also the best school for girls in Indore with a noble cause that every student deserves to be educated in a safe environment.
              </p>
              <p>
                The core values of love for our culture & country, kindness, cooperation, respect for others & moral ethics for character building are the foundation of our GVV School.
              </p>
              <p>
                We are delighted to share with you our 17 successful years of teaching and learning. Here, <strong>“We focus on establishing character together with careers”</strong>. Our property has undergone significant investment over the past six years, yet the campus’s basic simplicity has not been altered. We established <em>The Little Garimayans</em> for blooming buds in 2009.
              </p>
            </div>
          </article>
        </section>

        {/* Section 3: Mission & Vision Cards (Centered Layout) */}
        <section ref={addToRefs} className="mb-24 grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-10 relative overflow-hidden shadow-[0_0_15px_rgba(30,58,138,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-bl-full opacity-10"></div>
            <div className="w-16 h-16 rounded-full border border-blue-500/50 flex items-center justify-center mb-6 bg-[#020617]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Mission Statement</h3>
            <p className="text-gray-300 leading-relaxed">
              The Garima School is, first and foremost, a family. Teachers enthusiastically support and guide students to become confident persons and passionate learners with the core values of kindness, cooperation, and respect. The inclusion of rigorous academics, co-curricular activities, critical thinking, creativity, and daily assignments enriches both mind and heart. In this way, students are empowered to be their best.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#0B113A] border border-[#1E2B7A] rounded-2xl p-10 relative overflow-hidden shadow-[0_0_15px_rgba(30,58,138,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FACC15] rounded-bl-full opacity-10"></div>
            <div className="w-16 h-16 rounded-full border border-blue-500/50 flex items-center justify-center mb-6 bg-[#020617]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Vision Statement</h3>
            <p className="text-gray-300 leading-relaxed mb-4 italic">
              “To Create better human-beings with ethical behavior & enrich them with Indian values, respect for others, cooperation & love for their parents.”
            </p>
            <p className="text-gray-300 leading-relaxed">
              The Garima School seeks to inspire confidence, passion, and a love of learning in every child. Our school focuses on skills and imparts knowledge that is Competency-Based through Experiential Learning to prepare students to take up future challenges.
            </p>
          </div>
        </section>

        {/* Section 4: CBSE Affiliation & Quality (Image Left, Text Right) */}
        <section ref={addToRefs} className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            {/* Replace src with your actual academic/quality image */}
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
              alt="Quality Education and CBSE Affiliation" 
              className="relative rounded-2xl border border-[#1E2B7A] shadow-[0_0_20px_rgba(59,130,246,0.3)] object-cover w-full h-[450px]"
            />
          </div>
          <article className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#FACC15] rounded-full block"></span>
              CBSE Affiliation & Quality of Education
            </h2>
            <div className="bg-[#0B113A] border border-[#1E2B7A] rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Affiliation Details</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#FACC15] mt-1">✔</span>
                  CBSE-affiliated school in Indore since 2007.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FACC15] mt-1">✔</span>
                  <strong>Affiliation Code:</strong> 1030329
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FACC15] mt-1">✔</span>
                  <strong>School Code:</strong> 50297
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FACC15] mt-1">✔</span>
                  <strong>Affiliation Status:</strong> 2022 to 2027
                </li>
              </ul>
            </div>
            
            <div className="text-gray-300 space-y-4 text-md leading-relaxed">
              <p>
                <strong>Infrastructure:</strong> We fulfill CBSE & the Government norms needed for infrastructural requirements, including proper office maintenance and excellent maintenance of service records for our faculties.
              </p>
              <p>
                <strong>Quality Standards:</strong> The GVV School follows the By-laws of the Board in implementing the Competency Based Education System as per NEP - 2020 with proper maintenance of the records of Internal Assessments and academics.
              </p>
              <p>
                The average result of the school for the last three years is as per the prescribed Board’s average for X and XII Board Examinations.
              </p>
            </div>
          </article>
        </section>

      </div>
    </main>
    <Footer/>
    </div>
  );
};

export default About;