'use client';
import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';

// Code-split the 3D banner: a WebGL Canvas can't server-render, and this pulls in
// three / @react-three + the 16MB GLB. Keeping it out of the initial bundle and
// loading it client-side shrinks the first load and unblocks the rest of the page.
const SchoolModelBanner = dynamic(() => import('./SchoolModelBanner'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center mt-10 sm:mt-14">
      <div className="relative w-full h-[430px] sm:h-[560px] md:h-[660px] lg:h-[740px] flex items-center justify-center">
        <div className="h-9 w-9 rounded-full border-2 border-white/20 border-t-[#EED165] animate-spin" />
      </div>
    </div>
  ),
});

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HERO_TITLE = 'SHAPING THINKERS, BUILDING INNOVATERS';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.hero-word', {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.hero-btn', {
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        delay: 1.2,
        ease: 'back.out(1.5)',
      });

      gsap.from('.drag-text', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        delay: 2.0,
        ease: 'power2.out',
      });

      gsap.to('.drag-handle', {
        scale: 1.08,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'center center',
      });

      gsap.set('.visions-title', { y: 30, opacity: 0 });
      gsap.to('.visions-title', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.visions-title', start: 'top 85%' },
      });

      gsap.to('.wave-track', {
        x: '-50%',
        duration: 12,
        repeat: -1,
        ease: 'none',
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-[75vh] px-4 text-center w-full bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/hero-bg.webp')",
      }}
    >
      <Navbar />
      <div className="relative w-full px-2 pointer-events-none -mt-4 bg-transparent z-0 mt-10">
        <h1 className="relative mx-auto mb-12 max-w-full whitespace-nowrap text-center text-[13px] font-extrabold leading-tight tracking-normal text-white sm:text-2xl md:text-4xl lg:text-5xl bg-transparent">
          <span className="hero-word inline-block">{HERO_TITLE}</span>
        </h1>
      </div>

      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center z-20">
        <SchoolModelBanner />
        <Link
          href="/admission"
          className="hero-btn mt-24 flex items-center gap-3 rounded-full border border-[#C79F32] bg-[#EED165] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-colors hover:bg-[#E3C556]"
        >
          Admission Open
          <div className="h-3.5 w-3.5 bg-[#005AA3]"></div>
        </Link>
        <h2 className="visions-title text-white text-3xl sm:text-4xl md:text-[40px] font-extrabold mt-12 tracking-wider drop-shadow-md">
          OUR VISIONS
        </h2>
      </div>

      <div className="wave-divider relative w-full h-24 mt-12 overflow-hidden pointer-events-none z-10">
        <div className="wave-track absolute inset-y-0 left-0 flex" style={{ width: '200%' }}>
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="w-1/2 h-full">
            <path d="M0,50 C60,10 120,90 180,50 S300,10 360,50 S420,90 480,50 S540,10 600,50 S660,90 720,50 S780,10 840,50 S900,90 960,50 S1020,10 1080,50 S1140,90 1200,50" stroke="rgba(56,189,248,0.95)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0,50 C60,10 120,90 180,50 S300,10 360,50 S420,90 480,50 S540,10 600,50 S660,90 720,50 S780,10 840,50 S900,90 960,50 S1020,10 1080,50 S1140,90 1200,50" stroke="rgba(187,247,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="180" cy="50" r="5" fill="#7dd3fc" className="animate-pulse" />
            <circle cx="360" cy="50" r="5" fill="#60a5fa" className="animate-pulse" />
            <circle cx="540" cy="50" r="5" fill="#38bdf8" className="animate-pulse" />
            <circle cx="720" cy="50" r="5" fill="#7dd3fc" className="animate-pulse" />
            <circle cx="900" cy="50" r="5" fill="#60a5fa" className="animate-pulse" />
            <circle cx="1080" cy="50" r="5" fill="#38bdf8" className="animate-pulse" />
          </svg>
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="w-1/2 h-full">
            <path d="M0,50 C60,10 120,90 180,50 S300,10 360,50 S420,90 480,50 S540,10 600,50 S660,90 720,50 S780,10 840,50 S900,90 960,50 S1020,10 1080,50 S1140,90 1200,50" stroke="rgba(56,189,248,0.8)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0,50 C60,10 120,90 180,50 S300,10 360,50 S420,90 480,50 S540,10 600,50 S660,90 720,50 S780,10 840,50 S900,90 960,50 S1020,10 1080,50 S1140,90 1200,50" stroke="rgba(187,247,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="120" cy="50" r="4" fill="#7dd3fc" className="animate-pulse" />
            <circle cx="300" cy="50" r="4" fill="#60a5fa" className="animate-pulse" />
            <circle cx="480" cy="50" r="4" fill="#38bdf8" className="animate-pulse" />
            <circle cx="660" cy="50" r="4" fill="#7dd3fc" className="animate-pulse" />
            <circle cx="840" cy="50" r="4" fill="#60a5fa" className="animate-pulse" />
            <circle cx="1020" cy="50" r="4" fill="#38bdf8" className="animate-pulse" />
          </svg>
        </div>
      </div>

      {/* SMOKE / FADE BLEND EFFECT ADDED HERE */}
<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#090E17] via-[#090E17]/80 to-transparent pointer-events-none z-20"></div>
    </section>
  );
}