"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  TrendingUp,
  Shield,
  Cpu,
  MapPin,
  CheckCircle2,
  Terminal,
  Zap,
  Globe2,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { values } from "@/lib/about-data";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-28 px-4 sm:px-6 md:px-12 bg-background overflow-hidden text-foreground">
      {/* Background Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[60vw] h-[40vh] bg-primary/[0.03] blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[40vw] h-[50vh] bg-blue-500/[0.02] blur-[180px] rounded-full pointer-events-none" />

      {/* Decorative Stroke Text */}
      <div className="absolute top-24 -right-10 pointer-events-none select-none overflow-hidden opacity-10">
        <span className="text-[12rem] sm:text-[18rem] md:text-[24rem] font-serif font-black text-stroke uppercase leading-none">
          Next
        </span>
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl space-y-24">
        {/* HERO SECTION */}
        <section className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>THE AGENCY & PHILOSOPHY</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-medium text-white tracking-tight leading-[1.1]">
              Where technical engineering meets direct-response growth.
            </h1>

            <div className="font-mono text-xs text-primary/80 pt-1">
              // founded in uttarakhand · operating worldwide · month-to-month retainers
            </div>

            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl pt-2">
              NextCurrent is a direct-response engineering and performance marketing studio. We eliminate the costly disconnect between visual design, sub-second web architecture, and profitable customer acquisition.
            </p>
          </motion.div>

          {/* Visual Showcase Collage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4"
          >
            {/* Card 1: Founder & Architect */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c11] aspect-[4/5] shadow-xl hover:border-primary/50 transition-all duration-500">
              <Image
                src="/images/founder.jpg"
                alt="Akshat Bijalwan - Founder & Lead Architect"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="font-mono text-[10px] text-primary uppercase tracking-wider block">
                  // LEAD ARCHITECT
                </span>
                <span className="font-sans font-medium text-sm text-white block">
                  Akshat Bijalwan
                </span>
                <span className="font-mono text-[11px] text-neutral-400 block">
                  Founder & Systems Engineer
                </span>
              </div>
            </div>

            {/* Card 2: Sub-Second Next.js Engineering */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c11] aspect-[4/5] shadow-xl hover:border-primary/50 transition-all duration-500">
              <Image
                src="/images/websites/admin-gallery.jpg"
                alt="Next.js Sub-Second Edge Architecture"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="font-mono text-[10px] text-primary uppercase tracking-wider block">
                  // EDGE SPEED ARCHITECTURE
                </span>
                <span className="font-sans font-medium text-sm text-white block">
                  Sub-400ms First Paint
                </span>
                <span className="font-mono text-[11px] text-neutral-400 block">
                  Zero Bloated WordPress Themes
                </span>
              </div>
            </div>

            {/* Card 3: Direct-Response Media Dashboard */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c11] aspect-[4/5] shadow-xl hover:border-primary/50 transition-all duration-500">
              <Image
                src="/images/marketing/meta-ads-dashboard.jpg"
                alt="Direct-Response Paid Advertising & Acquisition"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="font-mono text-[10px] text-primary uppercase tracking-wider block">
                  // CONVERSION MEDIA
                </span>
                <span className="font-sans font-medium text-sm text-white block">
                  4.2x Blended ROAS
                </span>
                <span className="font-mono text-[11px] text-neutral-400 block">
                  Multi-Touch Funnel Attribution
                </span>
              </div>
            </div>

            {/* Card 4: Himalayan Origin & Foothills Base */}
            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c11] aspect-[4/5] shadow-xl hover:border-primary/50 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                alt="NextCurrent Studio Origin - Rishikesh / Dehradun"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="font-mono text-[10px] text-primary uppercase tracking-wider block">
                  // STUDIO LOCATION
                </span>
                <span className="font-sans font-medium text-sm text-white block">
                  Rishikesh & Dehradun
                </span>
                <span className="font-mono text-[11px] text-neutral-400 block">
                  Uttarakhand · Global Clients
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: THE STUDIO METRICS / BY THE NUMBERS */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#0c0c11] border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            <div className="space-y-1 pt-4 lg:pt-0">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-white block">
                0.4s
              </span>
              <span className="font-mono text-xs text-primary uppercase tracking-wider block">
                Sub-Second Edge Render
              </span>
              <p className="text-xs text-neutral-400 font-light pt-1">
                Zero white-screen bounce on mobile ad traffic.
              </p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-8">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-[#C5A059] block">
                4.2x+
              </span>
              <span className="font-mono text-xs text-neutral-300 uppercase tracking-wider block">
                Verified Blended ROAS
              </span>
              <p className="text-xs text-neutral-400 font-light pt-1">
                Compounding returns on paid search and Meta campaigns.
              </p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-8">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-emerald-400 block">
                100%
              </span>
              <span className="font-mono text-xs text-neutral-300 uppercase tracking-wider block">
                Code & IP Ownership
              </span>
              <p className="text-xs text-neutral-400 font-light pt-1">
                Full repository access, zero vendor lock-in.
              </p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-8">
              <span className="text-3xl sm:text-5xl font-mono font-bold text-white block">
                0
              </span>
              <span className="font-mono text-xs text-primary uppercase tracking-wider block">
                Bloated Theme Plugins
              </span>
              <p className="text-xs text-neutral-400 font-light pt-1">
                Custom React & TypeScript architecture.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE DUAL DISCIPLINE (DESIGN/CODE VS CONVERSION MEDIA) */}
        <section className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">
              // THE DUAL ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-medium text-white tracking-tight">
              Why traditional agency silos fail modern brands.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Most businesses lose revenue in the gap between the creative ad and the web application. We unify both disciplines under a single cohesive architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Discipline 1: Code & Web Architecture */}
            <div className="p-8 rounded-3xl bg-[#0c0c11] border border-white/10 space-y-6 hover:border-primary/40 transition-all duration-300 group">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                <Image
                  src="/images/websites/valalino-web.jpg"
                  alt="High-Converting Web Architecture"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-mono text-[10px] text-primary">
                  [ 01 // BESPOKE WEB ARCHITECTURE ]
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-mono text-xs">
                  <Code2 size={15} />
                  <span>Sub-Second Next.js & React 19</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-medium text-white">
                  Conversion-First Web Engineering
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  We replace 40-plugin WordPress installations and generic Shopify themes with hand-crafted Next.js platforms. Featuring sub-400ms edge rendering, programmatic SEO architecture, and custom administrative CMS consoles.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-400">
                <span>TypeScript · Tailwind · Prisma</span>
                <Link href="/services/nextjs-development" className="text-primary hover:text-white transition-colors flex items-center gap-1">
                  <span>explore stack</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Discipline 2: Performance Marketing & Paid Funnels */}
            <div className="p-8 rounded-3xl bg-[#0c0c11] border border-white/10 space-y-6 hover:border-primary/40 transition-all duration-300 group">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                <Image
                  src="/images/social/valalino-feed.jpg"
                  alt="Direct-Response Paid Ads & Funnel Optimization"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-mono text-[10px] text-primary">
                  [ 02 // DIRECT-RESPONSE ACQUISITION ]
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-mono text-xs">
                  <TrendingUp size={15} />
                  <span>Meta Ads & Google High-Intent Search</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-medium text-white">
                  High-Converting Paid Media & Creatives
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Traffic without conversion is vanity. We script, design, and deploy pattern-interrupt video ads and static creatives, paired with high-intent search campaigns, multi-touch retargeting, and conversational qualification funnels.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-xs text-neutral-400">
                <span>Meta CAPI · Google Ads · CRO</span>
                <Link href="/services/performance-marketing" className="text-primary hover:text-white transition-colors flex items-center gap-1">
                  <span>explore ads</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FOUNDER & LEAD ARCHITECT SPOTLIGHT */}
        <section className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#0c0c14] to-[#12121e] border border-primary/30 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            {/* Portrait Frame */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-primary/40 bg-neutral-900 shrink-0 shadow-[0_0_30px_rgba(197,160,89,0.2)]">
              <Image
                src="/images/founder.jpg"
                alt="Akshat Bijalwan - Founder & Lead Architect"
                fill
                sizes="(max-width: 640px) 176px, 224px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Founder Narrative */}
            <div className="space-y-4 text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                <Shield size={12} />
                <span>FOUNDER & TECHNICAL ARCHITECT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium text-white tracking-tight">
                Akshat Bijalwan
              </h2>

              <p className="text-xs sm:text-sm font-mono text-primary/90">
                Lead Systems Architect · NextCurrent Media
              </p>

              <blockquote className="text-sm sm:text-base text-neutral-300 font-light italic leading-relaxed border-l-2 border-primary/50 pl-4 py-1 text-left">
                &ldquo;Most businesses suffer from an invisible leak: designers make pretty mockups without understanding conversion economics, developers write code without understanding marketing psychology, and media buyers send ad dollars to sluggish pages. NextCurrent was engineered to unify design, code, and growth into one compounding machine.&rdquo;
              </blockquote>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/book-a-call"
                  className="py-3 px-6 rounded-full bg-primary text-black font-semibold text-xs uppercase tracking-wider font-mono hover:bg-[#d6b066] transition shadow-lg inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Book a Strategy Call with Akshat</span>
                  <ArrowUpRight size={13} />
                </Link>

                <a
                  href="https://www.linkedin.com/in/akshat-bijalwan-2910a7378/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-primary/40 font-mono text-xs transition inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: CORE OPERATIONAL VALUES */}
        <section className="space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block">
              // CRAFTSMANSHIP PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-medium text-white tracking-tight">
              Our Core Operating Values
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Principles that govern every pull request, creative sprint, and client deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon || Sparkles;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-[#0c0c11] border border-white/10 hover:border-primary/40 transition-all duration-300 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                      <IconComp size={18} />
                    </div>
                    <span className="font-mono text-xs text-neutral-400">
                      // 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-sans font-medium text-white">
                    {val.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: HIMALAYAN FOOTHILLS TO GLOBAL REACH */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[var(--background-layer-1)] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-primary">
              <MapPin size={14} />
              <span>RISHIKESH & DEHRADUN · SERVING WORLDWIDE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
              Rooted in Uttarakhand. Engineered for global brands.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Based in the serene foothills of Uttarakhand, we combine craftsman focus and uninterrupted engineering discipline with edge-deployed infrastructure for clients in North America, Europe, the UAE, and India.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/contact"
              className="py-3 px-6 rounded-full bg-primary text-black font-semibold text-xs uppercase tracking-wider font-mono hover:bg-[#d6b066] transition text-center shadow-md cursor-pointer"
            >
              Start a Conversation
            </Link>
            <Link
              href="/work"
              className="py-3 px-6 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-primary/40 font-mono text-xs transition text-center"
            >
              [ View Case Studies ]
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
