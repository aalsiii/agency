"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Phone,
  Mail,
  Globe,
  Building,
  CheckCircle,
  Clock,
  Trash2,
  AlertCircle,
  RefreshCw,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country?: string | null;
  company: string | null;
  website: string | null;
  serviceInterested: string | null;
  servicesRequested?: string | null;
  projectObjectives?: string | null;
  timeline?: string | null;
  source?: string | null;
  budget: string | null;
  currency: string;
  message: string;
  status: string;
  priority: string;
  notes: string | null;
  createdAt: string;
}

export default function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads${statusFilter !== "ALL" ? `?status=${statusFilter}` : ""}`);
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      if (selectedLead?.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveNote = async () => {
    if (!selectedLead) return;
    setUpdating(true);
    try {
      await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: noteText }),
      });
      setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: noteText } : l)));
      setSelectedLead((prev) => (prev ? { ...prev, notes: noteText } : null));
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company && l.company.toLowerCase().includes(q)) ||
      (l.serviceInterested && l.serviceInterested.toLowerCase().includes(q)) ||
      (l.country && l.country.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-primary/80 tracking-widest uppercase mb-1">
            Pipeline Management • Inbound Enquiries
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight">
            Leads & Inquiries CRM
          </h1>
          <p className="font-mono text-xs text-muted mt-1">
            Qualify, track and convert prospects from multi-step and direct intake forms.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center gap-2 transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-primary" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, company, country, service..."
            className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-muted focus:outline-none focus:border-primary/60 font-mono"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[var(--background-layer-1)] border border-white/10 font-mono text-xs text-white rounded-xl px-3 py-2.5 outline-none focus:border-primary/60 cursor-pointer"
          >
            <option value="ALL" className="bg-black">All Statuses ({leads.length})</option>
            <option value="NEW" className="bg-black">New</option>
            <option value="CONTACTED" className="bg-black">Contacted</option>
            <option value="PROPOSAL_SENT" className="bg-black">Proposal Sent</option>
            <option value="CONVERTED" className="bg-black">Converted</option>
            <option value="ARCHIVED" className="bg-black">Archived</option>
          </select>
        </div>
      </div>

      {/* Leads Table & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table list */}
        <div className="lg:col-span-2 bg-[var(--background-layer-1)] border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center font-mono text-xs text-muted">Loading inquiries from database...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center font-mono text-xs text-muted">No leads match your criteria.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {filtered.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => {
                    setSelectedLead(lead);
                    setNoteText(lead.notes || "");
                  }}
                  className={`p-4 md:p-5 hover:bg-white/[0.02] transition cursor-pointer flex items-start justify-between gap-4 ${
                    selectedLead?.id === lead.id ? "bg-white/[0.03] border-l-2 border-primary" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-white">{lead.name}</span>
                      <span
                        className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          lead.status === "NEW"
                            ? "bg-primary/20 text-primary border border-primary/40"
                            : lead.status === "CONVERTED"
                            ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800"
                            : "bg-white/5 text-neutral-300"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-muted mt-1 truncate">
                      {lead.email} {lead.phone ? `• ${lead.phone}` : ""} {lead.country ? `• ${lead.country}` : ""}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-2 font-mono">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-primary font-medium">
                        {lead.serviceInterested || "Custom Enquiry"}
                      </span>
                      {lead.budget && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                          {lead.budget}
                        </span>
                      )}
                      {lead.timeline && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted">
                          {lead.timeline}
                        </span>
                      )}
                      {lead.company && (
                        <span className="text-[10px] text-muted flex items-center gap-1">
                          <Building className="w-3 h-3" /> {lead.company}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono text-[11px] text-muted">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Lead Drawer / Details */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6 h-fit sticky top-6">
          {selectedLead ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">{selectedLead.name}</h3>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Lead ID: #{selectedLead.id.slice(0, 8)} • {new Date(selectedLead.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteLead(selectedLead.id)}
                  title="Delete Lead"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-2">
                  Pipeline Stage
                </label>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {["NEW", "CONTACTED", "PROPOSAL_SENT", "CONVERTED", "ARCHIVED"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateLeadStatus(selectedLead.id, s)}
                      className={`px-2.5 py-1.5 rounded-xl transition cursor-pointer text-center ${
                        selectedLead.status === s
                          ? "bg-primary text-black font-bold shadow-md shadow-primary/20"
                          : "bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info list */}
              <div className="space-y-2 bg-white/[0.02] p-3.5 rounded-xl border border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline truncate">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <a href={`tel:${selectedLead.phone}`} className="hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
                {selectedLead.country && (
                  <div className="flex items-center gap-2 text-neutral-300">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{selectedLead.country}</span>
                  </div>
                )}
                {selectedLead.website && (
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                    <a
                      href={selectedLead.website.startsWith("http") ? selectedLead.website : `https://${selectedLead.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline truncate"
                    >
                      {selectedLead.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Selected Services & Scope */}
              {(selectedLead.servicesRequested || selectedLead.serviceInterested) && (
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-1.5">
                    Services Requested
                  </label>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs text-primary">
                    {selectedLead.servicesRequested || selectedLead.serviceInterested}
                  </div>
                </div>
              )}

              {/* Objectives & Message */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-1.5">
                  Project Objectives & Message
                </label>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.projectObjectives && (
                    <div className="mb-2 pb-2 border-b border-white/10 text-white font-medium">
                      <span className="font-mono text-muted text-[10px] uppercase block">Objectives:</span>
                      {selectedLead.projectObjectives}
                    </div>
                  )}
                  {selectedLead.message}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-1.5">
                  Internal Notes
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Record call notes, proposal value, next action items..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl p-3 font-mono text-xs text-white outline-none resize-none"
                />
                <button
                  onClick={saveNote}
                  disabled={updating}
                  className="mt-2 w-full py-2.5 rounded-xl bg-primary text-black font-mono text-xs font-semibold hover:bg-[#d6b268] transition cursor-pointer disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center font-mono text-xs text-muted">
              Select a lead from the list to view full details and update pipeline stage.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
