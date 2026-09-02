// Single source of truth for which routes have admin-editable SEO fields.
// Used by the admin SEO panel (client-safe, no DB import) and by each
// route's layout.tsx (via src/lib/seo.ts) to fall back to sensible
// defaults when no override has been saved yet.

export type SeoPageDef = {
  route: string;
  label: string;
  group: string;
  defaultTitle: string;
  defaultDescription: string;
};

export const SEO_PAGES: SeoPageDef[] = [
  {
    route: "/",
    label: "Home",
    group: "Main",
    defaultTitle: "Garima Vidhya Vihar | Senior Secondary School",
    defaultDescription:
      "Garima Vidhya Vihar — shaping thinkers, building innovators. CBSE Senior Secondary school with MP's first humanoid robot assistant.",
  },
  {
    route: "/about",
    label: "About Us",
    group: "About",
    defaultTitle: "About Us | Garima Vidhya Vihar",
    defaultDescription: "Learn about Garima Vidhya Vihar's history, mission, vision and values.",
  },
  {
    route: "/about/introduction",
    label: "About – Introduction",
    group: "About",
    defaultTitle: "Introduction | Garima Vidhya Vihar",
    defaultDescription: "An introduction to Garima Vidhya Vihar — our quality of education and vision statement.",
  },
  {
    route: "/about/affiliation",
    label: "About – Affiliation Code",
    group: "About",
    defaultTitle: "Affiliation Code | Garima Vidhya Vihar",
    defaultDescription: "CBSE affiliation code and recognition details for Garima Vidhya Vihar.",
  },
  {
    route: "/about/alumni",
    label: "About – Alumni",
    group: "About",
    defaultTitle: "Alumni | Garima Vidhya Vihar",
    defaultDescription: "Meet the alumni of Garima Vidhya Vihar and their journeys after school.",
  },
  {
    route: "/about/committees",
    label: "About – Our Committee",
    group: "About",
    defaultTitle: "Our Committee | Garima Vidhya Vihar",
    defaultDescription: "The committees that help govern and guide Garima Vidhya Vihar.",
  },
  {
    route: "/about/establishment-legacy",
    label: "About – Establishment & Legacy",
    group: "About",
    defaultTitle: "Establishment & Legacy | Garima Vidhya Vihar",
    defaultDescription: "The history and legacy behind the establishment of Garima Vidhya Vihar.",
  },
  {
    route: "/about/gallery-media",
    label: "About – Gallery & Media",
    group: "About",
    defaultTitle: "Gallery & Media | Garima Vidhya Vihar",
    defaultDescription: "Photos and media from life at Garima Vidhya Vihar.",
  },
  {
    route: "/about/management",
    label: "About – Management",
    group: "About",
    defaultTitle: "Management & Staff | Garima Vidhya Vihar",
    defaultDescription: "Meet the management and staff of Garima Vidhya Vihar.",
  },
  {
    route: "/about/report",
    label: "About – Annual Report",
    group: "About",
    defaultTitle: "Annual Report | Garima Vidhya Vihar",
    defaultDescription: "The annual report of Garima Vidhya Vihar's academic and institutional progress.",
  },
  {
    route: "/about/resources",
    label: "About – Resources",
    group: "About",
    defaultTitle: "Resources | Garima Vidhya Vihar",
    defaultDescription: "Learning resources and facilities available at Garima Vidhya Vihar.",
  },
  {
    route: "/about/safety-security",
    label: "About – Safety & Security",
    group: "About",
    defaultTitle: "Safety & Security | Garima Vidhya Vihar",
    defaultDescription: "How Garima Vidhya Vihar keeps students safe and secure on campus.",
  },
  {
    route: "/about/school-wings",
    label: "About – School Wings",
    group: "About",
    defaultTitle: "School Wings | Garima Vidhya Vihar",
    defaultDescription: "The different academic wings and stages of schooling at Garima Vidhya Vihar.",
  },
  {
    route: "/about/strength",
    label: "About – Student Strength",
    group: "About",
    defaultTitle: "Student Strength | Garima Vidhya Vihar",
    defaultDescription: "Student enrolment and strength details at Garima Vidhya Vihar.",
  },
  {
    route: "/about/transport",
    label: "About – Transport",
    group: "About",
    defaultTitle: "Transport | Garima Vidhya Vihar",
    defaultDescription: "School transport and bus route information for Garima Vidhya Vihar.",
  },
  {
    route: "/about/what-we-offer",
    label: "About – What We Offer",
    group: "About",
    defaultTitle: "What We Offer | Garima Vidhya Vihar",
    defaultDescription: "Academic and extracurricular offerings at Garima Vidhya Vihar.",
  },
  {
    route: "/about/achievements",
    label: "About – Achievements",
    group: "About",
    defaultTitle: "Achievements | Garima Vidhya Vihar",
    defaultDescription: "Notable achievements and accolades of Garima Vidhya Vihar and its students.",
  },
  {
    route: "/academic",
    label: "Curriculum",
    group: "Academic",
    defaultTitle: "Curriculum | Garima Vidhya Vihar",
    defaultDescription: "An interactive walkthrough of academics, values, mission and vision at Garima Vidhya Vihar.",
  },
  {
    route: "/academic/planner",
    label: "Academic – Curriculum Planner",
    group: "Academic",
    defaultTitle: "Annual Curriculum Planner | Garima Vidhya Vihar",
    defaultDescription: "Download the annual curriculum planner for Garima Vidhya Vihar.",
  },
  {
    route: "/academic/calendar",
    label: "Academic – Calendar",
    group: "Academic",
    defaultTitle: "Academic Calendar | Garima Vidhya Vihar",
    defaultDescription: "The academic calendar of important dates and events at Garima Vidhya Vihar.",
  },
  {
    route: "/academic/books",
    label: "Academic – Book List",
    group: "Academic",
    defaultTitle: "Book List | Garima Vidhya Vihar",
    defaultDescription: "The class-wise book list for Garima Vidhya Vihar.",
  },
  {
    route: "/admission",
    label: "Admission",
    group: "Admissions",
    defaultTitle: "Admission | Garima Vidhya Vihar",
    defaultDescription: "Admission information for Garima Vidhya Vihar, a CBSE Senior Secondary school.",
  },
  {
    route: "/process",
    label: "Admission Process",
    group: "Admissions",
    defaultTitle: "Admission Process | Garima Vidhya Vihar",
    defaultDescription: "Step-by-step admission process for Garima Vidhya Vihar.",
  },
  {
    route: "/fees",
    label: "Fees Structure",
    group: "Admissions",
    defaultTitle: "Fees Structure | Garima Vidhya Vihar",
    defaultDescription: "Class-wise fee structure for Garima Vidhya Vihar.",
  },
  {
    route: "/uniform",
    label: "GVV Uniform",
    group: "Admissions",
    defaultTitle: "GVV Uniform | Garima Vidhya Vihar",
    defaultDescription: "Uniform guidelines and highlights for Garima Vidhya Vihar students.",
  },
  {
    route: "/co-curricular",
    label: "Co-Curricular",
    group: "Main",
    defaultTitle: "Co-Curricular | Garima Vidhya Vihar",
    defaultDescription: "Clubs, sports, arts and activity programs at Garima Vidhya Vihar.",
  },
  {
    route: "/robotics",
    label: "Robotics Lab",
    group: "Main",
    defaultTitle: "Robotics Lab | Garima Vidhya Vihar",
    defaultDescription: "Building the next generation of automated systems, AI-driven machinery, and intelligent robotics at Garima Vidhya Vihar.",
  },
  {
    route: "/contact",
    label: "Contact Us",
    group: "Main",
    defaultTitle: "Contact Us | Garima Vidhya Vihar",
    defaultDescription: "Get in touch with Garima Vidhya Vihar.",
  },
];

export function findSeoPage(route: string): SeoPageDef | undefined {
  return SEO_PAGES.find((p) => p.route === route);
}
