'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveGallery() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('All');

  // States for fetching dynamic data
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Categories generation based on fetched data
  const [categories, setCategories] = useState(['All']);

  // Fetch Data from Backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const result = await res.json();

        if (result.success) {
          const items = result.data;
          setGalleryItems(items);

          // Dynamically extract unique categories and add 'All' at the beginning
          const uniqueCategories = ['All', ...new Set(items.map(item => item.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Filter images based on active tab
  const filteredImages = activeTab === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  // Initial Scroll Animation
  useGSAP(() => {
    if (loading) return;

    gsap.fromTo(
      ".gallery-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );
  }, { dependencies: [loading], scope: containerRef });

  // Animation when tab changes or data loads
  useGSAP(() => {
    if (galleryItems.length === 0) return;

    gsap.fromTo(
      ".gallery-item",
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, { dependencies: [activeTab, galleryItems], scope: containerRef });

  return (
   <PageShell>
     <section
      ref={containerRef}
      className="font-sans relative overflow-hidden min-h-screen pt-20 pb-20"
    >
      <div className="max-w-7xl mx-auto relative z-10 px-6">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h4 className="gallery-header-elem text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2 opacity-0">
            Visual Journey
          </h4>
          <h2 className="gallery-header-elem text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 opacity-0">
            Photo Gallery
          </h2>
          <p className="gallery-header-elem text-slate-300 max-w-2xl mx-auto opacity-0">
            A glimpse into the vibrant life, state-of-the-art infrastructure, and memorable events at our institution.
          </p>
          <div className="gallery-header-elem w-24 h-[4px] bg-[#E9C84A] mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(233,200,74,0.3)] opacity-0"></div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-white animate-pulse text-xl">Loading Images...</div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="gallery-header-elem opacity-0 flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activeTab === category
                      ? 'bg-[#00c6ff] border-[#00c6ff] text-white shadow-[0_0_15px_rgba(0,198,255,0.4)]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-[#00c6ff]/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item opacity-0 group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg aspect-[4/3] cursor-pointer"
                >
                  {/* Image */}
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a122e]/90 via-[#0a122e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="inline-block px-3 py-1 bg-[#E9C84A]/90 text-[#0a122e] text-xs font-bold uppercase tracking-wider rounded-full mb-2 w-max translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State fallback */}
            {filteredImages.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg">No images available for this category.</p>
              </div>
            )}
          </>
        )}

      </div>
    </section>
   </PageShell>
  );
}
