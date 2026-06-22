'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A scroll-scrubbed, pinned, full-screen video section (every device, incl.
 * mobile — the scroll animation is intentional there too).
 *
 * The video is driven from the eased ScrollTrigger progress (disassemble →
 * reassemble plays forward as you scroll down). Geometry is measured immediately
 * (not gated on `loadedmetadata`) so the pin doesn't blank the page on a cold
 * first load, and seeks are skipped while one is in flight so fast scroll-ups
 * don't flood the decoder. Uses `100svh` + `object-cover` so the footage fills
 * the screen in responsive / portrait mode.
 *
 * Mobile-crash note: scrubbing seeks the decoder hard. To survive that on phones
 * the heavy hero WebGL canvas is UNMOUNTED once it scrolls out of view (see
 * SchoolModelBanner) so the GPU/decoder memory is free for this video by the time
 * you reach it — that's what stops the page from OOM-crashing here, rather than
 * removing the scrub.
 */
export default function ScrubVideo({
  src,
  title,
  subtitle,
  objectFit = 'cover',
  className = '',
  pingPong = false,
}) {
  const container = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const st = ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        // A sibling above this section uses a negative margin (GarimaImpact's
        // torn-paper overlap), which shifts this section's page position. Recompute
        // the pin start/end on every refresh so a layout shift can't leave the pin
        // measured against stale geometry (the cause of the robot-scrub regression).
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const d = video.duration;
          if (!d || Number.isNaN(d)) return;
          // pingPong maps scroll 0→1 to a triangle wave (0→1→0): the clip plays
          // forward to its midpoint then reverses, so a clip that only
          // disassembles still reads as disassemble → reassemble on scroll-down.
          const p = pingPong ? 1 - Math.abs(2 * self.progress - 1) : self.progress;
          const target = p * d;
          if (!video.seeking && Math.abs(video.currentTime - target) > 0.02) {
            video.currentTime = target;
          }
        },
      });

      const onMeta = () => {
        try {
          video.currentTime = 0.001;
        } catch (e) {
          /* not seekable yet */
        }
        ScrollTrigger.refresh();
      };
      if (video.readyState >= 1) onMeta();
      else video.addEventListener('loadedmetadata', onMeta, { once: true });

      return () => {
        st.kill();
        video.removeEventListener('loadedmetadata', onMeta);
      };
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className={`relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-black ${className}`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit }}
        src={src}
        muted
        playsInline
        preload="auto"
      />
      {(title || subtitle) && (
        <div className="pointer-events-none relative z-10 px-6 text-center mix-blend-difference">
          {title && (
            <h2 className="text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 font-mono text-lg text-blue-300 md:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
