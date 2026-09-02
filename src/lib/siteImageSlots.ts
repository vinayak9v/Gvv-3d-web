// Single source of truth for admin-uploadable "hero image" slots on public
// pages. Used by the admin Site Images panel (client-safe, no DB import) and
// by src/lib/siteImages.ts (server-only) to fall back to the original
// hardcoded image when nothing has been uploaded yet.

export type SiteImageSlot = {
  key: string;
  label: string;
  page: string;
  recommendedSize: string;
  defaultUrl: string;
};

export const SITE_IMAGE_SLOTS: SiteImageSlot[] = [
  {
    key: "uniform_hero",
    label: "Uniform Page — Hero Photo",
    page: "/uniform",
    recommendedSize:
      "Square photo, at least 780 × 780px (1:1 ratio). It's cropped into a circle, so keep the subject centered with some margin on all sides.",
    defaultUrl: "/ghj.webp",
  },
  {
    key: "process_hero",
    label: "Admission Process Page — Hero Background",
    page: "/process",
    recommendedSize:
      "Landscape photo, at least 1600 × 900px (16:9 or wider). It's a full-bleed background behind the text, so keep the main subject on the right/center — the left side is covered by a dark gradient on mobile.",
    defaultUrl: "/scc.webp",
  },
  {
    key: "fees_hero",
    label: "Fees Structure Page — Hero Background",
    page: "/fees",
    recommendedSize:
      "Landscape photo, at least 1600 × 900px (16:9 or wider). It's a full-bleed background behind the text, so keep the main subject on the right/center — the left side is covered by a dark gradient on mobile.",
    defaultUrl: "/io-copy.webp",
  },
  {
    key: "robotics_about",
    label: "Robotics Page — About Section Image (right side)",
    page: "/robotics",
    recommendedSize:
      "Landscape or square photo, at least 800 × 600px. It fills a 400px-tall box next to the About text, cropped with object-cover.",
    defaultUrl: "",
  },
  {
    key: "robotics_project_1",
    label: "Robotics Page — Project Showcase Photo 1",
    page: "/robotics",
    recommendedSize: "Square or landscape photo, at least 600 × 600px. Fills a 256px-tall gallery tile, cropped with object-cover.",
    defaultUrl: "",
  },
  {
    key: "robotics_project_2",
    label: "Robotics Page — Project Showcase Photo 2",
    page: "/robotics",
    recommendedSize: "Square or landscape photo, at least 600 × 600px. Fills a 256px-tall gallery tile, cropped with object-cover.",
    defaultUrl: "",
  },
  {
    key: "robotics_project_3",
    label: "Robotics Page — Project Showcase Photo 3",
    page: "/robotics",
    recommendedSize: "Square or landscape photo, at least 600 × 600px. Fills a 256px-tall gallery tile, cropped with object-cover.",
    defaultUrl: "",
  },
  {
    key: "robotics_project_4",
    label: "Robotics Page — Project Showcase Photo 4",
    page: "/robotics",
    recommendedSize: "Square or landscape photo, at least 600 × 600px. Fills a 256px-tall gallery tile, cropped with object-cover.",
    defaultUrl: "",
  },
  {
    key: "about_intro_learning_journey",
    label: "About / Introduction — Learning Journey Photo",
    page: "/about/introduction",
    recommendedSize: "Landscape photo, at least 800 × 400px.",
    defaultUrl: "/img/photo-1577896851231-70ef18881754.webp",
  },
  {
    key: "about_intro_establishment",
    label: "About / Introduction — Establishment & Legacy Photo",
    page: "/about/introduction",
    recommendedSize: "Landscape photo, at least 800 × 450px.",
    defaultUrl: "/img/photo-1523050854058-8df90110c9f1.webp",
  },
  {
    key: "about_intro_cbse_quality",
    label: "About / Introduction — CBSE Affiliation & Quality Photo",
    page: "/about/introduction",
    recommendedSize: "Landscape photo, at least 800 × 450px.",
    defaultUrl: "/img/photo-1503676260728-1c00da094a0b.webp",
  },
  {
    key: "about_affiliation_details",
    label: "About / Affiliation — Affiliation Details Photo",
    page: "/about/affiliation",
    recommendedSize: "Landscape photo, at least 800 × 400px.",
    defaultUrl: "/img/photo-1523050854058-8df90110c9f1.webp",
  },
  {
    key: "about_affiliation_infrastructure",
    label: "About / Affiliation — Infrastructure & Guidelines Photo",
    page: "/about/affiliation",
    recommendedSize: "Landscape photo, at least 800 × 400px.",
    defaultUrl: "/img/photo-1577896851231-70ef18881754.webp",
  },
  {
    key: "about_affiliation_quality",
    label: "About / Affiliation — Quality of Education Photo",
    page: "/about/affiliation",
    recommendedSize: "Landscape photo, at least 800 × 400px.",
    defaultUrl: "/img/photo-1503676260728-1c00da094a0b.webp",
  },
  {
    key: "about_management_president",
    label: "About / Management — President's Photo (Mr. Mohanlal Ji Bagora)",
    page: "/about/management",
    recommendedSize: "Portrait photo, at least 800 × 1000px (4:5 ratio).",
    defaultUrl: "/img/photo-1560250097-0b93528c311a.webp",
  },
  {
    key: "about_management_director_santosh",
    label: "About / Management — Director's Photo (Mr. Santosh Bagora)",
    page: "/about/management",
    recommendedSize: "Portrait photo, at least 800 × 1000px (4:5 ratio).",
    defaultUrl: "/img/photo-1519085360753-af0119f7cbe7.webp",
  },
  {
    key: "about_management_director_rama",
    label: "About / Management — Director's Photo (Mrs. Rama Sharma)",
    page: "/about/management",
    recommendedSize: "Portrait photo, at least 800 × 1000px (4:5 ratio).",
    defaultUrl: "/img/photo-1573496359142-b8d87734a5a2.webp",
  },
  {
    key: "about_management_principal",
    label: "About / Management — Principal's Photo (Mr. Madhav Mantri)",
    page: "/about/management",
    recommendedSize: "Portrait photo, at least 800 × 1000px (4:5 ratio).",
    defaultUrl: "/img/photo-1537511446984-935f663eb1f4.webp",
  },
];

export function findSiteImageSlot(key: string): SiteImageSlot | undefined {
  return SITE_IMAGE_SLOTS.find((s) => s.key === key);
}
