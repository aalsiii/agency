"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Layout,
  RefreshCw,
  Code,
  LineChart,
  PenTool,
  Palette,
  Megaphone,
  Box,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/services";

export default function HorizontalServices() {
  // Helper to render customized pictography for each of the 8 services
  const renderPictography = (serviceId: string) => {
    switch (serviceId) {
      case "01": // Web Design
        return (
          <div className="relative w-full h-28 rounded-xl bg-black/50 border border-white/10 p-3 overflow-hidden flex flex-col justify-between group-hover:border-primary/40 transition-all duration-300">
            {/* Mini Browser Bar */}
            <div className="flex items-center gap-1.5 pb-2 border-b border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
              <div className="w-20 h-1 bg-white/10 rounded-full ml-2" />
            </div>
            {/* UI Wireframe Grid */}
            <div className="grid grid-cols-3 gap-2 my-auto">
              <div className="col-span-2 h-10 rounded-md bg-white/[0.04] border border-white/10 p-2 space-y-1">
                <div className="w-3/4 h-1.5 bg-primary/70 rounded" />
                <div className="w-1/2 h-1 bg-white/20 rounded" />
              </div>
              <div className="col-span-1 h-10 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Layout size={15} className="text-primary group-hover:scale-110 transition-transform" />
              </div>
            </div>
            {/* Pill */}
            <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
              <span>UI/UX Architecture</span>
              <span className="text-primary font-medium">Responsive</span>
            </div>
          </div>
        );

      case "02": // Website Redesign
        return (
          <div className="relative w-full h-28 rounded-xl bg-black/50 border border-white/10 p-2.5 overflow-hidden flex items-center justify-between group-hover:border-primary/40 transition-all duration-300">
            {/* Legacy Box */}
            <div className="w-[45%] h-full rounded-lg border border-dashed border-white/15 p-2 flex flex-col justify-between opacity-50 bg-white/[0.02]">
              <span className="font-mono text-[8px] text-muted tracking-wider">LEGACY CMS</span>
              <div className="space-y-1">
                <div className="w-full h-1 bg-white/20 rounded" />
                <div className="w-2/3 h-1 bg-white/10 rounded" />
              </div>
              <span className="font-mono text-[8px] text-red-400 font-semibold">4.2s load · Bloated</span>
            </div>

            {/* Transform indicator */}
            <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 group-hover:rotate-180 transition-transform duration-700">
              <RefreshCw size={11} />
            </div>

            {/* Modern High-Performance Box */}
            <div className="w-[45%] h-full rounded-lg bg-primary/[0.08] border border-primary/40 p-2 flex flex-col justify-between shadow-[0_0_15px_rgba(197,160,89,0.15)]">
              <span className="font-mono text-[8px] text-primary font-bold tracking-wider">NEXT.JS 16</span>
              <div className="space-y-1">
                <div className="w-full h-1 bg-primary/70 rounded" />
                <div className="w-4/5 h-1 bg-white/30 rounded" />
              </div>
              <span className="font-mono text-[8px] text-emerald-400 font-bold">0.4s · 99 Score</span>
            </div>
          </div>
        );

      case "03": // Development
        return (
          <div className="relative w-full h-28 rounded-xl bg-black/50 border border-white/10 p-2.5 overflow-hidden flex flex-col justify-between font-mono group-hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between pb-1 border-b border-white/10 text-[9px] text-neutral-400">
              <span>app/page.tsx</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Edge Ready
              </span>
            </div>
            <div className="space-y-0.5 text-[9px] leading-tight py-0.5">
              <p className="text-neutral-400">
                <span className="text-primary font-semibold">export default</span> <span className="text-white">App()</span> &#123;
              </p>
              <p className="pl-3 text-neutral-300">
                return &lt;<span className="text-primary font-semibold">SubSecondApp</span> router="turbopack" /&gt;
              </p>
              <p className="text-neutral-400">&#125;</p>
            </div>
            <div className="flex items-center gap-1.5 text-[8px] text-neutral-400 pt-1 border-t border-white/5">
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">Next.js</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">SSR</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/90">TypeScript</span>
            </div>
          </div>
        );

      case "04": // Marketing
        return (
          <div className="relative w-full h-28 rounded-xl bg-black/50 border border-white/10 p-2.5 overflow-hidden flex flex-col justify-between group-hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-muted tracking-wider">PIPELINE METRICS</span>
              <span className="font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                +340% ROAS
              </span>
            </div>
            {/* Vector Growth Curve */}
            <div className="h-11 w-full flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 160 45">
                <defs>
                  <linearGradient id="marketingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C5A059" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#C5A059" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,40 Q40,35 80,20 T160,4 L160,45 L0,45 Z" fill="url(#marketingGrad)" />
                <path d="M0,40 Q40,35 80,20 T160,4" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
                <circle cx="160" cy="4" r="3.5" fill="#C5A059" className="animate-pulse" />
              </svg>
            </div>
            <div className="flex items-center justify-between font-mono text-[8px] text-neutral-400 border-t border-white/10 pt-1">
              <span>Meta Ads</span>
              <span>Google Intent</span>
              <span>SEO Flywheel</span>
            </div>
          </div>
        );

      case "05": // Branding
        return (
          <div className="relative w-full h-28 rounded-xl bg-black/50 border border-white/10 p-2.5 overflow-hidden flex items-center justify-between group-hover:border-primary/40 transition-all duration-300">
            {/* Geometry circles */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-primary/40 group-hover:rotate-90 transition-transform duration-700" />
              <div className="absolute w-11 h-11 rounded-full border border-white/20" />
              <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/60 flex items-center justify-center text-primary font-serif font-bold text-xs">
                NC
              </div>
            </div>
            {/* Color Swatches and Typo */}
            <div className="space-y-1 text-right font-mono">
              <span className="text-[10px] text-white font-serif font-bold block">Identity System</span>
              <div className="flex items-center justify-end gap-1.5 pt-0.5">
                <span className="w-3 h-3 rounded-full bg-[#C5A059] border border-white/20" title="Warm Gold" />
                <span className="w-3 h-3 rounded-full bg-[#060608] border border-white/40" title="Obsidian" />
                <span className="w-3 h-3 rounded-full bg-[#FFFFFF] border border-white/20" title="Pure White" />
                <span className="w-3 h-3 rounded-full bg-[#10B981] border border-white/20" title="Emerald" />
              </div>
              <span className="text-[8px] text-neutral-400 block pt-0.5">Cinzel & Manrope Font</span>
            </div>
          </div>
        );

      case "06": // Graphic Design
        return (
          <div className="relative w-full h-28 rounded-xl bg-black/50 border border-white/10 p-2.5 overflow-hidden flex flex-col justify-between group-hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400">
              <span>VECTOR CANVAS</span>
              <span className="text-primary font-bold">300 DPI · CMYK</span>
            </div>
            {/* Bezier Vector Curve with Anchor Nodes */}
            <div className="relative h-10 w-full flex items-center justify-center">
              <svg className="w-full h-10" viewBox="0 0 160 35">
                <path d="M10,30 C50,-5 110,40 150,5" fill="none" stroke="#C5A059" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M10,30 C50,-5 110,40 150,5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="10" cy="30" r="3" fill="#C5A059" stroke="#000" strokeWidth="1" />
                <circle cx="50" cy="8" r="2.5" fill="#FFF" />
                <circle cx="110" cy="27" r="2.5" fill="#FFF" />
                <circle cx="150" cy="5" r="3" fill="#C5A059" stroke="#000" strokeWidth="1" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[8px] text-neutral-300 border-t border-white/10 pt-1">
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Social Visuals</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Editorial Decks</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Packaging</span>
            </div>
          </div>
        );

      case "07": // Ad Campaigning
        return (
          <div className="relative w-full h-28 rounded-xl bg-black/50 border border-white/10 p-2.5 overflow-hidden flex flex-col justify-between group-hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between font-mono text-[9px]">
              <span className="text-muted tracking-wider">PAID MEDIA ENGINE</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active Campaigns
              </span>
            </div>
            {/* Mini Ad Performance Banner */}
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <Megaphone size={13} />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-white font-bold">Meta Dynamic CAPI</span>
                  <span className="font-mono text-[8px] text-emerald-400 font-semibold">4.8x ROAS</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-4/5" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[8px] text-neutral-400 border-t border-white/10 pt-1">
              <span>A/B Creative Sprints</span>
              <span>Audience Telemetry</span>
            </div>
          </div>
        );

      case "08": // 2D & 3D Modelling
        return (
          <div className="relative w-full h-28 rounded-xl bg-black/50 border border-white/10 p-2.5 overflow-hidden flex items-center justify-between group-hover:border-primary/40 transition-all duration-300">
            {/* Isometric 3D Wireframe Cube */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-14 h-14" viewBox="0 0 60 60">
                <polygon points="30,5 52,17 30,29 8,17" fill="rgba(197,160,89,0.2)" stroke="#C5A059" strokeWidth="1" />
                <polygon points="8,17 30,29 30,55 8,43" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <polygon points="30,29 52,17 52,43 30,55" fill="rgba(197,160,89,0.1)" stroke="#C5A059" strokeWidth="1" />
                <circle cx="30" cy="5" r="1.5" fill="#FFF" />
                <circle cx="52" cy="17" r="1.5" fill="#C5A059" />
                <circle cx="8" cy="17" r="1.5" fill="#FFF" />
                <circle cx="30" cy="29" r="2" fill="#C5A059" />
              </svg>
            </div>
            {/* 3D Specs */}
            <div className="space-y-1 text-right font-mono">
              <span className="text-[10px] text-white font-bold block">3D Spatial Models</span>
              <span className="text-[8px] text-primary block">glTF · Blender · OBJ</span>
              <span className="text-[8px] text-neutral-400 block">PBR Shaders & Lighting</span>
              <span className="text-[8px] text-emerald-400 block">60 FPS WebGL Ready</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="services" className="relative py-28 bg-[#060608] border-t border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="font-mono text-xs text-primary/80">
              // core capabilities · digital systems architecture
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-normal text-white tracking-tight leading-tight">
              Acquisition Channels & Digital Systems
            </h2>
            <p className="text-muted text-base max-w-xl font-light leading-relaxed">
              Full-funnel digital capabilities engineered for compounding scale — from bespoke Next.js storefronts to high-ROAS paid media and brand systems.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-primary text-xs font-mono text-white hover:text-primary transition-all self-start md:self-auto"
          >
            <span>View All Capabilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 8 Service Cards Grid (4 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
                className="group relative p-6 min-h-[460px] bg-[#0c0c11] border border-white/10 hover:border-primary/50 flex flex-col justify-between transition-all duration-300 rounded-2xl hover:shadow-[0_15px_40px_rgba(197,160,89,0.18)] overflow-hidden"
              >
                {/* Top: Index, Icon, Title & Description */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-primary/80">
                      [ 0{index + 1} // system ]
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all">
                      {Icon && <Icon size={16} />}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-sans font-medium text-white group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-neutral-400 text-xs font-light leading-relaxed mt-1.5">
                      {service.description}
                    </p>
                  </div>

                  {/* Visual Pictogram Component */}
                  <div className="pt-2">
                    {renderPictography(service.id)}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-1 pt-1">
                    {service.features.slice(0, 3).map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-[11px] text-neutral-300 font-sans">
                        <span className="w-1 h-1 rounded-full bg-primary/80 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer Row */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-neutral-500">
                    rolling retainer
                  </span>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:text-white transition-colors"
                  >
                    <span>explore</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
