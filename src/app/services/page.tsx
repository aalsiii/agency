import prisma from "@/lib/prisma";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services & Capabilities | NextCurrent Media",
  description: "Performance marketing, conversion-engineered Next.js websites, SEO domination, and viral social media engines.",
};

const defaultServices = [
  {
    id: "s1",
    slug: "seo",
    title: "Search Engine Optimization (SEO)",
    tagline: "Turn high-intent search queries into recurring, organic client pipeline.",
    shortDesc: "Technical architecture, semantic topic clusters, and authoritative backlink graphs engineered for Google top-3 ranking domination.",
    fullDesc: "We build enduring organic moats. Rather than superficial meta tag tweaks, we engineer full-funnel search systems: sub-second Core Web Vitals, entity-based topical authority graphs, programmatic internal linking, and high-converting editorial long-form content.",
    category: "Growth & Marketing",
    priceInr: 65000,
    priceUsd: 1200,
    billingType: "monthly",
    features: JSON.stringify([
      "Core Web Vitals & technical crawl budget optimization",
      "Competitor keyword gap & search intent mapping",
      "High-intent editorial content briefs & publication",
      "Schema.org Json-LD rich snippet architecture",
      "Search Console indexation & ranking telemetry",
    ]),
  },
  {
    id: "s2",
    slug: "social-media-marketing",
    title: "Social Media Marketing (SMM)",
    tagline: "Stop the scroll with high-retention vertical video and executive brand authority.",
    shortDesc: "Complete social media management from pattern-interrupting short-form scripts to daily platform management and community nurture.",
    fullDesc: "Attention is the modern enterprise currency. We engineer and execute complete social media ecosystems across Instagram, LinkedIn, and YouTube. From short-form hook architecture to daily distribution and engagement loops, we turn passive followers into active pipeline.",
    category: "Growth & Marketing",
    priceInr: 55000,
    priceUsd: 1000,
    billingType: "monthly",
    features: JSON.stringify([
      "Pattern-interrupting short-form video hooks & scripts",
      "Executive personal brand positioning & social aesthetic",
      "Daily distribution, scheduling & community nurture",
      "Bio optimization & direct message conversion funnels",
      "Bi-weekly performance & engagement telemetry",
    ]),
  },
  {
    id: "s3",
    slug: "performance-marketing",
    title: "Performance Marketing & Paid Ads",
    tagline: "Disciplined capital allocation focused strictly on blended CAC and booked revenue.",
    shortDesc: "Full-funnel Meta and Google advertising structured around creative volume, algorithmic bidding, and unit economics.",
    fullDesc: "We eliminate ad spend burn. By deploying dynamic creative testing, custom bridge pre-landers, and ruthless attribution tracking, we scale client acquisition profitably without platform fatigue.",
    category: "Growth & Marketing",
    priceInr: 80000,
    priceUsd: 1500,
    billingType: "monthly",
    features: JSON.stringify([
      "Meta Advantage+ & Google Ads campaign architecture",
      "Weekly dynamic creative testing (copy, hooks, angles)",
      "High-converting custom pre-lander landing pages",
      "Server-side Conversions API (CAPI) & pixel telemetry",
      "Blended ROAS, CAC, and lead quality pipeline dashboard",
    ]),
  },
  {
    id: "s4",
    slug: "website-development",
    title: "Custom Next.js Web Development",
    tagline: "Bespoke digital platforms engineered for sub-second speeds and flawless conversion.",
    shortDesc: "Custom web applications engineered with Next.js 16, TypeScript, and modern headless CMS architecture.",
    fullDesc: "Your website is your 24/7 rainmaker. We engineer bespoke, lightning-fast digital experiences that crush bounce rates and convert high-value prospects into booked clients.",
    category: "Digital Experiences",
    priceInr: 120000,
    priceUsd: 2200,
    billingType: "one-time",
    features: JSON.stringify([
      "Custom Next.js 16 App Router & React 19 architecture",
      "Sub-second page latency (95+ Lighthouse Score)",
      "Bespoke interactive funnels & multi-step lead capture",
      "Responsive luxury typography & mobile-first polish",
      "Zero-downtime Vercel / edge deployment pipeline",
    ]),
  },
  {
    id: "s5",
    slug: "wordpress-development",
    title: "WordPress Development & Redesign",
    tagline: "Transform slow, legacy WordPress sites into fast, high-converting platforms.",
    shortDesc: "Complete WordPress overhauls, custom theme engineering, and speed remediation.",
    fullDesc: "Eliminate sluggish themes and broken plugins. We rebuild WordPress sites from the ground up, optimizing database queries, mobile layouts, and conversion flows for maximum student and client enrollment.",
    category: "Digital Experiences",
    priceInr: 90000,
    priceUsd: 1600,
    billingType: "one-time",
    features: JSON.stringify([
      "Complete theme rebuild & custom layout engineering",
      "Database cleanup & plugin bloat elimination",
      "Mobile-first responsive optimization",
      "Automated lead capture & CRM synchronization",
      "Security hardening & daily backup infrastructure",
    ]),
  },
  {
    id: "s6",
    slug: "branding",
    title: "Brand Identity & Visual Architecture",
    tagline: "Define an undeniable, high-authority visual presence that commands premium pricing.",
    shortDesc: "Comprehensive visual systems: typography hierarchy, color tokens, and brand guidelines.",
    fullDesc: "We distill your company essence into an undeniable visual mark. From typography pairings and bespoke color systems to complete brand guidelines and social design kits.",
    category: "Creative & Branding",
    priceInr: 75000,
    priceUsd: 1400,
    billingType: "one-time",
    features: JSON.stringify([
      "Primary & secondary brand marks / logo suite",
      "Editorial typography pairing & scale tokens",
      "Color palette architecture with accessibility standards",
      "Comprehensive digital brand guidelines book",
      "Social media templates & digital asset kit",
    ]),
  },
];

export default async function ServicesPage() {
  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Database connection fallback on ServicesPage:", error);
  }

  const finalServices = dbServices && dbServices.length > 0 ? dbServices : defaultServices;

  return <ServicesClient initialServices={finalServices} />;
}
