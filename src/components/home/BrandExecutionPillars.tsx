"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Globe,
  TrendingUp,
  Mail,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MousePointerClick,
  Play,
} from "lucide-react";

export default function BrandExecutionPillars() {
  const socialFeeds = [
    {
      img: "/images/social/nadayoga-feed.jpg",
      offset: "md:translate-y-0",
    },
    {
      img: "/images/social/nadayoga-espanol-feed.jpg",
      offset: "md:translate-y-6",
    },
    {
      img: "/images/social/valalino-feed.jpg",
      offset: "md:-translate-y-3",
    },
    {
      img: "/images/social/syara-rae-feed.jpg",
      offset: "md:translate-y-4",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background border-t border-white/10 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 max-w-6xl space-y-20 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="font-mono text-xs text-primary/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              // full-spectrum brand scaling · how we help
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-normal text-white tracking-tight leading-tight">
              Everything Your Brand Needs to Win Online
            </h2>
            <p className="text-muted text-base font-light leading-relaxed">
              No technical confusion or fragmented agencies. We handle your complete digital presence—from aesthetic social media feeds to custom-built websites, high-converting paid ads, and automated email revenue.
            </p>
          </div>

          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-medium text-xs font-mono hover:bg-primary-hover transition-all self-start md:self-auto shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.3)]"
          >
            <span>Book Free Strategy Call</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* =========================================================================
            PILLAR 1: SOCIAL MEDIA MANAGEMENT & AESTHETIC FEEDS (Pure Visual Showcase)
           ========================================================================= */}
        <div className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl space-y-10">
          {/* Header & Value Proposition */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
              <Smartphone size={13} />
              <span>01 · Social Media Management & Visual Curation</span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-normal text-white tracking-tight leading-snug">
              Aesthetic Feeds That Turn Your Brand Into a Work of Art
            </h3>

            <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
              We design cohesive, magazine-quality visual layouts, story highlights, and curated video reels that instantly command attention, build immense trust, and make your digital presence unforgettable.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                "Editorial Grid Curation",
                "Bespoke Content Creation",
                "Story Highlights & Branding",
                "Reels & Short-Form Video",
                "Daily Community Management",
              ].map((pill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* 4-Phone Visual Showcase: Pure aesthetic display of the feeds */}
          <div className="relative pt-4">
            {/* Ambient gold glow behind the phones */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-48 bg-primary/[0.06] blur-[90px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              {socialFeeds.map((feed, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-500 hover:-translate-y-2 ${feed.offset}`}
                >
                  {/* Smartphone Hardware Frame */}
                  <div className="rounded-[36px] bg-[#0c0c11] border-[4px] border-neutral-700/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-primary/40 hover:shadow-[0_25px_60px_rgba(197,160,89,0.15)] transition-all">
                    {/* Dynamic Island Speaker Notch */}
                    <div className="w-16 h-3 bg-black rounded-full mx-auto mb-1.5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    </div>

                    {/* Inner Screen Displaying Feed */}
                    <div className="rounded-[28px] overflow-hidden bg-black relative aspect-[9/18] border border-white/5">
                      <Image
                        src={feed.img}
                        alt="Curated Social Media Feed Visual"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            PILLAR 2: WEBSITE DEVELOPMENT & ENGINEERING (Split Mac Browser + Speed)
           ========================================================================= */}
        <div className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Column on Left for Alternating Flow */}
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
              {/* Browser Preview Window Frame */}
              <div className="rounded-2xl bg-black border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {/* Browser Toolbar Header */}
                <div className="px-4 py-3 bg-[#111116] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-neutral-300 flex items-center gap-2">
                    <Globe size={11} className="text-primary" />
                    <span>yourbrand.com</span>
                    <span className="text-emerald-400 font-semibold">SSL 256-bit</span>
                  </div>
                  <div className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                    0.38s
                  </div>
                </div>

                {/* Inner Website Visual Preview */}
                <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                  <Image
                    src="/images/portfolio/luisa-fotografia.png"
                    alt="Engineered Website Interface"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Floating Live Conversion Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <MousePointerClick size={14} />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-white">
                          Direct 1-Click WhatsApp & Calendar
                        </div>
                        <div className="text-[10px] text-neutral-400 font-light">
                          Zero friction inquiry flow converts 4x higher
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-primary text-black font-mono text-[10px] font-semibold">
                      Live
                    </span>
                  </div>
                </div>
              </div>

              {/* Lighthouse 100/100 Benchmark Matrix */}
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { label: "Performance", score: "100", color: "text-emerald-400", border: "border-emerald-500/30" },
                  { label: "Accessibility", score: "100", color: "text-emerald-400", border: "border-emerald-500/30" },
                  { label: "Best Practices", score: "100", color: "text-emerald-400", border: "border-emerald-500/30" },
                  { label: "Google SEO", score: "100", color: "text-emerald-400", border: "border-emerald-500/30" },
                ].map((lh, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl bg-black/40 border ${lh.border} text-center space-y-0.5`}
                  >
                    <div className={`text-base font-mono font-bold ${lh.color}`}>
                      {lh.score}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-light truncate">
                      {lh.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                <Globe size={13} />
                <span>02 · High-Performance Website Engineering</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-sans font-normal text-white tracking-tight leading-snug">
                Websites That Look Stunning & Convert Like Crazy
              </h3>

              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                Your website is your 24/7 digital closer. Slow, clunky templates make visitors leave in 3 seconds. We build custom Next.js platforms optimized for instant loading, intuitive navigation, and effortless client bookings.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      Sub-Second Loading Speeds (0.4s FCP)
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Engineered with Next.js 16 SSR & global edge caching so your pages load instantly without annoying lag.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      Frictionless Booking & Direct WhatsApp Integration
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Qualified prospects can reserve appointments directly into your Google Calendar or initiate live WhatsApp chats in 1 tap.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      Google Rank & Structured SEO Architecture
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Schema markup, semantic HTML, and localized metadata that helps your brand rank on the first page of search results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/services/web-development"
                  className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-white transition-colors"
                >
                  <span>Explore Web Development Capabilities</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PILLAR 3: PERFORMANCE MARKETING & PAID ADS (Meta/Google Telemetry HUD)
           ========================================================================= */}
        <div className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                <TrendingUp size={13} />
                <span>03 · Performance Marketing & Paid Advertising</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-sans font-normal text-white tracking-tight leading-snug">
                Targeted Ads With Predictable 4x+ Return on Ad Spend
              </h3>

              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                Stop wasting marketing budgets on vanity likes and boosting random posts. We craft high-converting video hooks, test dozens of sales angles, and manage precision Meta & Google ad campaigns that deliver consistent qualified inquiries.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      High-Converting Video Hooks & Ad Creatives
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Custom-designed static creatives and short video advertisements that stop the scroll and speak directly to your client’s pain points.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      Laser-Focused Audience Retargeting
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Re-engaging visitors who checked your offerings or social profiles, converting warm interest into paying clients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      Transparent Real-Time Attribution Dashboard
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Clear reporting showing exactly what you spent, how many qualified leads arrived, and your exact return on ad spend.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/services/ad-campaigning"
                  className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-white transition-colors"
                >
                  <span>Explore Paid Campaign Systems</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right Visual Column: Meta Ads Manager Dashboard Mockup + Sponsored Ad Card */}
            <div className="lg:col-span-6 space-y-4">
              {/* Ad Telemetry Dashboard Card */}
              <div className="p-6 rounded-2xl bg-black border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs text-white font-medium">
                      Campaign Performance Telemetry
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                    Live Meta Advantage+
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] font-mono text-neutral-400">Blended ROAS</div>
                    <div className="text-xl font-mono font-bold text-primary">4.82x</div>
                    <div className="text-[9px] text-emerald-400 font-mono">↑ +38% MoM</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] font-mono text-neutral-400">Cost Per Call</div>
                    <div className="text-xl font-mono font-bold text-white">$14.20</div>
                    <div className="text-[9px] text-emerald-400 font-mono">↓ -42% CPA</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] font-mono text-neutral-400">Revenue Yield</div>
                    <div className="text-xl font-mono font-bold text-emerald-400">$64,800</div>
                    <div className="text-[9px] text-neutral-400 font-mono">30-day window</div>
                  </div>
                </div>

                {/* Sponsored Ad Creative Mockup Preview */}
                <div className="rounded-xl bg-[#141419] border border-white/10 p-4 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden relative">
                      <Image
                        src="/images/portfolio/echoes-gallery-1.png"
                        alt="Client Brand"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-sans font-medium text-white flex items-center gap-1.5">
                        <span>NextCurrent Brand Partner</span>
                        <ShieldCheck size={11} className="text-primary" />
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        Sponsored · Instagram Feed
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    &ldquo;Struggling to fill your monthly cohort? See how we scaled this brand to full capacity in under 60 days with a high-converting website and targeted acquisition.&rdquo;
                  </p>

                  <div className="aspect-[16/9] relative rounded-lg overflow-hidden bg-neutral-900 border border-white/10">
                    <Image
                      src="/images/portfolio/valalino-real.png"
                      alt="Paid Ad Creative Visual"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/90 text-black flex items-center justify-center shadow-lg">
                        <Play size={16} className="ml-0.5 fill-black" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white backdrop-blur-xs">
                      15s High-Retention Hook
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] font-mono text-neutral-300">
                      nextcurrent.co/case-studies
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary text-black font-mono text-xs font-semibold">
                      Learn More →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PILLAR 4: EMAIL MARKETING & AUTOMATED FUNNELS (Visual Lifecycle Flow)
           ========================================================================= */}
        <div className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Column on Left for Alternating Flow */}
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
              <div className="p-6 rounded-2xl bg-black border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <span className="font-mono text-xs text-white font-medium">
                      Automated Lead Nurture Flow Canvas
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    48.2% Avg Open Rate
                  </span>
                </div>

                {/* Visual Step-by-Step Email Sequence Nodes */}
                <div className="space-y-2.5 relative">
                  {/* Step 1: Form Trigger */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
                        01
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-white">
                          Trigger: Website Inquiry or Audit Opt-In
                        </div>
                        <div className="text-[10px] text-neutral-400 font-light">
                          Visitor submits email to download guide or request audit
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">Instant</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="w-0.5 h-3 bg-primary/40 mx-auto" />

                  {/* Step 2: Instant Welcome Email */}
                  <div className="p-3 rounded-xl bg-primary/[0.04] border border-primary/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary text-black flex items-center justify-center text-xs font-mono font-bold">
                        02
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-white">
                          Day 0: The Brand Authority Story & Value Asset
                        </div>
                        <div className="text-[10px] text-neutral-400 font-light">
                          Instant delivery of promised asset + credibility teardown
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      68.4% Open
                    </span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="w-0.5 h-3 bg-primary/40 mx-auto" />

                  {/* Step 3: Social Proof & Case Study */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
                        03
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-white">
                          Day 2: Client Transformation & Proof Breakdown
                        </div>
                        <div className="text-[10px] text-neutral-400 font-light">
                          Real student/client milestone story answering key objections
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      54.1% Open
                    </span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="w-0.5 h-3 bg-primary/40 mx-auto" />

                  {/* Step 4: Direct Calendar Invite */}
                  <div className="p-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-400 text-black flex items-center justify-center text-xs font-mono font-bold">
                        04
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-white">
                          Day 4: Limited Seat Calendar Invitation
                        </div>
                        <div className="text-[10px] text-neutral-400 font-light">
                          Direct CTA to reserve an upcoming cohort consultation
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-primary font-semibold">
                      41.8% CTR
                    </span>
                  </div>
                </div>

                {/* Bottom Metric Bar */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                  <span>Compounding 24/7 Retention</span>
                  <span className="text-primary font-semibold">32% of Client Revenue</span>
                </div>
              </div>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                <Mail size={13} />
                <span>04 · Automated Lifecycle & Retention Marketing</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-sans font-normal text-white tracking-tight leading-snug">
                Email Sequences That Make Sales While You Sleep
              </h3>

              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                Over 70% of website visitors aren&apos;t ready to purchase on their first visit. We construct automated email sequences that nurture curiosity, dissolve skepticism, and automatically invite warm prospects to book consultations over time.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      Automated 5-Part Welcome & Trust Sequence
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Greets every new inquiry immediately, establishes your expertise, and highlights transformative client proof.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      Abandoned Booking Recovery & Re-Engagement
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Automatically reaches out to prospective students or clients who visited your checkout or calendar without completing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-sans font-medium text-white">
                      Editorial Newsletters That Keep You Top-of-Mind
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      High-value weekly thought leadership that positions you as the undisputed authority in your niche.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/services/marketing"
                  className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-white transition-colors"
                >
                  <span>Explore Retention Email Systems</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
