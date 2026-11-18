"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  RefreshCw,
  Sparkles,
  DollarSign,
  IndianRupee,
} from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  category: string;
  priceInr: number;
  priceUsd: number;
  billingType: string;
  features: string; // JSON string
  badge: string | null;
  isActive: boolean;
  order: number;
}

const CATEGORIES = [
  "Growth & Marketing",
  "Digital Experiences",
  "Creative & Branding",
  "Strategy & Consulting",
];

export default function ServicesManager() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [category, setCategory] = useState("Growth & Marketing");
  const [priceInr, setPriceInr] = useState(49999);
  const [priceUsd, setPriceUsd] = useState(1499);
  const [billingType, setBillingType] = useState("monthly");
  const [featuresText, setFeaturesText] = useState("");
  const [badge, setBadge] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openEditor = (s?: ServiceItem) => {
    if (s) {
      setEditingService(s);
      setIsNew(false);
      setTitle(s.title);
      setSlug(s.slug);
      setTagline(s.tagline);
      setShortDesc(s.shortDesc);
      setCategory(s.category);
      setPriceInr(s.priceInr);
      setPriceUsd(s.priceUsd);
      setBillingType(s.billingType);
      try {
        const arr = JSON.parse(s.features);
        setFeaturesText(Array.isArray(arr) ? arr.join("\n") : "");
      } catch {
        setFeaturesText("");
      }
      setBadge(s.badge || "");
      setIsActive(s.isActive);
    } else {
      setEditingService(null);
      setIsNew(true);
      setTitle("");
      setSlug("");
      setTagline("");
      setShortDesc("");
      setCategory("Growth & Marketing");
      setPriceInr(49999);
      setPriceUsd(1499);
      setBillingType("monthly");
      setFeaturesText("Pillar Audit & Architecture\nHigh-Conversion Execution\nBi-weekly Performance Reviews");
      setBadge("");
      setIsActive(true);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const featuresArray = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tagline,
      shortDesc,
      category,
      priceInr: Number(priceInr),
      priceUsd: Number(priceUsd),
      billingType,
      features: featuresArray,
      badge: badge || null,
      isActive,
    };

    try {
      if (isNew) {
        await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (editingService) {
        await fetch(`/api/services/${editingService.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      fetchServices();
      setEditingService(null);
      setIsNew(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      setServices((prev) => prev.filter((s) => s.id !== id));
      if (editingService?.id === id) {
        setEditingService(null);
        setIsNew(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-primary/80 tracking-widest uppercase mb-1">
            Service Architecture & Monetization
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Services & Pricing Catalog
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
              {services.length} Services
            </span>
          </h1>
          <p className="font-mono text-xs text-muted mt-1">
            Zero hardcoding. Manage deliverables, billing frequencies, and dual INR/USD pricing across all 4 PRD categories.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openEditor()}
            className="px-4 py-2.5 rounded-xl bg-primary text-black font-mono text-xs font-semibold hover:bg-[#d6b268] transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
          <button
            onClick={fetchServices}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-primary" : ""}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service cards */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="p-12 text-center font-mono text-xs text-muted">Loading services from database...</div>
          ) : (
            services.map((item) => {
              let feats: string[] = [];
              try {
                feats = JSON.parse(item.features);
              } catch {}

              return (
                <div
                  key={item.id}
                  className={`bg-[var(--background-layer-1)] border rounded-2xl p-5 md:p-6 transition ${
                    editingService?.id === item.id
                      ? "border-primary ring-1 ring-primary/50"
                      : "border-white/10 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base text-white">{item.title}</span>
                        {item.badge && (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 font-bold">
                            {item.badge}
                          </span>
                        )}
                        <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted">
                          {item.category}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-primary/80 mt-1">{item.tagline}</p>
                      <p className="text-xs text-neutral-300 mt-2 line-clamp-2">{item.shortDesc}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditor(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs transition cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteService(item.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/10 text-neutral-400 hover:text-red-400 text-xs transition cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Pricing pills & features */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 font-semibold text-white">
                        <IndianRupee className="w-3.5 h-3.5 text-primary" />
                        <span>₹{item.priceInr.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-muted">/{item.billingType}</span>
                      </div>
                      <div className="text-neutral-600">•</div>
                      <div className="flex items-center gap-1 font-semibold text-neutral-300">
                        <DollarSign className="w-3.5 h-3.5 text-primary" />
                        <span>${item.priceUsd.toLocaleString()}</span>
                        <span className="text-[10px] text-muted">/{item.billingType}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-muted">
                      {feats.length} deliverables configured
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Edit / Create Form Panel */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6 h-fit sticky top-6">
          {editingService || isNew ? (
            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif font-bold text-base text-white">
                  {isNew ? "Create Service" : `Edit: ${editingService?.title}`}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsNew(false);
                  }}
                  className="text-muted hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next.js Web Applications"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Category (PRD Pillars)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-xs text-white rounded-xl py-2 px-3 outline-none focus:border-primary/60"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-black">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Sub-second load times and high conversion architecture"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Overview of the service capabilities..."
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl p-2.5 text-xs text-white outline-none resize-none font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    INR Price (₹)
                  </label>
                  <input
                    type="number"
                    value={priceInr}
                    onChange={(e) => setPriceInr(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    USD Price ($)
                  </label>
                  <input
                    type="number"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    Billing Cycle
                  </label>
                  <select
                    value={billingType}
                    onChange={(e) => setBillingType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-xs text-white rounded-xl py-2 px-3 outline-none"
                  >
                    <option value="monthly" className="bg-black">Monthly Retainer</option>
                    <option value="one-time" className="bg-black">One-Time Project</option>
                    <option value="custom" className="bg-black">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Popular / Strategic"
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Deliverables & Features (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Custom architectural schema&#10;Sub-second caching&#10;Conversion attribution"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl p-2.5 text-xs text-white outline-none resize-none font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-primary text-black font-semibold text-xs transition cursor-pointer hover:bg-[#d6b268] disabled:opacity-50"
              >
                {saving ? "Saving Changes..." : "Save Service"}
              </button>
            </form>
          ) : (
            <div className="py-16 text-center text-xs text-muted font-mono">
              Select any service to edit its pricing, deliverables, and badges, or click &quot;Add New Service&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
