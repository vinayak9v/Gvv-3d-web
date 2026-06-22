"use client";

import React, { useState } from "react";
// Ensure these paths match your folder structure exactly!
import Enquiries from "./com/Enquiries"; 
import Fee from "./com/Fee"; 

// --- Mock Data for Staff and Members ---
const mockStaff = [
  { id: 1, name: "Dr. Amit Singh", role: "Professor", department: "Computer Science" },
  { id: 2, name: "Neha Gupta", role: "Administrator", department: "Admissions Office" },
];

const mockMembers = [
  { id: 1, name: "Vikram Verma", type: "Alumni", joinYear: "2020" },
  { id: 2, name: "Suresh Kumar", type: "Board Member", joinYear: "2015" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("admissions");

  const renderContent = () => {
    switch (activeTab) {
      case "admissions":
        return <Enquiries />;
      case "fee": // --- NEW FEE SECTION ---
        return <Fee />;
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
      
      {/* Sidebar Menu - Enhanced UI */}
      <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg shadow-inner">
            A
          </div>
          <span className="text-xl font-bold tracking-wide">Admin Panel</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <MenuButton 
            label="Admission Enquiry" 
            isActive={activeTab === "admissions"} 
            onClick={() => setActiveTab("admissions")} 
          />
          <MenuButton 
            label="Fee Management" // --- NEW FEE MENU BUTTON ---
            isActive={activeTab === "fee"} 
            onClick={() => setActiveTab("fee")} 
          />
          <MenuButton 
            label="Staff Directory" 
            isActive={activeTab === "staff"} 
            onClick={() => setActiveTab("staff")} 
          />
          <MenuButton 
            label="Members" 
            isActive={activeTab === "members"} 
            onClick={() => setActiveTab("members")} 
          />
        </nav>

        {/* Bottom Sidebar Profile/Logout Placeholder */}
        <div className="p-4 border-t border-slate-800 text-sm text-slate-400">
          <p>System Version 1.0</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header - Enhanced UI */}
        <header className="bg-white px-8 py-5 flex justify-between items-center shadow-sm border-b border-slate-200 z-0">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Dashboard Overview
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-slate-500">
              Welcome back, <span className="text-indigo-600 font-bold">Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
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

// 1. Sidebar Menu Button Component - Enhanced UI
function MenuButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center ${
        isActive 
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20 translate-x-1" 
          : "text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
      }`}
    >
      {label}
    </button>
  );
}

// 2. Generic Data Table Component - Enhanced UI
export function DataTable({ title, columns, data }) {
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