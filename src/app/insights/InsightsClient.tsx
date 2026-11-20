"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, Clock, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getArticleCoverImage } from "@/lib/article-images";

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  category: string;
  tags: string;
  readTime: string;
  authorName: string;
  publishedAt: Date | string;
}

const categories = [
  "All",
  "Growth & Marketing",
  "Digital Experiences",
  "Creative & Branding",
  "Strategy & Consulting",
];

export default function InsightsClient({
  initialArticles,
}: {
  initialArticles: ArticleItem[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = initialArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filtered.length > 0 ? filtered[0] : null;
  const gridArticles = filtered.length > 1 ? filtered.slice(1) : filtered;

  return (
    <main className="min-h-screen pt-32 sm:pt-36 pb-28 px-4 sm:px-6 md:px-12 container mx-auto text-foreground relative">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-10 w-[50vw] h-[40vh] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="mb-14 space-y-4 max-w-4xl">
        <div className="font-mono text-xs text-primary/80 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>// DIRECT-RESPONSE ENGINEERING · SEARCH VISIBILITY · UNIT ECONOMICS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-medium text-white tracking-tight leading-tight">
          Strategic Insights & <span className="text-primary">Playbooks</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed pt-1">
          Technical breakdowns, acquisition strategies, and frameworks published by our lead strategists and engineers.
        </p>

        {/* Search & Category Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-white/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary text-black font-semibold shadow-[0_0_12px_rgba(197,160,89,0.3)]"
                    : "bg-[#0c0c11] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                [ {cat} ]
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-[#0c0c11] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center font-mono text-xs text-neutral-400 border border-white/10 rounded-2xl bg-[#0c0c11]">
          No playbooks matching &ldquo;{search}&rdquo;
        </div>
      ) : (
        <div className="space-y-12">
          {/* Featured Hero Article Banner (Shown when no active search) */}
          {featuredArticle && !search && activeCategory === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group rounded-3xl bg-[#0c0c11] border border-white/15 hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Left: High-Res Cover Image */}
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[300px] overflow-hidden">
                <Image
                  src={getArticleCoverImage(featuredArticle.slug, featuredArticle.category, featuredArticle.coverImage)}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 lg:hidden pointer-events-none" />
                <div className="absolute top-4 left-4 bg-primary text-black font-mono font-bold text-[10px] sm:text-xs uppercase px-3 py-1 rounded-full shadow-lg">
                  ★ FEATURED PLAYBOOK
                </div>
              </div>

              {/* Right: Article Details */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary/90 bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                      [ {featuredArticle.category} ]
                    </span>
                    <span className="font-mono text-xs text-neutral-400 flex items-center gap-1">
                      <Clock size={11} className="text-primary" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <Link href={`/insights/${featuredArticle.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white group-hover:text-primary transition-colors leading-snug">
                      {featuredArticle.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 relative shrink-0">
                      <Image
                        src="/images/team-lead.jpg"
                        alt={featuredArticle.authorName}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-sans font-medium text-xs text-white block">
                        {featuredArticle.authorName}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400 block">
                        Lead Architect
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/insights/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 hover:border-primary hover:bg-primary hover:text-black text-xs font-mono text-primary transition-all shadow-sm"
                  >
                    <span>Read Playbook</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid of Articles with Full Cover Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridArticles.map((art, idx) => {
              const cover = getArticleCoverImage(art.slug, art.category, art.coverImage);
              return (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="group rounded-3xl bg-[#0c0c11] border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-[0_15px_40px_rgba(197,160,89,0.12)] hover:-translate-y-1"
                >
                  {/* Top Cover Image with Category Badge */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                    <Image
                      src={cover}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 font-mono text-[10px] text-primary">
                      [ {art.category} ]
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full font-mono text-[10px] text-neutral-300 flex items-center gap-1">
                      <Clock size={10} className="text-primary" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <Link href={`/insights/${art.slug}`}>
                        <h2 className="text-lg sm:text-xl font-sans font-medium text-white group-hover:text-primary transition-colors leading-snug">
                          {art.title}
                        </h2>
                      </Link>

                      <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-neutral-400">
                        by {art.authorName}
                      </span>

                      <Link
                        href={`/insights/${art.slug}`}
                        className="font-mono text-xs text-primary hover:text-white transition-colors inline-flex items-center gap-1 group-hover:translate-x-0.5"
                      >
                        <span>read</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
