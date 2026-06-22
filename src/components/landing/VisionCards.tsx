'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const cardsData = [
  { id: 1, title: 'Academic', href: '/academic' },
  { id: 2, title: 'Robotics', href: '/robotics' },
  { id: 3, title: 'Co-curricular', href: '/co-curricular' },
];

export default function VisionCards() {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();

  // Entrance reveal only — the per-card interaction (glitch teleport) is wired
  // up via React handlers below, not here.
  useGSAP(
    () => {
      gsap.set('.vision-card-wrap', { y: 60, opacity: 0 });

      gsap.to('.vision-card-wrap', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    },
    { scope: ref },
  );

  // HOVER: energize — a cyan glow + a single light-streak sweep (CSS
  // .is-charging). Re-armed each enter so the sweep replays; settles into the
  // existing calm hover state (lift + glow + sliding shutters).
  const handleHoverStart = (id: number) => {
    const wrap = ref.current?.querySelector<HTMLElement>(`.card-${id}`);
    if (!wrap) return;
    wrap.classList.remove('is-charging');
    // force reflow so the streak animation restarts on rapid re-entry
    void wrap.offsetWidth;
    wrap.classList.add('is-charging');
  };

  const handleHoverEnd = (id: number) => {
    ref.current
      ?.querySelector<HTMLElement>(`.card-${id}`)
      ?.classList.remove('is-charging');
  };

  // CLICK: "light-streak phase" teleport — the card compresses to a thin bright
  // horizontal line of light, flashes, then the streak expands sideways and
  // vanishes; the other cards phase out. Then navigate.
  const handleCardClick = (e: React.MouseEvent, href: string, id: number) => {
    e.preventDefault();

    const clicked = ref.current?.querySelector<HTMLElement>(`.card-${id}`);
    if (!clicked) {
      router.push(href);
      return;
    }

    // Re-arm the streak sweep so the effect is fully self-contained on a single
    // TAP (phones never fire hover, so the click must show the whole teleport).
    clicked.classList.remove('is-charging');
    void clicked.offsetWidth;
    clicked.classList.add('is-charging');
    clicked.classList.add('is-phasing');

    const GLOW =
      'brightness(1.7) drop-shadow(0 0 18px rgba(140,240,255,0.95)) drop-shadow(0 0 46px rgba(0,180,255,0.7))';

    const tl = gsap.timeline({ onComplete: () => router.push(href) });

    // 0. brief beat so the cyan light-streak sweep (CSS) is seen first
    tl.set(clicked, { transformOrigin: 'center center' })
      // 1. energize glow, then collapse to a hot horizontal line of light
      .to(clicked, { filter: GLOW, duration: 0.18, ease: 'power2.in' }, 0.16)
      .to(clicked, { scaleY: 0.04, scaleX: 1.05, duration: 0.24, ease: 'power3.in' }, '<')
      // 2. white-hot flash on the line
      .to(clicked, { filter: 'brightness(3.2)', duration: 0.07, ease: 'none' })
      // 3. streak expands sideways and vanishes (teleported away)
      .to(clicked, { scaleX: 1.6, opacity: 0, duration: 0.2, ease: 'power2.out' })
      .add(() => clicked.classList.remove('is-phasing', 'is-charging'));

    // the other cards phase out cleanly
    gsap.to(`.vision-card-wrap:not(.card-${id})`, {
      opacity: 0,
      scale: 0.94,
      duration: 0.45,
      ease: 'power3.in',
    });
  };

  return (
    <section ref={ref} className="w-full flex justify-center items-center py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className={`vision-card-wrap card-${card.id}`}
            onMouseEnter={() => handleHoverStart(card.id)}
            onMouseLeave={() => handleHoverEnd(card.id)}
          >
            <div
              onClick={(e) => handleCardClick(e, card.href, card.id)}
              className="group flex flex-col items-center bg-[#0a1445]/80 backdrop-blur-sm border border-blue-500/40 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-b hover:from-[#1a1f6b] hover:via-[#111880] hover:to-[#070b2d] hover:shadow-[0_0_35px_rgba(59,130,246,0.45)] hover:border-[#1D129E] cursor-pointer"
            >
              
              <h3 className="text-white text-2xl font-bold tracking-wide mb-6 w-full py-3 text-center transition-all duration-500 bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#15179B] group-hover:to-transparent group-hover:-translate-y-1">
                {card.title}
              </h3>

              <div className="relative w-full h-[350px] flex justify-center items-center mb-6 overflow-hidden">
                <img
                  src="/MAIN OBJECT 1.png"
                  alt={`${card.title} Illustration`}
                  className="relative z-0 w-full h-full object-contain drop-shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-500"
                />

                <div className="absolute top-[13%] bottom-[12%] left-[33%] right-[33%] z-10 flex overflow-hidden rounded-md pointer-events-none">
                  <div className="relative w-1/2 h-full bg-[#050b14] border-r border-blue-500/20 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-x-full group-hover:opacity-0"></div>
                  <div className="relative w-1/2 h-full bg-[#050b14] border-l border-blue-500/20 shadow-[inset_10px_0_20px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-full group-hover:opacity-0"></div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10 mb-6 group-hover:bg-blue-400/60 transition-colors duration-500"></div>

              <button
                type="button"
                className="cursor-pointer bg-gradient-to-b from-[#fae27c] to-[#d6ad44] text-blue-950 font-bold text-sm tracking-wide px-8 py-2.5 rounded-full shadow-[0_0_15px_rgba(250,226,124,0.3)] group-hover:shadow-[0_0_25px_rgba(250,226,124,0.6)] group-hover:scale-105 hover:brightness-110 transition-all duration-300"
              >
                Discover
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}