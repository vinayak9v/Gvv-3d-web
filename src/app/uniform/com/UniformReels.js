'use client';

import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';

const REELS = [
  { src: '/unifome/uniform-1.mp4', title: 'Full Uniform Look' },
  { src: '/unifome/uniform-2.mp4', title: 'Everyday Uniform' },
  { src: '/unifome/uniform-3.mp4', title: 'Sports Uniform' },
  { src: '/unifome/uniform-4.mp4', title: 'Winter Uniform' },
  { src: '/unifome/uniform-5.mp4', title: 'Uniform Detailing' },
  { src: '/unifome/uniform-6.mp4', title: 'Student Style' },
];

function ReelCard({ src, title }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  // Touch devices have no hover, so tapping still toggles play/pause.
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div
      ref={containerRef}
      onClick={togglePlay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-[220px] sm:w-[250px] md:w-[270px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-lg snap-center cursor-pointer group"
    >
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Top gradient + title */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent">
        <p className="text-white text-xs font-semibold tracking-wide uppercase drop-shadow">
          {title}
        </p>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Pause indicator */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/40 rounded-full p-4">
            <Pause size={28} className="text-white" fill="white" />
          </div>
        </div>
      )}

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 transition-colors rounded-full p-2 z-10"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          <VolumeX size={16} className="text-white" />
        ) : (
          <Volume2 size={16} className="text-white" />
        )}
      </button>
    </div>
  );
}

export default function UniformReels() {
  return (
    <div className="bg-[#f6fbff] pt-4 pb-14 print:hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#0a1930] uppercase">
            Uniform In Action
          </h2>
          <div className="flex items-center mt-3">
            <div className="h-[2px] bg-[#facc15] w-10"></div>
            <div className="w-2 h-2 bg-[#facc15] rotate-45 mx-2"></div>
            <div className="h-[2px] bg-[#facc15] w-10"></div>
          </div>
          <p className="text-sm text-slate-600 mt-3 max-w-md">
            A quick look at our students in uniform, across seasons and occasions.
          </p>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {REELS.map((reel, i) => (
            <ReelCard key={i} src={reel.src} title={reel.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
