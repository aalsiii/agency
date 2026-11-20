"use client";

import React from "react";
import {
  Code,
  Compass,
  Database,
  Globe,
  Layers,
  Mail,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Video,
  Workflow,
  Zap,
} from "lucide-react";

interface TechPill {
  name: string;
  icon: React.ReactNode;
}

// Crisp official mini SVG icons
const NextjsIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M12 1L24 22H0L12 1Z" />
  </svg>
);

const ReactIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#61DAFB">
    <path d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0-7.5c-3.1 0-5.8.7-7.8 1.9C2.2 5.1 1 6.8 1 8.8s1.2 3.7 3.2 4.9c-.8 1.1-1.2 2.3-1.2 3.6 0 2 1.2 3.7 3.2 4.9 2 1.2 4.7 1.9 7.8 1.9s5.8-.7 7.8-1.9c2-1.2 3.2-2.9 3.2-4.9 0-1.3-.4-2.5-1.2-3.6 2-1.2 3.2-2.9 3.2-4.9s-1.2-3.7-3.2-4.9C17.8 2.7 15.1 2 12 2z" />
  </svg>
);

const TypeScriptIcon = () => (
  <span className="w-3.5 h-3.5 rounded-sm bg-[#3178C6] text-white font-mono font-bold text-[8px] flex items-center justify-center shrink-0">
    TS
  </span>
);

const TailwindIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#38BDF8">
    <path d="M12 6c-4 0-6.5 2-7.5 6 1.5-2 3.5-2.75 6-2.25 1.43.29 2.45 1.33 3.58 2.48C15.86 14.1 18.06 16.3 23 16.3c4 0 6.5-2 7.5-6-1.5 2-3.5 2.75-6 2.25-1.43-.29-2.45-1.33-3.58-2.48C19.14 8.2 16.94 6 12 6z" />
  </svg>
);

const FigmaIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 38 57">
    <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
    <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
    <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
    <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
    <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
  </svg>
);

const MetaIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#0081FB">
    <path d="M12 7.15c2.37-3.1 5.48-4.15 8.13-2.6 2.45 1.44 3.87 4.54 3.87 8.25 0 4.38-2.02 8.2-4.98 8.2-1.85 0-3.32-1.12-4.43-2.92-1.07-1.74-2.03-4.08-2.59-5.46-.56 1.38-1.52 3.72-2.59 5.46-1.11 1.8-2.58 2.92-4.43 2.92-2.96 0-4.98-3.82-4.98-8.2 0-3.71 1.42-6.81 3.87-8.25 2.65-1.55 5.76-.5 8.14 2.6zm6.8 1.44c-1.58-.93-3.6-.12-5.18 2.21 1.13 2.64 2.42 5.3 3.65 6.64.91 1 1.77 1.42 2.37 1.42 1.47 0 2.36-2.54 2.36-5.51 0-2.39-.77-4.13-2.03-4.76zm-13.6 0c-1.26.63-2.03 2.37-2.03 4.76 0 2.97.89 5.51 2.36 5.51.6 0 1.46-.42 2.37-1.42 1.23-1.34 2.52-4 3.65-6.64-1.58-2.33-3.6-3.14-5.18-2.21z" />
  </svg>
);

const GoogleAdsIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M3.88 12.01L8.2 4.52c.98-1.7 3.16-2.28 4.86-1.3l.02.01c1.7.98 2.28 3.16 1.3 4.86l-4.32 7.49c-.98 1.7-3.16 2.28-4.86 1.3l-.02-.01c-1.7-.98-2.28-3.16-1.3-4.86z" />
    <path fill="#FBBC04" d="M14.38 8.08l4.32-7.49c.98-1.7 3.16-2.28 4.86-1.3l.02.01c1.7.98 2.28 3.16 1.3 4.86l-4.32 7.49c-.98 1.7-3.16 2.28-4.86 1.3l-.02-.01c-1.7-.98-2.28-3.16-1.3-4.86z" />
    <circle fill="#34A853" cx="6.47" cy="18.52" r="3.48" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#25D366">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.05c-.24.67-1.39 1.28-1.93 1.33-.51.05-1.17.07-3.79-.98-2.83-1.14-4.63-4.04-4.77-4.23-.14-.19-1.14-1.52-1.14-2.9 0-1.38.72-2.06.98-2.35.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.31.38-.44.5-.14.14-.29.3-.12.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.33.07.12.07.7-.17 1.37z" />
  </svg>
);

const ShopifyIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#95BF47">
    <path d="M19.34 6.74c-.06-.43-.45-.63-.77-.66-.32-.03-2.18-.15-2.18-.15s-1.46-1.45-1.63-1.62c-.17-.17-.5-.12-.63-.07-.03.01-.6.18-1.55.48-.28-.74-.75-1.47-1.49-1.92-1.27-.77-2.73-.55-3.37.19-.48.56-.63 1.43-.47 2.45-.73.23-1.28.4-1.32.41-.4.13-.42.15-.47.53l-1.94 14.8c-.05.37.15.54.43.56.28.02 12.02.94 12.02.94.39.03.62-.22.68-.45l2.7-16.48zm-6.2-2.18c.67.24 1.15.78 1.42 1.45-.96.3-2.06.65-3.14.99-.07-.75.09-1.52.48-1.97.35-.4.82-.61 1.24-.47z" />
  </svg>
);

const WordPressIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#21759B">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-8.8 10c0-1.74.52-3.36 1.41-4.72l4.9 13.43C5.9 19.38 3.2 16 3.2 12zm8.8 8.8c-1.34 0-2.58-.33-3.69-.92l3.41-9.89 3.49 9.57c-.03.01-.06.03-.09.04-1 .76-2.02 1.2-3.12 1.2zm1.46-13.62l3.18 8.73c.72-1.8 1.16-3.79 1.16-5.91 0-1.63-.44-3.16-1.2-4.47l-3.14 1.65z" />
  </svg>
);

const WooCommerceIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#96588A">
    <rect width="24" height="24" rx="4" fill="#96588A" />
    <path d="M4.5 9h3v6h-3zm6 0h3v6h-3zm6 0h3v6h-3z" fill="#FFF" />
  </svg>
);

const StripeIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#635BFF">
    <path d="M13.98 9.34c0-.98-.79-1.36-2.09-1.36-1.87 0-4.24.58-6.14 1.62V3.78c2.19-.94 4.57-1.34 6.94-1.34 5.56 0 9.17 2.76 9.17 7.4 0 7.23-9.92 7.62-9.92 11.53 0 1.27 1.07 1.7 2.57 1.7 2.27 0 5.16-.92 7.42-2.2v5.86c-2.48 1.07-5.26 1.57-7.98 1.57-5.87 0-9.87-2.88-9.87-7.58 0-7.83 9.9-8.08 9.9-11.38z" />
  </svg>
);

// Row 1: Core Technologies & Engineering Stack (No blue blocks, unified luxury pills)
const engineeringTechs: TechPill[] = [
  { name: "Next.js 16", icon: <NextjsIcon /> },
  { name: "Figma UI/UX Design", icon: <FigmaIcon /> },
  { name: "React 19", icon: <ReactIcon /> },
  { name: "TypeScript", icon: <TypeScriptIcon /> },
  { name: "Tailwind CSS v4", icon: <TailwindIcon /> },
  { name: "Three.js & 3D WebGL", icon: <Code className="w-3.5 h-3.5 text-primary shrink-0" /> },
  { name: "GSAP Cinematic Motion", icon: <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
  { name: "Vercel Edge Platform", icon: <NextjsIcon /> },
  { name: "Shopify E-Commerce", icon: <ShopifyIcon /> },
  { name: "WordPress & WooCommerce", icon: <WordPressIcon /> },
  { name: "PostgreSQL & Prisma", icon: <Database className="w-3.5 h-3.5 text-[#5A67D8] shrink-0" /> },
  { name: "Stripe Global Billing", icon: <StripeIcon /> },
  { name: "Cloudflare CDN & Shield", icon: <ShieldCheck className="w-3.5 h-3.5 text-[#F38020] shrink-0" /> },
];

// Row 2: Marketing, Paid Advertising, Creative & Growth Services (No blue blocks)
const serviceOfferings: TechPill[] = [
  { name: "Meta Ads & Advantage+", icon: <MetaIcon /> },
  { name: "Google Ads & P-Max", icon: <GoogleAdsIcon /> },
  { name: "WhatsApp Lead Funnels", icon: <WhatsAppIcon /> },
  { name: "Klaviyo Automated Flows", icon: <Mail className="w-3.5 h-3.5 text-primary shrink-0" /> },
  { name: "Editorial Video Editing", icon: <Video className="w-3.5 h-3.5 text-red-400 shrink-0" /> },
  { name: "Technical SEO & SERP Indexing", icon: <Search className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
  { name: "Google Analytics 4 Telemetry", icon: <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" /> },
  { name: "Brand Identity & Positioning", icon: <Compass className="w-3.5 h-3.5 text-primary shrink-0" /> },
  { name: "Conversion Rate Optimization", icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> },
  { name: "A/B Creative Ad Sprints", icon: <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" /> },
  { name: "Social Media Feed Mockups", icon: <Palette className="w-3.5 h-3.5 text-pink-400 shrink-0" /> },
  { name: "HubSpot CRM Orchestration", icon: <Workflow className="w-3.5 h-3.5 text-[#FF7A59] shrink-0" /> },
];

export default function TechStackMarquee() {
  return (
    <section className="py-8 md:py-10 bg-[#050505] border-t border-white/10 relative overflow-hidden">
      {/* Subtle background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[25vh] bg-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />

      {/* Edge Gradient Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#050505] to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#050505] to-transparent z-20" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-3.5">
        {/* Simple single-line label matching brand tone */}
        <p className="text-center text-xs md:text-sm text-neutral-400 font-light tracking-wide">
          Technologies, platforms, and client acquisition channels we engineer with
        </p>

        {/* Row 1: Core Technologies & Engineering (Scrolls Left) */}
        <div className="overflow-hidden py-0.5">
          <div className="animate-marquee gap-2.5 flex items-center">
            {[...engineeringTechs, ...engineeringTechs, ...engineeringTechs].map((tech, idx) => (
              <div
                key={`eng-${idx}`}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all flex items-center gap-2 cursor-default select-none shadow-sm backdrop-blur-sm"
              >
                {tech.icon}
                <span className="font-sans font-medium text-xs text-neutral-200">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Marketing, Paid Media & Services (Scrolls Right) */}
        <div className="overflow-hidden py-0.5">
          <div className="animate-marquee-reverse gap-2.5 flex items-center">
            {[...serviceOfferings, ...serviceOfferings, ...serviceOfferings].map((service, idx) => (
              <div
                key={`srv-${idx}`}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all flex items-center gap-2 cursor-default select-none shadow-sm backdrop-blur-sm"
              >
                {service.icon}
                <span className="font-sans font-medium text-xs text-neutral-200">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
