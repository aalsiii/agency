"use client";

import React from "react";
import {
  Code,
  Cpu,
  Database,
  Layers,
  Globe,
  Figma,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  CreditCard,
  Mail,
  Workflow,
  Box,
  Zap,
  Server,
  Terminal,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  highlight: string;
  icon: any;
  color?: string;
}

const engineeringRow: TechItem[] = [
  {
    name: "Next.js 16",
    category: "Framework",
    highlight: "Server Components & Turbopack",
    icon: Globe,
    color: "#FFFFFF",
  },
  {
    name: "React 19",
    category: "UI Engine",
    highlight: "Concurrent Architecture",
    icon: Code,
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    category: "Language",
    highlight: "Strict Static Type Safety",
    icon: Terminal,
    color: "#3178C6",
  },
  {
    name: "Tailwind CSS v4",
    category: "Styling",
    highlight: "Zero-Runtime Engine",
    icon: Sparkles,
    color: "#38BDF8",
  },
  {
    name: "Three.js / WebGL",
    category: "3D Graphics",
    highlight: "60 FPS Visual Computing",
    icon: Box,
    color: "#C5A059",
  },
  {
    name: "GSAP & Framer",
    category: "Animation",
    highlight: "Cinematic Physics",
    icon: Zap,
    color: "#0AE448",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    highlight: "Relational Data Scaling",
    icon: Database,
    color: "#336791",
  },
  {
    name: "Prisma ORM",
    category: "ORM",
    highlight: "Type-Safe Data Access",
    icon: Layers,
    color: "#5A67D8",
  },
  {
    name: "Vercel Edge",
    category: "Cloud",
    highlight: "Global Sub-50ms Deployment",
    icon: Server,
    color: "#FFFFFF",
  },
  {
    name: "Cloudflare",
    category: "Security & CDN",
    highlight: "DDoS Shield & Edge Caching",
    icon: ShieldCheck,
    color: "#F38020",
  },
  {
    name: "Redis",
    category: "Cache",
    highlight: "In-Memory Session Speed",
    icon: Cpu,
    color: "#DC382D",
  },
  {
    name: "Node.js",
    category: "Backend",
    highlight: "Asynchronous Microservices",
    icon: Workflow,
    color: "#68A063",
  },
];

const platformRow: TechItem[] = [
  {
    name: "Figma",
    category: "Design System",
    highlight: "Multi-Brand Design Tokens",
    icon: Figma,
    color: "#F24E1E",
  },
  {
    name: "Meta Ads Manager",
    category: "Paid Acquisition",
    highlight: "Advantage+ Media Buying",
    icon: TrendingUp,
    color: "#0081FB",
  },
  {
    name: "Google Ads & P-Max",
    category: "Search Intent",
    highlight: "High-Intent Commercial Funnels",
    icon: Globe,
    color: "#4285F4",
  },
  {
    name: "Google Analytics 4",
    category: "Attribution",
    highlight: "Multi-Touch Conversion Modeling",
    icon: BarChart3,
    color: "#E37400",
  },
  {
    name: "Google Search Console",
    category: "SEO",
    highlight: "Technical Crawlability & SERP",
    icon: Globe,
    color: "#34A853",
  },
  {
    name: "Stripe",
    category: "Payments",
    highlight: "Global Billing Infrastructure",
    icon: CreditCard,
    color: "#635BFF",
  },
  {
    name: "Klaviyo",
    category: "Lifecycle CRM",
    highlight: "Behavioral Email Winbacks",
    icon: Mail,
    color: "#C5A059",
  },
  {
    name: "HubSpot",
    category: "B2B Pipeline",
    highlight: "Lead Scoring & Workflow Auto",
    icon: Workflow,
    color: "#FF7A59",
  },
  {
    name: "Blender 3D",
    category: "Spatial Assets",
    highlight: "Photorealistic 3D Renders",
    icon: Box,
    color: "#EA7600",
  },
  {
    name: "Resend",
    category: "Transactional",
    highlight: "React Email Infrastructure",
    icon: Mail,
    color: "#FFFFFF",
  },
  {
    name: "Docker",
    category: "DevOps",
    highlight: "Deterministic Containers",
    icon: Server,
    color: "#2496ED",
  },
  {
    name: "Cloudinary",
    category: "Media CDN",
    highlight: "Auto-WebP/AVIF Asset Delivery",
    icon: Sparkles,
    color: "#3448C5",
  },
];

export default function TechStackMarquee() {
  return (
    <section className="py-20 md:py-24 bg-[#050505] border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />

      {/* Edge Gradient Masks for Flawless Fade In / Out */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-xs text-primary/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>// ENGINEERING ECOSYSTEM · TECHNOLOGIES WE WORK WITH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-white tracking-tight leading-tight">
              Modern Tech Stacks.{" "}
              <span className="text-primary font-medium">Zero Bloat.</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              We reject sluggish drag-and-drop website builders. Every experience we engineer is powered by battle-tested frameworks, global edge infrastructure, and enterprise growth tools.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 self-start md:self-auto bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>24+ Enterprise Stacks Integrated</span>
          </div>
        </div>

        {/* Marquee Row 1: Engineering & Architecture (Scrolls Left) */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee gap-4 flex items-center">
            {[...engineeringRow, ...engineeringRow].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`eng-${idx}`}
                  className="group px-4 py-2.5 rounded-2xl bg-[#0c0c11] border border-white/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-3.5 shrink-0 shadow-lg hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] cursor-default select-none"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={16} style={{ color: item.color || "#C5A059" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-medium text-xs sm:text-sm text-white group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <span className="font-mono text-[9px] text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 block mt-0.5">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Marquee Row 2: Platforms, Design & Attribution (Scrolls Right) */}
        <div className="overflow-hidden py-1">
          <div className="animate-marquee-reverse gap-4 flex items-center">
            {[...platformRow, ...platformRow].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`plat-${idx}`}
                  className="group px-4 py-2.5 rounded-2xl bg-[#0c0c11] border border-white/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-3.5 shrink-0 shadow-lg hover:shadow-[0_8px_25px_rgba(197,160,89,0.12)] cursor-default select-none"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={16} style={{ color: item.color || "#C5A059" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-medium text-xs sm:text-sm text-white group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <span className="font-mono text-[9px] text-white/50 bg-white/[0.06] px-1.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 block mt-0.5">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
