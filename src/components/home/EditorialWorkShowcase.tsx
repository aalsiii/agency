"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink, Globe, Layers, Award, Sparkles, CheckCircle2 } from "lucide-react";

interface ProjectShowcase {
  id: string;
  slug: string;
  client: string;
  websiteUrl: string;
  title: string;
  category: string;
  screenshot: string;
  milestone: string;
  scopeSummary: string;
  tags: string[];
}

const projects: ProjectShowcase[] = [
  {
    id: "nada-yoga",
    slug: "nada-yoga-school",
    client: "Nada Yoga School",
    websiteUrl: "https://www.nadyoga.org/",
    title: "Complete WordPress Redesign & Full Marketing Management",
    category: "Web Engineering · SEO · SMM · Meta Ads",
    screenshot: "/images/portfolio/nada-yoga-school.png",
    milestone: "Courses and training cohorts almost fully booked through next year.",
    scopeSummary:
      "Full digital overhaul from complete WordPress rebuild to daily social media management, organic search indexing, and high-converting Meta ads.",
    tags: ["WordPress Redesign", "SEO Content", "Meta Ads Management", "Full Cohort Bookings"],
  },
  {
    id: "luisa-photo",
    slug: "luisa-photography",
    client: "Luisa Photography",
    websiteUrl: "https://www.luisaphotography.com/",
    title: "Bespoke Photographer Portfolio & Visual Showcase",
    category: "Web Development · Editorial Portfolio",
    screenshot: "/images/portfolio/luisa-fotografia.png",
    milestone: "High-performance editorial layout with instant image rendering.",
    scopeSummary:
      "Engineered bespoke photography portfolio with fluid full-bleed galleries, minimalist typography, and sub-second asset delivery.",
    tags: ["Bespoke Web Dev", "Editorial Layout", "Image Optimization", "Mobile Gallery"],
  },
  {
    id: "rudraksha",
    slug: "rudraksha-antiquei",
    client: "Rudraksha Antiquei",
    websiteUrl: "https://www.rudrakshaantiquei.com/",
    title: "Custom Next.js E-Commerce Architecture & Brand Launch",
    category: "Next.js Development · Brand Building",
    screenshot: "/images/portfolio/rudraksha-real.png",
    milestone: "Custom Next.js e-commerce storefront engineered from scratch.",
    scopeSummary:
      "Architected custom Next.js e-commerce storefront, curated catalog architecture, and currently building the visual brand identity from ground up.",
    tags: ["Next.js 16", "E-Commerce", "Brand Strategy", "Custom Catalog"],
  },
  {
    id: "val-alino",
    slug: "val-alino-coach",
    client: "Val Alino Coach",
    websiteUrl: "https://www.valalino.com/",
    title: "Executive Coaching Social Media & Brand Strategy",
    category: "SMM · Brand Identity · Web Advisory",
    screenshot: "/images/portfolio/valalino-real.png",
    milestone: "Cohesive aesthetic and unified personal brand across all channels.",
    scopeSummary:
      "Managing Val's social media channels, curating high-authority content, and consulting on website visual presentation and branding.",
    tags: ["Social Media Management", "Personal Branding", "Content Curation", "Web Advisory"],
  },
  {
    id: "eazy-preg",
    slug: "eazy-pregnancy",
    client: "Eazy Pregnancy",
    websiteUrl: "https://www.eazypregnancy.com/",
    title: "SEO-Rich Content Architecture & Website Copywriting",
    category: "Copywriting · SEO Articles · Content Strategy",
    screenshot: "/images/portfolio/eazypregnancy-real.png",
    milestone: "Authored SEO-rich informative articles building organic Google footprint.",
    scopeSummary:
      "Crafted full website copy and high-ranking maternal health educational articles that expand search engine discoverability and brand trust.",
    tags: ["SEO Content Writing", "Website Copywriting", "Keyword Research", "Organic Search"],
  },
];

export default function EditorialWorkShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const active = projects[activeTab];

  return (
    <section className="py-32 bg-background border-t border-white/10 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="font-mono text-xs text-primary/80">
              // verified portfolio · real live platforms
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
              Real Client Work & Deployments
            </h2>
            <p className="text-muted text-base max-w-xl font-light leading-relaxed">
              Explore real platforms we have designed, engineered, written, and scaled. Grounded in actual milestones, zero fabricated statistics.
            </p>
          </div>

          <Link
            href="/work"
            className="font-mono text-xs text-primary hover:text-white border-b border-primary/30 pb-1 flex items-center gap-2 self-start md:self-auto"
          >
            <span>[ view all 5 case studies ]</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-4 overflow-x-auto no-scrollbar">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                activeTab === idx
                  ? "bg-primary text-black font-semibold shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                  : "bg-[var(--background-layer-1)] border border-white/10 text-muted hover:text-white hover:border-white/30"
              }`}
            >
              <span>[ 0{idx + 1} ]</span>
              <span>{p.client}</span>
            </button>
          ))}
        </div>

        {/* Featured Showcase Display (The .bb-stack Layered Plate) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Browser Mockup Frame with Real Screenshot */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-2xl overflow-hidden border border-white/20 bg-[var(--background-layer-2)] shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-primary/50">
              {/* Browser Chrome Header */}
              <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="font-mono text-[11px] text-muted/70 bg-white/5 px-4 py-1 rounded-full flex items-center gap-2 border border-white/5">
                  <Globe size={11} className="text-primary/70" />
                  <span>{active.websiteUrl.replace("https://", "").replace("/", "")}</span>
                </div>
                <a
                  href={active.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-primary transition-colors"
                  title="Open live site"
                >
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Real Screenshot Preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <Image
                  src={active.screenshot}
                  alt={active.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                />
              </div>

              {/* Overlapping Floating Milestone Chip */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-primary/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span className="text-xs font-serif text-white font-medium">
                    {active.milestone}
                  </span>
                </div>
                <a
                  href={active.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 px-3 py-1 rounded-full bg-primary/20 hover:bg-primary hover:text-black text-primary font-mono text-[10px] transition-all flex items-center gap-1"
                >
                  <span>Visit Live</span>
                  <ArrowUpRight size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Tags & Action Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-primary/80">
                [ {active.category} ]
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-white leading-snug">
              {active.title}
            </h3>

            <p className="text-base text-muted font-light leading-relaxed">
              {active.scopeSummary}
            </p>

            {/* Tags Grid */}
            <div className="pt-2 flex flex-wrap gap-2">
              {active.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-[var(--background-layer-1)] border border-white/10 text-xs font-mono text-primary/90"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={`/work/${active.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all duration-300"
              >
                <span>Read Full Case Study</span>
                <ArrowRight size={13} />
              </Link>
              <a
                href={active.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-primary text-white hover:text-primary font-mono text-xs transition-all duration-300"
              >
                <ExternalLink size={13} />
                <span>Visit Live Client Site</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
