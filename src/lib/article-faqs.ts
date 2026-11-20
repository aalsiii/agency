export interface ArticleFaq {
  question: string;
  answer: string;
}

export const articleFaqMap: Record<string, ArticleFaq[]> = {
  "how-to-turn-instagram-dms-into-high-ticket-clients": [
    {
      question: "How quickly should our team respond to inbound Instagram DMs to maximize closing rates?",
      answer: "Response velocity is the critical factor. Prospects responded to within 5 minutes are 21 times more likely to enter your sales pipeline than those contacted after 30 minutes. We recommend automated qualification triggers paired with human dispatchers during peak business hours.",
    },
    {
      question: "Can Instagram DM qualification flows integrate with our existing CRM and calendar?",
      answer: "Yes. Using Meta Webhooks or automation middleware, qualified chats automatically sync contact details into HubSpot, ActiveCampaign, or custom Next.js database portals, accompanied by one-click Cal.com or Calendly booking links.",
    },
    {
      question: "Should we use chatbots or live human setters for high-ticket services?",
      answer: "A hybrid model yields the highest ROAS. Use automation for the initial 60-second keyword trigger (e.g. sending a free resource or case study), then seamlessly route high-intent leads to a senior strategist who sends personalized 20-second voice notes.",
    },
    {
      question: "How do we track accurate ad attribution and ROI from Instagram DMs?",
      answer: "By appending unique campaign tracking parameters to Click-to-Instagram Direct Ads (CTD) and using Meta Conversions API (CAPI), you can attribute backend revenue directly to specific ad creatives and audience segments.",
    },
  ],
  "why-nextjs-converts-higher-than-wordpress-for-modern-brands": [
    {
      question: "Why does site speed have such an immediate impact on conversion rates?",
      answer: "Google and Portent research shows that every 100ms improvement in page load speed lifts conversion rates by 8.4%. When paid ad traffic lands on a Next.js application that renders under 400ms, bounce rates drop by over 50% compared to typical 3-second WordPress themes.",
    },
    {
      question: "How does Next.js improve Google search rankings compared to traditional CMSs?",
      answer: "Next.js executes Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR), providing search engine crawlers with fully rendered HTML, automated OpenGraph tags, semantic headers, and structured JSON-LD schema out of the box, ensuring perfect Core Web Vitals scores.",
    },
    {
      question: "Is it difficult for non-technical team members to edit content on Next.js?",
      answer: "Not at all. NextCurrent builds custom, password-protected Admin CMS panels or headless CMS integrations (Payload, Sanity, or Prisma) allowing your team to update copy, publish articles, and launch case studies without touching code.",
    },
    {
      question: "What is the migration process from an existing WordPress site?",
      answer: "We export your complete media library and posts, engineer 1-to-1 301 server redirect maps to protect legacy SEO equity, and rebuild your design system as responsive React/Tailwind components.",
    },
  ],
  "meta-ads-vs-google-ads-where-should-you-invest-first": [
    {
      question: "How should a company allocate budget between Meta and Google Ads?",
      answer: "For most growing brands, we recommend starting with Google Search to capture high-intent users actively searching for your service, then allocating 30-40% of the budget to Meta Ads for visual pattern-interrupt prospecting and omnipresent retargeting.",
    },
    {
      question: "What is the typical time frame to see measurable ROAS from paid ad campaigns?",
      answer: "Google Search campaigns can yield qualified inquiries within the first 7 to 14 days of launch. Meta Ads typically require a 14-day algorithmic learning phase to identify top-converting audience micro-segments.",
    },
    {
      question: "How do iOS privacy updates impact Meta ad tracking today?",
      answer: "We implement server-side Meta Conversions API (CAPI) through custom edge route handlers, ensuring 95%+ event match quality and bypassing client-side ad-blockers and Safari ITP limitations.",
    },
  ],
  "how-to-fix-creative-fatigue-in-meta-ads": [
    {
      question: "How do you know when an ad creative has fatigued?",
      answer: "Creative fatigue manifests as rising frequency (>2.8 in a 7-day window), dropping First 3-Second Hook Rates (below 25%), and a 30%+ increase in Cost Per Acquisition (CPA) on previously winning ad sets.",
    },
    {
      question: "How many creative variations should we test each week?",
      answer: "We recommend a weekly batch production cadence of 6 to 10 net-new assets, testing 4 distinct psychological angles: visceral pain agitation, contrarian industry hot takes, behind-the-scenes proof, and founder vision.",
    },
    {
      question: "Do static graphics still work, or should we only produce vertical video?",
      answer: "High-contrast editorial statics often outperform vertical video for high-ticket service offers due to instant message comprehension without requiring 15 seconds of watch time. A balanced 50/50 mix yields optimal algorithm delivery.",
    },
  ],
  "high-ticket-client-acquisition-funnel-breakdown": [
    {
      question: "Why do standard contact forms repel high-ticket decision-makers?",
      answer: "High-value enterprise clients demand discretion, authority, and upfront proof before they invest 30 minutes in a sales meeting. Multi-step diagnostic intake forms pre-qualify budget, timeline, and goals while filtering out unqualified leads.",
    },
    {
      question: "What is the optimal video length for a high-ticket Value Teardown (VSL)?",
      answer: "Between 6 and 9 minutes. The video should articulate the prospect's exact bottleneck, reveal why conventional remedies fail, demonstrate your proprietary mechanism, and present clear client outcome benchmarks.",
    },
    {
      question: "How do we prevent calendar no-shows for booked strategy sessions?",
      answer: "Automated WhatsApp and email confirmation sequences delivering 2 high-value case studies and a calendar invite reminder within 1 hour and 15 minutes of the call reduce no-show rates to under 8%.",
    },
  ],
  "figma-design-systems-that-accelerate-engineering": [
    {
      question: "How do Figma design tokens translate into production React code?",
      answer: "By naming color variables, typography scales, and spacing tokens according to standardized design token schemas, they map 1-to-1 to Tailwind CSS classes (`text-primary`, `bg-background`, `border-white/10`), eliminating CSS guesswork.",
    },
    {
      question: "Why is auto-layout in Figma mandatory for high-velocity front-end teams?",
      answer: "Auto-layout mirrors CSS Flexbox and Grid. When designers enforce auto-layout constraints, developers can inspect responsive container behavior directly without needing static redline documentation.",
    },
  ],
};

export function getArticleFaqs(slug: string): ArticleFaq[] {
  return (
    articleFaqMap[slug] || [
      {
        question: "How does NextCurrent implement this strategy for client engagements?",
        answer: "We begin every project with a thorough direct-response architectural audit, identifying bottlenecks in your conversion path, before designing and deploying custom high-performance assets tailored to your business model.",
      },
      {
        question: "What is the typical timeline to launch and see measurable results?",
        answer: "Our standard sprint delivers fully engineered websites and marketing funnels in 3 to 5 weeks, followed by immediate traffic deployment and algorithmic optimization.",
      },
      {
        question: "Who owns the code, creative assets, and intellectual property?",
        answer: "You own 100% of all code repositories, design tokens, video raw footage, and database models upon deployment.",
      },
    ]
  );
}
