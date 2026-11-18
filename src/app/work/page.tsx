import prisma from "@/lib/prisma";
import WorkClient from "./WorkClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Work & Case Studies | NextCurrent Media",
  description: "Audited client outcomes, bespoke Next.js web applications, and high-ROAS performance growth partnerships.",
};

const defaultCaseStudies = [
  {
    id: "cs-nada",
    slug: "nada-yoga-school",
    title: "Nada Yoga School",
    clientName: "Nada Yoga School",
    industry: "Education & Wellness",
    category: "Web Engineering · SEO · SMM · Meta Ads",
    order: 1,
    isFeatured: true,
    heroMetricNumber: "Almost Full",
    heroMetricLabel: "Booked Through Next Year",
    resultsSummary:
      "Handled complete digital growth operations from full WordPress redesign and technical maintenance to daily social media management, SEO content structure, and Meta ads.",
    challenge:
      "Nada Yoga School was lacking in brand presence, suffered from an outdated, slow WordPress website, had inconsistent social media output, and struggled with paid ad performance that failed to yield consistent student enrollments.",
    solution:
      "We completely redesigned their WordPress website for speed and conversion flow, engineered targeted technical and on-page SEO, took over daily social media management, and structured high-converting Meta ad campaigns.",
    deliverables: JSON.stringify([
      "Complete WordPress website total redesign & cleanup",
      "Full marketing management (SEO, SMM, Meta Ads)",
      "Daily social media curation & video hook scripting",
      "Lead qualification & enrollment booking funnel",
    ]),
    metrics: JSON.stringify([
      { label: "Course Bookings", value: "Almost full through next year" },
      { label: "Website Architecture", value: "Complete WordPress redesign" },
      { label: "Marketing Channels", value: "SEO + SMM + Meta Ads managed" },
      { label: "Brand Presence", value: "Established global authority" },
    ]),
    coverImage: "/images/portfolio/nada-yoga-school.png",
    websiteUrl: "https://www.nadyoga.org/",
  },
  {
    id: "cs-valalino",
    slug: "val-alino-coach",
    title: "Val Alino Coach",
    clientName: "Val Alino Coaching",
    industry: "Executive Coaching & Leadership",
    category: "SMM · Branding · Web Advisory",
    order: 2,
    isFeatured: true,
    heroMetricNumber: "High Authority",
    heroMetricLabel: "Unified Executive Presence",
    resultsSummary:
      "Currently managing Val's social media channels, curating high-authority content, and consulting on website visual presentation and personal branding.",
    challenge:
      "Val needed a cohesive executive digital posture across social media and her website to attract corporate leadership clients and build high-authority personal brand equity.",
    solution:
      "We manage Val's social media content engine, curate refined personal brand identity assets, and advise on website user journey and visual aesthetic.",
    deliverables: JSON.stringify([
      "Active social media management & content planning",
      "Executive personal brand identity & visual styling",
      "Website UX & conversion flow consulting",
      "Consultation booking funnel optimization",
    ]),
    metrics: JSON.stringify([
      { label: "Social Media", value: "Active ongoing management" },
      { label: "Personal Branding", value: "Refined executive visual identity" },
      { label: "Website Consulting", value: "UX & brand advisory provided" },
      { label: "Target Audience", value: "Corporate & transformational leaders" },
    ]),
    coverImage: "/images/portfolio/valalino-real.png",
    websiteUrl: "https://www.valalino.com/",
  },
  {
    id: "cs-eazypregnancy",
    slug: "eazy-pregnancy",
    title: "Eazy Pregnancy",
    clientName: "Eazy Pregnancy",
    industry: "Maternal Health & Wellness",
    category: "Copywriting · SEO Articles · Content Strategy",
    order: 3,
    isFeatured: true,
    heroMetricNumber: "Google Ranked",
    heroMetricLabel: "Organic Search Visibility",
    resultsSummary:
      "Worked as a content writer: authored core website copy and high-ranking SEO-rich educational articles to establish organic search discoverability and brand visibility on Google.",
    challenge:
      "Eazy Pregnancy needed empathetic, medically accurate website copywriting and search-rich content to establish credibility and gain organic search visibility on Google.",
    solution:
      "Authored website copy for core landing pages and delivered an ongoing series of comprehensive, medically informed SEO articles targeted at high-intent maternal health search terms.",
    deliverables: JSON.stringify([
      "Complete website copy for primary landing pages",
      "SEO-rich maternal wellness educational articles",
      "Search intent keyword research & heading structure",
      "Organic Google search footprint development",
    ]),
    metrics: JSON.stringify([
      { label: "Role Handled", value: "Content Writer & SEO Copywriter" },
      { label: "Core Deliverable", value: "Website copy & SEO articles" },
      { label: "Organic Reach", value: "Google search visibility established" },
      { label: "Content Quality", value: "Medically informed & search-optimized" },
    ]),
    coverImage: "/images/portfolio/eazypregnancy-real.png",
    websiteUrl: "https://www.eazypregnancy.com/",
  },
  {
    id: "cs-luisaphoto",
    slug: "luisa-photography",
    title: "Luisa Photography",
    clientName: "Luisa Photography",
    industry: "Fine Art & Editorial Photography",
    category: "Web Development · Editorial Portfolio",
    order: 4,
    isFeatured: true,
    heroMetricNumber: "Sub-Second",
    heroMetricLabel: "Image Loading & Fluid UX",
    resultsSummary:
      "Built a bespoke photography portfolio website for Luisa, presenting high-resolution imagery with editorial elegance, sub-second load times, and a minimalist aesthetic.",
    challenge:
      "Standard photography templates were slow, compressed high-resolution images poorly, and failed to convey the refined editorial aesthetic required for commercial and fine art commissions.",
    solution:
      "Engineered a bespoke, minimalist portfolio website featuring adaptive image rendering, fullscreen responsive galleries, and a streamlined private booking inquiry interface.",
    deliverables: JSON.stringify([
      "Custom responsive portfolio web development",
      "High-resolution image optimization & lazy loading",
      "Minimalist editorial typography & layout",
      "Direct client commission inquiry interface",
    ]),
    metrics: JSON.stringify([
      { label: "Web Platform", value: "Bespoke custom portfolio built" },
      { label: "Image Experience", value: "Full-resolution responsive galleries" },
      { label: "Performance", value: "Sub-second visual presentation" },
      { label: "Inquiry Flow", value: "Streamlined commission contact" },
    ]),
    coverImage: "/images/portfolio/luisa-fotografia.png",
    websiteUrl: "https://www.luisaphotography.com/",
  },
  {
    id: "cs-rudraksha",
    slug: "rudraksha-antiquei",
    title: "Rudraksha Antiquei",
    clientName: "Rudraksha Antiquei",
    industry: "Sacred Antiquities & E-Commerce",
    category: "Next.js E-Commerce · Brand Building",
    order: 5,
    isFeatured: true,
    heroMetricNumber: "From Scratch",
    heroMetricLabel: "Complete Storefront & Brand",
    resultsSummary:
      "Built custom Next.js e-commerce website and currently helping them build this luxury sacred antiquities brand completely from scratch.",
    challenge:
      "Launching an authentic spiritual antiquities brand required establishing immediate trust and authenticity, alongside a custom, high-speed e-commerce storefront engineered from zero.",
    solution:
      "Engineered a custom Next.js e-commerce web platform with optimized product catalogs, mobile-first checkout, and currently developing complete brand identity and visual positioning.",
    deliverables: JSON.stringify([
      "Custom Next.js e-commerce storefront development",
      "Ground-up luxury brand identity & positioning",
      "Product catalog architecture & inventory flow",
      "Mobile-optimized checkout & inquiry system",
    ]),
    metrics: JSON.stringify([
      { label: "Web Architecture", value: "Custom Next.js e-commerce built" },
      { label: "Brand Stage", value: "Building brand from scratch" },
      { label: "Platform Status", value: "Live transactional web store" },
      { label: "Ongoing Scope", value: "Brand architecture & optimization" },
    ]),
    coverImage: "/images/portfolio/rudraksha-real.png",
    websiteUrl: "https://www.rudrakshaantiquei.com/",
  },
];

export default async function WorkPage() {
  let caseStudies: any[] = [];
  try {
    caseStudies = await prisma.caseStudy.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Database connection fallback on WorkPage:", error);
  }

  const finalCaseStudies = caseStudies && caseStudies.length > 0 ? caseStudies : defaultCaseStudies;

  return <WorkClient initialCaseStudies={finalCaseStudies} />;
}
