"use client";

import React, { useState, useEffect } from 'react';

// API Fetch Function
export const getFees = async () => {
  const res = await fetch("/api/fees", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch fees");
  return res.json();
};

export default function FeeTable() {
  // State to hold API data, loading status, and errors
  const [fees, setFees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component loads
  useEffect(() => {
    const loadFees = async () => {
      try {
        setIsLoading(true);
        const res = await getFees();
        
        // Safely extract the array from { success: true, data: [...] }
        if (res && res.data && Array.isArray(res.data)) {
          setFees(res.data);
        } else if (Array.isArray(res)) {
          setFees(res);
        } else {
          setFees([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadFees();
  }, []);

  // Helper function to format numbers like "₹13,000/-"
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "₹0/-";
    return `₹${Number(amount).toLocaleString('en-IN')}/-`;
  };

  // Render Loading State
  if (isLoading) {
    return (
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="text-xl font-medium text-[#040F44] animate-pulse">Loading Fee Structure...</div>
      </section>
    );
  }

  // Render Error State
  if (error) {
    return (
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="text-red-600 font-medium bg-red-50 px-6 py-4 rounded-lg border border-red-200">
          Error loading fees: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-blue-100">
          
          <table className="w-full min-w-[900px] border-collapse text-center">
            
            {/* Table Head */}
            <thead className="bg-[#040F44] text-white font-semibold">
              {/* First Header Row */}
              <tr>
                <th 
                  rowSpan="2" 
                  className="p-4 border-r border-b border-blue-800/50 w-[80px] text-sm tracking-wide"
                >
                  S.No.
                </th>
                <th 
                  rowSpan="2" 
                  className="p-4 border-r border-b border-blue-800/50 w-[220px] text-sm tracking-wide"
                >
                  CLASS
                </th>
                <th 
                  colSpan="3" 
                  className="p-3 border-r border-b border-blue-800/50 text-sm tracking-wide"
                >
                  <div className="flex flex-col gap-1">
                    <span>TUITION FEES</span>
                    <span className="text-xs text-gray-300 font-normal">
                      (IN INSTALLMENTS - THREE INSTALLMENTS)
                    </span>
                  </div>
                </th>
                <th 
                  rowSpan="2" 
                  className="p-4 border-r border-b border-blue-800/50 w-[150px] text-sm tracking-wide"
                >
                  ANNUAL<br />ALLOCATION
                </th>
                <th 
                  rowSpan="2" 
                  className="p-4 border-b border-blue-800/50 w-[150px] text-sm tracking-wide"
                >
                  TOTAL
                </th>
              </tr>
              
              {/* Second Header Row (For Installments) */}
              <tr>
                <th className="p-3 text-xs sm:text-sm border-r border-b border-blue-800/50 tracking-wide font-medium bg-[#061556]">
                  I - INSTALLMENT
                </th>
                <th className="p-3 text-xs sm:text-sm border-r border-b border-blue-800/50 tracking-wide font-medium bg-[#061556]">
                  II - INSTALLMENT
                </th>
                <th className="p-3 text-xs sm:text-sm border-r border-b border-blue-800/50 tracking-wide font-medium bg-[#061556]">
                  III - INSTALLMENT
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-[#1e293b] text-[15px]">
              {fees.length > 0 ? (
                fees.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className="bg-[#FAFBFF] hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    {/* S.No */}
                    <td className="p-4 border border-blue-100 font-medium">
                      {index + 1}
                    </td>
                    
                    {/* Class Name */}
                    <td className="p-4 border border-blue-100 font-medium text-left px-6">
                      {row.className}
                    </td>
                    
                    {/* Installments */}
                    <td className="p-4 border border-blue-100 text-gray-700">
                      {formatCurrency(row.installment1)}
                    </td>
                    <td className="p-4 border border-blue-100 text-gray-700">
                      {formatCurrency(row.installment2)}
                    </td>
                    <td className="p-4 border border-blue-100 text-gray-700">
                      {formatCurrency(row.installment3)}
                    </td>
                    
                    {/* Annual */}
                    <td className="p-4 border border-blue-100 text-gray-700 font-medium">
                      {formatCurrency(row.annualAllocation)}
                    </td>
                    
                    {/* Total (Bold Green) */}
                    <td className="p-4 border border-blue-100 font-bold text-green-700 text-base bg-green-50/30">
                      {formatCurrency(row.totalFee)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-gray-500 font-medium">
                    No fee structures found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}