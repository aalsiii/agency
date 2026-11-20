"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Star,
  Sparkles,
} from "lucide-react";
import HorizontalServices from "@/components/home/HorizontalServices";
import EditorialWorkShowcase from "@/components/home/EditorialWorkShowcase";
import VisualFunnelExplainer from "@/components/home/VisualFunnelExplainer";
import BeforeAfterTransformation from "@/components/home/BeforeAfterTransformation";
import SimpleClientProcess from "@/components/home/SimpleClientProcess";
import BrandExecutionPillars from "@/components/home/BrandExecutionPillars";

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
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 1. Cinematic 3D Horizon Hero (Immediate Value Prop, Dual CTAs & Live Client Proof) */}
      <HorizonHeroSection />

      {/* 2. Visual Client Acquisition Funnel (Explains in Plain English How We Turn Strangers into Paying Clients) */}
      <VisualFunnelExplainer />

      {/* 3. Core Brand Execution Pillars (Social Media Feed Mockup, Web Dev, Paid Ads & Email Retention) */}
      <BrandExecutionPillars />

      {/* 4. Selected Real Client Work (Real Screenshots in Mac Browser Frame & Deliverables) */}
      <EditorialWorkShowcase />

      {/* 4. Before vs. After NextCurrent (Side-by-Side Visual Comparison in Plain English) */}
      <BeforeAfterTransformation />

      {/* 5. Core Practice Pillars & Pictography (Digital Experiences, Performance Marketing, Brand, Strategy) */}
      <HorizontalServices />

      {/* 6. Simple 4-Step Client Roadmap (How Easy It Is to Work With Us · Kickoff to Launch) */}
      <SimpleClientProcess />

      {/* 7. Executive Client Endorsements & Proof */}
      {testimonials.length > 0 && (
        <section className="py-28 bg-[var(--background-layer-1)] border-t border-white/10 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div className="space-y-3">
                <div className="font-mono text-xs text-primary/80">
                  // verified client partnerships · real outcomes
                </div>
                <h2 className="text-4xl md:text-5xl font-sans font-normal text-white tracking-tight leading-tight">
                  What Founders & Leaders Say
                </h2>
                <p className="text-muted text-base max-w-xl font-light leading-relaxed">
                  Real feedback from the brands, platforms, and coaches we manage, engineer, and scale.
                </p>
              </div>

              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-primary text-xs font-mono text-white hover:text-primary transition-all self-start md:self-auto"
              >
                <span>Explore All Case Studies</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-8 rounded-2xl bg-[var(--background-layer-2)] border border-white/10 flex flex-col justify-between hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(197,160,89,0.12)] transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-primary text-primary" />
                      ))}
                    </div>

                    <blockquote className="text-sm text-neutral-300 font-light leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 space-y-1">
                    <p className="font-serif font-bold text-sm text-white">{t.clientName}</p>
                    <p className="font-mono text-xs text-primary">
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

      {/* 9. Why Leaders Choose NextCurrent Media (Operational Clarity Matrix) */}
      <section className="py-28 bg-background border-t border-white/10">
        <div className="container mx-auto px-6 max-w-5xl space-y-12">
          <div className="text-center space-y-3">
            <div className="font-mono text-xs text-primary/80">
              // the nextcurrent advantage · operational clarity
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-normal text-white tracking-tight leading-tight">
              Why Leaders Choose NextCurrent
            </h2>
            <p className="text-muted text-sm font-light max-w-lg mx-auto leading-relaxed">
              Compare our dedicated sprint model against bloated legacy agencies and unreliable fragmented freelancers.
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-3xl space-y-8 relative z-10">
          <div className="font-mono text-xs text-primary/80">
            // start your growth sprint · 24-hour response
          </div>

          <h2 className="text-4xl md:text-6xl font-sans font-normal text-white tracking-tight leading-tight">
            Ready to Build Something Enduring?
          </h2>

          <p className="text-muted text-base font-light leading-relaxed">
            Tell us about your brand, technical requirements, or pipeline goals. We will prepare an architectural roadmap within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/start-a-project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider shadow-[0_0_35px_rgba(197,160,89,0.35)] hover:bg-white transition-all duration-300"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/book-a-call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black font-mono text-xs transition-all duration-300"
            >
              <span>Book Discovery Call</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
