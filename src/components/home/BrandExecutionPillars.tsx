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

  const websiteScreenshots = [
    "/images/websites/nitasha-buldeo.jpg",
    "/images/websites/yogamani.jpg",
    "/images/websites/valalino-web.jpg",
    "/images/websites/echoes-shop.jpg",
    "/images/websites/rudraksha-store.jpg",
    "/images/websites/admin-gallery.jpg",
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
            PILLAR 2: WEBSITE DEVELOPMENT & ENGINEERING (Visual 6-Browser Grid)
           ========================================================================= */}
        <div className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl space-y-10">
          {/* Header & Concept Value Proposition */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
              <Globe size={13} />
              <span>02 · High-Performance Website Engineering</span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-normal text-white tracking-tight leading-snug">
              Websites That Look Stunning & Perform Flawlessly
            </h3>

            <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
              Every website is custom-architected for instant sub-second loading, intuitive mobile navigation, and effortless client conversions. No clunky templates—just bespoke digital experiences tailored to your growth.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                "Custom Next.js Platforms",
                "Editorial Personal Brands",
                "High-Ticket E-Commerce",
                "Interactive Retreat Hubs",
                "Custom Admin CMS",
                "Sub-Second Edge Speeds",
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

          {/* 6-Card Visual Website Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {websiteScreenshots.map((imgSrc, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-black border border-white/15 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:border-primary/50 hover:shadow-[0_20px_45px_rgba(197,160,89,0.2)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Minimalist macOS Browser Bar (Zero brand names, clean concept) */}
                <div className="px-3.5 py-2.5 bg-[#121217] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="px-3 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
                    <Globe size={10} className="text-primary" />
                    <span>digital-platform.engine</span>
                  </div>
                  <div className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    0.38s
                  </div>
                </div>

                {/* Website Visual Screen */}
                <div className="relative aspect-[16/10] w-full bg-neutral-950 overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt="Engineered Website Interface Concept"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
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
                  href="/services/performance-marketing"
                  className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-white transition-colors"
                >
                  <span>Explore Paid Campaign Systems</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right Visual Column: Meta Ads Manager Dashboard Visual */}
            <div className="lg:col-span-6">
              {/* App / Browser Window Frame */}
              <div className="group rounded-2xl bg-black border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-primary/50 hover:shadow-[0_25px_60px_rgba(197,160,89,0.2)] transition-all duration-500 hover:-translate-y-1">
                {/* Window Header */}
                <div className="px-4 py-3 bg-[#111116] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="px-3 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-300 flex items-center gap-1.5">
                    <TrendingUp size={11} className="text-primary" />
                    <span>meta-ads-manager.telemetry</span>
                  </div>
                  <div className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Live Campaigns
                  </div>
                </div>

                {/* Inner Real Meta Ads Dashboard Visual */}
                <div className="relative aspect-[16/10] w-full bg-neutral-950 overflow-hidden">
                  <Image
                    src="/images/marketing/meta-ads-dashboard.jpg"
                    alt="Meta Ads Performance Marketing Telemetry Dashboard"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PILLAR 4: EMAIL MARKETING & AUTOMATED RETENTION (Visual Dashboard Showcase)
           ========================================================================= */}
        <div className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Column on Left for Alternating Flow */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              {/* App / Browser Window Frame */}
              <div className="group rounded-2xl bg-black border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-primary/50 hover:shadow-[0_25px_60px_rgba(197,160,89,0.2)] transition-all duration-500 hover:-translate-y-1">
                {/* Window Header */}
                <div className="px-4 py-3 bg-[#111116] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="px-3 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-300 flex items-center gap-1.5">
                    <Mail size={11} className="text-primary" />
                    <span>automation-lifecycle.engine</span>
                  </div>
                  <div className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Active Flows
                  </div>
                </div>

                {/* Inner Real Email Marketing Dashboard Visual */}
                <div className="relative aspect-[16/10] w-full bg-neutral-950 overflow-hidden">
                  <Image
                    src="/images/marketing/email-dashboard.jpg"
                    alt="Email Marketing Automation Platform Interface"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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
                  href="/services/performance-marketing"
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
