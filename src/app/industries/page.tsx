"use client";

import Link from "next/link";
import {
  Stethoscope,
  Utensils,
  Dumbbell,
  GraduationCap,
  ShoppingBag,
  Building2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const industries = [
  {
    name: "Clinics & Healthcare",
    tagline: "High-ticket patient acquisition for dental, aesthetic, and specialty clinics.",
    icon: Stethoscope,
    badge: "Local Dominance",
    painPoint: "High reliance on word of mouth with irregular bookings and high patient no-shows.",
    solution: "Google Maps 3-Pack domination, Click-to-WhatsApp Meta Ads, and automated SMS appointment confirmation flywheels.",
    metrics: [
      { label: "Cost Per Patient Booking", value: "₹240 - ₹480" },
      { label: "Google Maps Calls Lift", value: "+340%" },
      { label: "No-Show Reduction", value: "-62%" },
    ],
    deliverables: [
      "Google Business Profile 3-pack local SEO pack",
      "Click-to-WhatsApp Meta Ads for high-ticket procedures",
      "Next.js mobile-first patient consult booking funnel",
      "Automated 5-star review collection QR cards",
    ],
  },
  {
    name: "D2C & E-Commerce",
    tagline: "Profitable scaling from ₹5L/mo to ₹50L/mo with creative-led ad architectures.",
    icon: ShoppingBag,
    badge: "Scale Velocity",
    painPoint: "Rising Meta customer acquisition costs, ad fatigue in under 10 days, and high cart drop-offs.",
    solution: "Weekly batch creative testing with UGC hooks, sub-second headless Next.js landing pages, and server-side Conversions API attribution.",
    metrics: [
      { label: "Average Blended ROAS", value: "4.2x - 5.5x" },
      { label: "Landing Page Speed", value: "< 400ms" },
      { label: "Checkout Conversion Lift", value: "+44%" },
    ],
    deliverables: [
      "Broad + CBO Meta Ads scaling architecture",
      "Weekly viral UGC reels and 3D motion static angles",
      "Next.js high-speed product PDP landing pages",
      "WhatsApp & SMS abandoned checkout flows",
    ],
  },
  {
    name: "Cafes, Restaurants & Homestays",
    tagline: "Pack tables every weekend and drive direct bookings without OTA commissions.",
    icon: Utensils,
    badge: "Direct Bookings",
    painPoint: "Paying 20-30% commissions to aggregators and slow weekday footfalls.",
    solution: "Geo-targeted Instagram Reels promoting signature dishes, Google Maps visibility, and direct WhatsApp reservation funnels with zero commission.",
    metrics: [
      { label: "Direct Reservations", value: "72% of total" },
      { label: "Commission Saved", value: "₹1.4L / month" },
      { label: "Local Reel Reach", value: "85k+ / month" },
    ],
    deliverables: [
      "Local radius-targeted Meta Reels campaign",
      "Commission-free WhatsApp direct table & room booking bot",
      "Google Maps local food search optimization",
      "Influencer & local foodie review management",
    ],
  },
  {
    name: "Gyms & Fitness Studios",
    tagline: "Fill trial slots and convert walk-ins into high-retention annual memberships.",
    icon: Dumbbell,
    badge: "Member Retention",
    painPoint: "Huge customer churn every quarter and high cost per trial lead from generic flyers.",
    solution: "Geo-fenced '3-Day Free VIP Pass' lead generation ads connected straight to sales rep WhatsApp, paired with local Maps rankings.",
    metrics: [
      { label: "Cost Per VIP Trial Lead", value: "₹75 - ₹120" },
      { label: "Trial-to-Member Conversion", value: "38%" },
      { label: "Gym Capacity", value: "90%+" },
    ],
    deliverables: [
      "Radius-targeted Facebook & Instagram Lead Ads",
      "Instant WhatsApp follow-up automation for trial claims",
      "Transformation story carousels & member spotlight reels",
      "Automated Google review SMS after 7 days of attendance",
    ],
  },
  {
    name: "Coaching Institutes & EdTech",
    tagline: "Predictable student enrollments for competitive exams, languages, and bootcamps.",
    icon: GraduationCap,
    badge: "High Intent",
    painPoint: "High cost per student enrollment and parent skepticism from generic marketing.",
    solution: "Authority-driven founder video ads, Free Demo Class booking funnels, and localized Google Search campaigns for commercial course queries.",
    metrics: [
      { label: "Cost Per Demo Class Attendee", value: "₹180 - ₹320" },
      { label: "Demo to Enrollment Rate", value: "48%" },
      { label: "Batch Fill Velocity", value: "14 Days" },
    ],
    deliverables: [
      "Google Search PPC for course keywords",
      "Meta video ads highlighting student rank results",
      "Interactive Demo Seat reservation landing page",
      "Parent counseling CRM and WhatsApp automated reminders",
    ],
  },
  {
    name: "Real Estate & Advisory",
    tagline: "Qualified site visits and HNI consultations for premium developers and advisors.",
    icon: Building2,
    badge: "HNI Pipeline",
    painPoint: "Flooded with junk leads, fake phone numbers, and unqualified tire-kickers.",
    solution: "Multi-step qualification quiz funnels that filter leads by budget and timeframe before connecting them to your sales directors.",
    metrics: [
      { label: "Verified HNI Site Visits", value: "45+ / month" },
      { label: "Lead Qualification Accuracy", value: "88%" },
      { label: "Pipeline Value Generated", value: "₹35 Cr+" },
    ],
    deliverables: [
      "Ultra-luxury Next.js property landing pages with virtual tours",
      "High-intent Google Ads & LinkedIn PPC campaigns",
      "OTP-verified lead qualification forms",
      "Dedicated CRM integration with sales notification triggers",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 container mx-auto">
      {/* Header */}
      <div className="mb-16 md:mb-20 space-y-4">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Industry Playbooks
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // unit economics · custom acquisition architectures · verified benchmarks
        </div>
        <p className="text-lg md:text-xl text-muted max-w-2xl font-light leading-relaxed pt-2">
          Every vertical operates under distinct customer acquisition physics. We deploy specialized funnels and creative frameworks tailored around your unit economics.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div
              key={idx}
              className="p-8 bg-[var(--background-layer-2)] border border-white/10 hover:border-primary/50 transition-all duration-300 rounded-xl flex flex-col justify-between space-y-8 group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary">
                    <Icon size={18} />
                  </div>
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-muted">
                    [ {ind.badge} ]
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif text-white">{ind.name}</h3>
                  <p className="font-mono text-xs text-primary/80 mt-1">// {ind.tagline}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="font-mono text-[10px] text-muted block mb-1">
                      bottleneck:
                    </span>
                    <p className="text-muted/80 font-light leading-relaxed">{ind.painPoint}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-primary block mb-1">
                      solution:
                    </span>
                    <p className="text-white/90 font-light leading-relaxed">{ind.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
                  {ind.metrics.map((m, i) => (
                    <div key={i} className="p-2.5 bg-[var(--background-layer-1)] border border-white/10 rounded-lg">
                      <span className="text-xs font-mono text-primary font-bold block">{m.value}</span>
                      <span className="text-[9px] text-muted block leading-tight mt-1">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href={`/free-audit?industry=${encodeURIComponent(ind.name)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-xs hover:bg-primary hover:text-black transition-all duration-300"
                >
                  <span>[ request {ind.name.split(" ")[0].toLowerCase()} audit ]</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
