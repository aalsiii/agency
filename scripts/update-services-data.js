const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateServices() {
  console.log("Updating core services with comprehensive visual metadata, deliverables, and expanded FAQs...");

  const services = [
    // 1. Social Media Marketing
    {
      slug: "social-media-marketing",
      title: "Social Media Marketing (SMM) & Visual Curation",
      tagline: "High-retention video architectures, aesthetic feed curation, and organic distribution systems.",
      shortDesc: "Transform your profiles into an authoritative visual ecosystem. We script, edit, curate, and distribute high-retention video content and aesthetic grids that convert casual scrollers into loyal advocates.",
      fullDesc: "Modern brand authority is won on visual elegance and retention-driven video. We manage your social media engine end-to-end: trend analysis, psychological hook scripting, editorial feed art direction, kinetic typography video editing, and ManyChat comment-to-DM conversion funnels. Every asset is engineered to establish immediate premium posture and drive qualified inquiries straight into your inbox.",
      category: "Growth & Marketing",
      icon: "Smartphone",
      priceInr: 24000,
      priceUsd: 850,
      billingType: "monthly",
      badge: "High Retention",
      idealFor: "Founders, consumer brands, practitioners, educators, and service businesses wanting an omnipresent, aesthetically flawless social media presence.",
      order: 2,
      features: JSON.stringify([
        "16 High-retention Reels / TikToks per month with kinetic typography",
        "Editorial feed grid curation & cohesive story highlight architecture",
        "Psychological pattern-interrupt hook and script bank",
        "Automated ManyChat keyword comment-to-DM conversation funnels",
        "Professional color grading, audio cleaning, and sound design",
        "Monthly performance review and audience growth reporting",
      ]),
      problems: JSON.stringify([
        "Inconsistent posting and generic Canva templates that dilute brand authority",
        "Low 3-second hook retention causing videos to stall at under 500 views",
        "Followers viewing content passively without converting into paying clients or leads",
        "Founder burnout from constantly thinking about what to film and edit next",
      ]),
      methodology: JSON.stringify([
        "Audience Psychological Profiling: Uncovering the subconscious buying triggers, objections, and aesthetic tastes of your ideal clients",
        "Editorial Grid & Asset System: Defining your signature color palette, typography hierarchy, and story highlight visual architecture",
        "High-Retention Video Sprint: Batch scripting 16 hooks and editing with kinetic typography, subtle zooms, and pro color grading",
        "Automated DM Lead Funnel: Wiring automated keyword triggers to deliver lead magnets, masterclasses, and booking links inside DMs",
        "Algorithm Analytics & Iteration: Monitoring audience watch time curves, bookmark rates, and re-investing in highest-performing topics",
      ]),
      benefits: JSON.stringify([
        "Authoritative digital presence that immediately justifies premium rates",
        "Hands-off weekly publishing calendar eliminating creative fatigue",
        "Consistent inbound DM inquiries from highly qualified prospective buyers",
      ]),
      deliverables: JSON.stringify([
        "16 High-Retention Video Reels / TikToks per Month",
        "Curated Magazine-Quality Editorial Feed Grid & Story Highlights",
        "Psychological Pattern-Interrupt Hook & Script Banks",
        "Kinetic Typography, Motion Graphics, & Precision Sound Design",
        "Automated ManyChat Comment-to-DM Conversion Sequences",
        "Comprehensive Monthly Audience Analytics & Growth Roadmap",
      ]),
      faqs: JSON.stringify([
        {
          question: "Do I or our team have to appear on camera for every video?",
          answer: "Not necessarily. While founder-led, talking-head videos build personal authority quickly, we also develop high-converting faceless aesthetic formats, text-over-b-roll, kinetic motion typography, and screen-recorded walkthroughs tailored to your comfort level and brand tone.",
        },
        {
          question: "What equipment do I need to record the raw footage?",
          answer: "A recent smartphone (iPhone 12 or newer / modern Android) paired with natural window light and an inexpensive lapel microphone is more than enough. Our creative director sends you clear framing guidelines, teleprompter scripts, and bulletproof lighting checklists so recording takes under 90 minutes per batch.",
        },
        {
          question: "How does the ManyChat automated DM funnel work?",
          answer: "When a viewer comments a specific keyword (e.g. 'WORKSHOP' or 'BLUEPRINT') on your Reel, our system instantly sends them an automated, conversational direct message with your link or resource. This converts algorithmic engagement into a private, trackable conversation and email capture.",
        },
        {
          question: "What is the turnaround time from raw footage to published content?",
          answer: "We operate on a 2-week rolling content runway. Once raw footage is uploaded to our shared portal, our editing team delivers polished video cuts with motion graphics, captions, and sound design within 5 business days for your review.",
        },
        {
          question: "Who handles comment replies and community engagement?",
          answer: "We set up automated triage filters for high-intent inquiries and partner with your team on custom response guidelines. Inquiries asking for pricing or calls are flagged immediately for your sales team, while common FAQs are handled automatically.",
        },
        {
          question: "How do you ensure our visual identity looks cohesive and luxurious?",
          answer: "Before filming begins, we design a 9-grid editorial moodboard, defining custom color filters, cover typography, and spacing rules so your profile resembles an editorial publication rather than a disjointed collection of promotional ads.",
        },
        {
          question: "Who owns the video assets and raw footage?",
          answer: "You own 100% of all finished video files, graphic assets, scripts, and project files. You are free to repurpose them across your website, paid ads, YouTube Shorts, and email campaigns without licensing restrictions.",
        },
      ]),
    },

    // 2. High-Performance Website Engineering
    {
      slug: "website-development",
      title: "Custom Next.js Website Engineering",
      tagline: "Sub-second load times, bespoke aesthetics, and high-conversion architectures.",
      shortDesc: "Ditch clunky, bloated templates. We architect bespoke, lightning-fast web applications designed to turn high-intent visitors into booked clients.",
      fullDesc: "Your website is your primary digital salesperson. We engineer high-performance web platforms using Next.js App Router, React 19, Tailwind CSS, and headless database backends. Featuring sub-400ms Core Web Vitals, seamless multi-step lead capture funnels, and integrated admin portals that give your team full autonomy.",
      category: "Digital Experiences",
      icon: "Globe",
      priceInr: 44999,
      priceUsd: 1599,
      billingType: "one-time",
      badge: "Most Popular",
      idealFor: "Modern brands, luxury retreats, clinics, consultants, and tech-enabled businesses demanding an authoritative, sub-second web platform.",
      order: 1,
      features: JSON.stringify([
        "Bespoke UI/UX design with architectural dark/light luxury styling",
        "Next.js App Router with Server-Side Rendering (SSR) & 99+ mobile score",
        "Integrated Lead CRM, Calendar booking, and WhatsApp flows",
        "Fully managed Admin CMS to edit copy, case studies, and blog posts",
        "On-page technical SEO, structured JSON-LD schema & OpenGraph cards",
        "30 days post-launch warranty and conversion monitoring",
      ]),
      problems: JSON.stringify([
        "Sluggish mobile load speeds causing 40%+ of prospective buyers to bounce before reading",
        "Generic WordPress or Webflow templates that make your firm look identical to competitors",
        "Inability to easily update copy, case studies, or pricing without paying developer retainers",
        "Disjointed lead capture forms that fail to notify team members or route into your CRM",
      ]),
      methodology: JSON.stringify([
        "Information Architecture & Conversion Wireframing: Mapping the visitor journey to eliminate friction and maximize call bookings",
        "Design System & Art Direction: Crafting bespoke typography hierarchies, micro-interactions, and high-contrast dark aesthetics",
        "Next.js Full-Stack Engineering: Developing modular, type-safe React components with server-rendered efficiency and zero bloat",
        "CMS & Pipeline Integration: Wiring admin dashboards, database models, WhatsApp notifications, and calendar integrations",
        "Vitals QA & Zero-Downtime Launch: Rigorous cross-browser testing, Core Web Vitals profiling, and seamless domain migration",
      ]),
      benefits: JSON.stringify([
        "Sub-second load times that keep mobile visitors engaged and improve Google search rank",
        "Proprietary digital asset completely owned by your company with zero template subscription locks",
        "High-converting multi-step lead forms that pre-qualify prospects before your team gets on the phone",
      ]),
      deliverables: JSON.stringify([
        "Bespoke UI/UX Design System with Luxury Dark/Light Styling",
        "Next.js App Router Architecture with Server-Side Rendering (SSR)",
        "Sub-400ms Time-to-First-Byte (TTFB) & 100/100 Core Web Vitals Score",
        "Custom Admin CMS for Articles, Case Studies, and Service Pages",
        "Integrated Lead CRM, Multi-Step Ingestion Forms, & WhatsApp Triggers",
        "Full Technical SEO Suite (JSON-LD Schema, OpenGraph, Canonical URLs)",
        "30-Day Post-Launch Technical Warranty & Speed Monitoring",
      ]),
      faqs: JSON.stringify([
        {
          question: "Why Next.js instead of WordPress, Webflow, or Shopify?",
          answer: "Traditional page builders suffer from bloated plugins, fragile updates, and slow mobile load times (often 3-5+ seconds). Next.js renders web pages at the edge in under 400ms, gives you bespoke design freedom without template limitations, and is impervious to traditional WordPress plugin vulnerabilities.",
        },
        {
          question: "Can our non-technical team edit content and publish new pages?",
          answer: "Yes. Every custom build includes an intuitive, password-protected Admin CMS. Your team can publish new case studies, edit service details, write blog posts, and review inbound leads without writing a single line of code.",
        },
        {
          question: "What is the typical timeline for a complete custom build?",
          answer: "Our standard bespoke build sprint takes between 3 to 5 weeks from kickoff to production launch. We adhere to structured milestones (Wireframes → High-Fidelity UI Design → Development → QA & Launch) with weekly Loom progress walk-throughs.",
        },
        {
          question: "What happens to our existing Google rankings during the migration?",
          answer: "We conduct a complete URL crawl before building and implement 1-to-1 301 server redirect mappings, canonical tags, and structured JSON-LD schema. Your search visibility is rigorously protected and typically improves post-launch due to faster Core Web Vitals.",
        },
        {
          question: "Who owns the code, hosting, and intellectual property?",
          answer: "You own 100% of the repository, source code, design files, and database upon final payment. We deploy the site directly to your preferred hosting provider (e.g. Vercel, AWS, or Cloudflare) and provide full credentials.",
        },
        {
          question: "How do you handle hosting and ongoing maintenance?",
          answer: "Next.js applications run on modern edge serverless infrastructure with near-zero hosting maintenance (often completely free or under $20/month). We provide 30 days of complimentary post-launch warranty and offer optional maintenance retainers for continuous feature evolution.",
        },
        {
          question: "Can you integrate our existing CRM, calendar, or email platform?",
          answer: "Yes. We regularly integrate Cal.com, Calendly, WhatsApp Business, HubSpot, ActiveCampaign, Mailchimp, Stripe, Razorpay, and custom webhooks directly into the application's intake forms.",
        },
      ]),
    },

    // 3. Performance Marketing & Paid Advertising
    {
      slug: "performance-marketing",
      title: "Performance Marketing & Paid Advertising",
      tagline: "High-ROAS Meta and Google ad systems engineered around unit economics and qualified client calls.",
      shortDesc: "Stop burning ad budget on vanity metrics. We construct full-funnel paid advertising campaigns with battle-tested video hooks, conversion tracking, and relentless ROAS optimization.",
      fullDesc: "We take complete ownership of your paid customer acquisition across Meta (Instagram & Facebook) and Google Ads (Search, YouTube, and Performance Max). From direct-response copywriting and high-converting video creatives to server-side Conversions API setups and dedicated landing page funnels, every dollar spent is tracked against closed revenue and client pipeline.",
      category: "Growth & Marketing",
      icon: "TrendingUp",
      priceInr: 25000,
      priceUsd: 899,
      billingType: "monthly",
      badge: "Highest ROI",
      idealFor: "Brands spending ₹50,000 to ₹5,00,000/month ($1k to $10k/mo) demanding predictable customer acquisition with transparent tracking.",
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
        "High customer acquisition cost (CAC) eating through profit margins on low-ticket offers",
        "Ad creative fatigue exhausting audiences and spiking costs within 7 to 10 days",
        "Inaccurate pixel tracking and iOS privacy changes hiding true campaign revenue attribution",
        "Sending expensive paid traffic to generic homepages that convert at under 1%",
      ]),
      methodology: JSON.stringify([
        "Unit Economics Blueprint: Calculating your maximum allowable CAC, customer lifetime value (LTV), and target blended ROAS",
        "Multi-Angle Creative Sprint: Producing 4-6 distinct creative angles addressing pain points, status transformation, and objections",
        "Controlled Audience Sandbox: Testing creatives in isolated ABO/CBO ad sets before allocating primary scale budgets",
        "Server-Side Tracking Integration: Deploying Meta CAPI and first-party cookies to recover signal lost from ad blockers",
        "Dedicated Landing Page Funnels: Routing paid clicks to custom high-speed landing pages with friction-free booking forms",
      ]),
      benefits: JSON.stringify([
        "Predictable pipeline of qualified discovery calls and high-ticket sales inquiries",
        "Clear visibility into cost-per-lead (CPL) and return on ad spend (ROAS)",
        "Continuous pipeline of fresh creative assets preventing performance drop-offs",
      ]),
      deliverables: JSON.stringify([
        "Full-Funnel Campaign Architecture (Top, Middle, and Bottom of Funnel)",
        "Weekly Direct-Response Creative Angles (Hooks, Static Graphics, Motion Cuts)",
        "Server-Side Meta Conversions API (CAPI) & GA4 Attribution Setup",
        "Laser-Focused Custom & Lookalike Audience Retargeting Pipelines",
        "Dedicated High-Conversion Next.js Landing Page Routing",
        "Real-Time Pipeline Attribution Dashboard & Weekly Growth Reviews",
      ]),
      faqs: JSON.stringify([
        {
          question: "What is your recommended minimum monthly ad spend?",
          answer: "We recommend a minimum media budget of ₹40,000 to ₹75,000 ($600 to $1,000 USD) per month. This allows the Meta and Google machine-learning algorithms sufficient conversion data (roughly 50 optimization events per week) to exit the learning phase and scale profitably.",
        },
        {
          question: "How quickly can we expect to see profitable results?",
          answer: "Initial testing campaigns launch within 7 business days of onboarding. During weeks 1-2, we gather baseline unit metrics and isolate winning creatives. Profitable, stabilized lead acquisition is typically achieved within weeks 3-4, after which we scale budgets systematically.",
        },
        {
          question: "Who pays for the actual ad spend on Meta and Google?",
          answer: "All media spend is billed directly to your company's credit card within your own Meta Business Manager and Google Ads accounts. You retain 100% ownership of your pixel data, audiences, and ad accounts.",
        },
        {
          question: "How do you solve creative fatigue when ad performance dips?",
          answer: "We operate on a continuous creative sprint cycle. Every week, our copywriters and video editors test new hooks, b-roll angles, visual thumbnails, and copy variations so that as older creatives fatigue, new winning variations are already ramped up.",
        },
        {
          question: "How do you navigate iOS 14+ tracking restrictions and privacy changes?",
          answer: "We configure server-side Conversions API (CAPI) through custom server containers and first-party domain cookies. This bypasses browser ad blockers, achieves 95%+ event match quality, and feeds clean purchase signals directly back to Meta's AI bidding engine.",
        },
        {
          question: "Do you provide the ad creatives or do we need to supply them?",
          answer: "We handle the entire creative pipeline: scripting direct-response video hooks, designing high-converting static graphic ads, and providing your team with simple smartphone recording briefs. If you already have existing footage or brand assets, we remix them into high-converting ad variations.",
        },
        {
          question: "What happens if a campaign doesn't perform right away?",
          answer: "We operate with strict stop-loss rules. If an ad angle fails to generate qualifying clicks or conversions within 2-3x our target CPA threshold, budget is instantly reallocated to winning variations while our team iterates the hook, copy, or landing page offer.",
        },
      ]),
    },

    // 4. Email Marketing & Automated Retention
    {
      slug: "email-marketing",
      title: "Lifecycle Email Marketing & Retention Automation",
      tagline: "Automated email sequences that convert warm leads, recover abandoned carts, and drive recurring revenue.",
      shortDesc: "Turn your email list into your most profitable sales channel. We architect automated nurture flows, abandoned booking recovery, and editorial newsletters that generate sales on autopilot.",
      fullDesc: "Over 70% of visitors who discover your brand aren't ready to buy on day one. We engineer high-retention lifecycle email systems that nurture interest, dismantle objections, and guide prospects into booked calls. From 5-part automated welcome sequences and abandoned checkout recovery to weekly editorial broadcasts, we turn cold contacts into lifelong clients with zero ongoing ad costs.",
      category: "Growth & Marketing",
      icon: "Mail",
      priceInr: 22000,
      priceUsd: 799,
      billingType: "monthly",
      badge: "High Retention",
      idealFor: "E-commerce stores, coaches, wellness retreats, course creators, and service businesses wanting to monetize existing traffic and customer lists.",
      order: 4,
      features: JSON.stringify([
        "5-part automated welcome & trust sequence that greets every new subscriber",
        "Abandoned booking & checkout recovery flow to reclaim lost consultations",
        "Weekly editorial newsletter copywriting that positions you as the authority",
        "Post-purchase onboarding sequences to reduce refunds and drive referrals",
        "Complete technical deliverability setup (SPF, DKIM, DMARC, custom sending domain)",
        "Granular list segmentation separating active buyers from non-buyers",
      ]),
      problems: JSON.stringify([
        "Website leads collecting dust in spreadsheets without structured follow-up",
        "Low email open rates under 15% due to poor domain reputation or spam filters",
        "Leaving money on the table when prospective clients abandon consultation booking forms",
        "Struggling to find the time to write consistent, valuable newsletters every week",
      ]),
      methodology: JSON.stringify([
        "Audience Segmentation & Hygiene: Cleaning inactive contacts and segmenting audiences by engagement, intent, and buying history",
        "Core Flow Engineering: Crafting high-converting copy for Welcome, Abandoned Booking, and Re-Engagement automation triggers",
        "Technical Deliverability Hardening: Configuring custom domain records (SPF, DKIM, DMARC, BIMI) to ensure inbox landing",
        "Editorial Newsletter Cadence: Establishing a repeatable weekly thought-leadership format that provides deep value and subtle call-to-actions",
        "A/B Testing & Revenue Optimization: Continuously split-testing subject lines, preview text, send times, and offer framing",
      ]),
      benefits: JSON.stringify([
        "Predictable automated revenue channel completely free from ad spend and algorithmic shifts",
        "Industry-leading open rates (35-45%+) and near-zero spam complaints",
        "Automated relationship-building that turns one-time inquiries into lifetime brand champions",
      ]),
      deliverables: JSON.stringify([
        "Automated 5-Part Welcome & Trust Sequence (Storytelling & Authority)",
        "Abandoned Booking & High-Intent Abandoned Cart Recovery Flows",
        "Post-Purchase Onboarding & Referral Amplification Sequences",
        "Weekly Editorial Thought-Leadership Newsletter System",
        "Bulletproof SPF, DKIM, DMARC Deliverability & Spam Score Configuration",
        "Advanced Subscriber Segmentation (Buyers vs. Non-Buyers vs. Engaged)",
      ]),
      faqs: JSON.stringify([
        {
          question: "What email marketing platforms do you work with?",
          answer: "We work with all major modern email and automation platforms including Klaviyo, ActiveCampaign, Ontraport, ConvertKit (Kit), Beehiiv, Mailchimp, and custom Next.js transactional email stacks using Resend and React Email.",
        },
        {
          question: "How large does our email list need to be to get started?",
          answer: "You don't need a massive list. Even an engaged list of 200 to 500 contacts can generate significant revenue when properly segmented with automated welcome and recovery flows. We also build the opt-in lead magnets to grow your list rapidly.",
        },
        {
          question: "How do you prevent our emails from landing in the spam or promotions tab?",
          answer: "We configure proper DNS authentication records (SPF, DKIM, DMARC, and custom sending domains), maintain clean plain-text to HTML ratios, warm up sending IPs properly, and write authentic human copy that email clients prioritize as primary inbox correspondence.",
        },
        {
          question: "Who writes the email copy and subject lines?",
          answer: "Our senior direct-response copywriters write every single email from scratch. We study your brand voice, tone, and customer psychology to write persuasive, engaging emails that sound authentically like you—never robotic or pushy.",
        },
        {
          question: "What kind of open rates and click rates can we expect?",
          answer: "While average industry open rates hover around 18-22%, our automated sequences regularly achieve 35% to 50%+ open rates with 3% to 7% click-through rates due to hyper-relevant segmentation and pattern-interrupt subject lines.",
        },
        {
          question: "How do automated recovery flows work for appointments and bookings?",
          answer: "When a prospect clicks your booking calendar or consultation page but doesn't complete the reservation, our tracking triggers a gentle, helpful automated follow-up within 1 to 2 hours, offering to answer questions or reschedule, recovering up to 20-30% of lost leads.",
        },
        {
          question: "Are your email practices compliant with GDPR, CAN-SPAM, and privacy laws?",
          answer: "Yes. Every flow and broadcast includes clear unsubscription mechanisms, physical address footers, double opt-in capabilities, and transparent consent mechanisms that adhere strictly to international privacy regulations.",
        },
      ]),
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
    console.log(`✅ Upserted ${s.slug}`);
  }

  console.log("All 4 core pillars updated successfully in SQLite!");
}

updateServices()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
