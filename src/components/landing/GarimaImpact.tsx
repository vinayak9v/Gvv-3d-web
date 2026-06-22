'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrubVideo from '@/components/shared/ScrubVideo';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ImpactStat = {
  id: number;
  label: string;
  icon: string;
  value?: string;
  target?: number;
  format?: 'plus' | 'plus-comma';
};

const impactStats: ImpactStat[] = [
  { id: 1, target: 38, format: 'plus', label: 'YEARS LEGACY', icon: '/Icon (1).png' },
  { id: 2, target: 5000, format: 'plus-comma', label: 'STUDENTS', icon: '/Frame 64.png' },
  { id: 3, target: 25000, format: 'plus-comma', label: 'ALUMNI', icon: '/Network.png' },
  { id: 4, value: "MP'S FIRST", label: 'HUMANOID ROBOT', icon: '/Robot.png' },
  { id: 5, value: 'ADVANCED', label: 'ROBOTICS LABS', icon: '/Robotics.png' },
];

const innovations = [
  {
    id: 1,
    title: 'G-VYAS Humanoid Robot',
    desc: 'Our revolutionary AI-powered classroom assistant transforming interactive learning.',
    icon: '/Trophy.png',
  },
  {
    id: 2,
    title: 'Robotics & AI Labs',
    desc: 'State-of-the-art facilities for hands-on robotics engineering and programming.',
    icon: '/Trophy.png',
  },
  {
    id: 3,
    title: 'Garima Innovation Club',
    desc: 'A dedicated platform empowering student innovation, research, and collaboration.',
    icon: '/Trophy.png',
  },
  {
    id: 4,
    title: 'STEM Programs',
    desc: 'Deeply integrated science, technology, engineering, and mathematics curriculum.',
    icon: '/Trophy.png',
  },
];

function formatNumber(value: number, fmt: ImpactStat['format']) {
  const rounded = Math.round(value);
  if (fmt === 'plus-comma') return rounded.toLocaleString() + '+';
  if (fmt === 'plus') return rounded + '+';
  return String(rounded);
}

export default function GarimaImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const innovationRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useGSAP(
    () => {
      const impactTrigger = { trigger: impactRef.current, start: 'top 80%' };

      gsap.set('.impact-heading', { y: 30, opacity: 0, scale: 0.95 });
      gsap.to('.impact-heading', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: impactTrigger,
      });

      gsap.set('.impact-card', { y: 40, opacity: 0 });
      gsap.set('.impact-icon', { scale: 0 });

      gsap.to('.impact-card', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: impactTrigger,
        onComplete: () => {
          impactStats.forEach((stat, idx) => {
            if (stat.target === undefined) return;
            const el = numberRefs.current[idx];
            if (!el) return;
            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = formatNumber(counter.val, stat.format);
              },
            });
          });
        },
      });

      gsap.to('.impact-icon', {
        scale: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: impactTrigger,
      });

      const impactSection = impactRef.current;
      const impactIcons = gsap.utils.toArray<HTMLElement>('.impact-icon', impactSection);
      const iconTweens = impactIcons.map((icon) => ({
        scaleTo: gsap.quickTo(icon, 'scale', { duration: 0.35, ease: 'power3.out' }),
        yTo: gsap.quickTo(icon, 'y', { duration: 0.35, ease: 'power3.out' }),
      }));

      const handleImpactMove = (event: MouseEvent) => {
        impactIcons.forEach((icon, index) => {
          const rect = icon.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
          const influence = gsap.utils.clamp(0, 1, 1 - distance / 180);
          const scale = 1 + influence * 0.65;

          iconTweens[index].scaleTo(scale);
          iconTweens[index].yTo(influence * -14);
        });
      };

      const resetImpactIcons = () => {
        iconTweens.forEach(({ scaleTo, yTo }) => {
          scaleTo(1);
          yTo(0);
        });
      };

      impactSection?.addEventListener('mousemove', handleImpactMove);
      impactSection?.addEventListener('mouseleave', resetImpactIcons);

      const innoTrigger = { trigger: innovationRef.current, start: 'top 75%' };

      gsap.set('.inno-heading', { y: 30, opacity: 0 });
      gsap.to('.inno-heading', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: innoTrigger,
      });

      gsap.set('.inno-item', { x: -40, opacity: 0 });
      gsap.to('.inno-item', {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: innoTrigger,
      });

      gsap.set('.gvyas-card', { x: 40, scale: 0.95, opacity: 0 });
      gsap.to('.gvyas-card', {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: innoTrigger,
        onComplete: () => {
          gsap.to('.gvyas-card', {
            scale: 1.02,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            transformOrigin: 'center center',
          });
        },
      });

      const floatRotations = [
        { duration: 5.5, direction: 1 },
        { duration: 6.5, direction: -1 },
        { duration: 6, direction: 1 },
        { duration: 7, direction: -1 },
      ];
      gsap.utils.toArray<HTMLElement>('.inno-float', innovationRef.current).forEach((el, i) => {
        const cfg = floatRotations[i % floatRotations.length];
        const baseRotation = parseFloat(el.dataset.baseRotation ?? '0');
        gsap.set(el, {
          rotation: baseRotation,
          rotationY: 0,
          transformPerspective: 700,
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 50%',
        });
        gsap.to(el, {
          rotationY: cfg.direction * 360,
          duration: cfg.duration,
          ease: 'none',
          repeat: -1,
        });
      });

      gsap.set('.inno-cta', { scale: 0.95, opacity: 0 });
      gsap.to('.inno-cta', {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        delay: 0.6,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: innovationRef.current, start: 'top 60%' },
        onComplete: () => {
          const btn = innovationRef.current?.querySelector('.inno-cta') as HTMLElement | null;
          if (btn) {
            const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
            const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
            btn.addEventListener('mousemove', (e) => {
              const rect = btn.getBoundingClientRect();
              const px = e.clientX - rect.left - rect.width / 2;
              const py = e.clientY - rect.top - rect.height / 2;
              xTo(px * 0.35);
              yTo(py * 0.35);
            });
            btn.addEventListener('mouseleave', () => {
              xTo(0);
              yTo(0);
            });
          }
        },
      });

      const innoSection = innovationRef.current;
      const glow = innoSection?.querySelector('.cursor-glow') as HTMLElement | null;
      if (innoSection && glow) {
        const glowX = gsap.quickTo(glow, 'x', { duration: 0.4, ease: 'power2.out' });
        const glowY = gsap.quickTo(glow, 'y', { duration: 0.4, ease: 'power2.out' });
        innoSection.addEventListener('mouseenter', () => {
          gsap.to(glow, { opacity: 1, duration: 0.4 });
        });
        innoSection.addEventListener('mousemove', (e) => {
          const rect = innoSection.getBoundingClientRect();
          glowX(e.clientX - rect.left - 160);
          glowY(e.clientY - rect.top - 160);
        });
        innoSection.addEventListener('mouseleave', () => {
          gsap.to(glow, { opacity: 0, duration: 0.4 });
        });
      }

      return () => {
        impactSection?.removeEventListener('mousemove', handleImpactMove);
        impactSection?.removeEventListener('mouseleave', resetImpactIcons);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full font-sans">

      {/* Pulled up with a negative margin (+ higher z) so the torn-paper PNG's
          transparent top OVERLAPS the section above it — you see that section
          through the rip, instead of a flat dark band mixing at the seam. */}
      <section ref={impactRef} className="relative z-20 -mt-20 md:-mt-32 w-full min-h-screen py-16 px-4 md:px-12 flex flex-col items-center justify-center bg-[url('/Group%209.png')] bg-cover bg-bottom bg-no-repeat">

        <h2 className="impact-heading text-black text-3xl md:text-4xl font-bold tracking-wide mb-12 md:mb-16 text-center">
          Garima Impact
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 max-w-7xl w-full text-center">
          {impactStats.map((stat, idx) => (
            <div key={stat.id} className="impact-card flex flex-col items-center justify-start">
              <div className="impact-icon relative w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center rounded-full cursor-pointer will-change-transform">
                <img src={stat.icon} alt={stat.label} className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.16)]" />
              </div>
              <h3
                ref={(el) => {
                  numberRefs.current[idx] = el;
                }}
                className="text-black text-xl md:text-2xl font-extrabold leading-tight"
              >
                {stat.target !== undefined ? formatNumber(0, stat.format) : stat.value}
              </h3>
              <p className="text-black text-sm md:text-base font-semibold uppercase tracking-wide mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Robot disassembly fly-through — scroll-scrubbed, full clip plays forward
          (disassemble → reassemble). Sits directly above "Innovation At Garima". */}
      <ScrubVideo
        src="/robot_assembly.webm"
        objectFit="cover"
        pingPong
      />

      <section ref={innovationRef} className="relative z-0 bg-[#061093] w-full pt-32 pb-24 px-4 md:px-12 flex flex-col items-center overflow-hidden">

        <div
          className="cursor-glow pointer-events-none absolute top-0 left-0 w-80 h-80 rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(120,180,255,0.45) 0%, rgba(120,180,255,0.15) 35%, transparent 70%)',
            mixBlendMode: 'screen',
            zIndex: 1,
          }}
        />

        <img src="/Layer 2 1.png" data-base-rotation="-12" className="inno-float absolute top-12 left-4 md:left-12 w-16 md:w-24 opacity-80" alt="" style={{ transform: 'rotate(-12deg)' }} />
        <img src="/Layer 3 1.png" data-base-rotation="12" className="inno-float absolute top-20 right-4 md:right-16 w-20 md:w-32 opacity-80" alt="" style={{ transform: 'rotate(12deg)' }} />
        <img src="/Layer 4 1.png" data-base-rotation="-12" className="inno-float absolute bottom-16 left-8 md:left-20 w-20 md:w-28 opacity-80" alt="" style={{ transform: 'rotate(-12deg)' }} />
        <img src="/Layer 2 1.png" data-base-rotation="30" className="inno-float absolute bottom-12 right-8 md:right-24 w-16 md:w-24 opacity-80" alt="" style={{ transform: 'rotate(30deg)' }} />

        <h2 className="inno-heading relative z-10 text-white text-3xl md:text-4xl font-bold tracking-wide mb-16 text-center">
          Innovation At Garima
        </h2>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 max-w-6xl w-full">

          <div className="flex flex-col gap-8 justify-center">
            {innovations.map((item) => (
              <div key={item.id} className="inno-item flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-blue-800 border border-blue-500/30 flex items-center justify-center p-2">
                  <img src={item.icon} alt="Icon" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-white text-lg font-bold mb-1">
                    {item.title}
                  </h4>
                  <p className="text-blue-100 text-sm leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="gvyas-card bg-[#1b26ab]/60 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 w-full max-w-lg shadow-2xl">
              <div className="w-full h-[250px] bg-white rounded-xl mb-4 overflow-hidden shadow-inner">
                <img src="/Robot.png" alt="G-VYAS Robot" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <h3 className="text-white text-xl font-bold">Meet G-VYAS</h3>
                <p className="text-blue-200 text-xs mt-1">MP&apos;S First Humanoid Robot Assistant</p>
              </div>
            </div>
          </div>

        </div>

        <button className="inno-cta relative z-10 mt-16 bg-gradient-to-b from-[#fae27c] to-[#d6ad44] text-black font-bold text-sm tracking-wide px-10 py-3.5 rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:scale-105 hover:brightness-110 transition-all duration-300 border border-[#b89539]">
          Apply For Admission
        </button>

      </section>
    </div>
  );
}
