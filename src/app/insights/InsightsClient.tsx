"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  readTime: string;
  authorName: string;
  publishedAt: Date;
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

  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground">
      {/* Header */}
      <div className="mb-16 space-y-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Insights & Articles
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // direct-response engineering · search visibility · unit economics
        </div>
        <p className="text-lg md:text-xl text-muted font-light leading-relaxed pt-2">
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
                    ? "bg-primary text-black font-semibold shadow-[0_0_12px_rgba(197,160,89,0.25)]"
                    : "bg-[var(--background-layer-1)] border border-white/10 text-muted hover:text-white"
                }`}
              >
                [ {cat} ]
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-muted/60 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center font-mono text-xs text-muted">
          no articles matching &ldquo;{search}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((art, idx) => {
            let tagsArr: string[] = [];
            try {
              tagsArr = JSON.parse(art.tags);
            } catch {}

            return (
              <motion.article
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group p-8 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-primary/80">
                      [ {art.category} ]
                    </span>
                    <span className="font-mono text-[11px] text-muted flex items-center gap-1">
                      <Clock size={11} />
                      {art.readTime}
                    </span>
                  </div>

                  <Link href={`/insights/${art.slug}`}>
                    <h2 className="text-xl md:text-2xl font-serif text-white group-hover:text-primary transition-colors leading-snug">
                      {art.title}
                    </h2>
                  </Link>

                  <p className="text-xs md:text-sm text-muted font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted">
                    by {art.authorName}
                  </span>

                  <Link
                    href={`/insights/${art.slug}`}
                    className="font-mono text-xs text-primary hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>read article</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Newsletter Subscription Box */}
      <section className="mt-28 p-8 md:p-14 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-serif text-white">
          Receive Weekly Growth Breakdowns
        </h2>
        <p className="text-muted text-sm max-w-md mx-auto font-light leading-relaxed">
          No marketing fluff. We share our live ad test findings, Next.js architecture benchmarks, and search strategy every Tuesday.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for subscribing! Your address has been logged.");
          }}
          className="max-w-md mx-auto flex items-center gap-2 p-1.5 bg-[var(--background-layer-2)] border border-white/15 rounded-full"
        >
          <input
            type="email"
            required
            placeholder="Enter your work email"
            className="bg-transparent px-4 py-2 text-xs text-white placeholder:text-muted/60 outline-none flex-1 font-mono"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
