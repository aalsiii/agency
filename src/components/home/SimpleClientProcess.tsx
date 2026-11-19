"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  PenTool,
  Rocket,
  LineChart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function SimpleClientProcess() {
  const steps = [
    {
      step: "01",
      badge: "Week 1",
      title: "Discovery & Blueprint",
      plainDesc:
        "We jump on a private strategy session. We study your ideal clients, understand your offers, and create a complete visual roadmap before writing a single line of code.",
      icon: MessageSquare,
      deliverable: "Strategy Blueprint & Site Map",
    },
    {
      step: "02",
      badge: "Weeks 2–3",
      title: "Design, Copy & Build",
      plainDesc:
        "Our team writes your website copy, designs the high-end layouts, and builds the technical platform. You get private preview links to review and provide feedback.",
      icon: PenTool,
      deliverable: "Live Staging Preview Link",
    },
    {
      step: "03",
      badge: "Week 4",
      title: "Testing & Live Launch",
      plainDesc:
        "We connect your booking forms, WhatsApp buttons, Stripe or payment systems, and test every single button across iPhones and Androids before going live.",
      icon: Rocket,
      deliverable: "100% Turnkey Public Launch",
    },
    {
      step: "04",
      badge: "Month 2+",
      title: "Continuous Client Growth",
      plainDesc:
        "We don't abandon you after launch. We manage your Meta ads, write SEO articles, and optimize your site weekly so your student cohorts and calendars stay booked.",
      icon: LineChart,
      deliverable: "Weekly Growth & Inbound Telemetry",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#060608] border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-primary">
            <Sparkles size={13} />
            <span>Zero Headaches · 4-Week Turnaround</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            How Simple It Is to{" "}
            <span className="text-gold-gradient">
              Work With Us
            </span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            No endless meetings, no technical confusion, and no corporate red tape. Here is your clear roadmap from kickoff to launch.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="p-7 rounded-2xl bg-[#0c0c11] border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-lg hover:shadow-[0_15px_35px_rgba(197,160,89,0.15)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                      Step {s.step}
                    </span>
                    <span className="font-mono text-xs text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {s.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all">
                    <Icon size={18} />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {s.plainDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-primary">
                  <CheckCircle2 size={13} className="shrink-0" />
                  <span className="truncate">{s.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-black font-semibold text-xs tracking-wider shadow-[0_0_35px_rgba(197,160,89,0.35)] hover:bg-white transition-all duration-300"
          >
            <span>Start Your 4-Week Sprint</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
