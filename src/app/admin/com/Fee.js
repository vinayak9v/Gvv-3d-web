"use client";

import React, { useState, useEffect } from "react";

// ==========================================
// 1. API Functions
// ==========================================
export const getFees = async () => {
  const res = await fetch("/api/fees", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch fee structures");
  return res.json();
};

export const addFee = async (data) => {
  const res = await fetch("/api/fees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add fee structure");
  return res.json();
};

export const updateFee = async (id, data) => {
  const res = await fetch(`/api/fees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update fee structure");
  return res.json();
};

export const deleteFee = async (id) => {
  const res = await fetch(`/api/fees/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete fee structure");
  return res.json();
};

// ==========================================
// 2. Main Component
// ==========================================
export default function Fee() {
  // --- State Management ---
  const [fees, setFees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Updated state to match your API response keys
  const [formData, setFormData] = useState({
    className: "",
    installment1: 0,
    installment2: 0,
    installment3: 0,
    annualAllocation: 0,
    totalFee: 0,
  });

  // --- Fetch Data on Load ---
  const loadFees = async () => {
    try {
      setIsLoading(true);
      const res = await getFees();
      
      // Your API returns { success: true, data: [...] }
      if (res && res.data && Array.isArray(res.data)) {
        setFees(res.data);
      } else {
        setFees([]);
        console.warn("Unexpected API response format:", res);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numerical inputs to numbers, leave className as string
    const parsedValue = name === "className" ? value : Number(value);
    const updatedData = { ...formData, [name]: parsedValue };

    // Auto-calculate Total Fee whenever an installment or allocation changes
    if (["installment1", "installment2", "installment3", "annualAllocation"].includes(name)) {
      updatedData.totalFee = 
        (Number(updatedData.installment1) || 0) + 
        (Number(updatedData.installment2) || 0) + 
        (Number(updatedData.installment3) || 0) + 
        (Number(updatedData.annualAllocation) || 0);
    }

    setFormData(updatedData);
  };

  const openAddModal = () => {
    setFormData({
      className: "",
      installment1: 0,
      installment2: 0,
      installment3: 0,
      annualAllocation: 0,
      totalFee: 0,
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (fee) => {
    setFormData({
      className: fee.className || "",
      installment1: fee.installment1 || 0,
      installment2: fee.installment2 || 0,
      installment3: fee.installment3 || 0,
      annualAllocation: fee.annualAllocation || 0,
      totalFee: fee.totalFee || 0,
    });
    setEditingId(fee.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateFee(editingId, formData);
      } else {
        await addFee(formData);
      }
      setIsModalOpen(false);
      loadFees(); // Refresh table data
    } catch (err) {
      alert("Error saving: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class fee structure?")) {
      try {
        await deleteFee(id);
        loadFees();
      } catch (err) {
        alert("Error deleting: " + err.message);
      }
    }
  };

  // --- Calculated Summary Stats ---
  const safeFees = Array.isArray(fees) ? fees : [];
  const totalClasses = safeFees.length;
  const avgFee = totalClasses > 0 ? (safeFees.reduce((sum, f) => sum + (f.totalFee || 0), 0) / totalClasses) : 0;
  const maxFee = totalClasses > 0 ? Math.max(...safeFees.map(f => f.totalFee || 0)) : 0;

  // --- Render Loading/Error States ---
  if (isLoading) return <div className="p-8 text-slate-500 animate-pulse text-lg">Loading Fee Structures...</div>;
  if (error) return <div className="p-8 text-red-500 bg-red-50 rounded-xl border border-red-200">Error: {error}</div>;

  return (
    <div className="space-y-6">
      
      {/* Top Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="text-slate-500 text-sm font-medium">Configured Classes</h4>
          <p className="text-2xl font-bold text-slate-800 mt-2">{totalClasses}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="text-slate-500 text-sm font-medium">Average Total Fee</h4>
          <p className="text-2xl font-bold text-slate-800 mt-2">₹{Math.round(avgFee).toLocaleString()}</p>
        </div>
        <div className="bg-indigo-600 p-6 rounded-2xl shadow-md border border-indigo-700 flex flex-col justify-center items-start">
          <h4 className="text-indigo-100 text-sm font-medium">Quick Action</h4>
          <button 
            onClick={openAddModal}
            className="mt-2 bg-white text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            + Add New Class Fee
          </button>
        </div>
      </div>

      {/* Fees Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">Master Fee Structure</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Class Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Inst 1</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Inst 2</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Inst 3</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Annual Alloc.</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase">Total Fee</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {safeFees.length > 0 ? (
                safeFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-indigo-700">{fee.className}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">₹{fee.installment1.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">₹{fee.installment2.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">₹{fee.installment3.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">₹{fee.annualAllocation.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800 bg-slate-50/50">
                      ₹{fee.totalFee.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-3">
                      <button onClick={() => openEditModal(fee)} className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
                      <button onClick={() => handleDelete(fee.id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400">No fee structures found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">{editingId ? "Edit Fee Structure" : "Add Fee Structure"}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Class Name (e.g., Nursery to UKG)</label>
                <input required type="text" name="className" value={formData.className} onChange={handleInputChange} 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Installment 1 (₹)</label>
                  <input required type="number" name="installment1" value={formData.installment1 || ""} onChange={handleInputChange} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Installment 2 (₹)</label>
                  <input required type="number" name="installment2" value={formData.installment2 || ""} onChange={handleInputChange} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Installment 3 (₹)</label>
                  <input required type="number" name="installment3" value={formData.installment3 || ""} onChange={handleInputChange} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Annual Allocation (₹)</label>
                  <input required type="number" name="annualAllocation" value={formData.annualAllocation || ""} onChange={handleInputChange} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </div>
              </div>

              {/* Auto Calculated Total Fee */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-2">
                <label className="block text-sm font-medium text-slate-500 mb-1">Calculated Total Fee</label>
                <div className="text-2xl font-bold text-slate-800">
                  ₹{formData.totalFee.toLocaleString()}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" 
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  {editingId ? "Update Structure" : "Save Structure"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}   