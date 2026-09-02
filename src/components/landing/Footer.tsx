import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const admissionsLinks = [
  { label: 'Admission Process 2026-27', href: '/process' },
  { label: 'Fees Structure 2026-27', href: '/fees' },
  { label: 'GVV Uniform', href: '/uniform' },
];

const curriculumLinks = [
  { label: 'Annual Curriculum Planner-2025-26', href: '/academic/planner' },
  { label: 'Academic Calendar – 2025-26', href: '/academic/calendar' },
  { label: 'Book List– 2026-27', href: '/academic/books' },
];

const aboutLinks = [
  { label: 'Introduction', href: '/about/introduction' },
  { label: 'Affiliation Code', href: '/about/affiliation' },
  { label: 'Quality of Education', href: '/about/introduction' },
  { label: 'Establishment', href: '/about/establishment-legacy' },
  { label: 'Mission Statement', href: '/about/introduction' },
  { label: 'Vision Statement', href: '/about/introduction' },
  { label: 'Our Committee', href: '/about/committees' },
  { label: 'Management', href: '/about/management' },
  { label: 'Student Strength', href: '/about/strength' },
  { label: 'Staff', href: '/about/management' },
  { label: 'Annual Report', href: '/about/report' },
];

const discoverLinks = [
  { label: 'Mandatory Disclosures', href: '/mandatory-disclosures' },
  { label: 'Transfer Certificate', href: '/tc-download' },
  { label: 'Articles / Blogs', href: '/articles' },
  { label: 'Gallery', href: '/about/gallery-media' },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/GarimaVidyaViharSchool/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.6-1.5H16.5V4.3c-.28-.04-1.25-.13-2.37-.13-2.35 0-3.96 1.44-3.96 4.07V10.5H8v3h2.17V21h3.33Z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/GVVSchool',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22 5.9c-.68.31-1.42.51-2.19.61a3.8 3.8 0 0 0 1.67-2.1c-.74.44-1.56.76-2.43.94A3.78 3.78 0 0 0 12.6 8.7a10.7 10.7 0 0 1-7.8-3.95 3.78 3.78 0 0 0 1.17 5.05c-.62-.02-1.2-.19-1.7-.47v.05a3.78 3.78 0 0 0 3.03 3.7 3.8 3.8 0 0 1-1.7.06 3.78 3.78 0 0 0 3.53 2.63A7.6 7.6 0 0 1 2 17.54a10.7 10.7 0 0 0 5.8 1.7c6.96 0 10.77-5.77 10.77-10.77l-.01-.49A7.7 7.7 0 0 0 22 5.9Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCwYBpcOBXCtx7U-JHmwdeOg',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M21.6 7.2s-.21-1.48-.86-2.13c-.82-.86-1.74-.86-2.16-.91C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.16c-.42.05-1.34.05-2.16.91-.65.65-.86 2.13-.86 2.13S2.18 8.94 2.18 10.68v1.63c0 1.74.21 3.48.21 3.48s.21 1.48.86 2.13c.82.86 1.9.83 2.38.92 1.73.17 7.37.22 7.37.22s3.6-.01 6.58-.17c.42-.05 1.34-.05 2.16-.91.65-.65.86-2.13.86-2.13s.21-1.74.21-3.48v-1.63c0-1.74-.21-3.48-.21-3.48ZM9.99 14.98V8.98l5.8 3-5.8 3Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/garima_vidyavihar/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43A4.9 4.9 0 0 1 3.82 3c.5-.5 1.05-.87 1.77-1.15.46-.16 1.26-.35 2.43-.4C9.29 2.21 9.67 2.2 12.87 2.2H12Zm0 1.8c-3.15 0-3.5.01-4.74.07-1 .05-1.54.21-1.9.35-.48.19-.82.41-1.18.77-.36.36-.58.7-.77 1.18-.14.36-.3.9-.35 1.9-.06 1.24-.07 1.59-.07 4.73s.01 3.5.07 4.74c.05 1 .21 1.54.35 1.9.19.48.41.82.77 1.18.36.36.7.58 1.18.77.36.14.9.3 1.9.35 1.24.06 1.59.07 4.73.07s3.5-.01 4.74-.07c1-.05 1.54-.21 1.9-.35.48-.19.82-.41 1.18-.77.36-.36.58-.7.77-1.18.14-.36.3-.9.35-1.9.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1-.21-1.54-.35-1.9a3.1 3.1 0 0 0-.77-1.18 3.1 3.1 0 0 0-1.18-.77c-.36-.14-.9-.3-1.9-.35-1.24-.06-1.59-.07-4.74-.07Zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.85-2a1.08 1.08 0 1 1-2.15 0 1.08 1.08 0 0 1 2.15 0Z" />
      </svg>
    ),
  },
];

function FooterLinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-white text-lg font-semibold mb-6">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm leading-snug">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full flex flex-col font-sans mt-auto">

      <div className="w-full bg-[#020b3a] py-16 px-6 md:px-12 flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Garima Vidhya Vihar Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white text-lg font-bold leading-tight tracking-wide">
                  GARIMA VIDHYA VIHAR
                </h3>
                <p className="text-gray-300 text-[10px] tracking-wider mt-0.5">
                  SR. SECONDARY SCHOOL
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Shaping thinkers, building innovators — a CBSE Senior Secondary school with MP&apos;s first humanoid robot assistant.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F5C842] text-white hover:text-[#020b3a] flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterLinkList title="Admissions" links={admissionsLinks} />
          <FooterLinkList title="Curriculum" links={curriculumLinks} />
          <FooterLinkList title="About Us" links={aboutLinks} />
          <FooterLinkList title="Discover More" links={discoverLinks} />

        </div>
      </div>

      <div className="w-full bg-[#020b3a] border-t border-white/10 py-10 px-6 md:px-12 flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-300">
          <div className="flex gap-3">
            <Phone size={18} className="text-[#F5C842] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <a href="tel:+917049494919" className="hover:text-white transition-colors">+91 7049494919</a>
              <a href="tel:+919009600032" className="hover:text-white transition-colors">+91 9009600032</a>
              <a href="tel:07312635000" className="hover:text-white transition-colors">0731-2635000</a>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail size={18} className="text-[#F5C842] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <a href="mailto:info@garimaschool.com" className="hover:text-white transition-colors">info@garimaschool.com</a>
              <a href="mailto:redressal@garimaschool.com" className="hover:text-white transition-colors">redressal@garimaschool.com</a>
              <a href="mailto:principal@garimaschool.com" className="hover:text-white transition-colors">principal@garimaschool.com</a>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin size={18} className="text-[#F5C842] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-2">
              <p className="leading-relaxed">Paul Hill, Airport Road, Opposite Bijasan Mata Temple, Shakti Nagar, Indore, Madhya Pradesh 452005</p>
              <p className="leading-relaxed text-gray-400">City Office: 32 Kila Road, Indore, Madhya Pradesh 452015</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#0c1ca3] py-5 px-4 text-center">
        <p className="text-gray-200 text-sm">
          &copy; 2023 Garima Vidhya Vihar Shiksha Avam Samaj Sewa Sanstha
        </p>
      </div>

    </footer>
  );
}
