"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  Clock,
  Sparkles,
  Award,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const operationSteps = [
  {
    step: "01",
    title: "We Understand Your Business & Ideal Customers",
    description:
      "Before touching a single ad or design file, we sit down with you to learn your margins, your best-paying customers, and exactly what makes your service special. No guesswork.",
  },
  {
    step: "02",
    title: "We Build Websites That Actually Turn Visitors Into Sales",
    description:
      "A pretty website that doesn't bring in inquiries is useless. We design modern, fast websites that look stunning on mobile, load instantly, and make it effortless for people to call, book, or buy.",
  },
  {
    step: "03",
    title: "We Bring Ready-to-Buy Customers to Your Door",
    description:
      "We launch targeted ads on Instagram, Facebook, and Google, combined with search engine optimization so when people search for what you offer, your business shows up first.",
  },
  {
    step: "04",
    title: "We Deliver Transparent Weekly Updates & Real Revenue",
    description:
      "Every week, you see exactly what was spent, how many bookings or leads came in, and what we're improving next. You never have to wonder what your marketing agency is doing.",
  },
];

const pillars = [
  {
    title: "Sales & Inquiries Over Vanity Likes",
    description:
      "We don't celebrate empty impressions or follower counts that don't pay your bills. Our primary goal is putting qualified customer inquiries, bookings, and revenue on your calendar.",
    icon: Target,
  },
  {
    title: "Direct Access to Your Strategist",
    description:
      "You will never be passed off to a junior account manager who doesn't understand your business. You get direct WhatsApp and email access to the senior team executing your work.",
    icon: Users,
  },
  {
    title: "Month-to-Month Flexibility",
    description:
      "We don't lock you into long, rigid 12-month contracts. We operate month-to-month and earn your trust every 30 days by delivering real, noticeable business growth.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background overflow-hidden selection:bg-primary selection:text-black">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/10 via-zinc-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-5xl space-y-24 md:space-y-32">
        {/* ========================================================= */}
        {/* 1. HERO SECTION                                           */}
        {/* ========================================================= */}
        <section className="space-y-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Growth & Performance Studio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.1]">
            We Help Businesses Get More <br className="hidden sm:inline" />
            <span className="italic font-light text-primary">Customers & Consistent Sales.</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 font-light max-w-3xl leading-relaxed">
            At NextCurrent Media, our job is simple: we help ambitious business owners grow their revenue. We build beautiful websites that convert visitors into paying clients, run high-return ads on Google and Instagram, and help you dominate your local and global market.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/start-a-project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition duration-300 shadow-[0_0_20px_rgba(197,160,89,0.25)]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/free-audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs transition duration-300"
            >
              <span>Get Free Marketing Audit →</span>
            </Link>
          </div>

          {/* Hero Studio Banner Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden border border-white/10 mt-12 shadow-2xl">
            <Image
              src="/images/about/studio-workspace.jpg"
              alt="NextCurrent Media workspace and digital growth team"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover filter brightness-90 hover:brightness-100 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <span className="font-mono text-xs text-primary uppercase tracking-wider">
                NextCurrent Studio
              </span>
              <p className="text-white text-base sm:text-xl font-serif font-medium mt-1">
                Where creative strategy, stunning design, and customer acquisition come together.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. WHO WE ARE                                             */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-primary/80 uppercase tracking-widest">
                // WHO WE ARE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
                A Dedicated Growth Partner, Not Another Middleman.
              </h2>
            </div>

            <p className="text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
              Most business owners are tired of dealing with agencies that make big promises, talk in confusing technical acronyms, and deliver zero actual sales.
            </p>

            <p className="text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
              We started NextCurrent Media to give ambitious founders a true competitive advantage. Based in Uttarakhand and serving clients worldwide, we combine world-class visual design with aggressive client acquisition systems.
            </p>

            <p className="text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
              Whether you run a high-end wellness retreat, a boutique eCommerce brand, or a premium service business, we treat your business like our own. Our single metric of success is whether your revenue grew this month.
            </p>

            <div className="pt-2">
              <div className="flex items-center gap-6 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Weekly Video Updates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 relative h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/about/strategy-session.jpg"
              alt="Strategic growth review session"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 space-y-1">
              <span className="font-mono text-xs text-primary">Strategic Alignment</span>
              <p className="text-sm font-serif text-white">
                Every strategy is built specifically around your margins, market, and growth targets.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. HOW WE OPERATE                                         */}
        {/* ========================================================= */}
        <section className="space-y-12">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-primary/80 uppercase tracking-widest">
              // HOW WE OPERATE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
              Simple, Predictable & Focused on Revenue.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              No complicated corporate bureaucracy. Here is the exact 4-step framework we use to scale our clients:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {operationSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[var(--background-layer-1)] border border-white/10 space-y-4 hover:border-primary/40 transition duration-300"
              >
                <div className="font-mono text-xs font-bold text-primary">
                  [ STEP {item.step} ]
                </div>
                <h3 className="text-xl font-serif font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. WHAT MAKES US DIFFERENT                                */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[var(--background-layer-1)] border border-white/10 space-y-10">
          <div className="space-y-3 text-center sm:text-left">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              // WHY CLIENTS CHOOSE US
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
              Built for Results, Not Excuses.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. FINAL CALL TO ACTION                                   */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[var(--background-layer-1)] to-neutral-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
              Ready to grow your customer base?
            </h2>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Book a quick strategy call with our team to explore how we can help you increase leads, bookings, and revenue.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/start-a-project"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition duration-300 shadow-[0_0_20px_rgba(197,160,89,0.3)]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs transition"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
