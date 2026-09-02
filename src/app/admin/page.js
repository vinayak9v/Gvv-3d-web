"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Inbox,
  Wallet,
  Trophy,
  Images,
  Building2,
  BookOpen,
  CalendarDays,
  Library,
  FileText,
  Users,
  UserSquare2,
  LogOut,
  ExternalLink,
  Search,
  Image as ImageIcon,
} from "lucide-react";
// Ensure these paths match your folder structure exactly!
import Enquiries from "./com/Enquiries";
import Fee from "./com/Fee";
import Achievements from "./com/Achievements";
import Gallery from "./com/Gallery";
import Facilities from "./com/Facilities";
import Curriculum from "./com/Curriculum";
import Calendar from "./com/Calendar";
import BookList from "./com/BookList";
import Forms from "./com/Forms";
import SEO from "./com/SEO";
import SiteImages from "./com/SiteImages";

// --- Mock Data for Staff and Members ---
const mockStaff = [
  { id: 1, name: "Dr. Amit Singh", role: "Professor", department: "Computer Science" },
  { id: 2, name: "Neha Gupta", role: "Administrator", department: "Admissions Office" },
];

const mockMembers = [
  { id: 1, name: "Vikram Verma", type: "Alumni", joinYear: "2020" },
  { id: 2, name: "Suresh Kumar", type: "Board Member", joinYear: "2015" },
];

const NAV_GROUPS = [
  {
    label: "Admissions",
    items: [
      { key: "admissions", label: "Admission Enquiry", icon: Inbox },
      { key: "fee", label: "Fee Management", icon: Wallet },
    ],
  },
  {
    label: "Content",
    items: [
      { key: "achievements", label: "Achievements", icon: Trophy },
      { key: "gallery", label: "Photo Gallery", icon: Images },
      { key: "facilities", label: "Facilities", icon: Building2 },
    ],
  },
  {
    label: "Academics",
    items: [
      { key: "curriculum", label: "Curriculum Planner", icon: BookOpen },
      { key: "calendar", label: "Academic Calendar", icon: CalendarDays },
      { key: "booklist", label: "Book Lists", icon: Library },
      { key: "forms", label: "Downloadable Forms", icon: FileText },
    ],
  },
  {
    label: "Directory",
    items: [
      { key: "staff", label: "Staff Directory", icon: Users },
      { key: "members", label: "Members", icon: UserSquare2 },
    ],
  },
  {
    label: "Marketing",
    items: [
      { key: "seo", label: "SEO", icon: Search },
      { key: "site-images", label: "Site Images", icon: ImageIcon },
    ],
  },
];

const TAB_TITLES = {
  admissions: "Admission Enquiry",
  fee: "Fee Management",
  achievements: "Achievements",
  gallery: "Photo Gallery",
  facilities: "Facilities",
  curriculum: "Curriculum Planner",
  calendar: "Academic Calendar",
  booklist: "Book Lists",
  forms: "Downloadable Forms",
  staff: "Staff Directory",
  members: "Members",
  seo: "SEO",
  "site-images": "Site Images",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("admissions");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "admissions":
        return <Enquiries />;
      case "fee":
        return <Fee />;
      case "achievements":
        return <Achievements />;
      case "gallery":
        return <Gallery />;
      case "facilities":
        return <Facilities />;
      case "curriculum":
        return <Curriculum />;
      case "calendar":
        return <Calendar />;
      case "booklist":
        return <BookList />;
      case "forms":
        return <Forms />;
      case "seo":
        return <SEO />;
      case "site-images":
        return <SiteImages />;
      case "staff":
        return <DataTable title="Staff Directory" columns={["ID", "Name", "Role", "Department"]} data={mockStaff} />;
      case "members":
        return <DataTable title="Members List" columns={["ID", "Name", "Type", "Join Year"]} data={mockMembers} />;
      default:
        return (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a menu item from the sidebar.
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">

      {/* Sidebar */}
      <div
        className="w-72 flex flex-col shadow-2xl z-10 shrink-0"
        style={{ background: "linear-gradient(180deg, #0a1233 0%, #0d1740 55%, #0a1233 100%)" }}
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner bg-[#F5C842] text-[#0a1233]">
            G
          </div>
          <div>
            <span className="text-base font-bold tracking-wide text-white leading-tight block">Admin Panel</span>
            <span className="text-[11px] text-slate-400">Garima Vidhya Vihar</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-2 text-[10px] font-bold tracking-widest uppercase text-slate-500">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <MenuButton
                    key={item.key}
                    label={item.label}
                    icon={item.icon}
                    isActive={activeTab === item.key}
                    onClick={() => setActiveTab(item.key)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
          >
            <ExternalLink size={17} />
            View Website
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors disabled:opacity-60 text-sm font-medium"
          >
            <LogOut size={17} />
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* Header */}
        <header className="bg-white px-8 py-5 flex justify-between items-center shadow-sm border-b border-slate-200 z-0">
          <div>
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-0.5">Dashboard</p>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              {TAB_TITLES[activeTab] || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-slate-500 hidden sm:block">
              Welcome back, <span className="text-indigo-600 font-bold">Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Reusable Sub-Components ---

// 1. Sidebar Menu Button Component
function MenuButton({ label, icon: Icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 font-medium flex items-center gap-3 text-sm ${
        isActive
          ? "bg-[#F5C842]/15 text-[#F5C842] shadow-[inset_2px_0_0_0_#F5C842]"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {Icon && <Icon size={17} className={isActive ? "text-[#F5C842]" : "text-slate-400"} />}
      {label}
    </button>
  );
}

// 2. Generic Data Table Component
function DataTable({ title, columns, data }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="px-6 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
          {data.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50 transition-colors duration-150 ease-in-out group">
                  {Object.values(row).map((val, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                      {val}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 font-medium">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    No data available.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
