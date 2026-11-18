"use client";

import { useState, useEffect } from "react";
import {
  FileSearch,
  ExternalLink,
  Mail,
  Phone,
  RefreshCw,
  Sparkles,
  Trash2,
  CheckCircle2,
  Target,
  DollarSign,
  Globe,
} from "lucide-react";

interface AuditRequest {
  id: string;
  businessName: string;
  websiteUrl: string;
  instagramHandle: string | null;
  industry: string;
  primaryGoal: string;
  monthlySpend: string | null;
  name: string;
  email: string;
  phone: string;
  auditScore: number;
  status: string;
  reportNotes: string | null;
  createdAt: string;
}

export default function AuditsManager() {
  const [audits, setAudits] = useState<AuditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAudit, setSelectedAudit] = useState<AuditRequest | null>(null);
  const [notes, setNotes] = useState("");
  const [score, setScore] = useState<number>(70);
  const [saving, setSaving] = useState(false);

  const fetchAudits = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/audits");
      const data = await res.json();
      if (data.audits) setAudits(data.audits);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/audits/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setAudits((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
      if (selectedAudit?.id === id) {
        setSelectedAudit((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveAuditReview = async () => {
    if (!selectedAudit) return;
    setSaving(true);
    try {
      await fetch(`/api/audits/${selectedAudit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportNotes: notes, auditScore: score }),
      });
      setAudits((prev) =>
        prev.map((a) => (a.id === selectedAudit.id ? { ...a, reportNotes: notes, auditScore: score } : a))
      );
      setSelectedAudit((prev) => (prev ? { ...prev, reportNotes: notes, auditScore: score } : null));
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const deleteAudit = async (id: string) => {
    if (!confirm("Delete this audit request?")) return;
    try {
      await fetch(`/api/audits/${id}`, { method: "DELETE" });
      setAudits((prev) => prev.filter((a) => a.id !== id));
      if (selectedAudit?.id === id) setSelectedAudit(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-primary/80 tracking-widest uppercase mb-1">
            Diagnostic Intake • High-Intent Prospects
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Audit Dossier & Diagnostics
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
              {audits.length} Audits
            </span>
          </h1>
          <p className="font-mono text-xs text-muted mt-1">
            Diagnostic submissions generated via /free-audit and campaign landing pages.
          </p>
        </div>

        <button
          onClick={fetchAudits}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center gap-2 transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-primary" : ""}`} />
          <span>Refresh Dossier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table list */}
        <div className="lg:col-span-2 bg-[var(--background-layer-1)] border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center font-mono text-xs text-muted">Loading audit submissions...</div>
          ) : audits.length === 0 ? (
            <div className="p-12 text-center font-mono text-xs text-muted">No audit requests found.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {audits.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedAudit(item);
                    setNotes(item.reportNotes || "");
                    setScore(item.auditScore || 70);
                  }}
                  className={`p-4 md:p-5 hover:bg-white/[0.02] transition cursor-pointer flex items-start justify-between gap-4 ${
                    selectedAudit?.id === item.id ? "bg-white/[0.03] border-l-2 border-primary" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-white">{item.businessName}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 font-bold">
                        {item.auditScore}/100 Score
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          item.status === "PENDING"
                            ? "bg-amber-950/40 text-amber-400 border border-amber-800"
                            : item.status === "REPORT_SENT"
                            ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800"
                            : "bg-white/5 text-neutral-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-muted mt-1 truncate">
                      Lead: {item.name} • {item.email} • {item.phone}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-2 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-primary flex items-center gap-1">
                        <Target className="w-3 h-3" /> {item.primaryGoal}
                      </span>
                      {item.monthlySpend && (
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> {item.monthlySpend}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted">
                        {item.industry}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono text-[11px] text-muted">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Audit Details */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6 h-fit sticky top-6">
          {selectedAudit ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">{selectedAudit.businessName}</h3>
                  <a
                    href={
                      selectedAudit.websiteUrl.startsWith("http")
                        ? selectedAudit.websiteUrl
                        : `https://${selectedAudit.websiteUrl}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{selectedAudit.websiteUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <button
                  onClick={() => deleteAudit(selectedAudit.id)}
                  title="Delete"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-2">
                  Audit Lifecycle Status
                </label>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {["PENDING", "IN_REVIEW", "REPORT_SENT", "CLOSED"].map((st) => (
                    <button
                      key={st}
                      onClick={() => updateStatus(selectedAudit.id, st)}
                      className={`px-2.5 py-1.5 rounded-xl transition cursor-pointer text-center ${
                        selectedAudit.status === st
                          ? "bg-primary text-black font-bold shadow-md shadow-primary/20"
                          : "bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2 bg-white/[0.02] p-3.5 rounded-xl border border-white/10 font-mono text-xs">
                <p className="font-serif font-bold text-sm text-white">{selectedAudit.name}</p>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <a href={`mailto:${selectedAudit.email}`} className="hover:underline">
                    {selectedAudit.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={`tel:${selectedAudit.phone}`} className="hover:underline">
                    {selectedAudit.phone}
                  </a>
                </div>
                {selectedAudit.instagramHandle && (
                  <div className="text-muted">
                    Instagram: <span className="text-white">{selectedAudit.instagramHandle}</span>
                  </div>
                )}
              </div>

              {/* Edit Score & Notes */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-1.5">
                  Calculated Diagnostic Score (1-100)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3 font-mono text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-1.5">
                  Diagnostic Findings & Video Audit Link
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record video audit link, findings, conversion recommendations..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl p-3 font-mono text-xs text-white outline-none resize-none"
                />
                <button
                  onClick={saveAuditReview}
                  disabled={saving}
                  className="mt-2 w-full py-2.5 rounded-xl bg-primary hover:bg-[#d6b268] text-xs font-semibold text-black transition cursor-pointer font-mono disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Findings & Score"}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center font-mono text-xs text-muted">
              Select an audit request to review full dossier and record findings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
