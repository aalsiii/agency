"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface CaseStudyItem {
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
  isFeatured: boolean;
}

const categories = [
  "All",
  "Growth & Marketing",
  "Digital Experiences",
  "Creative & Branding",
];

export default function WorkClient({
  initialCaseStudies,
}: {
  initialCaseStudies: CaseStudyItem[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? initialCaseStudies
      : initialCaseStudies.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto">
      {/* Header */}
      <div className="mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Selected Work
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // documented pipeline outcomes · bespoke Next.js systems · verified ROI
        </div>
        <p className="text-lg md:text-xl text-muted max-w-2xl font-light leading-relaxed pt-2">
          Audited performance growth partnerships and full-stack web applications with verifiable revenue attribution and unit economics.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-black font-semibold shadow-[0_0_15px_rgba(197,160,89,0.25)]"
                  : "bg-[var(--background-layer-1)] border border-white/10 text-muted hover:text-white"
              }`}
            >
              [ {cat} ]
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {filteredProjects.map((cs, idx) => {
          const imgSrc =
            cs.coverImage ||
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80";

          return (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group block space-y-4"
            >
              <Link href={`/work/${cs.slug}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-[var(--background-layer-2)] border border-white/10 group-hover:border-primary/50 transition-colors duration-300">
                  <Image
                    src={imgSrc}
                    alt={cs.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors duration-300" />

                  {/* Overlay Action Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="text-white w-5 h-5" />
                  </div>

                  {/* Hero Metric Badge */}
                  <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 font-mono text-xs text-primary font-bold">
                    {cs.heroMetricNumber} · {cs.heroMetricLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="flex justify-between items-start mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-primary/70 block">
                        // {cs.clientName}
                      </span>
                      {cs.websiteUrl && (
                        <span className="font-mono text-[11px] text-muted flex items-center gap-1 group-hover:text-primary transition-colors">
                          <ExternalLink size={11} className="text-primary" />
                          {cs.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-serif text-white group-hover:text-primary transition-colors duration-300">
                      {cs.title}
                    </h3>
                  </div>
                  <span className="font-mono px-3 py-1 rounded-full border border-white/10 bg-[var(--background-layer-1)] text-xs text-muted">
                    {cs.industry}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Conversion Callout */}
      <section className="mt-32 p-8 md:p-14 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white">
          Have a similar growth challenge?
        </h2>
        <p className="text-muted text-base max-w-xl mx-auto font-light leading-relaxed">
          We will review your current customer acquisition channels and demonstrate the exact roadmap to scale your revenue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all duration-300"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/free-audit"
            className="font-mono text-xs text-muted hover:text-white transition-colors"
          >
            or claim a free diagnostic review →
          </Link>
        </div>
      </section>
    </main>
  );
}
