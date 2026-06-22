"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  useGSAP(
    () => {
      console.log('[Navbar] useGSAP fired, ref:', ref.current);
      const tl = gsap.timeline();
      tl.from(ref.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          '.navbar-brand',
          { x: -20, opacity: 0, duration: 0.6, ease: 'power2.out' },
          0.3,
        )
        .from(
          '.navbar-link',
          {
            y: -10,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.5,
        )
        .from(
          '.navbar-cta',
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.6,
            ease: 'back.out(1.5)',
          },
          0.9,
        );
    },
    { scope: ref },
  );

  const toggleMobileSubmenu = (menu: string) => {
    setExpandedMobileMenu(expandedMobileMenu === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileMenu(null);
  };

  // Dropdown data
  const admissionItems = [
    { label: "ADMISSION PROCESS 2026-27", href: "/process" },
    { label: "FEES STRUCTURE 2026-27", href: "/fees" },
    { label: "GVV UNIFORM", href: "/uniform" },
  ];

  const curriculumItems = [
    { label: "Annual Curriculum Planner-2025-26", href: "/academic/planner" },
    { label: "Academic Calendar – 2025-26", href: "/academic/calendar" },
    { label: "Book List– 2026-27", href: "/academic/books" },
  ];

  const aboutItems = [
    { label: "Introduction", href: "/about/introduction" },
    { label: "AFFILIATION CODE", href: "/about/affiliation" },
    { label: "QUALITY OF EDUCATION", href: "/about/quality" },
    { label: "ESTABLISHMENT", href: "/about/establishment" },
    { label: "MISSION STATEMENT", href: "/about/mission" },
    { label: "VISION STATEMENT", href: "/about/vision" },
    { label: "Our committee", href: "/about/committee" },
    { label: "Management", href: "/about/management" },
    { label: "Student strength", href: "/about/strength" },
    { label: "Staff", href: "/about/staff" },
    { label: "Annual Report", href: "/about/report" },
  ];

  return (
    <nav ref={ref} className="relative z-50 flex items-center justify-between px-6 md:px-8 py-4 w-[90%] max-w-6xl mx-auto mt-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">

      <Link href="/" className="navbar-brand flex items-center gap-3 group">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-xs overflow-hidden shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-white font-bold text-sm md:text-base tracking-wide group-hover:text-yellow-400 transition-colors">
            GARIMA VIDHYA VIHAR
          </h1>
          <p className="text-blue-200 text-[10px] md:text-xs">
            SR. SECONDARY SCHOOL
          </p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
        
        {/* Admission Dropdown */}
        <div className="navbar-link relative group">
          <Link href="/admission" className="flex items-center gap-1 hover:text-yellow-400 transition-colors py-4">
            Admission <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
          </Link>
          <div className="absolute top-[100%] left-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#08123b]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl flex flex-col p-2">
            {admissionItems.map((item, idx) => (
              <Link key={idx} href={item.href} className="px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-yellow-400 rounded-lg transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Curriculum Dropdown */}
        <div className="navbar-link relative group">
          <Link href="/academic" className="flex items-center gap-1 hover:text-yellow-400 transition-colors py-4">
            Curriculum <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
          </Link>
          <div className="absolute top-[100%] left-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#08123b]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl flex flex-col p-2">
            {curriculumItems.map((item, idx) => (
              <Link key={idx} href={item.href} className="px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-yellow-400 rounded-lg transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* About Us Dropdown */}
        <div className="navbar-link relative group">
          <Link href="/about" className="flex items-center gap-1 hover:text-yellow-400 transition-colors py-4">
            About Us <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
          </Link>
          <div className="absolute top-[100%] left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#08123b]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl flex flex-col p-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {aboutItems.map((item, idx) => (
              <Link key={idx} href={item.href} className="px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-yellow-400 rounded-lg transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      <div className="hidden md:block">
        <Link
          href="/contact"
          className="navbar-cta bg-[#EED165] border border-[#C79F32] text-black px-5 py-2 rounded-full text-sm font-medium flex items-center gap-3 hover:bg-[#E3C556] transition-colors shadow-sm"
        >
          Contact Us
          <div className="w-3.5 h-3.5 bg-[#005AA3]"></div>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white hover:text-yellow-400 transition-colors p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[110%] left-0 w-full bg-[#08123b]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col p-4 gap-2 md:hidden animate-in fade-in slide-in-from-top-4 duration-200 overflow-y-auto max-h-[80vh]">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center justify-between text-white font-medium hover:text-yellow-400 transition-colors p-3 bg-white/5 rounded-xl"
          >
            Home
          </Link>

          {/* Mobile Admission */}
          <div className="flex flex-col bg-white/5 rounded-xl overflow-hidden transition-all">
            <button 
              onClick={() => toggleMobileSubmenu('admission')}
              className="flex items-center justify-between text-white font-medium hover:text-yellow-400 p-3 w-full text-left"
            >
              Admission <ChevronDown size={16} className={`transition-transform ${expandedMobileMenu === 'admission' ? 'rotate-180' : ''}`} />
            </button>
            {expandedMobileMenu === 'admission' && (
              <div className="flex flex-col px-4 pb-3 gap-2 border-t border-white/10 pt-2 bg-black/20">
                {admissionItems.map((item, idx) => (
                  <Link key={idx} href={item.href} onClick={closeMobileMenu} className="text-sm text-white/80 hover:text-yellow-400 py-1">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Curriculum */}
          <div className="flex flex-col bg-white/5 rounded-xl overflow-hidden transition-all">
            <button 
              onClick={() => toggleMobileSubmenu('curriculum')}
              className="flex items-center justify-between text-white font-medium hover:text-yellow-400 p-3 w-full text-left"
            >
              Curriculum <ChevronDown size={16} className={`transition-transform ${expandedMobileMenu === 'curriculum' ? 'rotate-180' : ''}`} />
            </button>
            {expandedMobileMenu === 'curriculum' && (
              <div className="flex flex-col px-4 pb-3 gap-2 border-t border-white/10 pt-2 bg-black/20">
                {curriculumItems.map((item, idx) => (
                  <Link key={idx} href={item.href} onClick={closeMobileMenu} className="text-sm text-white/80 hover:text-yellow-400 py-1">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile About Us */}
          <div className="flex flex-col bg-white/5 rounded-xl overflow-hidden transition-all">
            <button 
              onClick={() => toggleMobileSubmenu('about')}
              className="flex items-center justify-between text-white font-medium hover:text-yellow-400 p-3 w-full text-left"
            >
              About Us <ChevronDown size={16} className={`transition-transform ${expandedMobileMenu === 'about' ? 'rotate-180' : ''}`} />
            </button>
            {expandedMobileMenu === 'about' && (
              <div className="flex flex-col px-4 pb-3 gap-2 border-t border-white/10 pt-2 bg-black/20">
                {aboutItems.map((item, idx) => (
                  <Link key={idx} href={item.href} onClick={closeMobileMenu} className="text-sm text-white/80 hover:text-yellow-400 py-1">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 pt-4 border-t border-white/10 flex justify-center">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="w-full bg-[#EED165] border border-[#C79F32] text-black px-5 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-3 hover:bg-[#E3C556] transition-colors shadow-sm"
            >
              Contact Us
              <div className="w-3.5 h-3.5 bg-[#005AA3]"></div>
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
}