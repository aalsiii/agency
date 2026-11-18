"use client";

import { useState } from "react";
import { Star, Plus, Trash2, CheckCircle2, Shield, Sparkles } from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl?: string | null;
  quote: string;
  rating: number;
  isFeatured: boolean;
  createdAt: string | Date;
}

export default function AdminTestimonialsClient({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    clientRole: "",
    company: "",
    quote: "",
    rating: 5,
    isFeatured: true,
  });

  const filtered = testimonials.filter((t) => (filter === "featured" ? t.isFeatured : true));

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !current }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isFeatured: !current } : t))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.quote) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.testimonial) {
        setTestimonials((prev) => [data.testimonial, ...prev]);
        setShowAddModal(false);
        setForm({
          clientName: "",
          clientRole: "",
          company: "",
          quote: "",
          rating: 5,
          isFeatured: true,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-primary/80 tracking-widest uppercase mb-1">
            Proof of Impact • Client Endorsements
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Client Testimonials
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
              {testimonials.length} Total
            </span>
          </h1>
          <p className="text-sm text-muted mt-1">
            Curate and feature verified executive endorsements displayed across the site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 font-mono text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition ${
                filter === "all" ? "bg-primary text-black font-semibold" : "text-muted hover:text-white"
              }`}
            >
              All ({testimonials.length})
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-3 py-1.5 rounded-lg transition ${
                filter === "featured"
                  ? "bg-primary text-black font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              Featured ({testimonials.filter((t) => t.isFeatured).length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-primary text-black font-mono text-xs font-semibold hover:bg-[#d6b268] transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Endorsement</span>
          </button>
        </div>
      </div>

      {/* Grid of testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 flex flex-col justify-between hover:border-primary/40 transition group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary" />
                  ))}
                </div>
                <button
                  onClick={() => handleToggleFeatured(t.id, t.isFeatured)}
                  className={`font-mono text-[10px] px-2 py-0.5 rounded-full border transition ${
                    t.isFeatured
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-white/5 text-muted border-white/10 hover:text-white"
                  }`}
                >
                  {t.isFeatured ? "★ Featured" : "Standard"}
                </button>
              </div>

              <blockquote className="text-sm text-neutral-300 leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-sm text-white">{t.clientName}</p>
                <p className="font-mono text-xs text-muted">
                  {t.clientRole}
                  {t.company ? ` • ${t.company}` : ""}
                </p>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition"
                title="Delete Testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--background-layer-1)] border border-white/15 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Add Client Testimonial
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white font-mono text-xs"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-muted mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  placeholder="e.g. Vikramaditya Singhania"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs text-muted mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={form.clientRole}
                    onChange={(e) => setForm({ ...form, clientRole: e.target.value })}
                    placeholder="e.g. Chief Marketing Officer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Aurum Living"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-muted mb-1">Testimonial Quote *</label>
                <textarea
                  required
                  rows={4}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Detailed feedback regarding project impact and ROI..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs text-muted mb-1">Rating (1-5)</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  >
                    <option value={5} className="bg-black">5 Stars (Supreme)</option>
                    <option value={4} className="bg-black">4 Stars (Great)</option>
                    <option value={3} className="bg-black">3 Stars (Average)</option>
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-[#C5A059] rounded"
                    />
                    <span className="font-mono text-xs text-white">Feature on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-primary text-black font-mono text-xs font-semibold hover:bg-[#d6b268] transition disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
