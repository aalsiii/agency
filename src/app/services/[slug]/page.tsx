import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Smartphone,
  Globe,
  TrendingUp,
  Mail,
  Zap,
  BarChart3,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";
import ServiceClientActions from "./ServiceClientActions";

export const dynamic = "force-dynamic";

const SERVICE_ALIASES: Record<string, string> = {
  "ad-campaigning": "performance-marketing",
  "paid-ads": "performance-marketing",
  "marketing": "performance-marketing",
  "paid-advertising": "performance-marketing",
  "performance": "performance-marketing",
  "social-media": "social-media-marketing",
  "social": "social-media-marketing",
  "smm": "social-media-marketing",
  "web-development": "website-development",
  "web-design": "website-development",
  "website-redesign": "website-development",
  "websites": "website-development",
  "website": "website-development",
  "email": "email-marketing",
  "email-marketing": "email-marketing",
  "retention": "email-marketing",
  "seo-search-visibility": "seo",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = SERVICE_ALIASES[slug] || slug;
  let service: any = null;
  try {
    service = await prisma.service.findUnique({ where: { slug: targetSlug } });
  } catch (error) {
    console.error("Metadata fetch fallback for service:", targetSlug);
  }

  if (!service) {
    return { title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | NextCurrent Media` };
  }

  return {
    title: `${service.title} | NextCurrent Media`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | NextCurrent Media`,
      description: service.shortDesc,
    },
  };
}

export default async function IndividualServicePage({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = SERVICE_ALIASES[slug] || slug;
  let service: any = null;

  try {
    service = await prisma.service.findUnique({
      where: { slug: targetSlug },
    });
  } catch (error) {
    console.error("Database connection fallback on ServiceDetail:", error);
  }

  if (!service) {
    return notFound();
  }

  // Parse JSON fields safely
  let features: string[] = [];
  let problems: string[] = [];
  let methodology: string[] = [];
  let benefits: string[] = [];
  let deliverables: string[] = [];
  let faqs: { question: string; answer: string }[] = [];

  try {
    if (service.features) features = JSON.parse(service.features);
    if (service.problems) problems = JSON.parse(service.problems);
    if (service.methodology) methodology = JSON.parse(service.methodology);
    if (service.benefits) benefits = JSON.parse(service.benefits);
    if (service.deliverables) deliverables = JSON.parse(service.deliverables);
    if (service.faqs) faqs = JSON.parse(service.faqs);
  } catch {}

  // Fetch relevant case studies matching category
  let relevantProjects: any[] = [];
  try {
    relevantProjects = await prisma.caseStudy.findMany({
      where: {
        OR: [
          { category: service.category },
          { isFeatured: true },
        ],
      },
      take: 2,
    });
  } catch (e) {
    console.error("Error fetching relevant projects:", e);
  }

  // Visual Assets
  const websiteScreenshots = [
    "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148753/agency/images/websites/nitasha-buldeo.jpg",
    "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148756/agency/images/websites/yogamani.jpg",
    "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148755/agency/images/websites/valalino-web.jpg",
    "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148752/agency/images/websites/echoes-shop.jpg",
    "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148754/agency/images/websites/rudraksha-store.jpg",
    "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148751/agency/images/websites/admin-gallery.jpg",
  ];

  const socialFeeds = [
    { img: "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148747/agency/images/social/nadayoga-feed.jpg", offset: "md:translate-y-0" },
    { img: "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148746/agency/images/social/nadayoga-espanol-feed.jpg", offset: "md:translate-y-6" },
    { img: "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148749/agency/images/social/valalino-feed.jpg", offset: "md:-translate-y-3" },
    { img: "https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148748/agency/images/social/syara-rae-feed.jpg", offset: "md:translate-y-4" },
  ];

  return (
    <article className="min-h-screen bg-background text-foreground pt-36 pb-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-primary/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl space-y-20 md:space-y-28">
        {/* Back Link & Breadcrumb */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-primary transition-colors pb-1 border-b border-transparent hover:border-primary/30"
          >
            <ArrowLeft size={13} />
            <span>[ back to all services ]</span>
          </Link>
        </div>

        {/* 1. Service Hero */}
        <header className="space-y-6 max-w-4xl border-b border-white/10 pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-primary/80">
              [ {service.category} ]
            </span>
            {service.badge && (
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary">
                [ {service.badge} ]
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-normal text-white tracking-tight leading-tight">
            {service.title}
          </h1>

          <p className="text-lg md:text-2xl text-muted font-light leading-relaxed">
            {service.tagline}
          </p>

          <ServiceClientActions
            title={service.title}
            priceInr={service.priceInr}
            priceUsd={service.priceUsd}
            billingType={service.billingType}
          />
        </header>

        {/* =========================================================================
            EXECUTIVE VISUAL SHOWCASE (Custom tailored per core pillar)
           ========================================================================= */}
        {targetSlug === "performance-marketing" && (
          <section className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                  <TrendingUp size={13} />
                  <span>Real Campaign Telemetry · Verified Client Accounts</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-sans font-medium text-white tracking-tight">
                  Transparent Attribution & Unit Economics
                </h2>
              </div>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start md:self-auto">
                ● Live Scaling Engine Active
              </span>
            </div>

            {/* macOS Window Frame displaying Meta Ads Dashboard */}
            <div className="rounded-2xl bg-black border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
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
                <div className="text-[10px] font-mono text-neutral-400">
                  Last 30 Days Attribution
                </div>
              </div>

              {/* Real Dashboard Image */}
              <div className="relative aspect-[16/9] md:aspect-[16/8] w-full bg-neutral-950 overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148727/agency/images/marketing/meta-ads-dashboard.jpg"
                  alt="Meta Ads Performance Telemetry Dashboard"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1200px) 100vw, 1100px"
                  priority
                />
              </div>
            </div>

            {/* Telemetry Chips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Qualified Leads</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">597+ Verified</div>
                <p className="text-[11px] text-emerald-400 font-mono">5 Active Campaigns</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Avg. Cost Per Result</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">₹126.48</div>
                <p className="text-[11px] text-emerald-400 font-mono">-42% vs Industry CAC</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Attributed Revenue</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">4.82x ROAS</div>
                <p className="text-[11px] text-primary font-mono">Verified Pipeline</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Tracking Infrastructure</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">CAPI + GA4</div>
                <p className="text-[11px] text-emerald-400 font-mono">98% Signal Match</p>
              </div>
            </div>
          </section>
        )}

        {targetSlug === "social-media-marketing" && (
          <section className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                  <Smartphone size={13} />
                  <span>Aesthetic Feed Architecture · Real Client Profiles</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-sans font-medium text-white tracking-tight">
                  Magazine-Quality Feeds & High-Retention Reels
                </h2>
              </div>
              <span className="font-mono text-xs text-primary/80 self-start md:self-auto">
                // 16 videos/month · automated DM funnels
              </span>
            </div>

            {/* Mobile swipe helper pill */}
            <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-muted mb-2 px-1">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>← Swipe to explore feeds →</span>
              </span>
              <span className="text-neutral-500">4 Curated Feeds</span>
            </div>

            {/* 4-Phone Visual Showcase: Horizontal on mobile, grid on desktop */}
            <div className="relative pt-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-48 bg-primary/[0.06] blur-[90px] rounded-full pointer-events-none" />

              <div className="flex md:grid md:grid-cols-4 gap-4 sm:gap-6 relative z-10 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-2 px-2 md:mx-0 md:px-0">
                {socialFeeds.map((feed, idx) => (
                  <div
                    key={idx}
                    className={`min-w-[210px] max-w-[250px] md:min-w-0 md:max-w-none shrink-0 md:shrink snap-center transition-all duration-500 hover:-translate-y-2 ${feed.offset}`}
                  >
                    <div className="rounded-[36px] bg-[#0c0c11] border-[4px] border-neutral-700/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-primary/40 transition-all">
                      <div className="w-16 h-3 bg-black rounded-full mx-auto mb-1.5 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                      </div>
                      <div className="rounded-[28px] overflow-hidden bg-black relative aspect-[9/18] border border-white/5">
                        <Image
                          src={feed.img}
                          alt="Curated Social Media Feed Visual"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 70vw, 25vw"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Telemetry Chips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Video Cadence</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">16 Reels / Mo</div>
                <p className="text-[11px] text-primary font-mono">Full Scripting & Motion</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Hook Retention</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">+142% Avg. Lift</div>
                <p className="text-[11px] text-emerald-400 font-mono">Pattern-Interrupt Edit</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Lead Conversion</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">ManyChat DMs</div>
                <p className="text-[11px] text-emerald-400 font-mono">Automated Comment Trigger</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Visual Curation</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">9-Grid Editorial</div>
                <p className="text-[11px] text-primary font-mono">Magazine Aesthetic</p>
              </div>
            </div>
          </section>
        )}

        {(targetSlug === "website-development" || targetSlug === "nextjs-development" || targetSlug === "website-redesign" || targetSlug === "wordpress-development") && (
          <section className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                  <Globe size={13} />
                  <span>Engineered Platforms · Sub-Second Edge Infrastructure</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-sans font-medium text-white tracking-tight">
                  Bespoke Architectural Engineering Showcase
                </h2>
              </div>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start md:self-auto">
                ● Sub-400ms TTFB Pass
              </span>
            </div>

            {/* Mobile swipe helper pill */}
            <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-muted mb-2 px-1">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>← Swipe to preview 6 platforms →</span>
              </span>
              <span className="text-neutral-500">6 Live Builds</span>
            </div>

            {/* 6-Card Visual Website Carousel on mobile / Grid on desktop */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-2 px-2 md:mx-0 md:px-0">
              {websiteScreenshots.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="min-w-[280px] sm:min-w-[340px] md:min-w-0 shrink-0 md:shrink snap-center group rounded-2xl bg-black border border-white/15 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:border-primary/50 hover:shadow-[0_20px_45px_rgba(197,160,89,0.2)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
                >
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

            {/* Telemetry Chips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Edge Load Time</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">0.38s TTFB</div>
                <p className="text-[11px] text-emerald-400 font-mono">Sub-Second Mobile</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Core Web Vitals</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">100 / 100</div>
                <p className="text-[11px] text-emerald-400 font-mono">Zero Layout Shift</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Architecture</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">Next.js 15 SSR</div>
                <p className="text-[11px] text-primary font-mono">React 19 Server Actions</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Admin Control</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">Bespoke CMS</div>
                <p className="text-[11px] text-primary font-mono">Zero Developer Cost</p>
              </div>
            </div>
          </section>
        )}

        {targetSlug === "email-marketing" && (
          <section className="rounded-3xl bg-[var(--background-layer-1)] border border-white/10 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                  <Mail size={13} />
                  <span>Retention Automation · Live Sequence Interface</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-sans font-medium text-white tracking-tight">
                  Automated Sequences & Masterclass Campaigns
                </h2>
              </div>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start md:self-auto">
                ● 42.59% Active Open Rate
              </span>
            </div>

            {/* macOS Window Frame displaying Email Automation Platform */}
            <div className="rounded-2xl bg-black border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
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
                <div className="text-[10px] font-mono text-neutral-400">
                  84 Automated Messages
                </div>
              </div>

              <div className="relative aspect-[16/9] md:aspect-[16/8] w-full bg-neutral-950 overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/daoolgxuk/image/upload/f_auto,q_auto/v1795148726/agency/images/marketing/email-dashboard.jpg"
                  alt="Email Marketing Automation Platform Interface"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1200px) 100vw, 1100px"
                  priority
                />
              </div>
            </div>

            {/* Telemetry Chips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Masterclass Open Rate</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">42.59%</div>
                <p className="text-[11px] text-emerald-400 font-mono">2x Industry Benchmark</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Spam Score Rating</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">0.0 Zero</div>
                <p className="text-[11px] text-emerald-400 font-mono">Verified SPF / DKIM</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Automated Sequences</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">5-Part Trust</div>
                <p className="text-[11px] text-primary font-mono">Welcome & Nurture</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-mono text-[11px] text-muted block">Abandoned Booking</span>
                <div className="text-xl md:text-2xl font-sans font-medium text-white">+24% Reclaimed</div>
                <p className="text-[11px] text-emerald-400 font-mono">Automated Win-Back</p>
              </div>
            </div>
          </section>
        )}

        {/* 2. Overview & Problem Diagnosis (Colhead layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight">
              Executive Overview
            </h2>
            <div className="font-mono text-xs text-primary/80">
              // strategic rationale & context
            </div>
            {service.idealFor && (
              <div className="p-5 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 mt-6 space-y-2">
                <span className="font-mono text-[11px] text-muted block">
                  optimal candidate:
                </span>
                <p className="text-xs text-white/90 font-light leading-relaxed">
                  {service.idealFor}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-base md:text-lg text-muted/90 leading-relaxed font-light">
              {service.fullDesc || service.shortDesc}
            </p>

            {problems.length > 0 && (
              <div className="pt-6 space-y-4">
                <span className="font-mono text-xs text-primary/80 block">
                  // core bottlenecks addressed:
                </span>
                <div className="space-y-3">
                  {problems.map((prob, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[var(--background-layer-1)] border border-white/10 flex items-start gap-3"
                    >
                      <AlertCircle className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
                      <span className="text-xs text-white/80 font-light leading-relaxed">
                        {prob}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. Methodology & Deliverables */}
        <section className="p-8 md:p-12 rounded-3xl bg-[var(--background-layer-1)] border border-white/10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight">
                Methodology & Deliverables
              </h2>
              <div className="font-mono text-xs text-primary/80 mt-2">
                // step-by-step engineering & deliverables checklist
              </div>
            </div>
            <Link
              href={`/start-a-project?service=${encodeURIComponent(service.slug)}`}
              className="font-mono text-xs text-primary hover:text-white flex items-center gap-1.5"
            >
              <span>[ start project with this service ]</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Methodology Steps */}
            {methodology.length > 0 && (
              <div className="space-y-4">
                <span className="font-mono text-xs text-muted block">
                  execution phases:
                </span>
                <div className="space-y-4">
                  {methodology.map((step, idx) => {
                    const [stepTitle, stepDesc] = step.split(": ");
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[var(--background-layer-2)] border border-white/5 space-y-2"
                      >
                        <span className="font-mono text-xs text-primary font-semibold">
                          [ Phase 0{idx + 1} // {stepTitle} ]
                        </span>
                        {stepDesc && (
                          <p className="text-xs text-muted font-light leading-relaxed">
                            {stepDesc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Deliverables Checklist */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-muted block">
                included deliverables:
              </span>
              <div className="space-y-3">
                {(deliverables.length > 0 ? deliverables : features).map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[var(--background-layer-2)] border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/85 font-light leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Tangible Benefits */}
        {benefits.length > 0 && (
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight">
                Compounding Returns
              </h2>
              <div className="font-mono text-xs text-primary/80 mt-2">
                // measurable business outcomes
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((ben, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-3"
                >
                  <span className="font-mono text-xs text-primary font-bold">
                    [ outcome 0{idx + 1} ]
                  </span>
                  <p className="text-sm text-white/90 font-light leading-relaxed">
                    {ben}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Relevant Projects */}
        {relevantProjects.length > 0 && (
          <section className="space-y-8 border-t border-white/10 pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight">
                  Relevant Case Studies
                </h2>
                <div className="font-mono text-xs text-primary/80 mt-2">
                  // verified outcomes in {service.category}
                </div>
              </div>
              <Link
                href="/work"
                className="font-mono text-xs text-muted hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>[ explore all projects ]</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relevantProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/work/${p.slug}`}
                  className="group block p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 hover:border-primary/50 transition-all duration-300 space-y-4"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                    <Image
                      src={p.coverImage || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 font-mono text-xs text-primary font-bold">
                      {p.heroMetricNumber} · {p.heroMetricLabel}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-primary/70 block">// {p.clientName}</span>
                    <h3 className="text-xl font-sans font-medium text-white group-hover:text-primary transition-colors mt-1">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 6. Frequently Asked Questions (Expanded & Styled) */}
        {faqs.length > 0 && (
          <section className="space-y-8 border-t border-white/10 pt-16 max-w-4xl">
            <div className="space-y-3">
              <div className="font-mono text-xs text-primary/80 flex items-center gap-2">
                <HelpCircle size={13} />
                <span>// transparent details & commercial clarity</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-sm font-light">
                Direct answers to common technical, commercial, and operational questions.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 hover:border-white/25 transition-all duration-300 open:bg-[var(--background-layer-2)] open:border-primary/40 open:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <summary className="font-sans font-medium text-base text-white cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="flex items-start gap-3">
                      <span className="font-mono text-xs text-primary/70 shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span className="leading-snug">{faq.question}</span>
                    </span>
                    <span className="font-mono text-xs text-primary transition-transform duration-300 group-open:rotate-45 shrink-0 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed pt-4 border-t border-white/5 mt-4 pl-7">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 7. Final Conversion Section */}
        <section className="border-t border-white/10 pt-20 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-sans font-normal text-white tracking-tight">
            Ready to deploy {service.title}?
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto font-light leading-relaxed">
            Begin with a customized project scope estimate or request our diagnostic review to identify immediate revenue opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href={`/start-a-project?service=${encodeURIComponent(service.slug)}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.3)]"
            >
              <span>Start Project Enquiry</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/free-audit"
              className="font-mono text-xs text-muted hover:text-white transition-colors"
            >
              or claim free diagnostic audit →
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
