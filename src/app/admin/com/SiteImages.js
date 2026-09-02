"use client";

import React, { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Info, UploadCloud } from "lucide-react";
import { SITE_IMAGE_SLOTS } from "@/lib/siteImageSlots";

export default function SiteImages() {
  const [saved, setSaved] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState({});
  const [uploadingKey, setUploadingKey] = useState(null);
  const fileInputRefs = useRef({});

  const load = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/site-images", { cache: "no-store" });
      const result = await res.json();
      if (result.success) {
        const map = {};
        for (const row of result.data || []) map[row.image_key] = row;
        setSaved(map);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (slot) => {
    const file = files[slot.key];
    if (!file) {
      alert("Please choose an image first.");
      return;
    }
    setUploadingKey(slot.key);
    try {
      const formData = new FormData();
      formData.append("key", slot.key);
      formData.append("image", file);

      const res = await fetch("/api/site-images", { method: "POST", body: formData });
      const result = await res.json();

      if (res.ok && result.success) {
        setFiles((prev) => ({ ...prev, [slot.key]: null }));
        if (fileInputRefs.current[slot.key]) fileInputRefs.current[slot.key].value = "";
        load();
      } else {
        alert("Error: " + (result.message || result.error));
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUploadingKey(null);
    }
  };

  if (isLoading) return <div className="p-8 text-slate-500 animate-pulse text-lg">Loading site images...</div>;
  if (error) return <div className="p-8 text-red-500 bg-red-50 rounded-xl border border-red-200">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
          <ImageIcon size={18} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Site Images</h3>
          <p className="text-sm text-slate-500 mt-1">
            Replace specific hero images used on the public website. If nothing is uploaded, the page's original default image is used.
          </p>
        </div>
      </div>

      {SITE_IMAGE_SLOTS.map((slot) => {
        const current = saved[slot.key];
        const previewUrl = current?.image_url || slot.defaultUrl;

        return (
          <div key={slot.key} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="text-sm font-semibold text-slate-800">{slot.label}</h4>
              <code className="text-[11px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{slot.page}</code>
              {current && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Customized
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={slot.label}
                  className="w-32 h-32 rounded-xl object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-32 h-32 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-300 shrink-0">
                  <ImageIcon size={28} />
                </div>
              )}

              <div className="flex-1">
                {/* Recommended size note, shown above the upload field */}
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg px-3 py-2 mb-3">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>Recommended image size:</strong> {slot.recommendedSize}
                  </span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (fileInputRefs.current[slot.key] = el)}
                  onChange={(e) => setFiles((prev) => ({ ...prev, [slot.key]: e.target.files[0] }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 bg-white file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />

                <button
                  onClick={() => handleUpload(slot)}
                  disabled={uploadingKey === slot.key}
                  className="mt-3 inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-60"
                >
                  <UploadCloud size={14} />
                  {uploadingKey === slot.key ? "Uploading..." : "Upload & Replace"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
