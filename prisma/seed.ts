import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding NextCurrent Media database with PRD specification...");

  // 1. Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "bijalwanakshat@gmail.com";
  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "NextCurrentAdmin2026!";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: "Akshat Bijalwan",
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      name: "Akshat Bijalwan",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Global Site Settings
  const defaultSettings = [
    { key: "agency_name", value: "NextCurrent Media", description: "Primary agency brand name" },
    { key: "agency_tagline", value: "Digital growth systems, custom Next.js web applications, and search visibility.", description: "Headline slogan" },
    { key: "contact_email", value: "bijalwanakshat@gmail.com", description: "Public contact email" },
    { key: "admin_notify_email", value: "bijalwanakshat@gmail.com", description: "Admin alert recipient" },
    { key: "whatsapp_number", value: "918057435939", description: "WhatsApp contact number with country code" },
    { key: "phone_display", value: "+91 80574 35939", description: "Display phone number" },
    { key: "office_address", value: "Rishikesh / Dehradun, Uttarakhand, India & Operating Worldwide", description: "Physical location" },
    { key: "announcement_bar", value: "Q2 Growth Cohort Open: Claim Your Free Growth & Funnel Audit Today", description: "Top banner message" },
    { key: "show_announcement", value: "true", description: "Toggle announcement banner" },
  ];

  for (const s of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
  console.log("✅ Site settings seeded.");

  // 3. Core Services organized across 4 PRD Categories
  const servicesData = [
    // Category 1: Growth & Marketing
    {
      slug: "seo",
      title: "Search Engine Optimization (SEO)",
      tagline: "Topical authority clusters, technical audits, and #1 Google rankings.",
      shortDesc: "Outrank competitors for high-intent keywords that bring pre-qualified buyers straight to your website.",
      fullDesc: "We engineer sustainable organic search visibility through semantic keyword clustering, programmatic architecture, and high-quality editorial link acquisitions. No black-hat shortcuts, only crawlable search architectures that compound over time.",
      category: "Growth & Marketing",
      icon: "Search",
      priceInr: 22000,
      priceUsd: 799,
      billingType: "monthly",
      badge: "High Intent",
      idealFor: "B2B firms, local clinics, SaaS, and e-commerce stores wanting recurring organic leads without ongoing ad fees.",
      order: 1,
      features: JSON.stringify([
        "Complete technical Core Web Vitals audit and indexing fixes",
        "Topical authority keyword map with search intent prioritization",
        "4 monthly technical & strategic editorial content pieces",
        "Schema markup integration (FAQ, LocalBusiness, Breadcrumbs)",
        "Competitor gap analysis and backlink acquisition",
        "Monthly rankings & search console impressions dashboard",
      ]),
      problems: JSON.stringify([
        "Website buried on page 3 of Google for core commercial queries",
        "Heavy reliance on paid ads that stop delivering the moment budget pauses",
        "Poor Core Web Vitals and slow mobile indexing causing search penalties",
      ]),
      methodology: JSON.stringify([
        "Technical & Indexing Audit: Repair crawl errors, canonical duplicates, and slow TTFB",
        "Commercial Keyword Clustering: Identify queries with immediate commercial search intent",
        "On-Page Optimization: Implement structured schema, semantic headers, and internal linking",
        "Authority Acquisition: Build defensible domain rating through vetted industry references",
      ]),
      benefits: JSON.stringify([
        "Permanent inbound pipeline that does not shut off when ad budgets pause",
        "Higher trust and conversion rates from organic search visitors",
        "Lower blended customer acquisition cost (CAC) across all channels",
      ]),
      deliverables: JSON.stringify([
        "Comprehensive Technical Health & Speed Audit Report",
        "Targeted Keyword Master Sheet & Intent Map",
        "4 In-Depth Optimized Articles / Month",
        "Bi-Weekly Search Console & Organic Lead Attribution Summary",
      ]),
      faqs: JSON.stringify([
        {
          question: "How long does it take to see tangible ranking movements?",
          answer: "Initial technical and local fixes usually show indexing movement within 3 to 6 weeks. Competitive commercial keywords generally establish top-ranking positions in 3 to 6 months of disciplined publishing.",
        },
        {
          question: "Do you use AI-generated content for SEO?",
          answer: "Never for unedited publication. We research industry pain points and write technically accurate, authoritative content that provides real insight for human buyers and passes Google quality standards.",
        },
      ]),
    },
    {
      slug: "social-media-marketing",
      title: "Social Media Marketing (SMM)",
      tagline: "Short-form video architectures and organic distribution that builds loyal brand equity.",
      shortDesc: "Stop posting generic Canva graphics. We script, edit, and distribute short-form video reels that stop scrolling thumbs.",
      fullDesc: "Modern social media demands high-retention video storytelling and sharp narrative positioning. We manage your content engine end-to-end: trend forecasting, scripted hooks, motion graphics, and direct engagement funnels that guide viewers into qualified conversations.",
      category: "Growth & Marketing",
      icon: "Share2",
      priceInr: 18000,
      priceUsd: 649,
      billingType: "monthly",
      badge: "High Engagement",
      idealFor: "Founders, consumer brands, creators, and service businesses wanting an omnipresent social presence.",
      order: 2,
      features: JSON.stringify([
        "12 to 16 high-retention Reels / TikToks per month",
        "Scriptwriting with psychological pattern-interrupt hooks",
        "Pro color grading, sound design, and kinetic typography",
        "Automated DM keyword comment triggers (ManyChat integration)",
        "Monthly performance review and audience growth reporting",
      ]),
      problems: JSON.stringify([
        "Stagnant follower growth and low engagement on static posts",
        "No structured workflow to script, film, and edit content consistently",
        "Followers failing to convert into actual paying clients or leads",
      ]),
      methodology: JSON.stringify([
        "Audience Psychological Profiling: Uncover the exact questions and doubts of your dream buyers",
        "Hook Testing & Production: Batch script high-retention hooks and edit with dynamic typography",
        "Frictionless Conversion: Connect comment keywords to automated DM resources and booking links",
        "Iterative Refinement: Analyze 3-second hook retention and double down on winning formats",
      ]),
      benefits: JSON.stringify([
        "Predictable weekly content calendar without founder burnout",
        "Strong brand resonance that turns passive viewers into passionate advocates",
        "Direct inbound lead inquiries generated straight from social comments",
      ]),
      deliverables: JSON.stringify([
        "Monthly 16-Video Script Bank & Hook Formulas",
        "Fully Edited, Colored, and Sound-Designed Video Assets",
        "Automated DM Lead Generation Workflow",
        "Monthly Audience Retention & Growth Analytics",
      ]),
      faqs: JSON.stringify([
        {
          question: "Do I have to appear on camera?",
          answer: "Founder-led videos consistently drive the highest conversion, but we also create faceless b-roll edits, motion graphic explanations, and customer interview formats.",
        },
      ]),
    },
    {
      slug: "performance-marketing",
      title: "Performance Marketing & Paid Ads",
      tagline: "High-ROAS Meta and Google ads engineered around unit economics and qualified calls.",
      shortDesc: "Stop burning ad budget. We build full-funnel paid campaigns with custom creative angles, precise testing, and conversion attribution.",
      fullDesc: "We take full ownership of your ad spend across Meta (Instagram/Facebook) and Google Ads (Search, YouTube, Performance Max). From direct-response copywriting and motion ads to custom landing pages and server-side Conversions API setups, every rupee and dollar spent is tracked against pipeline return.",
      category: "Growth & Marketing",
      icon: "Target",
      priceInr: 25000,
      priceUsd: 899,
      billingType: "monthly",
      badge: "Highest ROI",
      idealFor: "Brands spending ₹50k to ₹5L/month ($1k to $10k/mo) demanding predictable customer acquisition.",
      order: 3,
      features: JSON.stringify([
        "Full-funnel campaign architecture (Top, Mid, Bottom of Funnel)",
        "Weekly direct-response creative angles (hooks, statics, UGC scripts)",
        "Meta Conversions API & GA4 Server-Side tracking",
        "Retargeting and custom lookalike audience segmentation",
        "Bi-weekly performance breakdown and unit economics dashboard",
        "Direct Slack / WhatsApp channel with lead media buyer",
      ]),
      problems: JSON.stringify([
        "High customer acquisition cost (CAC) eating up profit margins",
        "Ad creative fatigue exhausting audiences within 7 to 10 days",
        "Inaccurate conversion tracking causing wasted spend on poor audiences",
      ]),
      methodology: JSON.stringify([
        "Unit Economics Review: Determine allowable CAC and target blended ROAS",
        "Creative Sprint: Produce 6 distinct angles targeting different emotional buying triggers",
        "Rapid Audience Testing: Isolate winning creatives in controlled CBO scaling campaigns",
        "Conversion Optimization: Route traffic to dedicated Next.js landing pages for maximum conversion",
      ]),
      benefits: JSON.stringify([
        "Scalable client acquisition pipeline with predictable returns",
        "Zero guesswork: you know exactly how many calls or sales each campaign generates",
        "Continuous fresh creative assets preventing ad fatigue",
      ]),
      deliverables: JSON.stringify([
        "Configured Ad Accounts with Server-Side Tracking",
        "Weekly Batch of 4-6 Tested Creative Assets",
        "Dedicated Campaign Scaling Roadmap",
        "Live Pipeline ROI & CAC Dashboard",
      ]),
      faqs: JSON.stringify([
        {
          question: "What is your recommended minimum ad spend?",
          answer: "We recommend a minimum monthly media budget of ₹40,000 ($600 USD) to give the ad algorithms sufficient data to optimize effectively.",
        },
      ]),
    },

    // Category 2: Digital Experiences
    {
      slug: "website-development",
      title: "Custom Next.js Website Development",
      tagline: "Sub-second load times, bespoke aesthetics, and high-conversion architectures.",
      shortDesc: "Ditch bloated templates. We engineer bespoke, lightning-fast web applications designed to turn visitors into booked clients.",
      fullDesc: "Your website is your best salesperson. We design and build high-performance web experiences using Next.js App Router, React 19, Tailwind CSS, and headless database backends. Engineered with sub-400ms Core Web Vitals, seamless lead capture funnels, and integrated admin portals.",
      category: "Digital Experiences",
      icon: "Globe",
      priceInr: 44999,
      priceUsd: 1599,
      billingType: "one-time",
      badge: "Most Popular",
      idealFor: "Modern brands, startups, agencies, and clinics demanding an authoritative online presence.",
      order: 4,
      features: JSON.stringify([
        "Bespoke UI/UX design with architectural dark/light luxury styling",
        "Next.js App Router with Server-Side Rendering (SSR) & 99+ mobile score",
        "Integrated Lead CRM, Calendar booking, and WhatsApp flows",
        "Fully managed Admin CMS to edit copy, case studies, and blog posts",
        "On-page technical SEO, structured JSON-LD schema & OpenGraph cards",
        "30 days post-launch warranty and conversion monitoring",
      ]),
      problems: JSON.stringify([
        "Slow load speeds on mobile viewports causing 40%+ visitor drop-off",
        "Rigid templates that look identical to every competitor in the market",
        "Difficult-to-update systems requiring a developer for every tiny text change",
      ]),
      methodology: JSON.stringify([
        "Information Architecture & Wireframing: Define the conversion path and page flow",
        "Design System & Art Direction: Tailor typography, color contrast, and interactive feedback",
        "Next.js Full-Stack Engineering: Build clean modular React components with instant response times",
        "CMS Integration & QA: Connect local/cloud database, configure admin tools, and deploy",
      ]),
      benefits: JSON.stringify([
        "Sub-second load times that keep visitors engaged and raise Google search rankings",
        "Custom administrative dashboard giving your team full control without developer fees",
        "High-conversion multi-step lead forms that filter and qualify inbound enquiries",
      ]),
      deliverables: JSON.stringify([
        "Complete Next.js Source Code & Deployed Production URL",
        "Executive Admin Panel with Lead CRM & Content Manager",
        "Full Technical SEO Audit & Core Web Vitals Scorecard",
        "Training Video & 30-Day Post-Launch Support",
      ]),
      faqs: JSON.stringify([
        {
          question: "Can our internal team edit website copy and images easily?",
          answer: "Yes. Every build includes a secure internal admin dashboard allowing you to add, edit, or publish services, case studies, and articles without touching any code.",
        },
      ]),
    },
    {
      slug: "wordpress-development",
      title: "WordPress & Headless CMS Engineering",
      tagline: "Custom block-theme architectures, WooCommerce setups, and clean code.",
      shortDesc: "Clean, secure, and fast WordPress platforms engineered without bloated page-builders.",
      fullDesc: "When your business requires the editorial maturity of WordPress, we deliver lean, custom block-theme architectures with clean code, bulletproof security, and fast caching. No 40-plugin nightmares, only reliable enterprise CMS installations.",
      category: "Digital Experiences",
      icon: "Layers",
      priceInr: 32000,
      priceUsd: 1199,
      billingType: "one-time",
      badge: "Enterprise CMS",
      idealFor: "Publishers, WooCommerce stores, and legacy businesses requiring familiar WordPress editorial workflows.",
      order: 5,
      features: JSON.stringify([
        "Custom lightweight Gutenberg blocks tailored to your design system",
        "WooCommerce shopping & payment gateway integration (Stripe, Razorpay)",
        "Advanced caching layer (Redis, Cloudflare edge optimization)",
        "Granular user roles and editorial permissions",
        "Automated daily backups and enterprise security hardening",
      ]),
      problems: JSON.stringify([
        "Bloated page-builder themes that take 5+ seconds to load",
        "Frequent plugin conflicts and security vulnerabilities",
        "Slow checkout flows causing cart abandonment",
      ]),
      methodology: JSON.stringify([
        "Plugin Audit & Cleanup: Strip unnecessary dependencies and isolate database bottlenecks",
        "Custom Block Development: Build clean, native blocks matching your brand identity",
        "Speed & Security Optimization: Configure object caching, WebP delivery, and firewalls",
        "Staging & Seamless Launch: Test on staging environment before zero-downtime migration",
      ]),
      benefits: JSON.stringify([
        "Familiar WordPress interface paired with modern web speed",
        "Reduced security risks and zero plugin-breaking updates",
        "Streamlined editorial workflow for publishing teams",
      ]),
      deliverables: JSON.stringify([
        "Custom Clean WordPress Theme",
        "Hardened Security & Backup Configuration",
        "WooCommerce Payment & Tax Integration",
        "Editorial Documentation & Walkthrough",
      ]),
      faqs: JSON.stringify([
        {
          question: "Can you migrate our existing WordPress content safely?",
          answer: "Yes. We migrate your complete blog history, media library, and customer database with full 301 redirect mappings to protect your existing search rankings.",
        },
      ]),
    },
    {
      slug: "nextjs-development",
      title: "Next.js Application Architecture",
      tagline: "Full-stack SaaS MVPs, client portals, and interactive digital products.",
      shortDesc: "Scalable web applications built with TypeScript, Prisma, and modern serverless architectures.",
      fullDesc: "For products requiring complex state, authenticated client portals, or dynamic interactive tools, we engineer robust Next.js full-stack applications. Backed by relational databases, type-safe API route handlers, and performant user interfaces.",
      category: "Digital Experiences",
      icon: "Code",
      priceInr: 59999,
      priceUsd: 2199,
      billingType: "one-time",
      badge: "Full-Stack",
      idealFor: "Startups, tech-enabled services, and businesses launching private portals or custom SaaS MVPs.",
      order: 6,
      features: JSON.stringify([
        "Full-stack Next.js App Router with React Server Components",
        "Prisma ORM with SQLite or PostgreSQL database models",
        "Secure session authentication (JWT or OAuth)",
        "Type-safe REST and Server Action APIs with Zod validation",
        "Responsive administrative panels and customer dashboards",
        "Automated CI/CD deployment pipelines on Vercel or cloud VPS",
      ]),
      problems: JSON.stringify([
        "Off-the-shelf software failing to match your custom business logic",
        "Fragile no-code prototypes breaking under real-world usage",
        "Expensive enterprise SaaS subscriptions with bloated feature sets",
      ]),
      methodology: JSON.stringify([
        "Domain Data Modeling: Design clean relational database schemas and access rules",
        "API Architecture: Build resilient, validated server endpoints and auth sessions",
        "Frontend Integration: Craft intuitive UI with real-time feedback and state management",
        "Stress Testing & Deployment: Verify edge cases, validate security, and ship",
      ]),
      benefits: JSON.stringify([
        "Proprietary software asset fully owned by your company",
        "Near-zero hosting costs compared to bloated enterprise seats",
        "Infinite scalability as your business processes expand",
      ]),
      deliverables: JSON.stringify([
        "Complete Type-Safe Source Code in Git Repository",
        "Configured Database with Migration History",
        "Interactive User & Admin Dashboards",
        "Technical Documentation & API Specification",
      ]),
      faqs: JSON.stringify([
        {
          question: "Do we own the full source code and intellectual property?",
          answer: "100%. Upon completion, full source code and deployment ownership are transferred directly to your organization.",
        },
      ]),
    },
    {
      slug: "website-redesign",
      title: "High-Velocity Website Redesign",
      tagline: "Modernize your outdated digital presence and lift conversion rates by 50%+.",
      shortDesc: "Transform an aging, slow website into a modern conversion powerhouse without losing SEO equity.",
      fullDesc: "If your current site looks dated, fails on mobile, or isn't generating qualified inquiries, our redesign sprint overhauls your layout, messaging, and visual posture. We preserve your existing search rankings while dramatically elevating your conversion rate.",
      category: "Digital Experiences",
      icon: "Sparkles",
      priceInr: 38000,
      priceUsd: 1399,
      billingType: "one-time",
      badge: "Quick Turnaround",
      idealFor: "Established brands looking to reposition, raise prices, and modernize their digital front door.",
      order: 7,
      features: JSON.stringify([
        "Comprehensive heuristic UX and conversion teardown of your current site",
        "Modern architectural visual identity, typography, and contrast upgrade",
        "Complete 301 URL redirect mapping to protect Google rankings",
        "Interactive multi-step lead capture forms",
        "Sub-second mobile optimization and Core Web Vitals pass",
      ]),
      problems: JSON.stringify([
        "Outdated visual design that undermines premium pricing",
        "High mobile bounce rate due to clunky navigation and slow load times",
        "Fear of losing hard-won Google rankings during a site redesign",
      ]),
      methodology: JSON.stringify([
        "Conversion Tear-Down: Identify drop-off points in your existing visitor journey",
        "SEO Preservation Blueprint: Catalog every live URL and prepare redirect mappings",
        "Design & Copy Modernization: Re-write hero headlines and craft sharp visuals",
        "Staged Deployment: Launch with zero downtime and verify post-launch indexing",
      ]),
      benefits: JSON.stringify([
        "Instant lift in perceived brand value and buyer trust",
        "Preserved search rankings with improved mobile crawlability",
        "Significantly higher lead-to-consultation conversion rate",
      ]),
      deliverables: JSON.stringify([
        "Redesigned Production Platform",
        "Verified 301 Redirect Mapping Document",
        "Before / After Speed & Conversion Scorecard",
        "Lead Management System Integration",
      ]),
      faqs: JSON.stringify([
        {
          question: "Will our Google rankings drop during the redesign?",
          answer: "No. We implement meticulous URL redirect mappings and maintain semantic schema markup to ensure search engines preserve your authority and indexing.",
        },
      ]),
    },

    // Category 3: Creative & Branding
    {
      slug: "branding",
      title: "Brand Identity & Positioning",
      tagline: "Distinctive visual systems, brand guidelines, and commanding typography.",
      shortDesc: "Move past generic logos. We craft cohesive brand guidelines, color palettes, and typographic hierarchies.",
      fullDesc: "A powerful brand creates instant authority and justifies premium pricing. We build comprehensive visual identity systems: wordmarks, color systems, typography pairings, collateral guidelines, and digital brand voice rules that make your business instantly recognizable.",
      category: "Creative & Branding",
      icon: "PenTool",
      priceInr: 28000,
      priceUsd: 999,
      billingType: "one-time",
      badge: "Foundational",
      idealFor: "New ventures establishing their market presence or existing businesses repositioning upmarket.",
      order: 8,
      features: JSON.stringify([
        "Primary brand wordmark, monogram, and favicon package",
        "Architectural typography pairing (display serif + workhorse sans)",
        "Comprehensive color palette with contrast tokens for web accessibility",
        "Comprehensive 30+ page Brand Identity & Guidelines PDF",
        "Social media avatar templates, cover banners, and presentation slide deck",
      ]),
      problems: JSON.stringify([
        "Inconsistent visuals across social, web, and pitch decks",
        "Looking like a commodity rather than the premium choice in your category",
        "Lack of clear typography and color rules for internal team members",
      ]),
      methodology: JSON.stringify([
        "Strategic Discovery: Unpack your company's unique value, market posture, and competitors",
        "Concept Exploration: Present 2 distinct artistic directions grounded in market contrast",
        "System Refinement: Polish typography, spatial relationships, and digital guidelines",
        "Asset Packaging: Deliver production-ready SVGs, web fonts, and slide templates",
      ]),
      benefits: JSON.stringify([
        "Immediate credibility that enables higher price points",
        "Unified visual presentation across every client touchpoint",
        "Reusable design tokens and templates saving hours of creative time",
      ]),
      deliverables: JSON.stringify([
        "Full Vector Logo Suite (SVG, EPS, PNG, PDF)",
        "Complete Brand Guidelines & Typography Rulebook",
        "Ready-to-Use Presentation & Social Media Kit",
        "Design Tokens for Web Implementation",
      ]),
      faqs: JSON.stringify([
        {
          question: "What files do we receive upon project sign-off?",
          answer: "You receive high-resolution vector assets (SVG, EPS), web-optimized PNGs, dark and light lockups, typography licenses, and a comprehensive Brand Guidelines PDF.",
        },
      ]),
    },
    {
      slug: "content-production",
      title: "Content Production & Video Editing",
      tagline: "High-retention video editing, ad creatives, and multi-platform media pipelines.",
      shortDesc: "Transform raw footage into dynamic, hook-driven video assets engineered for maximum retention.",
      fullDesc: "Attention is the currency of the modern web. Our video production team turns your raw recordings, founder talks, and product demos into high-retention social assets, podcast snippets, and high-converting video sales letters (VSLs).",
      category: "Creative & Branding",
      icon: "Video",
      priceInr: 20000,
      priceUsd: 749,
      billingType: "monthly",
      badge: "Retention Driven",
      idealFor: "Podcasters, personal brands, founders, and e-commerce companies wanting continuous video output.",
      order: 9,
      features: JSON.stringify([
        "Up to 20 edited short-form videos (Reels, Shorts, TikTok) per month",
        "Kinetic typography, sound design, sound effects, and color grading",
        "Pattern interrupt visual hooks and pacing optimization",
        "1 long-form YouTube or Podcast episode cut per month",
        "Dedicated cloud drive folder with raw and master exports",
      ]),
      problems: JSON.stringify([
        "Raw footage sitting on hard drives without being edited or published",
        "Low viewer retention in the crucial first 3 seconds of video playback",
        "Inconsistent editing quality confusing audience expectations",
      ]),
      methodology: JSON.stringify([
        "Hook Optimization: Craft engaging 3-second opening visual hooks",
        "Pacing & Storyboard: Edit out pauses, add seamless cutaways, and synchronize sound",
        "Dynamic Captions: Add high-contrast typography styled for mobile viewing",
        "Export & Archive: Render in 4K resolution formatted for all major platforms",
      ]),
      benefits: JSON.stringify([
        "High average view duration and algorithmic distribution",
        "Reliable publishing schedule without spending nights editing",
        "Repurposing 1 recording session into weeks of multi-channel content",
      ]),
      deliverables: JSON.stringify([
        "20 Polished Short-Form Video Assets / Month",
        "Thumbnail & Cover Image Pack",
        "Clean Audio Stems & Closed Captions (.SRT files)",
        "Bi-Weekly Video Performance Review",
      ]),
      faqs: JSON.stringify([
        {
          question: "How do we send our raw recordings to your team?",
          answer: "You simply drop your raw files into a shared Google Drive or Dropbox folder. Our team edits and returns review links within 48 to 72 hours.",
        },
      ]),
    },

    // Category 4: Strategy & Consulting
    {
      slug: "digital-strategy",
      title: "Digital Strategy & Growth Consulting",
      tagline: "Full-funnel audits, unit economics modeling, and fractional CMO advisory.",
      shortDesc: "Stop guessing your next move. We diagnose growth bottlenecks and build clear, step-by-step roadmaps to scale revenue.",
      fullDesc: "Scale requires clear strategy before creative execution. We work directly with executive leadership to audit your acquisition channels, customer lifetime value, funnel drop-offs, and pricing structures. You receive an actionable growth roadmap with bi-weekly advisory sessions.",
      category: "Strategy & Consulting",
      icon: "Compass",
      priceInr: 35000,
      priceUsd: 1299,
      billingType: "monthly",
      badge: "Executive Advisory",
      idealFor: "Founders scaling past ₹10L/mo ($15k/mo) needing strategic clarity and execution oversight.",
      order: 10,
      features: JSON.stringify([
        "Bi-weekly 60-minute executive strategy sessions with lead partner",
        "Full-funnel audit covering ads, email flows, and website analytics",
        "Unit economics and customer acquisition cost (CAC) financial model",
        "Direct Slack channel access for quick feedback on copy and campaigns",
        "Quarterly growth roadmap and prioritization matrix",
      ]),
      problems: JSON.stringify([
        "Growth plateaued despite increasing operational workload",
        "Conflicting advice from junior marketing agencies with no commercial context",
        "Lack of unified metrics connecting marketing spend to actual bottom-line profit",
      ]),
      methodology: JSON.stringify([
        "Diagnostic Deep Dive: Unpack revenue models, cohort retention, and margin structures",
        "Bottleneck Identification: Pinpoint the single biggest constraint in your customer acquisition",
        "Strategy Roadmap: Draft a prioritized 90-day plan focused purely on high-leverage moves",
        "Weekly Accountability: Oversee execution and review weekly performance metrics",
      ]),
      benefits: JSON.stringify([
        "Strategic clarity without the overhead of a full-time executive salary",
        "Avoidance of costly marketing mistakes and wasteful campaign experiments",
        "Accelerated decision-making backed by proven industry frameworks",
      ]),
      deliverables: JSON.stringify([
        "Full Comprehensive Growth & Funnel Audit Dossier",
        "Custom Financial Unit Economics Spreadsheet Model",
        "90-Day Step-by-Step Strategic Action Roadmap",
        "Bi-Weekly Strategic Advisory Session Recordings & Action Notes",
      ]),
      faqs: JSON.stringify([
        {
          question: "How is this different from your performance marketing service?",
          answer: "Performance marketing is hands-on ad management. Digital Strategy is executive-level advisory overseeing your complete business flywheel: pricing, unit economics, conversion funnels, and team execution.",
        },
      ]),
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✅ ${servicesData.length} PRD services seeded across 4 categories.`);

  // 4. Real-World Case Studies for /work and /work/[slug] (No fake results; grounded in verified scope)
  const caseStudiesData = [
    {
      slug: "nada-yoga-school",
      title: "End-to-End Marketing Management, Complete WordPress Redesign & Growth Engine for Nada Yoga School",
      clientName: "Nada Yoga School",
      industry: "Education & Wellness",
      category: "Growth & Marketing",
      heroMetricNumber: "Booked Full",
      heroMetricLabel: "Student Cohorts Booked Full Through Next Year",
      challenge: "Nada Yoga School was struggling to enrol students. Their digital foundation was held back by an aging, slow WordPress website, inconsistent social media publishing, weak brand visibility, and underperforming paid advertising campaigns that failed to deliver steady student inquiries.",
      strategy: "Take ownership of their complete digital ecosystem: redesign their entire WordPress website from the ground up for high international student conversion, optimize technical and on-page SEO for foundational yoga keywords, establish a disciplined social media posting cadence, and manage targeted Meta ad campaigns to reliably reach international seekers and yoga students.",
      execution: "Completely redesigned and rebuilt the WordPress platform with clean mobile navigation, structured course schedules, and clear enrollment paths. Established continuous ongoing website maintenance and speed optimization. Handled end-to-end social media publishing and reels, and managed targeted Meta ad campaigns to fill upcoming course cohorts.",
      solution: "Complete WordPress website redesign, ongoing site maintenance, search engine optimization, full social media management, and Meta ad campaign management.",
      resultsSummary: "Overhauled the school's online presence, turning an inconsistent enrollment flow into a predictable admissions pipeline. As a direct result, Nada Yoga School is now almost completely booked with students through the upcoming year.",
      metrics: JSON.stringify([
        { label: "Enrollment Status", value: "Almost Full Through Next Year" },
        { label: "Website Overhaul", value: "Complete WordPress Redesign" },
        { label: "Operational Scope", value: "SEO, Social Media & Meta Ads" },
        { label: "Site Reliability", value: "Ongoing Maintenance & Support" },
      ]),
      deliverables: JSON.stringify([
        "Complete WordPress Website Redesign",
        "Ongoing Website Maintenance & Updates",
        "Search Engine Optimization (SEO)",
        "Social Media Management & Creative Curation",
        "Meta Advertising Management & Lead Funnels",
      ]),
      technologies: JSON.stringify(["WordPress", "PHP", "Technical SEO", "Meta Ads Manager", "Google Analytics", "Social Media Pipeline"]),
      websiteUrl: "https://www.nadyoga.org/",
      coverImage: "/images/portfolio/nada-yoga-school.png",
      galleryImages: JSON.stringify([
        "/images/portfolio/nada-gallery-1.png",
        "/images/portfolio/nada-gallery-2.png",
        "/images/portfolio/nada-gallery-3.png"
      ]),
      testimonialQuote: "We were not getting a lot of students, our website was very old, social media was inconsistent, and paid marketing was not performing. NextCurrent took over our complete marketing management—redesigned our entire WordPress website, managed our SEO, social media, and Meta ads. Today, we are almost full till next year.",
      testimonialAuthor: "Nada Yoga School Leadership",
      testimonialRole: "Director, Nada Yoga School",
      isFeatured: true,
      order: 1,
    },
    {
      slug: "val-alino-coach",
      title: "Personal Brand Elevation, Ongoing Social Media Management & Web Consulting for Val Alino",
      clientName: "Val Alino Coaching",
      industry: "Executive Coaching & Leadership",
      category: "Creative & Branding",
      heroMetricNumber: "Active Retainer",
      heroMetricLabel: "Social Media, Website & Brand Management",
      challenge: "Val needed dedicated social media management, a cohesive personal brand identity, and website alignment to accurately reflect her transformational and executive coaching methodology.",
      strategy: "Establish an active, consistent social media presence, unify her visual brand guidelines across all public touchpoints, and optimize her website journey so prospective clients can easily learn about her programs and book coaching consultations.",
      execution: "Currently managing Val's social media channels, curating thought-leadership content and video hooks, aligning her visual branding, and providing ongoing website maintenance and guidance.",
      solution: "Ongoing social media management, personal branding, and website optimization.",
      resultsSummary: "Built an active, consistent social media presence and cohesive personal brand identity that elevates Val's authority and streamlines how clients discover her coaching programs.",
      metrics: JSON.stringify([
        { label: "Engagement Type", value: "Active Ongoing Management" },
        { label: "Scope of Work", value: "Social Media, Website & Branding" },
        { label: "Channel Cadence", value: "Consistent Active Publishing" },
        { label: "Brand Posture", value: "Executive & Life Coaching" },
      ]),
      deliverables: JSON.stringify([
        "Ongoing Social Media Management",
        "Personal Brand Identity & Guidelines",
        "Website Consulting & User Journey Optimization",
        "Content Strategy & Thought Leadership Curation",
      ]),
      technologies: JSON.stringify(["Social Media Management", "Brand Strategy", "Web Optimization", "Content Direction"]),
      websiteUrl: "https://www.valalino.com/",
      coverImage: "/images/portfolio/valalino-real.png",
      galleryImages: JSON.stringify([
        "/images/portfolio/valalino-real.png"
      ]),
      testimonialQuote: "NextCurrent currently handles my social media, and helps me with my website and branding. Having a dependable partner manage my digital presence allows me to focus fully on coaching my clients.",
      testimonialAuthor: "Val Alino",
      testimonialRole: "Executive & Life Coach",
      isFeatured: true,
      order: 2,
    },
    {
      slug: "eazy-pregnancy",
      title: "Maternal Website Copywriting & SEO-Rich Article Production for Eazy Pregnancy",
      clientName: "Eazy Pregnancy",
      industry: "Maternal Healthcare & Wellness",
      category: "Growth & Marketing",
      heroMetricNumber: "Organic SEO",
      heroMetricLabel: "Google Search Visibility & Website Copy",
      challenge: "Eazy Pregnancy needed authentic, medically sensitive website copy along with high-value SEO content to build trust with expecting mothers and establish organic visibility on Google.",
      strategy: "Craft compassionate, reassuring website copy that speaks directly to the needs of expecting parents, paired with comprehensive, SEO-rich informative articles structured around high-intent maternal queries.",
      execution: "Worked as content writer authoring full website copy across core pages, and researched, structured, and wrote in-depth SEO-rich articles designed to rank organically in Google search.",
      solution: "High-intent website copywriting and SEO-rich article production for Google brand visibility.",
      resultsSummary: "Established strong organic brand visibility on Google through educational, SEO-rich articles while delivering empathetic website copy that communicates maternal care and instills confidence.",
      metrics: JSON.stringify([
        { label: "Role", value: "Content Writer & SEO Strategist" },
        { label: "Core Deliverable", value: "Full Website Copy & SEO Articles" },
        { label: "Primary Objective", value: "Google Search Visibility" },
        { label: "Niche", value: "Maternal Healthcare & Wellness" },
      ]),
      deliverables: JSON.stringify([
        "Complete Website Copywriting",
        "SEO-Rich Informational Articles for Google",
        "Keyword Research & Search Intent Structure",
        "Empathetic Brand Tone of Voice",
      ]),
      technologies: JSON.stringify(["SEO Copywriting", "Keyword Research", "Google Search Optimization", "Content Strategy"]),
      websiteUrl: "https://www.eazypregnancy.com/",
      coverImage: "/images/portfolio/eazypregnancy-real.png",
      galleryImages: JSON.stringify([
        "/images/portfolio/eazypregnancy.png",
        "/images/portfolio/eazypregnancy-real.png"
      ]),
      testimonialQuote: "The website copy and SEO-rich articles crafted for our platform gave us the organic brand visibility on Google we needed, while maintaining the warm, trusted tone that expecting mothers rely on.",
      testimonialAuthor: "Eazy Pregnancy Team",
      testimonialRole: "Editorial Lead, Eazy Pregnancy",
      isFeatured: true,
      order: 3,
    },
    {
      slug: "luisa-photography",
      title: "Bespoke Portfolio Website Design & Development for Luisa Photography",
      clientName: "Luisa Photography",
      industry: "Creative Arts & Photography",
      category: "Digital Experiences",
      heroMetricNumber: "Custom Build",
      heroMetricLabel: "Bespoke Portfolio Website for Photography",
      challenge: "Luisa needed a bespoke portfolio website that could display her photography in uncompromised high resolution without the clunkiness, generic templates, or slow loading times of off-the-shelf site builders.",
      strategy: "Design and build a custom, minimalist photography portfolio where generous whitespace, refined typography, and high-performance image rendering allow her photographs to take center stage.",
      execution: "Engineered a custom portfolio website tailored specifically for Luisa's photography work, featuring smooth image rendering, curated project galleries, and a direct inquiry contact channel.",
      solution: "Bespoke portfolio website development and optimized photography showcase.",
      resultsSummary: "Delivered a custom, elegant portfolio website that showcases Luisa's photography with pristine visual clarity and provides an effortless booking inquiry point for clients.",
      metrics: JSON.stringify([
        { label: "Project Scope", value: "Custom Portfolio Website Development" },
        { label: "Client", value: "Luisa (Photographer)" },
        { label: "Design Approach", value: "Bespoke Minimalist Layout" },
        { label: "Core Feature", value: "High-Resolution Image Presentation" },
      ]),
      deliverables: JSON.stringify([
        "Custom Portfolio Website Design & Development",
        "High-Fidelity Responsive Image Showcase",
        "Curated Photography Series Galleries",
        "Direct Client Inquiry Interface",
      ]),
      technologies: JSON.stringify(["Custom Web Engineering", "Tailwind CSS", "JavaScript", "Responsive Image Engine"]),
      websiteUrl: "https://www.luisaphotography.com/",
      coverImage: "/images/portfolio/luisa-fotografia.png",
      galleryImages: JSON.stringify([
        "/images/portfolio/luisa-gallery-1.png",
        "/images/portfolio/luisa-gallery-2.png",
        "/images/portfolio/luisa-gallery-3.png"
      ]),
      testimonialQuote: "Built a stunning, bespoke portfolio website for my photography. It is clean, fast, and represents my work with the artistic polish it deserves.",
      testimonialAuthor: "Luisa",
      testimonialRole: "Photographer",
      isFeatured: true,
      order: 4,
    },
    {
      slug: "rudraksha-antiquei",
      title: "Custom Next.js E-Commerce Website & 0-to-1 Brand Creation for Rudraksha Antiquei",
      clientName: "Rudraksha Antiquei",
      industry: "E-Commerce & Spiritual Luxury",
      category: "Digital Experiences",
      heroMetricNumber: "0 to 1 Build",
      heroMetricLabel: "Custom Next.js E-Commerce & Brand Creation",
      challenge: "Launching a digital brand for sacred, authentic antique spiritual artifacts from scratch required establishing immediate trust, reverence, luxury posture, and a modern, secure e-commerce platform.",
      strategy: "Build the brand identity from the ground up, establish high-trust visual guidelines, and engineer a custom Next.js e-commerce storefront tailored for sacred artifact exploration, certification verification, and seamless buyer inquiry.",
      execution: "Built the custom Next.js e-commerce website from scratch and currently providing ongoing brand building and digital platform support.",
      solution: "Custom Next.js e-commerce website development and ground-up brand creation.",
      resultsSummary: "Successfully took the brand from concept to live production with a custom Next.js e-commerce storefront, currently helping scale and build the brand from scratch.",
      metrics: JSON.stringify([
        { label: "Platform", value: "Custom Next.js E-Commerce Website" },
        { label: "Brand Status", value: "Building Brand From Scratch" },
        { label: "Engagement", value: "Active Ongoing Partnership" },
        { label: "Industry", value: "Sacred Artifacts & Spiritual E-Commerce" },
      ]),
      deliverables: JSON.stringify([
        "Custom Next.js E-Commerce Website Development",
        "0-to-1 Brand Creation & Visual Identity Guidelines",
        "Product Catalog Architecture & High-Resolution Galleries",
        "Ongoing Brand Building & Digital Consulting",
      ]),
      technologies: JSON.stringify(["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "E-Commerce Architecture"]),
      websiteUrl: "https://www.rudrakshaantiquei.com/",
      coverImage: "/images/portfolio/rudraksha-real.png",
      galleryImages: JSON.stringify([
        "/images/portfolio/rudraksha-real.png"
      ]),
      testimonialQuote: "NextCurrent built our custom Next.js e-commerce website and is currently helping us build this brand from scratch. Their technical execution and brand guidance have been invaluable.",
      testimonialAuthor: "Rudraksha Antiquei Team",
      testimonialRole: "Founding Partner",
      isFeatured: true,
      order: 5,
    },
  ];

  for (const cs of caseStudiesData) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
  }
  console.log(`✅ ${caseStudiesData.length} real-world case studies seeded.`);

  // 5. Testimonials from Real Clients (Strictly factual quotes)
  const testimonialsData = [
    {
      clientName: "Nada Yoga School Leadership",
      clientRole: "Director",
      company: "Nada Yoga School",
      quote: "We were not getting a lot of students, our website was very old, social media was inconsistent, and paid marketing was not performing. NextCurrent took over our complete marketing management—redesigned our entire WordPress website, managed our SEO, social media, and Meta ads. Today, we are almost full till next year.",
      rating: 5,
      isFeatured: true,
    },
    {
      clientName: "Val Alino",
      clientRole: "Executive & Life Coach",
      company: "Val Alino Coaching",
      quote: "NextCurrent currently handles my social media, and helps me with my website and branding. Having a dependable partner manage my digital presence allows me to focus fully on coaching my clients.",
      rating: 5,
      isFeatured: true,
    },
    {
      clientName: "Eazy Pregnancy Team",
      clientRole: "Editorial Lead",
      company: "Eazy Pregnancy",
      quote: "The website copy and SEO-rich articles crafted for our platform gave us the organic brand visibility on Google we needed, while maintaining the warm, trusted tone that expecting mothers rely on.",
      rating: 5,
      isFeatured: true,
    },
    {
      clientName: "Luisa",
      clientRole: "Photographer",
      company: "Luisa Photography",
      quote: "Built a stunning, bespoke portfolio website for my photography. It is clean, fast, and represents my work with the artistic polish it deserves.",
      rating: 5,
      isFeatured: true,
    },
    {
      clientName: "Rudraksha Antiquei Team",
      clientRole: "Founding Partner",
      company: "Rudraksha Antiquei",
      quote: "NextCurrent built our custom Next.js e-commerce website and is currently helping us build this brand from scratch. Their technical execution and brand guidance have been invaluable.",
      rating: 5,
      isFeatured: true,
    },
  ];

  for (const t of testimonialsData) {
    const existing = await prisma.testimonial.findFirst({
      where: { clientName: t.clientName, company: t.company },
    });
    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: t,
      });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`✅ ${testimonialsData.length} real testimonials seeded.`);

  // 6. Careers / Current Openings
  const careersData = [
    {
      slug: "senior-nextjs-fullstack-engineer",
      title: "Senior Next.js & Full-Stack Engineer",
      department: "Engineering",
      location: "Remote / Hybrid (Dehradun)",
      type: "Full-Time",
      experience: "3+ years",
      description: "We are looking for a Senior Next.js / TypeScript engineer who takes extreme pride in sub-second load times, clean database models, and modern aesthetic interfaces.",
      requirements: JSON.stringify([
        "3+ years experience with Next.js App Router, React 19, TypeScript, and Tailwind CSS",
        "Deep familiarity with relational databases (PostgreSQL/SQLite) and Prisma ORM",
        "Solid understanding of Core Web Vitals, SSR, edge caching, and semantic HTML",
        "Eye for refined UI typography, motion interactions, and design token consistency",
      ]),
      benefits: JSON.stringify([
        "Competitive salary with performance bonuses",
        "Flexible remote-first culture with hybrid studio access",
        "Hardware and software learning budget",
        "Direct impact on high-growth commercial projects",
      ]),
      isActive: true,
    },
    {
      slug: "lead-performance-media-buyer",
      title: "Lead Performance Media Buyer (Meta & Google Ads)",
      department: "Marketing",
      location: "Remote / Hybrid",
      type: "Full-Time",
      experience: "2+ years",
      description: "Lead paid acquisition campaigns across Meta and Google for high-growth clinics, e-commerce brands, and professional services. You live in unit economics and creative testing frameworks.",
      requirements: JSON.stringify([
        "Proven track record managing ₹5L+ monthly ad spend on Meta and Google Ads",
        "Deep understanding of direct-response copywriting, creative fatigue, and hook scripting",
        "Proficiency with GA4, Server-Side Conversions API, and attribution modeling",
        "Ability to analyze CAC, blended ROAS, and customer lifetime value",
      ]),
      benefits: JSON.stringify([
        "Base salary plus profit-share bonus on managed accounts",
        "Direct leadership over client campaign strategy",
        "Continuous testing budget for new creative concepts",
      ]),
      isActive: true,
    },
    {
      slug: "motion-video-editor-creative-designer",
      title: "Motion Video Editor & Creative Designer",
      department: "Design",
      location: "Remote / Hybrid",
      type: "Full-Time",
      experience: "2+ years",
      description: "Turn raw founder talks and brand assets into high-retention social reels, kinetic typography breakdowns, and direct-response ad visuals.",
      requirements: JSON.stringify([
        "Mastery of Premiere Pro, After Effects, and CapCut workflows",
        "Intimate understanding of 3-second visual hooks, retention pacing, and sound design",
        "Strong graphic design and typography skills in Figma",
        "Speed and reliability in delivering batch creative sprints",
      ]),
      benefits: JSON.stringify([
        "Competitive compensation package",
        "Creative freedom to experiment with viral formats",
        "Access to top-tier plugins, sound libraries, and hardware assets",
      ]),
      isActive: true,
    },
  ];

  for (const c of careersData) {
    await prisma.career.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log(`✅ Careers seeded.`);

  // 7. Blog Posts / Insights
  const blogPosts = [
    {
      slug: "why-nextjs-converts-higher-than-wordpress-for-modern-brands",
      title: "Why Next.js Websites Convert 3x Higher Than WordPress for Growing Brands",
      excerpt: "Speed is the invisible conversion factor. How sub-second load times and modern React architecture directly compound marketing ROI.",
      content: `### The Hidden Cost of Slow Websites\n\nEvery second of delay on mobile devices costs up to 20% in conversion drops. Traditional CMS platforms carry heavy plugin dependencies, database lookups, and unoptimized CSS bundles.\n\nNext.js leverages Server-Side Rendering (SSR), edge caching, and automatic image optimization to deliver page loads in under 400 milliseconds.\n\n### 3 Reasons Why High-Growth Teams Choose Next.js\n1. **Zero Render Delay**: Instant visual feedback eliminates visitor bounce rates.\n2. **Clean Technical SEO**: Next.js automatically generates optimized metadata, OpenGraph tags, and JSON-LD schema.\n3. **Tailored Funnel Logic**: Rather than generic forms, custom interactive quizzes and price calculators can be embedded natively.`,
      category: "Digital Experiences",
      tags: JSON.stringify(["Next.js", "Web Performance", "CRO", "Growth"]),
      readTime: "4 min read",
      authorName: "Akshat Bijalwan",
      isPublished: true,
    },
    {
      slug: "meta-ads-vs-google-ads-where-should-you-invest-first",
      title: "Meta Ads vs Google Ads in 2026: Where Should Your Growth Budget Go First?",
      excerpt: "Push vs Pull marketing explained. Discover the exact decision framework we use to allocate monthly marketing budgets for client ROI.",
      content: `### Intent vs Discovery\n\n- **Google Ads is Pull Marketing**: Users actively search for solutions ("best cosmetic dentist in Dehradun", "custom software agency"). If people already know they need your service, Google is unmatched.\n- **Meta Ads is Push Marketing**: Users are scrolling reels. Your visual hooks must interrupt their pattern, articulate their problem, and position your offer as the obvious remedy.\n\n### The Hybrid Formula\nFor best results, pair high-intent Google Search ads for capturing bottom-of-funnel searches with Meta retargeting to maintain omnipresence throughout the customer's decision cycle.`,
      category: "Growth & Marketing",
      tags: JSON.stringify(["Meta Ads", "Google Ads", "Paid Marketing", "ROI"]),
      readTime: "5 min read",
      authorName: "Akshat Bijalwan",
      isPublished: true,
    },
    {
      slug: "how-to-fix-creative-fatigue-in-meta-ads",
      title: "How to Defeat Ad Creative Fatigue on Meta Before It Destroys Your CAC",
      excerpt: "The weekly batch creative sprint model that keeps acquisition costs steady as you scale past ₹5L/month spend.",
      content: `### Why Creatives Fatigue Faster Than Ever\n\nWith Meta's Andromeda algorithm relying almost entirely on creative categorization rather than narrow interest targeting, your creative IS your targeting. Once a specific angle saturates your core audience segment, frequency rises and ROAS drops.\n\n### The 4-Angle Testing Matrix\nTo prevent ad fatigue, test 4 distinct angles simultaneously:\n1. **Direct Pain Point Agitation**: Call out the immediate frustration your customer experiences daily.\n2. **Contrarian Hot Take**: Challenge conventional industry advice and reveal why it fails.\n3. **Behind-the-Scenes Proof**: Show the raw, unfiltered build process or client breakdown.\n4. **Founder Vulnerability / Story**: Explain why your organization exists and why you refused to compromise on quality.`,
      category: "Growth & Marketing",
      tags: JSON.stringify(["Meta Ads", "Creative Testing", "Media Buying", "Scaling"]),
      readTime: "6 min read",
      authorName: "Akshat Bijalwan",
      isPublished: true,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✅ ${blogPosts.length} blog posts seeded.`);

  console.log("🎉 Seeding complete! Database is primed and ready.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
