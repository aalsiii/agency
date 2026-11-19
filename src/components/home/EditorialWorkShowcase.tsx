"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink, Globe, CheckCircle2 } from "lucide-react";

interface ProjectShowcase {
  id: string;
  slug: string;
  client: string;
  shortCategory: string;
  websiteUrl: string;
  displayUrl: string;
  title: string;
  categoryBadge: string;
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
    shortCategory: "WordPress Redesign",
    websiteUrl: "https://www.nadyoga.org/",
    displayUrl: "www.nadyoga.org",
    title: "Complete WordPress Redesign & Full Marketing Management",
    categoryBadge: "Web Engineering · SEO · SMM · Meta Ads",
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
    shortCategory: "Bespoke Web Dev",
    websiteUrl: "https://www.luisaphotography.com/",
    displayUrl: "www.luisaphotography.com",
    title: "Bespoke Photographer Portfolio & Visual Showcase",
    categoryBadge: "Web Development · Editorial Portfolio",
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
    shortCategory: "Next.js 16",
    websiteUrl: "https://www.rudrakshaantiquei.com/",
    displayUrl: "www.rudrakshaantiquei.com",
    title: "Custom Next.js E-Commerce Architecture & Brand Launch",
    categoryBadge: "Next.js Development · Brand Building",
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
    shortCategory: "Social Media Management",
    websiteUrl: "https://www.valalino.com/",
    displayUrl: "www.valalino.com",
    title: "Executive Coaching Social Media & Brand Strategy",
    categoryBadge: "SMM · Brand Identity · Web Advisory",
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
    shortCategory: "SEO Content Writing",
    websiteUrl: "https://www.eazypregnancy.com/",
    displayUrl: "www.eazypregnancy.com",
    title: "SEO-Rich Content Architecture & Website Copywriting",
    categoryBadge: "Copywriting · SEO Articles · Content Strategy",
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
    <section id="work" className="py-20 md:py-28 bg-[#060608] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-primary/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-8">
        {/* Main Featured Showcase Plate */}
        <div className="rounded-3xl bg-[#0c0c11] border border-white/10 p-6 sm:p-8 lg:p-12 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Mac Browser Mockup Frame with Real Screenshot */}
            <div className="lg:col-span-7">
              <div className="relative group rounded-2xl overflow-hidden border border-white/15 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                {/* Browser Chrome Header */}
                <div className="px-4 py-3 bg-[#121217] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="font-mono text-xs text-neutral-400 bg-black/50 px-4 py-1 rounded-full flex items-center gap-2 border border-white/10">
                    <Globe size={12} className="text-primary" />
                    <span>{active.displayUrl}</span>
                  </div>
                  <a
                    href={active.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-primary transition-colors"
                    title="Open live site"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>

                {/* Real Screenshot Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src={active.screenshot}
                    alt={active.title}
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Overlapping Floating Milestone Chip */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-full bg-black/85 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3 shadow-xl">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 size={15} className="text-primary shrink-0" />
                      <span className="text-xs font-medium text-white truncate">
                        {active.milestone}
                      </span>
                    </div>
                    <a
                      href={active.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 px-3.5 py-1.5 rounded-full bg-primary text-black font-semibold text-xs hover:bg-white transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative, Category Badge, Tags & CTAs */}
            <div className="lg:col-span-5 space-y-6">
              {/* Category Badge Pill */}
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono text-primary font-medium">
                {active.categoryBadge}
              </div>

              {/* Title */}
              <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-sans font-medium text-white leading-[1.18] tracking-tight">
                {active.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                {active.scopeSummary}
              </p>

              {/* Tags Grid */}
              <div className="flex flex-wrap gap-2 pt-1">
                {active.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-sans text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href={`/work/${active.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all shadow-md"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={13} />
                </Link>
                <a
                  href={active.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs transition-all"
                >
                  <ExternalLink size={13} />
                  <span>Visit Site</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Card Interactive Selector Row Below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(idx)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col gap-3 group ${
                activeTab === idx
                  ? "bg-[#0c0c11] border-2 border-primary shadow-[0_0_30px_rgba(197,160,89,0.25)]"
                  : "bg-[#0c0c11] border border-white/10 hover:border-white/30"
              }`}
            >
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/60 border border-white/5">
                <Image
                  src={p.screenshot}
                  alt={p.client}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-0.5">
                <p className="font-sans text-sm font-medium text-white truncate">
                  {p.client}
                </p>
                <p className="text-xs text-neutral-400 font-sans truncate">
                  {p.shortCategory}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
