"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { aboutLinks, academicGroups, admissionLinks, eventLinks, type NavLink } from '@/lib/siteNav';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  useGSAP(
    () => {
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
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-white text-sm font-medium">
        <DesktopMenu label="Admissions" href="/admission" links={admissionLinks} />

        {/* Academics: grouped mega menu */}
        <div className="navbar-link relative group">
          <Link href="/academic" className="flex items-center gap-1 hover:text-yellow-400 transition-colors py-4">
            Academics <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
          </Link>
          <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[640px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#08123b]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl grid grid-cols-4 gap-2 p-4 text-left">
            {academicGroups.map((group) => (
              <div key={group.title} className="flex flex-col">
                <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-[#EED165]">{group.title}</p>
                {group.links.map((item) => (
                  <Link key={item.label} href={item.href} className="px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-yellow-400 rounded-lg transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <DesktopMenu label="Events and Activities" href="/events/school-events" links={eventLinks} />
        <DesktopMenu label="About Us" href="/about" links={aboutLinks} />
      </div>

      <div className="hidden md:block">
        <Link
          href="/contact"
          className="navbar-cta bg-[#EED165] border border-[#C79F32] text-black px-5 py-2 rounded-full text-sm font-medium flex items-center gap-3 hover:bg-[#E3C556] transition-colors shadow-sm"
        >
          Contact Us
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#005AA3]">
            <Phone size={12} className="text-white" fill="currentColor" />
          </div>
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
        <div className="absolute top-[110%] left-0 w-full text-left bg-[#08123b]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col p-4 gap-2 md:hidden animate-in fade-in slide-in-from-top-4 duration-200 overflow-y-auto max-h-[80vh]">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center justify-between text-white font-medium hover:text-yellow-400 transition-colors p-3 bg-white/5 rounded-xl"
          >
            Home
          </Link>

          <MobileMenu
            id="admission"
            label="Admissions"
            groups={[{ title: '', links: admissionLinks }]}
            expanded={expandedMobileMenu}
            onToggle={toggleMobileSubmenu}
            onNavigate={closeMobileMenu}
          />
          <MobileMenu
            id="academics"
            label="Academics"
            groups={academicGroups}
            expanded={expandedMobileMenu}
            onToggle={toggleMobileSubmenu}
            onNavigate={closeMobileMenu}
          />
          <MobileMenu
            id="events"
            label="Events and Activities"
            groups={[{ title: '', links: eventLinks }]}
            expanded={expandedMobileMenu}
            onToggle={toggleMobileSubmenu}
            onNavigate={closeMobileMenu}
          />
          <MobileMenu
            id="about"
            label="About Us"
            groups={[{ title: '', links: aboutLinks }]}
            expanded={expandedMobileMenu}
            onToggle={toggleMobileSubmenu}
            onNavigate={closeMobileMenu}
          />

          <div className="mt-2 pt-4 border-t border-white/10 flex justify-center">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="w-full bg-[#EED165] border border-[#C79F32] text-black px-5 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-3 hover:bg-[#E3C556] transition-colors shadow-sm"
            >
              Contact Us
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#005AA3]">
                <Phone size={12} className="text-white" fill="currentColor" />
              </div>
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
}

function DesktopMenu({ label, href, links }: { label: string; href: string; links: NavLink[] }) {
  return (
    <div className="navbar-link relative group">
      <Link href={href} className="flex items-center gap-1 whitespace-nowrap hover:text-yellow-400 transition-colors py-4">
        {label} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
      </Link>
      <div className="absolute top-[100%] left-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#08123b]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl flex flex-col p-2 text-left max-h-[70vh] overflow-y-auto custom-scrollbar">
        {links.map((item) => (
          <Link key={item.label} href={item.href} className="px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-yellow-400 rounded-lg transition-colors">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({
  id,
  label,
  groups,
  expanded,
  onToggle,
  onNavigate,
}: {
  id: string;
  label: string;
  groups: { title: string; links: NavLink[] }[];
  expanded: string | null;
  onToggle: (menu: string) => void;
  onNavigate: () => void;
}) {
  const isOpen = expanded === id;
  return (
    <div className="flex flex-col bg-white/5 rounded-xl overflow-hidden transition-all">
      <button
        onClick={() => onToggle(id)}
        className="flex items-center justify-between text-white font-medium hover:text-yellow-400 p-3 w-full text-left"
      >
        {label} <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="flex flex-col px-4 pb-3 gap-2 border-t border-white/10 pt-2 bg-black/20">
          {groups.map((group) => (
            <div key={group.title || id} className="flex flex-col gap-2">
              {group.title && (
                <p className="pt-1 text-xs font-bold uppercase tracking-wider text-[#EED165]">{group.title}</p>
              )}
              {group.links.map((item) => (
                <Link key={item.label} href={item.href} onClick={onNavigate} className="text-sm text-white/80 hover:text-yellow-400 py-1">
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
