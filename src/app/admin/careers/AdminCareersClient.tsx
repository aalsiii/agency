"use client";

import { useState } from "react";
import {
  Briefcase,
  Users,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  portfolioUrl?: string | null;
  resumeUrl?: string | null;
  notes?: string | null;
  status: string;
  createdAt: string | Date;
  careerId: string;
}

interface Career {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements?: string | null;
  benefits?: string | null;
  isActive: boolean;
  createdAt: string | Date;
  applications: Application[];
}

export default function AdminCareersClient({
  initialCareers,
}: {
  initialCareers: Career[];
}) {
  const [careers, setCareers] = useState<Career[]>(initialCareers);
  const [tab, setTab] = useState<"openings" | "applications">("openings");
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string>("all");

  const [form, setForm] = useState({
    title: "",
    department: "Engineering",
    location: "Remote / Hybrid (Bengaluru, IN)",
    type: "Full-Time",
    experience: "3+ years",
    description: "",
    requirements: "TypeScript, Next.js, Architecture discipline, Clean code",
    isActive: true,
  });

  const allApplications = careers.flatMap((c) =>
    c.applications.map((a) => ({ ...a, careerTitle: c.title, careerDept: c.department }))
  );

  const filteredApps = allApplications.filter((a) =>
    selectedCareer === "all" ? true : a.careerId === selectedCareer
  );

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) {
        setCareers((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isActive: !current } : c))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCareer = async (id: string) => {
    if (!confirm("Are you sure? This will delete the role and its associated applications.")) return;
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCareers((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateAppStatus = async (appId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setCareers((prev) =>
          prev.map((c) => ({
            ...c,
            applications: c.applications.map((a) =>
              a.id === appId ? { ...a, status } : a
            ),
          }))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.career) {
        setCareers((prev) => [{ ...data.career, applications: [] }, ...prev]);
        setShowAddModal(false);
        setForm({
          title: "",
          department: "Engineering",
          location: "Remote / Hybrid (Bengaluru, IN)",
          type: "Full-Time",
          experience: "3+ years",
          description: "",
          requirements: "TypeScript, Next.js, Architecture discipline, Clean code",
          isActive: true,
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
            Talent Acquisition & Team Expansion
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Careers & Candidates
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
              {careers.length} Roles • {allApplications.length} Applicants
            </span>
          </h1>
          <p className="text-sm text-muted mt-1">
            Manage open studio positions and review candidate submissions in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 font-mono text-xs">
            <button
              onClick={() => setTab("openings")}
              className={`px-3 py-1.5 rounded-lg transition ${
                tab === "openings"
                  ? "bg-primary text-black font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              Openings ({careers.length})
            </button>
            <button
              onClick={() => setTab("applications")}
              className={`px-3 py-1.5 rounded-lg transition ${
                tab === "applications"
                  ? "bg-primary text-black font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              Applications ({allApplications.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-primary text-black font-mono text-xs font-semibold hover:bg-[#d6b268] transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Role</span>
          </button>
        </div>
      </div>

      {/* Tab: Openings */}
      {tab === "openings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {careers.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 flex flex-col justify-between hover:border-primary/40 transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-primary uppercase tracking-wider">
                    {c.department}
                  </span>
                  <button
                    onClick={() => handleToggleActive(c.id, c.isActive)}
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-full border transition ${
                      c.isActive
                        ? "bg-emerald-950/40 text-emerald-400 border-emerald-800"
                        : "bg-white/5 text-muted border-white/10 hover:text-white"
                    }`}
                  >
                    {c.isActive ? "● Active Role" : "○ Paused"}
                  </button>
                </div>

                <h3 className="font-serif text-lg font-bold text-white mb-2">{c.title}</h3>
                <p className="font-mono text-xs text-muted mb-4">
                  {c.type} • {c.location} • {c.experience}
                </p>
                <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-6">
                  {c.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-muted flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  {c.applications.length} Candidates
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCareer(c.id);
                      setTab("applications");
                    }}
                    className="font-mono text-xs text-primary hover:underline px-2 py-1"
                  >
                    View Applicants
                  </button>
                  <button
                    onClick={() => handleDeleteCareer(c.id)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Applications */}
      {tab === "applications" && (
        <div className="space-y-4">
          {/* Filter by role */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted">Filter by Role:</span>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-primary/60"
            >
              <option value="all" className="bg-black">All Openings ({allApplications.length})</option>
              {careers.map((c) => (
                <option key={c.id} value={c.id} className="bg-black">
                  {c.title} ({c.applications.length})
                </option>
              ))}
            </select>
          </div>

          {filteredApps.length === 0 ? (
            <div className="text-center py-16 bg-[var(--background-layer-1)] rounded-2xl border border-white/10 text-muted font-mono text-sm">
              No candidate submissions for this role yet.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/40 transition"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-base text-white">
                        {app.name}
                      </span>
                      <span className="font-mono text-xs text-primary/80">
                        applied for <span className="text-white font-medium">{app.careerTitle}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                      <span>{app.email}</span>
                      {app.phone && <span>• {app.phone}</span>}
                      {app.portfolioUrl && (
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          Portfolio <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {app.resumeUrl && (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          Resume Link <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {app.notes && (
                      <p className="text-xs text-neutral-300 italic pt-1 max-w-2xl">
                        &ldquo;{app.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      value={app.status}
                      onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                      className={`font-mono text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${
                        app.status === "HIRED"
                          ? "bg-emerald-950 text-emerald-400 border-emerald-700"
                          : app.status === "SHORTLISTED"
                          ? "bg-primary/20 text-primary border-primary/40"
                          : app.status === "REJECTED"
                          ? "bg-red-950/40 text-red-400 border-red-800"
                          : "bg-white/5 text-neutral-300 border-white/10"
                      }`}
                    >
                      <option value="NEW" className="bg-black text-white">Status: NEW</option>
                      <option value="REVIEWED" className="bg-black text-white">Status: REVIEWED</option>
                      <option value="SHORTLISTED" className="bg-black text-primary">Status: SHORTLISTED</option>
                      <option value="HIRED" className="bg-black text-emerald-400">Status: HIRED</option>
                      <option value="REJECTED" className="bg-black text-red-400">Status: REJECTED</option>
                    </select>

                    <span className="font-mono text-[11px] text-neutral-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--background-layer-1)] border border-white/15 rounded-2xl max-w-xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Post New Career Opportunity
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
                <label className="block font-mono text-xs text-muted mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Senior Full-Stack Next.js Architect"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs text-muted mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  >
                    <option value="Engineering" className="bg-black">Engineering</option>
                    <option value="Creative & Design" className="bg-black">Creative & Design</option>
                    <option value="Performance & Growth" className="bg-black">Performance & Growth</option>
                    <option value="Strategy & Consulting" className="bg-black">Strategy & Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted mb-1">Employment Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  >
                    <option value="Full-Time" className="bg-black">Full-Time</option>
                    <option value="Contract / Project" className="bg-black">Contract / Project</option>
                    <option value="Part-Time" className="bg-black">Part-Time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs text-muted mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Remote / Hybrid (Bengaluru, IN)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted mb-1">Experience Level</label>
                  <input
                    type="text"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    placeholder="3+ years"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-muted mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Outline the responsibilities and scope of the position..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary/60"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-muted mb-1">Requirements (comma-separated)</label>
                <input
                  type="text"
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  placeholder="Next.js 15, Prisma ORM, TypeScript, Tailwind CSS"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-primary text-black font-mono text-xs font-semibold hover:bg-[#d6b268] transition disabled:opacity-50"
                >
                  {submitting ? "Publishing Role..." : "Publish Job Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
