"use client";

import React, { useState, useEffect } from "react";
import { Inbox, MailOpen } from "lucide-react";

// 1. Your API Fetch Function
export const getAllEnquiries = async () => {
  try {
    const response = await fetch("/api/admission-enquiry", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch enquiries");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get Enquiries Error:", error);
    throw error;
  }
};

function formatDate(value) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return value;
  }
}

// 2. Your Component
export default function Enquiries() {
  // State to hold our fetched data, loading status, and any errors
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect runs once when the component mounts
  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        setIsLoading(true); // Start loading
        const data = await getAllEnquiries();

        // Next.js API routes often return data wrapped in an object like { data: [...] }
        // Adjust this if your API returns the array directly.
        setEnquiries(data?.data || data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Stop loading regardless of success/fail
      }
    };

    fetchAdmissions();
  }, []); // Empty dependency array means this runs only once on mount

  // --- Render Loading State ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-slate-200">
        <p className="text-slate-500 font-medium animate-pulse">Loading enquiries data...</p>
      </div>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-2xl border border-red-200">
        <p className="text-red-600 font-medium">Error loading data: {error}</p>
        <p className="text-sm text-red-500 mt-1">Check your API route and console for details.</p>
      </div>
    );
  }

  // --- Render Success State (The Table) ---
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Inbox size={16} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Live Admission Enquiries</h3>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
          {enquiries.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Parent</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {enquiries.length > 0 ? (
              enquiries.map((row, idx) => (
                <tr key={row.id ?? idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 whitespace-nowrap">{row.studentName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{row.parentName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold whitespace-nowrap">
                      {row.classApplying}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="whitespace-nowrap">{row.mobileNumber}</div>
                    <div className="text-xs text-slate-400 whitespace-nowrap">{row.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 max-w-[220px] truncate">{row.message || "-"}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                  <div className="flex flex-col items-center gap-2">
                    <MailOpen className="text-slate-300" size={28} />
                    No enquiries yet.
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
