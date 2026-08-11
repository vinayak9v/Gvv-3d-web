'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageShell from '@/components/landing/PageShell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function DownloadForms() {
  const containerRef = useRef(null);
  const [pdfForms, setPdfForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/forms');
        const result = await res.json();
        if (result.success) {
          setPdfForms(result.data);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // GSAP Animation handles dynamic data via dependencies array
  useGSAP(() => {
    if (pdfForms.length === 0) return; // Skip if no data yet

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate Header
    tl.fromTo(
      ".form-header-elem",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    )
    // Animate Cards
    .fromTo(
      ".form-card",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
  }, { scope: containerRef, dependencies: [pdfForms] });

  return (
   <PageShell>
     <section
      ref={containerRef}
      className="font-sans relative overflow-hidden min-h-screen pt-20 pb-20"
    >
      <div className="max-w-7xl mx-auto relative z-10 px-6">

        {/* Header Section */}
        <div className="text-center mb-16 opacity-0 form-header-elem">
          <h4 className="text-[#00c6ff] font-semibold tracking-wide uppercase text-sm mb-2">
            Document Center
          </h4>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Downloadable Forms
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Access and download essential school forms in PDF format for admissions, medical records, transport, and more.
          </p>
          <div className="w-24 h-[4px] bg-[#E9C84A] mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(233,200,74,0.3)]"></div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-white py-10 animate-pulse text-xl">Loading Forms...</div>
        ) : pdfForms.length === 0 ? (
          <div className="text-center text-slate-400 py-10">No forms available at the moment.</div>
        ) : (
          /* PDF Forms Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfForms.map((form) => (
              <div
                key={form.id}
                className="form-card opacity-0 bg-white/[0.03] backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-[#00c6ff]/30 hover:shadow-[0_10px_30px_rgba(0,198,255,0.15)] transition-all duration-300 group flex flex-col"
              >
                {/* Card Header (Icon & Title) */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all duration-300 shadow-sm">
                    {/* PDF Icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-[#00c6ff] transition-colors duration-300 mb-1">
                      {form.title}
                    </h3>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-slate-300 border border-white/5">
                      PDF • {form.file_size}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300/80 text-sm leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-300 flex-grow">
                  {form.description}
                </p>

                {/* Download Button */}
                <a
                  href={form.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-[#00c6ff] text-sm font-semibold group-hover:bg-[#00c6ff] group-hover:text-white transition-all duration-300"
                >
                  Download PDF
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
   </PageShell>
  );
}
