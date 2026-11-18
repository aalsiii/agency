"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight, ShieldCheck, Zap, Layers, Sparkles, MessageSquare } from "lucide-react";

export default function PricingPage() {
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    "Custom Next.js Web Development",
    "Performance Marketing & Meta Ads",
  ]);

  const capabilities = [
    { title: "Custom Next.js Web Development", category: "Engineering" },
    { title: "WordPress Complete Redesign", category: "Engineering" },
    { title: "High-ROAS Meta & Google Paid Ads", category: "Growth" },
    { title: "Full-Funnel Organic SEO & Content", category: "Growth" },
    { title: "Social Media Strategy & Management", category: "Creative" },
    { title: "Brand Identity & Visual System", category: "Branding" },
    { title: "Conversion Rate Optimization (CRO)", category: "Strategy" },
    { title: "Funnel Latency & Creative Audits", category: "Diagnostics" },
  ];

  const toggleCap = (title: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground">
      {/* Header */}
      <div className="mb-20 space-y-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Partnership Models & Scope Architecture
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // custom scoping · milestone-based sprints · zero lock-in contracts
        </div>
        <p className="text-lg md:text-xl text-muted font-light leading-relaxed pt-2">
          Every brand operates with distinct unit economics, technical legacy, and growth bottlenecks. Rather than forcing you into rigid boilerplate rate cards, we engineer custom scopes aligned precisely with your 90-day pipeline objectives.
        </p>
      </div>

      {/* 3 Core Partnership Models */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
        {/* Model 01 */}
        <div className="p-8 md:p-10 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-primary/80">[ model 01 // sprint ]</span>
              <Zap size={18} className="text-primary/80" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white">Dedicated Growth Sprint</h2>
              <p className="text-xs text-muted font-light mt-2 leading-relaxed">
                For brands requiring rapid execution, a flagship platform launch, or a complete website redesign within a concentrated window.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--background-layer-2)] border border-white/10 space-y-1">
              <span className="font-mono text-[11px] text-muted block">cadence & investment</span>
              <span className="text-sm font-mono text-primary font-semibold">2–4 Weeks · Milestone-Based Scope</span>
            </div>

            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] text-white/50 block">key deliverables included:</span>
              {[
                "Custom Next.js 16 web application or full redesign",
                "Sub-second Core Web Vitals (95+ score target)",
                "Full-funnel lead capture architecture",
                "SEO semantic schema & Google Search Console setup",
                "Complete handoff and post-launch warranty support",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                  <Check size={14} className="text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/start-a-project?model=sprint"
            className="w-full text-center py-3.5 rounded-full border border-white/20 text-white font-mono text-xs hover:border-primary hover:text-primary transition-all duration-300"
          >
            Request Sprint Scoping →
          </Link>
        </div>

        {/* Model 02 (Featured) */}
        <div className="p-8 md:p-10 rounded-2xl bg-[var(--background-layer-1)] border-2 border-primary/60 shadow-[0_0_40px_rgba(197,160,89,0.12)] flex flex-col justify-between relative space-y-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-black font-mono text-[10px] font-bold tracking-widest uppercase">
            Featured Partnership
          </div>

          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-primary">[ model 02 // retainer ]</span>
              <Layers size={18} className="text-primary" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white">Full Growth Retainer</h2>
              <p className="text-xs text-muted font-light mt-2 leading-relaxed">
                Your dedicated full-stack digital squad: web development, ongoing SEO, performance marketing, and creative production.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--background-layer-2)] border border-primary/20 space-y-1">
              <span className="font-mono text-[11px] text-muted block">cadence & investment</span>
              <span className="text-sm font-mono text-primary font-semibold">Month-to-Month Rolling · Tailored Team Allocation</span>
            </div>

            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] text-white/50 block">full-squad capabilities:</span>
              {[
                "Continuous Next.js engineering & feature development",
                "Meta & Google Ads media management & budget scaling",
                "Weekly ad creative testing & copywriting iterations",
                "Organic search rankings & authoritative content sprints",
                "Direct Slack / WhatsApp channel with lead strategist",
                "Weekly pipeline reviews with blended CAC & ROAS tracking",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-white/90 font-light">
                  <Check size={14} className="text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/start-a-project?model=retainer"
            className="w-full text-center py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all duration-300"
          >
            Apply For Partnership →
          </Link>
        </div>

        {/* Model 03 */}
        <div className="p-8 md:p-10 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-primary/80">[ model 03 // advisory ]</span>
              <ShieldCheck size={18} className="text-primary/80" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white">Strategic Advisory & Audit</h2>
              <p className="text-xs text-muted font-light mt-2 leading-relaxed">
                For executive teams needing surgical diagnostic teardowns, conversion optimization blueprints, and technical architecture guidance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--background-layer-2)] border border-white/10 space-y-1">
              <span className="font-mono text-[11px] text-muted block">cadence & investment</span>
              <span className="text-sm font-mono text-primary font-semibold">Fixed Advisory Engagement</span>
            </div>

            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] text-white/50 block">advisory deliverables:</span>
              {[
                "Deep-dive conversion funnel friction audit",
                "Mobile page latency & Core Web Vitals diagnostics",
                "Meta & Google creative fatigue teardown",
                "Organic search gap analysis vs competitors",
                "Actionable video walkthrough + implementation checklist",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                  <Check size={14} className="text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/book-a-call"
            className="w-full text-center py-3.5 rounded-full border border-white/20 text-white font-mono text-xs hover:border-primary hover:text-primary transition-all duration-300"
          >
            Book Strategy Call →
          </Link>
        </div>
      </div>

      {/* Interactive Scope Request Builder */}
      <section className="p-8 md:p-12 rounded-2xl bg-[var(--background-layer-1)] border border-white/15 space-y-8 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Build Your Custom Scope</h2>
            <p className="text-muted text-sm font-light mt-2 max-w-xl">
              Select the capabilities your brand needs right now. We will review your selections and prepare a bespoke proposal with clear deliverables and timelines.
            </p>
          </div>
          <div className="font-mono text-xs text-primary/80">
            // {selectedCapabilities.length} capabilities selected
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((c, idx) => {
            const isSelected = selectedCapabilities.includes(c.title);
            return (
              <div
                key={idx}
                onClick={() => toggleCap(c.title)}
                className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_20px_rgba(197,160,89,0.08)]"
                    : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-primary/70">[ {c.category} ]</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? "border-primary bg-primary text-black" : "border-white/30"
                    }`}
                  >
                    {isSelected && <Check size={10} strokeWidth={3} />}
                  </div>
                </div>
                <h3 className="text-xs font-serif font-semibold text-white leading-snug">{c.title}</h3>
              </div>
            );
          })}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-light">
            All engagements include month-to-month flexibility and direct senior team communication.
          </p>

          <Link
            href={`/start-a-project?scope=${encodeURIComponent(selectedCapabilities.join(", "))}`}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all duration-300"
          >
            <span>Request Proposal For Selected Scope</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Transparent Scope FAQ */}
      <section className="space-y-8 max-w-4xl mx-auto border-t border-white/10 pt-16">
        <h3 className="text-2xl md:text-3xl font-serif text-white text-center">
          Our Scoping & Engagement Standards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs">
          <div className="p-6 rounded-xl bg-[var(--background-layer-1)] border border-white/10 space-y-2">
            <h4 className="font-serif text-sm font-semibold text-white">Why don't we show fixed price tags?</h4>
            <p className="text-muted font-light leading-relaxed">
              Every client's existing technical stack, catalog volume, ad spend, and brand assets are fundamentally different. Fixed price cards force agencies to cut corners or overcharge. Custom scoping ensures you pay strictly for the engineering and marketing firepower you actually consume.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--background-layer-1)] border border-white/10 space-y-2">
            <h4 className="font-serif text-sm font-semibold text-white">Are we locked into long-term contracts?</h4>
            <p className="text-muted font-light leading-relaxed">
              Never. We operate on month-to-month rolling agreements or defined milestone sprints. We believe our agency must earn your business and partnership every 30 days through transparent, measurable pipeline results.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--background-layer-1)] border border-white/10 space-y-2">
            <h4 className="font-serif text-sm font-semibold text-white">How quickly can we launch?</h4>
            <p className="text-muted font-light leading-relaxed">
              Dedicated sprints kickoff within 3 to 5 business days of scope approval. Complete Next.js platforms and web redesigns typically deploy in 2 to 4 weeks.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--background-layer-1)] border border-white/10 space-y-2">
            <h4 className="font-serif text-sm font-semibold text-white">Who manages our account?</h4>
            <p className="text-muted font-light leading-relaxed">
              You work directly with lead strategists and engineers via a dedicated Slack or WhatsApp channel. No junior account runners or slow ticketing queues.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
