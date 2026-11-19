"use client";

import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function BeforeAfterTransformation() {
  const beforePoints = [
    {
      title: "Outdated, Slow Website",
      desc: "Takes 4 to 5 seconds to load on mobile phones. Visitors get impatient, leave, and book with your competitors.",
    },
    {
      title: "Burning Money on Boosted Posts",
      desc: "Spending $20–$50 boosting random Instagram posts that get fake likes and zero real client calls.",
    },
    {
      title: "Invisible on Google Search",
      desc: "People searching for your services in your city or industry find other brands instead because your SEO is non-existent.",
    },
    {
      title: "Disjointed, Amateur Brand Image",
      desc: "DIY Canva graphics, inconsistent colors, and mismatched fonts that prevent you from charging premium prices.",
    },
    {
      title: "Juggling 4 Different Freelancers",
      desc: "Wasting hours coordinating between a developer, a designer, a copywriter, and an ads manager who all blame each other.",
    },
  ];

  const afterPoints = [
    {
      title: "Sub-Second World-Class Website",
      desc: "Loads in under 1 second on any device. Looks gorgeous, proves your credibility instantly, and commands respect.",
    },
    {
      title: "High-ROAS Client Acquisition Engine",
      desc: "Meta & Google campaigns engineered around qualified student applications and booked calls, not vanity impressions.",
    },
    {
      title: "Top-Ranking Google Visibility",
      desc: "High-intent search articles and technical SEO bring in interested clients looking for your exact offer while you sleep.",
    },
    {
      title: "Iconic, Cohesive Luxury Brand",
      desc: "A consistent, high-authority visual aesthetic across your website, social media, and presentations that justifies top-tier rates.",
    },
    {
      title: "One Dedicated Partner Under One Roof",
      desc: "You get a senior strategist managing your design, code, ads, and maintenance with a direct WhatsApp or Slack line.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#060608] border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="font-mono text-xs text-primary/80">
            // operational transformation · real outcomes
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-normal text-white tracking-tight leading-tight">
            Before vs. After{" "}
            <span className="text-gold-gradient">
              NextCurrent
            </span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            The difference between running a fragmented, stressful digital presence and having an engineered client acquisition platform.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Before NextCurrent */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c11]/80 border border-red-500/20 flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                    <TrendingDown size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-sans font-medium text-white">Before NextCurrent</h3>
                    <p className="font-mono text-[11px] text-red-400/80">Where most businesses get stuck</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono">
                  High Stress
                </span>
              </div>

              <div className="space-y-4">
                {beforePoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-serif font-semibold text-white/90">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-muted">
              <span>Result: Low client conversions</span>
              <span className="text-red-400">Wasted time & money</span>
            </div>
          </div>

          {/* RIGHT: After NextCurrent */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border-2 border-primary shadow-[0_0_40px_rgba(197,160,89,0.2)] flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-sans font-medium text-white">After NextCurrent</h3>
                    <p className="font-mono text-[11px] text-primary">The engineered growth engine</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary text-black font-semibold text-xs font-mono shadow-sm">
                  Full Capacity
                </span>
              </div>

              <div className="space-y-4">
                {afterPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-primary/[0.04] border border-primary/20">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-serif font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                ✓ Verified Nada Yoga & Client Playbook
              </span>
              <Link
                href="/start-a-project"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all shadow-md"
              >
                <span>Upgrade Your Presence</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
