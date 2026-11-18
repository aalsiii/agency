"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  priceInr: number;
  priceUsd: number;
  billingType: string;
  features: string;
}

const categories = [
  "All",
  "Growth & Marketing",
  "Digital Experiences",
  "Creative & Branding",
  "Strategy & Consulting",
];

export default function ServicesClient({ initialServices }: { initialServices: ServiceItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = activeCategory === "All"
    ? initialServices
    : initialServices.filter((s) => s.category === activeCategory);

  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto">
      <div className="mb-16 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-serif text-white tracking-tight"
        >
          Capabilities & Services
        </motion.h1>
        <div className="font-mono text-xs text-primary/80">
          // 4 specialized practice areas · custom web engineering · growth marketing
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-muted max-w-2xl font-light leading-relaxed pt-2"
        >
          Engineering and client acquisition systems for teams that value sub-second load times, disciplined ad spend, and verified pipeline ROI.
        </motion.p>

        {/* Category Filter Pills */}
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

      <div className="flex flex-col gap-20 md:gap-28">
        {filteredServices.map((service, index) => {
          let feats: string[] = [];
          try {
            feats = JSON.parse(service.features);
          } catch {}

          return (
            <motion.section
              key={service.id}
              id={service.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="grid md:grid-cols-12 gap-10 md:gap-16 items-start border-t border-white/15 pt-16"
            >
              {/* Left Column: Category & Investment */}
              <div className="md:col-span-5 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary/80">
                    [ 0{index + 1} // {service.category} ]
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-serif text-white leading-snug">
                  {service.title}
                </h2>

                <div className="p-4 rounded-xl bg-[var(--background-layer-1)] border border-white/10 max-w-xs space-y-1">
                  <span className="font-mono text-[11px] text-muted block">
                    engagement model
                  </span>
                  <span className="text-xs font-mono text-primary font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Tailored Scope · Custom Quote
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:text-white transition-colors border-b border-primary/30 pb-0.5"
                  >
                    <span>[ inspect methodology & faqs ]</span>
                    <ArrowRight size={12} />
                  </Link>

                  <Link
                    href={`/start-a-project?service=${encodeURIComponent(service.slug)}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors border-b border-transparent hover:border-primary/30 pb-0.5"
                  >
                    <span>start project →</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Description & Deliverables */}
              <div className="md:col-span-7 space-y-8">
                <p className="text-base md:text-lg text-muted/90 leading-relaxed font-light">
                  {service.fullDesc || service.shortDesc}
                </p>

                <div className="space-y-3">
                  <span className="font-mono text-[11px] text-white/50 block">
                    core deliverables included:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feats.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg bg-[var(--background-layer-1)] border border-white/10 hover:border-white/20 transition-colors flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-white/85 text-xs font-light leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 border-t border-white/15 pt-24 text-center space-y-6"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-white">
          Ready to diagnose your funnel bottlenecks?
        </h2>
        <p className="text-muted text-base max-w-xl mx-auto font-light leading-relaxed">
          Request a complimentary 5-minute video teardown covering your mobile latency, ad fatigue, and conversion architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-3 text-xs font-semibold tracking-wider text-black bg-primary px-8 py-4 rounded-full hover:bg-white transition-all duration-300"
          >
            <span>Request Diagnostic Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="font-mono text-xs text-muted hover:text-white transition-colors"
          >
            or schedule a consultation →
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
