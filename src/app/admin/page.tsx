import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  FileSearch,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Star,
  Briefcase,
  Mail,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let totalLeads = 0;
  let newLeadsCount = 0;
  let totalAudits = 0;
  let pendingAuditsCount = 0;
  let totalServices = 0;
  let totalCaseStudies = 0;
  let totalTestimonials = 0;
  let totalCareers = 0;
  let totalApplications = 0;
  let totalSubscribers = 0;
  let recentLeads: any[] = [];
  let recentAudits: any[] = [];

  try {
    [
      totalLeads,
      newLeadsCount,
      totalAudits,
      pendingAuditsCount,
      totalServices,
      totalCaseStudies,
      totalTestimonials,
      totalCareers,
      totalApplications,
      totalSubscribers,
      recentLeads,
      recentAudits,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.auditRequest.count(),
      prisma.auditRequest.count({ where: { status: "PENDING" } }),
      prisma.service.count({ where: { isActive: true } }),
      prisma.caseStudy.count(),
      prisma.testimonial.count(),
      prisma.career.count({ where: { isActive: true } }),
      prisma.application.count(),
      prisma.newsletterSubscriber.count(),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.auditRequest.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);
  } catch (error) {
    console.error("Database connection fallback on AdminDashboardPage:", error);
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-primary/80 tracking-widest uppercase mb-1">
            Executive Command Suite
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            NextCurrent Overview
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
              Live Engine
            </span>
          </h1>
          <p className="text-sm text-muted mt-1">
            Real-time pipeline analytics, project enquiries, and operational metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/leads"
            className="px-4 py-2.5 rounded-xl bg-primary text-black font-mono text-xs font-semibold hover:bg-[#d6b268] transition flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>Manage Leads ({totalLeads})</span>
          </Link>
          <Link
            href="/start-a-project"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-mono text-xs flex items-center gap-1.5 transition"
          >
            <span>Live Project Funnel</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted" />
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: New Inquiries */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-primary/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">
              New Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white tracking-tight">{newLeadsCount}</span>
            <span className="font-mono text-xs text-muted">of {totalLeads} total</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 font-mono text-xs text-primary">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Multi-step & direct leads</span>
          </div>
        </div>

        {/* Card 2: Diagnostic Audits */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-primary/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">
              Pending Audits
            </span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white tracking-tight">{pendingAuditsCount}</span>
            <span className="font-mono text-xs text-muted">of {totalAudits} total</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 font-mono text-xs text-primary/80">
            <Clock className="w-3.5 h-3.5" />
            <span>Diagnostic audit funnels</span>
          </div>
        </div>

        {/* Card 3: Active Services */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-primary/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">
              Services Active
            </span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white tracking-tight">{totalServices}</span>
            <span className="font-mono text-xs text-muted">across 4 pillars</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 font-mono text-xs text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Dynamic routes & ₹/$ rates</span>
          </div>
        </div>

        {/* Card 4: Case Studies & Social Proof */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:border-primary/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">
              Proof & Work
            </span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-white tracking-tight">{totalCaseStudies}</span>
            <span className="font-mono text-xs text-muted">studies • {totalTestimonials} quotes</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 font-mono text-xs text-primary">
            <Star className="w-3.5 h-3.5 fill-primary" />
            <span>Published portfolio</span>
          </div>
        </div>
      </div>

      {/* Secondary Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 font-mono text-xs">
        <div className="flex items-center gap-3">
          <Briefcase className="w-4 h-4 text-primary" />
          <div>
            <span className="text-muted block text-[10px]">Open Careers</span>
            <span className="text-white font-bold">{totalCareers} Roles ({totalApplications} Applicants)</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-primary" />
          <div>
            <span className="text-muted block text-[10px]">Newsletter Subscribers</span>
            <span className="text-white font-bold">{totalSubscribers} Subscribers</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Layers className="w-4 h-4 text-primary" />
          <div>
            <span className="text-muted block text-[10px]">Currency Engine</span>
            <span className="text-white font-bold">Dual INR (₹) / USD ($)</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-muted block text-[10px]">API Architecture</span>
            <span className="text-emerald-400 font-bold">100% Free / Zero Paid API</span>
          </div>
        </div>
      </div>

      {/* Two-Column Activity Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">Recent Inquiries</h2>
              <p className="font-mono text-xs text-muted mt-0.5">Direct contact & multi-step project submissions</p>
            </div>
            <Link
              href="/admin/leads"
              className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <p className="font-mono text-sm text-neutral-500 py-6 text-center">No leads received yet.</p>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-white truncate">{lead.name}</span>
                      <span
                        className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          lead.status === "NEW"
                            ? "bg-primary/20 text-primary border border-primary/40"
                            : "bg-white/5 text-neutral-300"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted truncate mt-0.5">
                      {lead.email} {lead.company ? `• ${lead.company}` : ""}
                    </p>
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-1 italic">
                      &quot;{lead.message}&quot;
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-semibold text-primary">
                      {lead.budget || lead.serviceInterested || "Custom"}
                    </span>
                    <span className="block font-mono text-[10px] text-neutral-500 mt-1">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Diagnostic Audits */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">Recent Audit Requests</h2>
              <p className="font-mono text-xs text-muted mt-0.5">Diagnostic submissions from /free-audit & /seo-audit</p>
            </div>
            <Link
              href="/admin/audits"
              className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAudits.length === 0 ? (
              <p className="font-mono text-sm text-neutral-500 py-6 text-center">No audit requests yet.</p>
            ) : (
              recentAudits.map((audit) => (
                <div
                  key={audit.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-white truncate">
                        {audit.businessName}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 font-bold">
                        Score: {audit.auditScore}/100
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted truncate mt-0.5">
                      {audit.name} ({audit.email})
                    </p>
                    <p className="font-mono text-xs text-neutral-300 mt-1 truncate">
                      Goal: {audit.primaryGoal} • Spend: {audit.monthlySpend || "N/A"}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                      {audit.status}
                    </span>
                    <span className="block font-mono text-[10px] text-neutral-500 mt-1">
                      {new Date(audit.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
