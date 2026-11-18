import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Our Process & Client Journey | NextCurrent Media",
  description: "The 7-stage client journey: Discovery, Research, Strategy, Planning, Execution, Launch, and Continuous Optimisation.",
};

const phases = [
  {
    step: "01",
    name: "Discovery & Alignment",
    meta: "commercial audit & unit economics",
    duration: "Week 1",
    headline: "Unpacking the business model and identifying core constraints",
    desc: "Before writing code or designing creatives, we analyze your unit economics: customer acquisition costs (CAC), lifetime value (LTV), margin structure, and current bottleneck.",
    deliverables: [
      "Discovery consultation & intake audit",
      "Unit economics and allowable CAC calculation",
      "Historical ad account & Google Analytics diagnostic",
      "Stakeholder alignment & growth objective definitions",
    ],
  },
  {
    step: "02",
    name: "Market & Competitor Research",
    meta: "audience psychology & search intent",
    duration: "Week 1 - 2",
    headline: "Isolating commercial search gaps and creative opportunities",
    desc: "We dissect competitor ad spend, analyze search intent clusters, and study customer reviews across your category to identify the exact psychological angles that trigger buying action.",
    deliverables: [
      "Competitor ad creative tear-down & hook analysis",
      "Commercial search intent & keyword cluster map",
      "Customer objection matrix & psychological triggers",
      "Differentiation blueprint across visual and offer axes",
    ],
  },
  {
    step: "03",
    name: "Growth Strategy & Positioning",
    meta: "acquisition architecture",
    duration: "Week 2",
    headline: "Structuring the full-funnel acquisition architecture",
    desc: "We define the complete journey from cold traffic to booked client: which traffic channels to activate, the offer architecture, the primary conversion path, and attribution modeling.",
    deliverables: [
      "90-Day Full-Funnel Growth Roadmap",
      "Channel allocation & budget split (Meta, Google, SEO)",
      "Offer positioning & high-ticket incentive structure",
      "Conversion tracking architecture (CAPI, GA4, Server-side)",
    ],
  },
  {
    step: "04",
    name: "Planning & Architecture",
    meta: "technical specs & wireframes",
    duration: "Week 2 - 3",
    headline: "Wireframing the user experience and database models",
    desc: "We design frictionless conversion wireframes and type-safe data schemas. Every button, form field, and interactive element is designed to minimize cognitive load and maximize completion rate.",
    deliverables: [
      "Information architecture & mobile conversion wireframes",
      "Database schema & API endpoint specification",
      "Design tokens (colors, typography hierarchy, states)",
      "Pre-production creative hook scripts & copy angles",
    ],
  },
  {
    step: "05",
    name: "Execution & Engineering",
    meta: "sprint development & media production",
    duration: "Week 3 - 5",
    headline: "Building sub-second web experiences and producing high-converting creatives",
    desc: "Our engineering and media teams sprint simultaneously: we build custom Next.js applications with sub-second speeds, while producing batch-tested video ad creatives and SEO topic clusters.",
    deliverables: [
      "Next.js App Router full-stack web application",
      "Batch of 8-12 tested direct-response ad creatives",
      "Multi-step lead capture & WhatsApp triage bots",
      "Topical SEO clusters with structured schema markup",
    ],
  },
  {
    step: "06",
    name: "Deployment & Launch",
    meta: "zero-downtime release & QA",
    duration: "Week 5 - 6",
    headline: "Rigorous quality assurance, server-side tracking, and staged rollout",
    desc: "We conduct stress testing across mobile viewports, verify server-side event tracking, configure 301 URL redirects, and launch with zero downtime.",
    deliverables: [
      "Zero-downtime production deployment on Vercel/Cloud VPS",
      "Live Meta Conversions API & GA4 verification",
      "Core Web Vitals scorecard verification (90+ mobile)",
      "Admin CMS training & handover documentation",
    ],
  },
  {
    step: "07",
    name: "Continuous Optimisation",
    meta: "iterative scale & CRO",
    duration: "Ongoing (Monthly)",
    headline: "Weekly creative refreshes, audience scaling, and conversion rate lifting",
    desc: "Launch is day one. On a monthly retainer basis, we review pipeline CAC weekly, refresh ad creatives to beat fatigue, and run A/B conversion experiments to lower acquisition costs continuously.",
    deliverables: [
      "Weekly creative sprint (new hooks & video variations)",
      "Bi-weekly live pipeline review with lead strategist",
      "Continuous Core Web Vitals and SEO rank tracking",
      "Direct Slack/WhatsApp access for rapid iteration",
    ],
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground">
      {/* Header */}
      <div className="mb-20 space-y-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Our Process
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // Discovery → Research → Strategy → Planning → Execution → Launch → Optimisation
        </div>
        <p className="text-lg md:text-xl text-muted font-light leading-relaxed pt-2">
          A disciplined 7-stage client journey engineered to eliminate guesswork, protect ad spend, and establish predictable pipeline scale.
        </p>
      </div>

      {/* Process Journey Timeline */}
      <div className="space-y-12">
        {phases.map((phase, idx) => (
          <div
            key={idx}
            className="p-8 md:p-12 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 hover:border-primary/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Stage Index & Timing */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl font-mono text-primary font-bold">
                  {phase.step}
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-muted">
                  [ {phase.duration} ]
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-white leading-snug">
                {phase.name}
              </h2>
              <div className="font-mono text-xs text-primary/70">
                // {phase.meta}
              </div>
            </div>

            {/* Right Column: Execution & Deliverables */}
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-lg md:text-xl font-serif text-white/90">
                {phase.headline}
              </h3>
              <p className="text-sm md:text-base text-muted font-light leading-relaxed">
                {phase.desc}
              </p>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="font-mono text-[11px] text-white/50 block">
                  key stage deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phase.deliverables.map((d, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-lg bg-[var(--background-layer-2)] border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs text-white/85 font-light leading-snug">
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Conversion Section */}
      <section className="mt-28 p-8 md:p-14 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white">
          Ready to begin Phase 01?
        </h2>
        <p className="text-muted text-base max-w-xl mx-auto font-light leading-relaxed">
          Book an introductory discovery consultation to review your current funnel and map your commercial objectives.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all duration-300"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/free-audit"
            className="font-mono text-xs text-muted hover:text-white transition-colors"
          >
            or claim a free diagnostic review →
          </Link>
        </div>
      </section>
    </main>
  );
}
