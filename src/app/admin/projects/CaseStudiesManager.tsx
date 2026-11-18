"use client";

import { useState, useEffect } from "react";
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  X,
  RefreshCw,
  Sparkles,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  category: string;
  heroMetricNumber: string;
  heroMetricLabel: string;
  challenge: string;
  solution: string;
  strategy?: string | null;
  execution?: string | null;
  technologies?: string | null;
  websiteUrl?: string | null;
  resultsSummary: string;
  metrics: string;
  deliverables: string;
  coverImage: string | null;
  testimonialQuote: string | null;
  testimonialAuthor: string | null;
  testimonialRole: string | null;
  isFeatured: boolean;
}

export default function CaseStudiesManager() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<CaseStudy | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [clientName, setClientName] = useState("");
  const [industry, setIndustry] = useState("");
  const [category, setCategory] = useState("Digital Experiences");
  const [heroMetricNumber, setHeroMetricNumber] = useState("+340%");
  const [heroMetricLabel, setHeroMetricLabel] = useState("Conversion Rate");
  const [challenge, setChallenge] = useState("");
  const [strategy, setStrategy] = useState("");
  const [execution, setExecution] = useState("");
  const [solution, setSolution] = useState("");
  const [technologies, setTechnologies] = useState("Next.js, TypeScript, Tailwind CSS, Prisma");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [resultsSummary, setResultsSummary] = useState("");
  const [testimonialQuote, setTestimonialQuote] = useState("");
  const [testimonialAuthor, setTestimonialAuthor] = useState("");
  const [testimonialRole, setTestimonialRole] = useState("");

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/case-studies");
      const data = await res.json();
      if (data.caseStudies) setCaseStudies(data.caseStudies);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const openEditor = (cs?: CaseStudy) => {
    if (cs) {
      setEditingItem(cs);
      setIsNew(false);
      setTitle(cs.title);
      setSlug(cs.slug);
      setClientName(cs.clientName);
      setIndustry(cs.industry);
      setCategory(cs.category);
      setHeroMetricNumber(cs.heroMetricNumber);
      setHeroMetricLabel(cs.heroMetricLabel);
      setChallenge(cs.challenge);
      setStrategy(cs.strategy || "");
      setExecution(cs.execution || "");
      setSolution(cs.solution);
      setTechnologies(cs.technologies || "Next.js, TypeScript, Tailwind CSS, Prisma");
      setWebsiteUrl(cs.websiteUrl || "");
      setResultsSummary(cs.resultsSummary);
      setTestimonialQuote(cs.testimonialQuote || "");
      setTestimonialAuthor(cs.testimonialAuthor || "");
      setTestimonialRole(cs.testimonialRole || "");
    } else {
      setEditingItem(null);
      setIsNew(true);
      setTitle("");
      setSlug("");
      setClientName("");
      setIndustry("");
      setCategory("Digital Experiences");
      setHeroMetricNumber("+280%");
      setHeroMetricLabel("Conversion Jump");
      setChallenge("");
      setStrategy("");
      setExecution("");
      setSolution("");
      setTechnologies("Next.js, TypeScript, Tailwind CSS, Prisma");
      setWebsiteUrl("");
      setResultsSummary("");
      setTestimonialQuote("");
      setTestimonialAuthor("");
      setTestimonialRole("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      clientName,
      industry,
      category,
      heroMetricNumber,
      heroMetricLabel,
      challenge,
      strategy,
      execution,
      solution: solution || execution,
      technologies,
      websiteUrl: websiteUrl || null,
      resultsSummary,
      testimonialQuote: testimonialQuote || null,
      testimonialAuthor: testimonialAuthor || null,
      testimonialRole: testimonialRole || null,
      isFeatured: true,
    };

    try {
      if (isNew) {
        await fetch("/api/case-studies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else if (editingItem) {
        await fetch(`/api/case-studies/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      fetchCaseStudies();
      setEditingItem(null);
      setIsNew(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const deleteCaseStudy = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    try {
      await fetch(`/api/case-studies/${id}`, { method: "DELETE" });
      setCaseStudies((prev) => prev.filter((c) => c.id !== id));
      if (editingItem?.id === id) {
        setEditingItem(null);
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
            Client Success & Proof Architecture
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Case Studies & Proof Vault
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
              {caseStudies.length} Studies
            </span>
          </h1>
          <p className="font-mono text-xs text-muted mt-1">
            Showcase measurable client ROI, architectural execution, and verified testimonials without touching code.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openEditor()}
            className="px-4 py-2.5 rounded-xl bg-primary text-black font-mono text-xs font-semibold hover:bg-[#d6b268] transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Case Study</span>
          </button>
          <button
            onClick={fetchCaseStudies}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-primary" : ""}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="p-12 text-center font-mono text-xs text-muted">Loading case studies...</div>
          ) : (
            caseStudies.map((cs) => (
              <div
                key={cs.id}
                className={`bg-[var(--background-layer-1)] border rounded-2xl p-5 md:p-6 transition ${
                  editingItem?.id === cs.id
                    ? "border-primary ring-1 ring-primary/50"
                    : "border-white/10 hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-white">{cs.clientName}</span>
                      {cs.websiteUrl && (
                        <a
                          href={cs.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[10px] text-primary hover:underline flex items-center gap-0.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          Live
                        </a>
                      )}
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-primary/20 text-primary border border-primary/40">
                        {cs.industry}
                      </span>
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted">
                        {cs.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-neutral-200 mt-2">{cs.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2">{cs.resultsSummary}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEditor(cs)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs transition cursor-pointer"
                      title="Edit Case Study"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCaseStudy(cs.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/10 text-neutral-400 hover:text-red-400 text-xs transition cursor-pointer"
                      title="Delete Case Study"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary tracking-tight">
                      {cs.heroMetricNumber}
                    </span>
                    <span className="text-[11px] text-muted">{cs.heroMetricLabel}</span>
                  </div>
                  {cs.testimonialAuthor && (
                    <span className="text-[11px] text-muted italic truncate max-w-xs">
                      &quot;...&quot; — {cs.testimonialAuthor}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Editor Form */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6 h-fit sticky top-6">
          {editingItem || isNew ? (
            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif font-bold text-base text-white">
                  {isNew ? "New Case Study" : `Edit: ${editingItem?.clientName}`}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsNew(false);
                  }}
                  className="text-muted hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Nada Yoga School"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Live Client Website URL
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://www.nadyoga.org/"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Case Headline Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Engineering high-conversion D2C flagship with 340% sales increase"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none font-serif"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Luxury Real Estate / D2C"
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-xs text-white rounded-xl py-2 px-3 outline-none"
                  >
                    <option value="Digital Experiences" className="bg-black">Digital Experiences</option>
                    <option value="Growth & Marketing" className="bg-black">Growth & Marketing</option>
                    <option value="Creative & Branding" className="bg-black">Creative & Branding</option>
                    <option value="Strategy & Consulting" className="bg-black">Strategy & Consulting</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    Hero Metric Number
                  </label>
                  <input
                    type="text"
                    value={heroMetricNumber}
                    onChange={(e) => setHeroMetricNumber(e.target.value)}
                    placeholder="+340% or 4.8x"
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    Metric Label
                  </label>
                  <input
                    type="text"
                    value={heroMetricLabel}
                    onChange={(e) => setHeroMetricLabel(e.target.value)}
                    placeholder="Conversion Velocity"
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  The Challenge
                </label>
                <textarea
                  rows={2}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="The core bottlenecks and legacy handicaps..."
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl p-2.5 text-xs text-white outline-none resize-none font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Strategy & Architecture
                </label>
                <textarea
                  rows={2}
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  placeholder="Strategic roadmap, positioning, funnel mapping..."
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl p-2.5 text-xs text-white outline-none resize-none font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                  Results & Outcomes Summary
                </label>
                <textarea
                  rows={2}
                  value={resultsSummary}
                  onChange={(e) => setResultsSummary(e.target.value)}
                  placeholder="Measured commercial impact and ROI delivered..."
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl p-2.5 text-xs text-white outline-none resize-none font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    Client Quote Author
                  </label>
                  <input
                    type="text"
                    value={testimonialAuthor}
                    onChange={(e) => setTestimonialAuthor(e.target.value)}
                    placeholder="Vikramaditya Singhania"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-muted mb-1">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={testimonialRole}
                    onChange={(e) => setTestimonialRole(e.target.value)}
                    placeholder="Chief Executive Officer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-[#d6b268] text-black font-semibold text-xs transition cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Case Study"}
              </button>
            </form>
          ) : (
            <div className="py-16 text-center text-xs text-muted font-mono">
              Select a case study to edit or click &quot;Add Case Study&quot; to showcase another client win.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
