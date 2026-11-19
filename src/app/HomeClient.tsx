"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Check,
  Video,
  Target,
  FileText,
  Gauge,
  Sparkles,
  Star,
  ExternalLink,
  Shield,
  Zap,
  Globe,
  TrendingUp,
} from "lucide-react";
import HorizontalServices from "@/components/home/HorizontalServices";
import EditorialWorkShowcase from "@/components/home/EditorialWorkShowcase";
import GrowthDiagnosticEngine from "@/components/home/GrowthDiagnosticEngine";

const HorizonHeroSection = dynamic(
  () => import("@/components/ui/horizon-hero-section").then((mod) => mod.HorizonHeroSection),
  { ssr: false }
);

interface ServiceData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  category: string;
  priceInr: number;
  priceUsd: number;
  billingType: string;
}

interface TestimonialData {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  quote: string;
  rating: number;
}

interface CaseStudyData {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  category: string;
  heroMetricNumber: string;
  heroMetricLabel: string;
  resultsSummary: string;
  coverImage: string | null;
  websiteUrl?: string | null;
}

export default function HomeClient({
  testimonials = [],
}: {
  services: ServiceData[];
  testimonials?: TestimonialData[];
  caseStudies?: CaseStudyData[];
}) {
  const [quickAuditUrl, setQuickAuditUrl] = useState("");

  const trustedClients = [
    { name: "Nada Yoga School", url: "https://www.nadyoga.org/", note: "Full Marketing & Web Overhaul" },
    { name: "Val Alino Coach", url: "https://www.valalino.com/", note: "Brand & Social Strategy" },
    { name: "Luisa Photography", url: "https://www.luisaphotography.com/", note: "Bespoke Portfolio Web Dev" },
    { name: "Eazy Pregnancy", url: "https://www.eazypregnancy.com/", note: "SEO Rich Content & Copy" },
    { name: "Rudraksha Antiquei", url: "https://www.rudrakshaantiquei.com/", note: "Next.js E-Commerce Storefront" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 1. Iconic Horizon 3D Hero Section */}
      <div className="min-h-[300vh]">
        <HorizonHeroSection />
      </div>

      {/* 2. Authority & Client Proof Banner (Immediate Trust Anchor) */}
      <section className="border-y border-white/10 bg-[var(--background-layer-1)] py-8 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-primary/80 uppercase tracking-widest block">
                // verified client partnerships
              </span>
              <p className="text-xs text-muted font-light">
                Engineering platforms & driving qualified pipeline for ambitious digital brands:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {trustedClients.map((client, idx) => (
                <a
                  key={idx}
                  href={client.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group px-3.5 py-1.5 rounded-full bg-[var(--background-layer-2)] border border-white/10 hover:border-primary/50 text-[11px] font-mono text-white/80 hover:text-primary transition-all flex items-center gap-1.5"
                >
                  <span>{client.name}</span>
                  <ExternalLink size={10} className="text-muted group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Real Client Work Showcase (Browser Chrome Frame with Real Screenshots) */}
      <EditorialWorkShowcase />

      {/* 4. Interactive Growth Diagnostic (Replaces Old Scope Calculator with Zero Prices) */}
      <GrowthDiagnosticEngine />

      {/* 5. Horizontal Practice Capabilities Overview */}
      <HorizontalServices />

      {/* 6. Diagnostic Funnel Scanner Callout */}
      <section className="py-32 bg-[var(--background-layer-1)] border-y border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center space-y-6">
          <div className="font-mono text-xs text-primary/80 tracking-wide">
            // complimentary video teardown · mobile speed audit · ad creative fatigue analysis
          </div>

          <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
            Where your client acquisition funnel is leaking revenue
          </h2>

          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed pt-2">
            We inspect your mobile load speed, Meta ad creative attrition, and Google search indexation, then record a private 5-minute video teardown showing exactly what to remediate.
          </p>

          {/* Interactive scanner input */}
          <div className="max-w-xl mx-auto pt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/free-audit${quickAuditUrl ? `?url=${encodeURIComponent(quickAuditUrl)}` : ""
                  }`;
              }}
              className="p-2 bg-[var(--background-layer-2)] border border-white/15 hover:border-primary/50 transition-colors rounded-full flex items-center justify-between gap-3 shadow-2xl"
            >
              <input
                type="text"
                value={quickAuditUrl}
                onChange={(e) => setQuickAuditUrl(e.target.value)}
                placeholder="Enter your website URL (e.g. yourbrand.com)"
                className="bg-transparent text-sm text-white placeholder:text-muted/50 px-6 py-2 outline-none flex-1 font-sans"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:text-black transition-all duration-300 shrink-0 cursor-pointer"
              >
                Scan Funnel
              </button>
            </form>
            <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-muted/70 mt-4">
              <span>[ 100% free ]</span>
              <span>[ no sales call ]</span>
              <span>[ 24h turnaround ]</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Free Marketing & Creative Utilities Terminal (Traffic Magnet) */}
      <section className="py-32 bg-background border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="font-mono text-xs text-primary/80 mb-2">
                // free public utilities · developer tools
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                Free Marketing & Growth Utilities
              </h2>
              <p className="text-muted text-base max-w-lg font-light mt-3">
                The exact formula sheets, ad angles, and diagnostic scripts our team deploys daily. Completely free to use.
              </p>
            </div>

            <Link
              href="/free-tools"
              className="font-mono text-xs text-primary hover:text-white border-b border-primary/30 pb-1 flex items-center gap-2"
            >
              <span>[ launch tools terminal ]</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                index: "01",
                badge: "hooks",
                title: "Reel Hook Generator",
                desc: "5 pattern-interrupting hooks crafted to stop scrolling thumbs.",
                icon: Video,
              },
              {
                index: "02",
                badge: "ads",
                title: "Ad Copy Crafter",
                desc: "High-ROAS Meta and Google ad headlines and primary text angles.",
                icon: Target,
              },
              {
                index: "03",
                badge: "captions",
                title: "Caption & Hashtag Suite",
                desc: "Engaging post copy formatted with comment conversion triggers.",
                icon: FileText,
              },
              {
                index: "04",
                badge: "speed",
                title: "Website Speed Scanner",
                desc: "Real-time Core Web Vitals and mobile friction diagnostics.",
                icon: Gauge,
              },
            ].map((t, idx) => {
              const Icon = t.icon;
              return (
                <Link
                  key={idx}
                  href="/free-tools"
                  className="group p-7 bg-[var(--background-layer-1)] border border-white/10 hover:border-primary/50 transition-all duration-300 rounded-xl flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-primary/70">[{t.index} // {t.badge}]</span>
                      <Icon size={16} className="text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-serif text-white group-hover:text-primary transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-muted text-xs font-light leading-relaxed">{t.desc}</p>
                  </div>

                  <span className="font-mono inline-flex items-center gap-2 text-xs text-primary group-hover:text-white transition-colors">
                    <span>open tool</span>
                    <ArrowUpRight size={13} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Executive Client Endorsements */}
      {testimonials.length > 0 && (
        <section className="py-32 bg-[var(--background-layer-1)] border-t border-white/10 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="font-mono text-xs text-primary/80 uppercase tracking-widest mb-2">
                  // verified client partnerships & results
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                  What founders & leaders say
                </h2>
                <p className="text-muted text-base max-w-lg font-light mt-3">
                  Direct feedback from the executive brands and digital platforms we manage and scale.
                </p>
              </div>

              <Link
                href="/work"
                className="font-mono text-xs text-primary hover:text-white border-b border-primary/30 pb-1 flex items-center gap-2 self-start md:self-auto"
              >
                <span>[ explore all 5 case studies ]</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-8 rounded-2xl bg-[var(--background-layer-2)] border border-white/10 flex flex-col justify-between hover:border-primary/40 transition group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} size={13} className="fill-primary" />
                      ))}
                    </div>

                    <blockquote className="text-sm text-neutral-300 font-light leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 space-y-1">
                    <p className="font-serif font-bold text-sm text-white">{t.clientName}</p>
                    <p className="font-mono text-xs text-primary/80">
                      {t.clientRole}
                    </p>
                    <p className="font-mono text-[11px] text-muted">
                      {t.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. The 4-Way Architectural Comparison Matrix */}
      <section className="py-32 bg-background border-t border-white/10">
        <div className="container mx-auto px-6 max-w-5xl space-y-12">
          <div className="text-center space-y-3">
            <div className="font-mono text-xs text-primary/80">
              // the nextcurrent advantage · operational clarity
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Why Leaders Choose NextCurrent Media
            </h2>
            <p className="text-muted text-sm font-light max-w-lg mx-auto leading-relaxed">
              Compare our operational model against traditional bloated agencies, fragmented freelancers, and expensive in-house overhead.
            </p>
          </div>

          <div className="bg-[var(--background-layer-1)] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[var(--background-layer-2)] font-mono uppercase tracking-wider text-muted">
                    <th className="p-5 font-medium">Dimension</th>
                    <th className="p-5 font-medium">Legacy Retainer Agency</th>
                    <th className="p-5 font-medium">Ad-hoc Freelancers</th>
                    <th className="p-5 font-medium text-primary bg-primary/5">NextCurrent Media</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-light">
                  {[
                    {
                      dim: "Speed to Market",
                      agency: "6 to 12 weeks of onboarding meetings",
                      free: "Unpredictable delivery, delayed sprints",
                      nc: "Sprint kickoffs in 3-5 days. Deploys in 2-4 weeks.",
                    },
                    {
                      dim: "Contract Terms",
                      agency: "6 to 12 month rigid lock-ins with penalties",
                      free: "Variable hourly billing with no warranty",
                      nc: "Rolling month-to-month retainers or milestone sprints.",
                    },
                    {
                      dim: "Engineering Stack",
                      agency: "Bloated 4s WordPress templates with plugins",
                      free: "Whatever tool they happen to know",
                      nc: "Custom Next.js 16 App Router, sub-second Core Web Vitals.",
                    },
                    {
                      dim: "Account Attention",
                      agency: "Junior coordinators and ticketing queues",
                      free: "Part-time availability, ghosts unexpectedly",
                      nc: "Direct Slack or WhatsApp line with senior lead strategist.",
                    },
                    {
                      dim: "Performance Metric",
                      agency: "Vanity impressions and automated PDF charts",
                      free: "Task completion only, zero revenue concern",
                      nc: "Unit economics: Blended CAC, booked students, pipeline ROAS.",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-5 font-mono font-medium text-white/90 whitespace-nowrap">{row.dim}</td>
                      <td className="p-5 text-muted/70">{row.agency}</td>
                      <td className="p-5 text-muted/70">{row.free}</td>
                      <td className="p-5 text-white font-medium bg-primary/[0.03]">
                        <div className="flex items-start gap-2 text-white">
                          <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                          <span>{row.nc}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action */}
      <section className="py-24 bg-[var(--background-layer-1)] border-t border-white/10 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-3xl space-y-8 relative z-10">
          <div className="font-mono text-xs text-primary/80">
            // start your growth sprint · 24-hour response
          </div>

          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
            Ready to Build Something Enduring?
          </h2>

          <p className="text-muted text-base font-light leading-relaxed">
            Tell us about your brand, technical requirements, or pipeline goals. We will prepare an architectural proposal within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all duration-300"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/book-a-call"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black font-mono text-xs transition-all duration-300"
            >
              <span>Book Discovery Call</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
