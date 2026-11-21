"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  Target,
  Search,
  Calendar,
  MessageSquare,
  FileText,
  DollarSign,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  LogOut,
  Send,
  Sparkles,
  Download,
  AlertCircle,
  HelpCircle,
  Layers,
  ChevronRight,
  Shield,
  Activity,
  Zap,
} from "lucide-react";

interface ClientPortalProps {
  client: {
    clientId: string;
    email: string;
    name: string;
    companyName: string;
    plan: string;
  };
}

interface CampaignItem {
  id: string;
  name: string;
  platform: "Meta Ads" | "Google Search" | "Organic SEO" | "YouTube";
  status: "Live & Scaling" | "Optimizing" | "In Review";
  budgetMonthly: string;
  spendThisMonth: string;
  conversions: string;
  cpa: string;
  roas: string;
  audience: string;
  objective: string;
  adCreatives: {
    hook: string;
    type: string;
    tag: string;
    status: string;
  }[];
}

interface WeeklyUpdate {
  week: string;
  dates: string;
  headline: string;
  summary: string;
  wins: string[];
  nextSteps: string[];
  author: string;
}

const mockCampaigns: CampaignItem[] = [
  {
    id: "camp-1",
    name: "Meta Advantage+ Himalayan Retreat Bookings Funnel",
    platform: "Meta Ads",
    status: "Live & Scaling",
    budgetMonthly: "₹45,000 / mo",
    spendThisMonth: "₹21,450",
    conversions: "18 Confirmed Bookings",
    cpa: "₹1,190 / booking",
    roas: "4.12x",
    audience: "Wellness, Yoga Philosophy, Rishikesh Pilgrims (India & Global Tier 1)",
    objective: "Direct high-ticket retreat reservations & WhatsApp admissions chats",
    adCreatives: [
      {
        hook: "Sunrise Meditation at Tapovan: 7 days that will alter your nervous system",
        type: "Reel Video (9:16)",
        tag: "Top Performer",
        status: "4.8x ROAS",
      },
      {
        hook: "Why traditional ashram yoga isn't like commercial studio classes",
        type: "Carousel (1:1)",
        tag: "High Engagement",
        status: "3.6x ROAS",
      },
      {
        hook: "From Corporate Burnout to Inner Stillness in the Himalayas",
        type: "Story Video (9:16)",
        tag: "Scale Winner",
        status: "4.2x ROAS",
      },
    ],
  },
  {
    id: "camp-2",
    name: "Google High-Intent Search: Yoga Teacher Training (YTT 200/300 Hr)",
    platform: "Google Search",
    status: "Live & Scaling",
    budgetMonthly: "₹30,000 / mo",
    spendThisMonth: "₹14,200",
    conversions: "24 Syllabus Applications",
    cpa: "₹591 / application",
    roas: "3.55x",
    audience: "High-intent searchers: 'Rishikesh yoga teacher training accredited certified'",
    objective: "Capture high-intent organic and paid search queries at decision stage",
    adCreatives: [
      {
        hook: "Yoga Alliance Certified 200-Hour YTT in Rishikesh | Small Cohorts of 12",
        type: "Search Ad",
        tag: "10.2% CTR",
        status: "Position 1.2",
      },
      {
        hook: "Authentic Himalayan Yogic Lineage · Residential Retreat Packages",
        type: "Search Ad",
        tag: "8.7% CTR",
        status: "Position 1.6",
      },
    ],
  },
  {
    id: "camp-3",
    name: "Organic Search Authority Engine & Technical SEO Dominance",
    platform: "Organic SEO",
    status: "Live & Scaling",
    budgetMonthly: "Included in Retainer",
    spendThisMonth: "N/A (Organic)",
    conversions: "43.3K Organic Clicks",
    cpa: "₹0 Organic",
    roas: "Organic Compound",
    audience: "Google Global Search (India, US, UK, Germany, Australia)",
    objective: "Rank #1 for Rishikesh wellness retreats, kundalini awakening, and ashram stays",
    adCreatives: [
      {
        hook: "Complete Guide: Authentic Ashram Stays in Rishikesh (2026 Edition)",
        type: "Pillar Guide",
        tag: "Rank #1 on Google",
        status: "18.4K Clicks/mo",
      },
      {
        hook: "Pranayama Breathing Techniques for Nervous System Regulation",
        type: "Cluster Article",
        tag: "Featured Snippet",
        status: "11.2K Clicks/mo",
      },
    ],
  },
];

const mockWeeklyUpdates: WeeklyUpdate[] = [
  {
    week: "Week 47",
    dates: "Nov 17 - Nov 23, 2026",
    headline: "Retreat Booking Surge & Ad Fatigue Creative Refresh",
    summary:
      "We rotated 3 fresh reel hooks focusing on student transformations and quiet Himalayan dawn footage. The new batch decreased CPA by 22% while boosting booking form completions. In addition, our technical crawl fixed 14 canonical URL redirects on the booking engine.",
    wins: [
      "18 new retreat booking inquiries logged at an average CPA of ₹1,190",
      "Overall blended ROAS reached 4.12x on Meta Ads",
      "Fixed mobile viewport latency on the syllabus download modal",
    ],
    nextSteps: [
      "Launch Google Search retargeting audience for visitors who viewed curriculum",
      "Test 2 video hooks recorded with authentic ambient soundscapes",
      "Publish monthly organic ranking report",
    ],
    author: "Akshat Bijalwan · Principal Strategist",
  },
  {
    week: "Week 46",
    dates: "Nov 10 - Nov 16, 2026",
    headline: "Custom Conversions Calibration & High-Intent WhatsApp Funnel",
    summary:
      "Calibrated direct-to-WhatsApp ad triggers with automated intake questions. This filter cut out unqualified inquiries and routed serious retreat aspirants straight to your admissions team.",
    wins: [
      "24 qualified WhatsApp conversations initiated",
      "Cost per verified lead dropped from ₹1,650 to ₹1,180",
      "Google Search impression share surpassed 78% in target tier 1 metros",
    ],
    nextSteps: [
      "Draft next month's organic SEO topic clusters",
      "Record new founder video addressing common international student questions",
    ],
    author: "Akshat Bijalwan · Principal Strategist",
  },
  {
    week: "Week 45",
    dates: "Nov 03 - Nov 09, 2026",
    headline: "Next.js Mobile Speed Overhaul & Core Web Vitals 94",
    summary:
      "Engineered responsive image delivery and stripped redundant third-party tracker scripts. The mobile PageSpeed score improved from 64 to 94, ensuring visitors on cellular connections experience instant page loads.",
    wins: [
      "Largest Contentful Paint reduced to 1.1s",
      "Mobile bounce rate dropped by 18%",
      "Completed Google Search Console sitemap re-indexing",
    ],
    nextSteps: [
      "Scale ad budget on winning 'Sunrise Meditation' creative",
      "A/B test the primary booking CTA button copy",
    ],
    author: "Akshat Bijalwan · Principal Strategist",
  },
];

export default function ClientPortalDashboard({ client }: ClientPortalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"campaigns" | "updates" | "roadmap" | "billing">("campaigns");
  const [requestText, setRequestText] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/client/auth/logout", { method: "POST" });
      router.push("/portal/login");
      router.refresh();
    } catch {
      router.push("/portal/login");
    }
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    setRequestSent(true);
    setTimeout(() => {
      setRequestText("");
      setRequestSent(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#C5A059] selection:text-black">
      {/* Top Client Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center font-bold text-[#C5A059] font-serif text-sm">
              {client.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base tracking-tight text-white">
                  {client.companyName}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                  ● Retainer Active
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">
                {client.name} · {client.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919389403190"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-1.5 transition"
            >
              <span>WhatsApp Strategist</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-950/40 border border-white/10 hover:border-red-500/30 text-neutral-400 hover:text-red-400 transition cursor-pointer"
              title="Sign Out of Client Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container mx-auto px-6 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs font-mono pt-1">
          <button
            onClick={() => setActiveTab("campaigns")}
            className={`py-3 px-3 border-b-2 transition cursor-pointer shrink-0 ${
              activeTab === "campaigns"
                ? "border-[#C5A059] text-white font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Live Campaigns & Ads ({mockCampaigns.length})
          </button>
          <button
            onClick={() => setActiveTab("updates")}
            className={`py-3 px-3 border-b-2 transition cursor-pointer shrink-0 ${
              activeTab === "updates"
                ? "border-[#C5A059] text-white font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Weekly Updates & Reports
          </button>
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`py-3 px-3 border-b-2 transition cursor-pointer shrink-0 ${
              activeTab === "roadmap"
                ? "border-[#C5A059] text-white font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Upcoming Roadmap
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`py-3 px-3 border-b-2 transition cursor-pointer shrink-0 ${
              activeTab === "billing"
                ? "border-[#C5A059] text-white font-bold"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            Retainer & Billing
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Strategist Card & Active Plan */}
        <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-mono text-xs text-[#C5A059] uppercase tracking-wider">
              Assigned Growth Squad
            </div>
            <h2 className="text-xl font-serif font-bold text-white">
              {client.plan}
            </h2>
            <p className="text-xs text-neutral-400">
              Direct strategist access: <strong className="text-white">Akshat Bijalwan</strong> (Principal Growth Architect) · 24h SLA response
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:bijalwanakshat@gmail.com?subject=Client%20Portal%20Inquiry%20from%20Yogamani"
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white hover:border-[#C5A059]/40 transition"
            >
              Email Strategist
            </a>
            <a
              href="https://wa.me/919389403190"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#d6b268] transition"
            >
              Direct WhatsApp
            </a>
          </div>
        </div>

        {/* 4 Key Performance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Active Campaigns</span>
              <Target className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="text-3xl font-bold font-serif text-white">3 Running</div>
            <div className="text-[11px] font-mono text-emerald-400">● 100% System Uptime</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Monthly Impressions</span>
              <Activity className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="text-3xl font-bold font-serif text-white">342.8K</div>
            <div className="text-[11px] font-mono text-emerald-400">▲ +42% vs last month</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Qualified Bookings</span>
              <Zap className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="text-3xl font-bold font-serif text-white">38 Bookings</div>
            <div className="text-[11px] font-mono text-neutral-400">Avg CPA: ₹1,180</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>Blended ROAS</span>
              <TrendingUp className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="text-3xl font-bold font-serif text-white">3.82x</div>
            <div className="text-[11px] font-mono text-emerald-400">Above Retainer Target (3.0x)</div>
          </div>
        </div>

        {/* TAB 1: Live Campaigns & Ads */}
        {activeTab === "campaigns" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Active Performance Campaigns
                </h3>
                <p className="text-xs text-neutral-400">
                  Real-time visibility into all ad sets, search campaigns, and organic engines currently executing for your brand.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {mockCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059]">
                          {camp.platform}
                        </span>
                        <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {camp.status}
                        </span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-white mt-1.5">
                        {camp.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-right">
                      <div>
                        <div className="text-neutral-500">Spend this month</div>
                        <div className="font-bold text-white">{camp.spendThisMonth}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500">Conversions</div>
                        <div className="font-bold text-[#C5A059]">{camp.conversions}</div>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-neutral-500 text-[10px] uppercase">Objective</span>
                      <p className="text-neutral-200">{camp.objective}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-neutral-500 text-[10px] uppercase">Target Audience</span>
                      <p className="text-neutral-200">{camp.audience}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-neutral-500 text-[10px] uppercase">Performance Metrics</span>
                      <p className="text-neutral-200">
                        ROAS: <strong className="text-emerald-400">{camp.roas}</strong> · CPA: <strong className="text-white">{camp.cpa}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Active Creatives Gallery */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono text-neutral-400 flex items-center justify-between">
                      <span>Live Creative Hooks & Ad Formats ({camp.adCreatives.length})</span>
                      <span className="text-[10px] text-[#C5A059]">Managed & Rotated Weekly</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {camp.adCreatives.map((creative, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-3 hover:border-[#C5A059]/30 transition"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="text-neutral-400">{creative.type}</span>
                              <span className="px-2 py-0.5 rounded bg-[#C5A059]/10 text-[#C5A059] font-bold">
                                {creative.tag}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-200 font-light leading-snug">
                              &ldquo;{creative.hook}&rdquo;
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 pt-2 border-t border-white/5">
                            <span>Status</span>
                            <span className="font-semibold">{creative.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Weekly Updates & Feed */}
        {activeTab === "updates" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Weekly Strategist Performance Briefs
              </h3>
              <p className="text-xs text-neutral-400">
                End-of-week executive summaries logged by your dedicated account strategist.
              </p>
            </div>

            <div className="space-y-6">
              {mockWeeklyUpdates.map((update, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 font-mono text-xs font-bold text-[#C5A059]">
                        {update.week}
                      </span>
                      <h4 className="font-serif font-bold text-base text-white">
                        {update.headline}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">
                      {update.dates}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {update.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Key Wins */}
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Key Wins This Week</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-300">
                        {update.wins.map((w, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Next Steps */}
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-purple-400 font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Next Week Execution Sprints</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-300">
                        {update.nextSteps.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span>Logged by: <strong className="text-neutral-300">{update.author}</strong></span>
                    <span className="text-emerald-400">Verified by Attribution Engine</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Upcoming Roadmap */}
        {activeTab === "roadmap" && (
          <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Sprint Roadmap & Upcoming Milestones
              </h3>
              <p className="text-xs text-neutral-400">
                Strategic initiatives scheduled for execution across search, paid media, and web performance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center font-mono text-xs text-[#C5A059] shrink-0">
                    25
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      Google Performance Max Campaign Expansion
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      Scaling high-converting video and display assets across YouTube and Maps for international yoga inquiries.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] shrink-0">
                  Nov 25, 2026
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center font-mono text-xs text-[#C5A059] shrink-0">
                    28
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      Bi-Weekly Creative Refresh Batch
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      A/B testing 4 new high-retention reel hooks to prevent ad fatigue and maintain sub-₹1,200 booking CPAs.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] shrink-0">
                  Nov 28, 2026
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center font-mono text-xs text-[#C5A059] shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      Monthly Executive ROI Audit & Attribution Review
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      Deep-dive video teardown with your team examining November pipeline revenue, student lifetime value, and budget reallocation for December.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] shrink-0">
                  Dec 01, 2026
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Billing & Retainer */}
        {activeTab === "billing" && (
          <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Retainer Terms & Invoices
                </h3>
                <p className="text-xs text-neutral-400">
                  Transparent month-to-month agreement · No lock-in contracts · Dedicated engineering & ad management
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-neutral-400">Current Retainer Status</div>
                <div className="font-bold text-emerald-400 font-mono text-sm">Active & In Good Standing</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-white">Invoice #NC-2026-10</span>
                  <div className="text-neutral-500 text-[11px]">October Retainer (Paid on Nov 02, 2026)</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                    PAID
                  </span>
                  <button
                    onClick={() => alert("Downloading receipt PDF...")}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-white">Invoice #NC-2026-11</span>
                  <div className="text-neutral-500 text-[11px]">November Retainer (Due on Dec 01, 2026)</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold">
                    CURRENT CYCLE
                  </span>
                  <button
                    onClick={() => alert("Viewing invoice summary...")}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Direct Strategist Request Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c0c0c] to-[#141414] border border-[#C5A059]/30 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059]">
            <Sparkles className="w-4 h-4" />
            <span>Priority Client Hotline</span>
          </div>

          <h3 className="text-base font-serif font-bold text-white">
            Need a creative revision, new campaign request, or strategy sync?
          </h3>

          <p className="text-xs text-neutral-400 max-w-xl">
            Submit your request directly to your strategist desk. Messages submitted here trigger high-priority alerts to Akshat.
          </p>

          {requestSent ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Thank you! Your request was received and routed to Akshat. We will reply within 4 hours.</span>
            </div>
          ) : (
            <form onSubmit={handleSendRequest} className="space-y-3">
              <textarea
                rows={3}
                required
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="e.g. Can we test a new hook highlighting our December Winter Solstice retreat dates? Here are the dates..."
                className="w-full p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A059]/60"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#d6b268] text-black font-semibold text-xs tracking-wider uppercase transition flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Strategist</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-neutral-500">
        <p>&copy; {new Date().getFullYear()} NextCurrent Media · Secure Client Enclave</p>
      </footer>
    </div>
  );
}
