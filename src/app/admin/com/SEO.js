"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Pencil, Check, X } from "lucide-react";
import { SEO_PAGES } from "@/lib/seoPages";

const TITLE_LIMIT = 60;
const DESC_LIMIT = 160;

export default function SEO() {
  const [overrides, setOverrides] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRoute, setEditingRoute] = useState(null);
  const [titleDraft, setTitleDraft] = useState("");
  const [descDraft, setDescDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/seo", { cache: "no-store" });
      const result = await res.json();
      if (result.success) {
        const map = {};
        for (const row of result.data || []) map[row.route] = row;
        setOverrides(map);
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

  const grouped = useMemo(() => {
    const groups = {};
    for (const page of SEO_PAGES) {
      if (!groups[page.group]) groups[page.group] = [];
      groups[page.group].push(page);
    }
    return groups;
  }, []);

  const startEdit = (page) => {
    const saved = overrides[page.route];
    setEditingRoute(page.route);
    setTitleDraft(saved?.title ?? page.defaultTitle);
    setDescDraft(saved?.meta_description ?? page.defaultDescription);
  };

  const cancelEdit = () => {
    setEditingRoute(null);
    setTitleDraft("");
    setDescDraft("");
  };

  const saveEdit = async (route) => {
    setSaving(true);
    try {
      const res = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route, title: titleDraft, meta_description: descDraft }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        cancelEdit();
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

  if (isLoading) return <div className="p-8 text-slate-500 animate-pulse text-lg">Loading SEO settings...</div>;
  if (error) return <div className="p-8 text-red-500 bg-red-50 rounded-xl border border-red-200">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
          <Search size={18} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Page SEO</h3>
          <p className="text-sm text-slate-500 mt-1">
            Set a custom SEO title and meta description for each page. Pages without a saved
            override use the built-in default shown below. Recommended length: title up to{" "}
            {TITLE_LIMIT} characters, description up to {DESC_LIMIT} characters.
          </p>
        </div>
      </div>

      {Object.entries(grouped).map(([group, pages]) => (
        <div key={group} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">{group}</h4>
          </div>
          <div className="divide-y divide-slate-100">
            {pages.map((page) => {
              const saved = overrides[page.route];
              const isEditing = editingRoute === page.route;
              const displayTitle = saved?.title || page.defaultTitle;
              const displayDesc = saved?.meta_description || page.defaultDescription;

              return (
                <div key={page.route} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-slate-800">{page.label}</p>
                        <code className="text-[11px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{page.route}</code>
                        {saved && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            Customized
                          </span>
                        )}
                      </div>
                      {!isEditing && (
                        <>
                          <p className="text-sm text-slate-700 mt-2 truncate">{displayTitle}</p>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{displayDesc}</p>
                        </>
                      )}
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => startEdit(page)}
                        className="shrink-0 w-8 h-8 rounded-lg text-indigo-600 hover:bg-indigo-50 flex items-center justify-center"
                      >
                        <Pencil size={15} />
                      </button>
                    )}
                  </div>

                  {isEditing && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-sm font-medium text-slate-700">SEO Title</label>
                          <span className={`text-xs ${titleDraft.length > TITLE_LIMIT ? "text-amber-600" : "text-slate-400"}`}>
                            {titleDraft.length}/{TITLE_LIMIT}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={titleDraft}
                          onChange={(e) => setTitleDraft(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-sm font-medium text-slate-700">SEO Meta Description</label>
                          <span className={`text-xs ${descDraft.length > DESC_LIMIT ? "text-amber-600" : "text-slate-400"}`}>
                            {descDraft.length}/{DESC_LIMIT}
                          </span>
                        </div>
                        <textarea
                          value={descDraft}
                          onChange={(e) => setDescDraft(e.target.value)}
                          rows={2}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(page.route)}
                          disabled={saving}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-60"
                        >
                          <Check size={14} />
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
