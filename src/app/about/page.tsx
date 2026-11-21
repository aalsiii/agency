"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Globe2,
  CheckCircle2,
  Compass,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const studioStats = [
  { value: "< 1.2s", label: "Average Mobile Latency", hint: "Sub-second Next.js speed" },
  { value: "3.8x", label: "Blended Retainer ROAS", hint: "Across active client campaigns" },
  { value: "0", label: "Junior Middlemen", hint: "Direct senior strategist access" },
  { value: "30-Day", label: "Retainer Agreements", hint: "Earned trust, zero lock-in" },
];

const studioPrinciples = [
  {
    number: "01",
    title: "Engineering-First Conversion Architecture",
    description:
      "Most agencies run ads to bloated WordPress sites that take 5 seconds to load on mobile. We handcraft custom Next.js web applications that render in under 1.2 seconds, instantly preventing traffic bounce before it starts.",
    icon: Cpu,
  },
  {
    number: "02",
    title: "Unit-Economic Revenue Discipline",
    description:
      "We refuse to report on vanity metrics like impressions or empty likes. Every ad set, keyword cluster, and funnel step is tied directly to qualified booking inquiries, customer acquisition cost (CAC), and pipeline revenue.",
    icon: TrendingUp,
  },
  {
    number: "03",
    title: "Direct Senior Strategist Access",
    description:
      "You will never be handed off to an inexperienced junior account manager. Clients work directly with senior architects and strategists via private communication hotlines with a strict 24-hour response guarantee.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Earned Trust Over Binding Contracts",
    description:
      "We operate strictly on month-to-month retainers. If we are not compounding your pipeline and proving measurable return on ad spend every 30 days, you are free to walk away with zero penalties.",
    icon: Zap,
  },
];

const studioValues = [
  {
    title: "Quiet Focus, Deep Craft",
    description:
      "We trade agency noise and bureaucratic meetings for intense, uninterrupted focus on client output. Every line of code and creative frame is held to publication standards.",
  },
  {
    title: "Radical Performance Transparency",
    description:
      "Clients receive unedited Search Console telemetry, Meta Ad Manager readouts, and weekly video teardowns. If something isn't working, we tell you immediately and pivot.",
  },
  {
    title: "Sub-Second Speed Obsession",
    description:
      "Every 100ms of latency costs conversion rate. We engineer for 100/100 Core Web Vitals scores, optimized vector assets, and instantaneous route transitions.",
  },
  {
    title: "Full-Funnel Alignment",
    description:
      "Ad creative hooks must match the landing page headline, and the landing page must guide effortlessly into the checkout or inquiry form. Complete end-to-end cohesion.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background overflow-hidden selection:bg-primary selection:text-black">
      {/* Background Aesthetics */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-background to-background pointer-events-none" />

      {/* Background Stroke Text */}
      <div className="absolute top-1/4 -right-20 pointer-events-none select-none overflow-hidden">
        <span className="text-[15rem] md:text-[25rem] font-serif font-black text-stroke uppercase leading-none opacity-10">
          STUDIO
        </span>
      </div>

      <div className="container mx-auto relative z-10 space-y-24 md:space-y-32">
        {/* 1. Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Independent Growth Studio</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white tracking-tight leading-[1.05]">
            Engineered for <br />
            <span className="italic font-light text-primary">Enduring Growth.</span>
          </h1>

          <div className="font-mono text-xs text-primary/80">
            // founded in Uttarakhand · operating worldwide · custom Next.js engineering
          </div>

          <p className="text-lg md:text-2xl text-neutral-300 font-light leading-relaxed max-w-3xl pt-2">
            NextCurrent Media is a dual-core performance marketing and web engineering studio. We eliminate the fatal disconnect between high-production ad creative and post-click web conversion.
          </p>
        </motion.div>

        {/* 2. Key Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {studioStats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-2 hover:border-primary/40 transition duration-300"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-white">{stat.label}</div>
              <div className="text-xs text-neutral-400 font-mono">{stat.hint}</div>
            </div>
          ))}
        </motion.div>

        {/* 3. Studio Visual Collage (Bento Grid) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-primary/80 uppercase tracking-widest">
              // INSIDE THE STUDIO & CRAFT
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              Where Engineering Meets Creative Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Studio Image */}
            <div className="md:col-span-8 relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/10 group">
              <Image
                src="/images/about/studio-workspace.jpg"
                alt="NextCurrent Studio Workspace and Digital Architecture Setup"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-2">
                <span className="font-mono text-xs text-primary uppercase tracking-wider">
                  The Engineering Laboratory
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Custom Next.js & Web Performance Infrastructure
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl">
                  Every web property is architected from scratch with zero template bloat, achieving sub-second mobile rendering times and seamless conversion flows.
                </p>
              </div>
            </div>

            {/* Himalayan Roots Card */}
            <div className="md:col-span-4 relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/10 group">
              <Image
                src="/images/about/himalayan-roots.jpg"
                alt="Himalayan mountains symbolizing serene focus and calm execution"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-85 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-2">
                <span className="font-mono text-xs text-primary uppercase tracking-wider">
                  Roots in Uttarakhand
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Quiet Intensity, Global Impact
                </h3>
                <p className="text-xs text-neutral-300 font-light">
                  Born in the tranquil foothills of Rishikesh, free from metropolitan agency noise. We channel intense focus into compounding revenue for international brands.
                </p>
              </div>
            </div>

            {/* Creative Direction Card */}
            <div className="md:col-span-6 relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-white/10 group">
              <Image
                src="/images/about/creative-direction.jpg"
                alt="Creative direction and brand design typography"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-85 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-2">
                <span className="font-mono text-xs text-primary uppercase tracking-wider">
                  Creative Direction
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  High-Retention Storytelling & Content Production
                </h3>
                <p className="text-xs text-neutral-300 font-light">
                  Creating visual media that cuts through algorithmic fatigue—designed not just to capture eyes, but to trigger immediate consideration.
                </p>
              </div>
            </div>

            {/* Strategic Growth Session Card */}
            <div className="md:col-span-6 relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-white/10 group">
              <Image
                src="/images/about/strategy-session.jpg"
                alt="Strategy session and growth planning"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-85 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-2">
                <span className="font-mono text-xs text-primary uppercase tracking-wider">
                  Media Buying & Attribution
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  Disciplined Ad Capital Allocation
                </h3>
                <p className="text-xs text-neutral-300 font-light">
                  Data-backed media buying across Meta Ads and Google Search, tracking genuine closed pipeline rather than inflated platform statistics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Our Operational Principles (Two-Column Standards) */}
        <section className="space-y-12 pt-8">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs text-primary/80 uppercase tracking-widest">
              // WHY AMBITIOUS FOUNDERS PARTNER WITH US
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              The NextCurrent Standard
            </h2>
            <p className="text-muted text-base font-light">
              We replaced obsolete agency retainer models with an agile, high-touch engineering partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studioPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-3xl bg-[var(--background-layer-1)] border border-white/10 space-y-4 hover:border-primary/40 transition duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary/70">
                      // {principle.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white">
                    {principle.title}
                  </h3>

                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. Core Values Grid */}
        <section className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[var(--background-layer-1)] border border-white/10 space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              // STUDIO VALUES
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              How We Make Decisions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {studioValues.map((val, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>0{i + 1}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  {val.title}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Global Reach & Heritage */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--background-layer-1)] to-neutral-900/60 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs text-primary">
              <Globe2 className="w-4 h-4" />
              <span>Global Footprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Based in Uttarakhand. Executing Globally.
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              We partner with wellness sanctuaries, high-growth eCommerce brands, and ambitious service firms across India, the United States, the UK, Europe, and Australia.
            </p>
          </div>

          <div className="space-y-3 shrink-0">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition duration-300 shadow-[0_0_20px_rgba(197,160,89,0.25)]"
            >
              <span>Initiate Project Scope</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="text-center md:text-left">
              <Link
                href="/free-audit"
                className="font-mono text-xs text-neutral-400 hover:text-primary transition"
              >
                or request a complimentary audit →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
