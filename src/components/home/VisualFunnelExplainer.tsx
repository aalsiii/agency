"use client";

import { motion } from "framer-motion";
import {
  Search,
  Smartphone,
  CalendarCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  MousePointerClick,
  CheckCircle2,
  Users,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function VisualFunnelExplainer() {
  const steps = [
    {
      number: "01",
      stepBadge: "Step 1 · Discovery",
      title: "People Find You Online",
      subtitle: "Capturing High-Intent Traffic",
      plainDescription:
        "When potential clients search Google for what you offer, or scroll through Instagram and Facebook, they see high-authority content and targeted ads designed specifically for your ideal buyer.",
      illustration: (
        <div className="relative w-full h-40 rounded-xl bg-black/60 border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
          {/* Simulated Google Search result */}
          <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-muted">
              <Search size={10} className="text-primary" />
              <span>google.com/search</span>
            </div>
            <p className="text-xs font-serif font-bold text-primary truncate">
              Your Business · Top Rated Practice
            </p>
            <p className="text-[10px] text-neutral-400 line-clamp-1">
              Bespoke coaching, wellness retreats & custom storefronts.
            </p>
          </div>

          {/* Social feed ad notification */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary/20 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[9px]">
                Ad
              </div>
              <span className="text-[11px] text-white font-medium">Meta & Instagram Ads</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-400 font-bold">High Intent</span>
          </div>
        </div>
      ),
      takeaways: [
        "Rank for high-intent keywords on Google",
        "Stop scrolling thumbs on Instagram & Meta",
        "Zero wasted ad budget on random audiences",
      ],
    },
    {
      number: "02",
      stepBadge: "Step 2 · First Impression",
      title: "They Land on a Fast, Trust-Building Site",
      subtitle: "Instant Credibility in 3 Seconds",
      plainDescription:
        "Visitors click through to a modern, lightning-fast website. It looks luxurious, works smoothly on mobile phones, and immediately shows client reviews so visitors know you are legitimate.",
      illustration: (
        <div className="relative w-full h-40 rounded-xl bg-black/60 border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
          {/* Browser mockup header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              ⚡ 0.4s Sub-Second Load
            </span>
          </div>

          {/* Value preview block */}
          <div className="space-y-1.5 my-auto">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
              <div className="w-3/4 h-2 bg-primary/70 rounded" />
              <div className="w-1/2 h-1.5 bg-white/20 rounded" />
            </div>
            <div className="flex items-center justify-between text-[10px] font-sans px-1">
              <span className="text-neutral-300">⭐⭐⭐⭐⭐ Verified Reviews</span>
              <span className="text-primary font-mono text-[9px]">Mobile-Optimized</span>
            </div>
          </div>
        </div>
      ),
      takeaways: [
        "Loads in under 1 second on mobile devices",
        "Establishes premium authority right away",
        "Zero confusing clutter or broken layouts",
      ],
    },
    {
      number: "03",
      stepBadge: "Step 3 · Conversion",
      title: "They Book, Apply, or Purchase",
      subtitle: "Frictionless Client Action",
      plainDescription:
        "We replace long, boring contact forms with intuitive booking calendars, one-click WhatsApp chats, and clean checkout steps so interested prospects convert with ease.",
      illustration: (
        <div className="relative w-full h-40 rounded-xl bg-black/60 border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between font-mono text-[9px] text-muted">
            <span>DIRECT APPLICATION</span>
            <span className="text-primary font-bold">1-Click Booking</span>
          </div>

          {/* Interactive Booking card mockup */}
          <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarCheck size={14} className="text-primary" />
                <span className="text-[11px] font-medium text-white">Discovery Consultation</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-primary text-black font-semibold text-[9px]">
                10:00 AM
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 text-[9px]">
                02:30 PM
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-300 text-[9px]">
                05:00 PM
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span>WhatsApp / Email Sync</span>
            <span className="text-emerald-400 font-bold">Instant Notification</span>
          </div>
        </div>
      ),
      takeaways: [
        "One-click calendar scheduling or WhatsApp direct lead",
        "Clean mobile checkout with zero drop-off points",
        "Automatic notifications sent straight to your phone",
      ],
    },
    {
      number: "04",
      stepBadge: "Step 4 · Retention",
      title: "You Scale & Cohorts Fill Up",
      subtitle: "Predictable, Compounding Growth",
      plainDescription:
        "Once the machine is running, leads arrive consistently week after week. Just like Nada Yoga School filling cohorts through next year, you gain predictable revenue.",
      illustration: (
        <div className="relative w-full h-40 rounded-xl bg-black/60 border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-muted">GROWTH PIPELINE</span>
            <span className="font-mono text-[9px] text-primary font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
              Full Capacity
            </span>
          </div>

          {/* Success badges */}
          <div className="space-y-1.5 my-auto">
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span className="text-[10px] font-medium">Next Year Cohorts Almost 100% Booked</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white">
              <div className="flex items-center gap-2">
                <TrendingUp size={13} className="text-primary" />
                <span className="text-[10px] font-medium">Consistent Weekly Client Inbound</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span>Continuous Optimization</span>
            <span className="text-primary">Monthly Growth</span>
          </div>
        </div>
      ),
      takeaways: [
        "Consistent pipeline of qualified client applications",
        "Never scramble for clients at the end of the month",
        "Hands-off maintenance and continuous ad optimization",
      ],
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#060608] border-t border-white/10 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-16">
        {/* Section Header in Simple, Welcoming English */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="font-mono text-xs text-primary/80">
            // plain english · customer acquisition funnel
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-normal text-white tracking-tight leading-tight">
            How We Turn Strangers Into{" "}
            <span className="text-gold-gradient">
              Paying Clients
            </span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            You don&apos;t need to understand coding, servers, or algorithms. Here is the exact 4-step client acquisition machine we engineer for your business.
          </p>
        </div>

        {/* 4 Funnel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-[#0c0c11] border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_15px_40px_rgba(197,160,89,0.18)] group"
            >
              {/* Step Top Bar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                    {step.number}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400">
                    {step.stepBadge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-sans font-medium text-white group-hover:text-primary transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-mono text-[11px] text-primary/80 mt-1">
                    // {step.subtitle}
                  </p>
                </div>

                {/* Plain English explanation */}
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {step.plainDescription}
                </p>

                {/* Visual Pictogram / Mockup */}
                <div className="pt-1">
                  {step.illustration}
                </div>
              </div>

              {/* Takeaway Bullets */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                {step.takeaways.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-neutral-300 font-sans">
                    <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Funnel Bottom Summary Pill */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-sans font-medium text-white">
              Want this exact funnel built and managed for your brand?
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              We handle everything: the design, code, copywriting, SEO, and paid ad management under one roof.
            </p>
          </div>
          <Link
            href="/start-a-project"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all shadow-md"
          >
            <span>Build My Growth Funnel</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
