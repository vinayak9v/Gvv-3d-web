'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import ScrubVideo from '@/components/shared/ScrubVideo';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function RoboticsPageClient({ aboutImage, projectImages = [] }) {
  const container = useRef(null);

  useGSAP(() => {
    // 1. Hero Section Animation
    const tl = gsap.timeline();
    tl.from('.robo-title', { y: 100, opacity: 0, duration: 1, ease: 'power4.out' })
      .from('.robo-desc', { y: 50, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero-box', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'back.out(1.7)' }, '-=0.5');

    // Hero Floating Effect
    gsap.to('.floating-element', {
      y: -30,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // About Section - Text Fade Up
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
      y: 80, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out',
    });

    // The pinned scroll-scrubbed lab fly-through (the <ScrubVideo> below) manages
    // its own ScrollTrigger.

    // Features Section
    gsap.from('.feature-card', {
      scrollTrigger: { trigger: '.features-section', start: 'top 75%' },
      scale: 0.8, y: 100, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.2)',
    });

    // Gallery Section
    gsap.from('.gallery-item', {
      scrollTrigger: { trigger: '.gallery-section', start: 'top 85%' },
      rotationX: 45, y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out', transformPerspective: 800,
    });

    // CTA Section
    gsap.from('.cta-box', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
      scale: 0.5, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)',
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative w-full text-white overflow-hidden font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[80svh] flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent pointer-events-none z-0"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          <h1 className="robo-title text-6xl md:text-8xl lg:text-[100px] font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-blue-300 via-blue-500 to-blue-900 tracking-tight">
            ROBOTICS LAB
          </h1>
          <p className="robo-desc text-lg md:text-2xl text-blue-200/70 max-w-3xl mx-auto mb-16">
            Building the next generation of automated systems, AI-driven machinery, and intelligent robotics.
          </p>

        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section min-h-[70vh] flex items-center px-6 py-24 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="about-text text-4xl md:text-5xl font-bold mb-6 text-white border-l-4 border-blue-500 pl-6">
              About Our Vision
            </h2>
            <p className="about-text text-blue-200/70 text-lg leading-relaxed mb-6">
              Robotics is not just about building machines; it's about solving complex human problems through logic, mechanics, and code. Our curriculum is designed to push the boundaries of what students can create.
            </p>
            <p className="about-text text-blue-200/70 text-lg leading-relaxed">
              From foundational circuit building to advanced autonomous drones, we provide the tools and mentorship required to turn science fiction into reality.
            </p>
          </div>
          <div className="about-text relative w-full h-[400px] bg-[#0a1445]/30 rounded-2xl border border-blue-500/20 overflow-hidden group">
            {aboutImage ? (
              <Image
                src={aboutImage}
                alt="Robotics at Garima Vidhya Vihar"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-blue-500/30 font-mono text-xl group-hover:scale-110 transition-transform duration-700">
                [ 3D RENDER PLACEHOLDER ]
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= LAB FLY-THROUGH SECTION ================= */}
      <ScrubVideo
        src="/lab.mp4"
        poster="/lab_poster.webp"
        subtitle="[ SCROLL TO EXPLORE ]"
        className="border-y border-blue-500/20"
      />

      {/* ================= FEATURES SECTION ================= */}
      <section className="features-section min-h-screen py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Modules</h2>
            <p className="text-blue-300/60 max-w-2xl mx-auto">Mastering the trifecta of modern robotics: Hardware, Software, and Intelligence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '01', title: 'Artificial Intelligence', desc: 'Implementing neural networks, computer vision, and deep learning algorithms to make robots think.' },
              { id: '02', title: 'Kinematics & Mechanics', desc: 'Designing physical chassis, calculating joint movements, and mastering motor control.' },
              { id: '03', title: 'Embedded Systems', desc: 'Programming microcontrollers, reading sensor data, and managing power distribution.' },
              { id: '04', title: 'Autonomous Navigation', desc: 'Using LIDAR, GPS, and SLAM mapping for driverless technology.' },
              { id: '05', title: 'IoT Integration', desc: 'Connecting robotic units to the cloud for real-time tracking and control.' },
              { id: '06', title: 'Drone Dynamics', desc: 'Aerodynamics, flight controllers, and aerial surveillance systems.' },
            ].map((feature, i) => (
              <div key={i} className="feature-card relative p-8 bg-[#0a1445]/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:bg-[#0a1445]/80 hover:border-blue-400/60 transition-all duration-300 group cursor-pointer overflow-hidden">
                <span className="absolute top-4 right-6 text-5xl font-black text-blue-500/10 group-hover:text-blue-500/20 transition-colors">{feature.id}</span>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors relative z-10">{feature.title}</h3>
                <p className="text-blue-200/60 relative z-10">{feature.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section className="gallery-section py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Project Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => {
              const projectImage = projectImages[item - 1];
              return (
                <div key={item} className="gallery-item h-64 bg-[#0a1445]/50 border border-blue-500/20 rounded-xl flex items-center justify-center overflow-hidden relative group">
                  {projectImage ? (
                    <Image
                      src={projectImage}
                      alt={`Project ${item}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-blue-500/30 font-mono tracking-widest z-10">PROJECT_{item}</span>
                  )}
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="cta-section py-32 px-6 flex items-center justify-center">
        <div className="cta-box max-w-4xl w-full p-12 md:p-20 bg-gradient-to-br from-[#0a1445] to-[#04081c] rounded-3xl border border-blue-500/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to Build the Future?</h2>
          <p className="text-blue-200/70 text-lg mb-10 relative z-10">
            Join our robotics lab and get hands-on experience with industry-grade equipment.
          </p>
          <a
            href="/admission"
            className="relative z-10 inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:scale-105 transition-all duration-300"
          >
            Apply for Admission
          </a>
        </div>
      </section>

    </div>
  );
}
