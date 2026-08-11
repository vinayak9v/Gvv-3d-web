"use client";

import React, { useState, useEffect, useRef } from "react";
import { Building2, Pencil, Trash2, ImageOff } from "lucide-react";

export default function Facilities() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const load = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/facilities", { cache: "no-store" });
      const result = await res.json();
      if (result.success) setItems(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setName("");
    setEditingId(null);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditingId(item.id);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && (!name || !image)) {
      alert("Please provide both Name and Image.");
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      const url = editingId ? `/api/facilities/${editingId}` : "/api/facilities";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData });
      const result = await res.json();

      if (res.ok && result.success) {
        resetForm();
        load();
      } else {
        alert("Error: " + (result.message || result.error));
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this facility?")) return;
    try {
      const res = await fetch(`/api/facilities/${id}`, { method: "DELETE" });
      if (res.ok) load();
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  if (isLoading) return <div className="p-8 text-slate-500 animate-pulse text-lg">Loading facilities...</div>;
  if (error) return <div className="p-8 text-red-500 bg-red-50 rounded-xl border border-red-200">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Building2 size={16} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">{editingId ? "Edit Facility" : "Add New Facility"}</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Facility Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Science Lab"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">{editingId ? "Update Image (Optional)" : "Upload Image"}</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-slate-300 rounded-lg px-3 py-1.5 bg-white file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" required={!editingId} />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button type="submit" disabled={saving}
              className="px-6 py-2 h-[42px] bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 whitespace-nowrap">
              {saving ? "Saving..." : editingId ? "Update" : "Add Facility"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="px-6 py-2 h-[42px] bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Uploaded Facilities</h3>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">{items.length} Records</span>
        </div>
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            <ImageOff className="mx-auto mb-3 text-slate-300" size={32} />
            No facilities added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                <div className="relative w-full h-36 bg-slate-100">
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button onClick={() => handleEdit(item)} className="w-9 h-9 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center hover:bg-white">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="w-9 h-9 rounded-full bg-white/90 text-red-600 flex items-center justify-center hover:bg-white">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <div className="p-3.5 bg-white">
                  <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
