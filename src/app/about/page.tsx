"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  BarChart3,
  CalendarCheck,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-28 pb-24 px-6 md:px-12 bg-background overflow-hidden selection:bg-primary selection:text-black">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-primary/10 via-zinc-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-4xl space-y-20 md:space-y-28">
        {/* ========================================================= */}
        {/* HERO SECTION (Visual with Heading on it)                  */}
        {/* ========================================================= */}
        <section className="space-y-8">
          {/* Main Visual Hero Card with Heading on it */}
          <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="/images/about/studio-workspace.jpg"
              alt="NextCurrent Studio - Digital marketing and web development"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover filter brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Content layered directly on top of the visual */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-primary/30 text-primary text-xs font-mono w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NextCurrent Media</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-2xl">
                Digital marketing and web development, run like a system.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed">
                We connect strategy, creative execution, and measurement for growing brands and businesses in India and worldwide.
              </p>
            </div>
          </div>

          {/* Quick Intro Note */}
          <div className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Founded in Uttarakhand, operating globally. One dedicated team for your website, social media, SEO, and advertising.
            </p>
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition shrink-0 w-fit"
            >
              <span>Work With Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WHY WE STARTED                                            */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              // THE PROBLEM
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Why we started
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            <p>
              As a business grows, its website, content, and advertising can drift apart. Different people run different channels, while the audience, offer, and business goals lose their connection.
            </p>
            <p>
              We built NextCurrent to fix that: <strong className="text-white font-medium">one team, one plan, and one place</strong> where every task, post, report, and invoice lives. Our clients get their own client portal, so they always know what is happening without chasing anyone.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* HOW WE WORK WITH YOU                                      */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              // OUR PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              How we work with you
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            <p>
              Start from the stage you are in: launching a brand, strengthening an online presence, or improving an existing marketing system. Your audience and markets shape the plan, whether your customers discover you online, through professional services, or through a physical location.
            </p>
            <p>
              Every engagement starts with a free audit. You see your scores, we agree on goals, and then we do the work, with your approval on anything that goes public. Each month you get a report with the numbers and the next steps.
            </p>
          </div>

          {/* 3 Principles: Clear, Consistent, Measurable */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-3">
              <h3 className="text-lg font-serif font-bold text-primary">Clear</h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Plain language, honest advice, and no jargon. If something will not work for your business, we say so.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-3">
              <h3 className="text-lg font-serif font-bold text-primary">Consistent</h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Marketing works when it happens every week. Our system makes sure the posts go out and the fixes get done.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-3">
              <h3 className="text-lg font-serif font-bold text-primary">Measurable</h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Scores, numbers, and monthly reports, so you can see what your money is doing.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WHAT EVERY CLIENT GETS                                    */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              // CLIENT EXPERIENCE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              What every client gets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">Your own client portal</h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                See tasks, approve posts, send requests, and open reports and invoices in one place, any time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">One team for every channel</h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                SEO, Google Business Profile, social media, ads, and your website work together instead of five separate freelancers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">You keep control</h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Accounts stay in your name. We work through partner access, never by asking for your passwords.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">Numbers you can check</h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Audits scored out of 100, monthly reports, and a plan you can hold us to.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* LET'S SEE WHERE YOU STAND (CTA)                           */}
        {/* ========================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[var(--background-layer-1)] border border-white/10 space-y-6 text-center sm:text-left">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Let&apos;s see where you stand
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
              Share your website or social profile and your growth goals. Get a review of the channels relevant to your business, with clear priorities and practical fixes. Free, with no obligation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/free-audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition duration-300 shadow-[0_0_20px_rgba(197,160,89,0.25)]"
            >
              <span>Claim Free Brand Audit</span>
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
