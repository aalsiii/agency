"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, Compass, ShieldAlert, Cpu, BarChart3 } from "lucide-react";

interface Option {
  id: string;
  label: string;
  sub: string;
}

const bottlenecks: Option[] = [
  {
    id: "conversion",
    label: "Outdated Website & Low Conversions",
    sub: "Slow load times, clunky mobile experience, losing prospective clients to competitors.",
  },
  {
    id: "ads",
    label: "Meta & Google Ads Burning Budget",
    sub: "High acquisition costs, ad creative fatigue, and inconsistent lead flow.",
  },
  {
    id: "seo",
    label: "Zero Organic Search Visibility",
    sub: "Invisible on Google for high-intent client queries, dependent purely on word-of-mouth.",
  },
  {
    id: "brand",
    label: "Inconsistent Brand Authority & Socials",
    sub: "Disjointed aesthetics across touchpoints, failing to command premium client pricing.",
  },
];

const industries: Option[] = [
  {
    id: "coaching",
    label: "Education, Wellness & Coaching",
    sub: "Yoga academies, executive coaches, online cohorts.",
  },
  {
    id: "ecommerce",
    label: "E-Commerce & DTC Storefronts",
    sub: "Next.js online stores, artisanal goods, lifestyle products.",
  },
  {
    id: "creative",
    label: "Creative Studios & Portfolios",
    sub: "Photographers, architects, elite design practices.",
  },
  {
    id: "professional",
    label: "Professional & Healthcare Services",
    sub: "Consultancies, clinical practices, maternal care.",
  },
];

const targets: Option[] = [
  {
    id: "capacity",
    label: "Fill Bookings & Cohorts to Capacity",
    sub: "Consistent pipeline of qualified student and client applications.",
  },
  {
    id: "platform",
    label: "Deploy Sub-Second Next.js Platform",
    sub: "Instantaneous page loads, fluid mobile UX, and automated lead capture.",
  },
  {
    id: "organic",
    label: "Build Compounding SEO Footprint",
    sub: "Authoritative search rankings generating inbound client inquiries daily.",
  },
  {
    id: "scale_ads",
    label: "High-ROAS Scalable Paid Ad Engine",
    sub: "Predictable customer acquisition at profitable unit economics.",
  },
];

export default function GrowthDiagnosticEngine() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0].id);
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0].id);
  const [selectedTarget, setSelectedTarget] = useState(targets[0].id);

  // Dynamic blueprint generator
  const getBlueprint = () => {
    if (selectedBottleneck === "conversion") {
      return {
        focus: "Next.js Architectural Overhaul & Conversion Funnel",
        timeline: "2 to 3 Week Sprint",
        stack: ["Custom Next.js 16", "Tailwind CSS", "Sub-Second Edge Rendering", "Automated Lead Routing"],
        benchmark: "Similar to Nada Yoga School's complete web redesign and enrollment surge to full capacity.",
        deliverables: [
          "Sub-second Core Web Vitals (95+ Lighthouse Score)",
          "Bespoke mobile checkout / application funnel",
          "Technical SEO semantic hierarchy & schema markup",
          "Conversion tracking & attribution telemetry",
        ],
      };
    } else if (selectedBottleneck === "ads") {
      return {
        focus: "Full-Funnel Meta & Google Performance Engine",
        timeline: "Monthly Rolling Growth Retainer",
        stack: ["Meta Advantage+", "Dynamic Creative Testing", "Blended ROAS Telemetry", "High-Converting Landers"],
        benchmark: "Structured around verified unit economics and real client enrollments, avoiding ad fatigue.",
        deliverables: [
          "5 new creative & hook variants engineered weekly",
          "Custom pre-lander bridge pages to warm cold traffic",
          "Negative keyword & audience exclusion optimization",
          "Weekly video teardown & media efficiency reporting",
        ],
      };
    } else if (selectedBottleneck === "seo") {
      return {
        focus: "Topical Authority & Technical SEO Architecture",
        timeline: "Compounding 90-Day Organic Sprint",
        stack: ["Next.js SSR/ISR", "Schema.org Json-LD", "Search Console Indexation", "High-Intent Topic Clusters"],
        benchmark: "Similar to Eazy Pregnancy's authoritative SEO articles ranking for target keywords.",
        deliverables: [
          "Technical site indexation & Core Web Vitals remediation",
          "Competitor keyword gap analysis & search intent mapping",
          "Authoritative, keyword-dense educational articles",
          "Internal link graph architecture for crawl efficiency",
        ],
      };
    } else {
      return {
        focus: "Executive Brand Authority & Multi-Channel Content",
        timeline: "Monthly Creative Retainer",
        stack: ["Editorial Typography", "Social Visual Identity", "Content Direction", "Personal Brand Architecture"],
        benchmark: "Similar to Val Alino Coach's cohesive personal brand presence and social consistency.",
        deliverables: [
          "Unified visual design system across web and social",
          "Weekly short-form content guidelines and hook templates",
          "Editorial photography / asset curation standards",
          "Authority-driven positioning & bio/landing page revamp",
        ],
      };
    }
  };

  const blueprint = getBlueprint();

  return (
    <section className="py-32 bg-[var(--background-layer-1)] border-y border-white/10 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div className="space-y-3">
            <div className="font-mono text-xs text-primary/80">
              // interactive diagnostic · real-time strategy matrix
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
              Interactive Growth Diagnostic
            </h2>
            <p className="text-muted text-base max-w-xl font-light leading-relaxed">
              Diagnose your primary business friction and generate an immediate tailored architectural blueprint — calibrated against real client milestones.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-primary/90 bg-[var(--background-layer-2)] border border-primary/20 px-4 py-2 rounded-full shrink-0">
            <Sparkles size={14} className="text-primary" />
            <span>Interactive Strategy Engine</span>
          </div>
        </div>

        {/* Step 1: Bottleneck Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary/80">[ step 01 ]</span>
            <h3 className="text-lg font-serif text-white font-medium">Where is your primary growth bottleneck?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bottlenecks.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBottleneck(b.id)}
                className={`p-6 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer ${selectedBottleneck === b.id
                  ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_25px_rgba(197,160,89,0.12)]"
                  : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/30"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-primary/80">[ friction ]</span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border transition-colors ${selectedBottleneck === b.id ? "bg-primary border-primary" : "border-white/30"
                      }`}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-semibold text-white leading-snug">{b.label}</h4>
                  <p className="text-xs text-muted font-light mt-1.5 leading-relaxed">{b.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 & 3: Industry & Target in 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Step 2: Industry */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-primary/80">[ step 02 ]</span>
              <h3 className="text-lg font-serif text-white font-medium">Your Industry / Business Model</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${selectedIndustry === ind.id
                    ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_20px_rgba(197,160,89,0.1)]"
                    : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/20"
                    }`}
                >
                  <h4 className="text-xs font-serif font-semibold text-white">{ind.label}</h4>
                  <p className="text-[11px] text-muted font-light mt-1">{ind.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: 90-Day Target */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-primary/80">[ step 03 ]</span>
              <h3 className="text-lg font-serif text-white font-medium">Your 90-Day Growth Priority</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {targets.map((tgt) => (
                <button
                  key={tgt.id}
                  onClick={() => setSelectedTarget(tgt.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${selectedTarget === tgt.id
                    ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_20px_rgba(197,160,89,0.1)]"
                    : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/20"
                    }`}
                >
                  <h4 className="text-xs font-serif font-semibold text-white">{tgt.label}</h4>
                  <p className="text-[11px] text-muted font-light mt-1">{tgt.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Blueprint Card (Result Output) */}
        <div className="p-8 md:p-12 rounded-2xl bg-[var(--background-layer-2)] border-2 border-primary/50 shadow-[0_0_50px_rgba(197,160,89,0.1)] relative overflow-hidden space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-[11px] text-primary block mb-1">
                // recommended architectural roadmap
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white">{blueprint.focus}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-[var(--background-layer-1)] border border-white/10 text-right">
                <span className="font-mono text-[10px] text-muted block">estimated turnaround</span>
                <span className="font-mono text-xs text-primary font-bold">{blueprint.timeline}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <span className="font-mono text-xs text-white/50 block">included strategic sprint deliverables:</span>
              <div className="space-y-2.5">
                {blueprint.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background-layer-1)] border border-white/5">
                    <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/90 font-light leading-relaxed">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[var(--background-layer-1)] border border-white/10 space-y-2">
                <span className="font-mono text-[10px] text-primary/80 uppercase tracking-widest block">
                  // real-world precedent
                </span>
                <p className="text-xs text-muted font-light leading-relaxed">
                  {blueprint.benchmark}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-muted block">engineered with:</span>
                <div className="flex flex-wrap gap-2">
                  {blueprint.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full font-mono text-[11px] bg-[var(--background-layer-1)] border border-white/10 text-primary/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted font-light">
              We review your website and current ads before our call. Zero sales pressure.
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/start-a-project?friction=${encodeURIComponent(selectedBottleneck)}&industry=${encodeURIComponent(selectedIndustry)}`}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all duration-300"
              >
                <span>Request Custom Scoping For This Blueprint</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/free-audit"
                className="font-mono text-xs text-muted hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>or claim 5-min video audit →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
