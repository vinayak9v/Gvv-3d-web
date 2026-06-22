"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "../page"; // Adjust path if DataTable is exported from elsewhere

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
      <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow border border-gray-200">
        <p className="text-gray-500 font-medium">Loading enquiries data...</p>
      </div>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <p className="text-red-600 font-medium">Error loading data: {error}</p>
        <p className="text-sm text-red-500 mt-1">Check your API route and console for details.</p>
      </div>
    );
  }

  // --- Render Success State (The Table) ---
  return (
    <DataTable 
      title="Live Admission Enquiries" 
      // IMPORTANT: Adjust these columns to exactly match the keys returned by your database/API!
      columns={["ID", "Name", "Course", "Status", "Date"]} 
      data={enquiries} 
    />
  );
}