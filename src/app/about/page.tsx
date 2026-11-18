"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { values } from "@/lib/about-data";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background overflow-hidden">
      {/* Background Aesthetics */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/30 via-background to-background pointer-events-none" />

      {/* Background Stroke Text */}
      <div className="absolute top-1/4 -right-20 pointer-events-none select-none overflow-hidden">
        <span className="text-[15rem] md:text-[25rem] font-serif font-black text-stroke uppercase leading-none opacity-20">
          About
        </span>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
            The Agency & Philosophy
          </h1>
          <div className="font-mono text-xs text-primary/80">
            // founded in Uttarakhand · operating worldwide · month-to-month retainers
          </div>
          <p className="text-lg md:text-2xl text-muted max-w-4xl leading-relaxed font-light pt-2">
            NextCurrent Media is a growth engineering and performance marketing studio. We align creative ad production directly with sub-second Next.js conversion architecture, ensuring every visitor has a frictionless path to inquiry.
          </p>
        </motion.div>

        {/* Focus Section - Sandwich Layer 1 */}
        <section className="mb-16 md:mb-24 pt-20 pb-20 -mx-6 md:-mx-12 px-6 md:px-12 bg-[var(--background-layer-1)] border-y border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-6"
            >
              <div className="space-y-3">
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                  Our Focus & Standards
                </h2>
                <div className="font-mono text-xs text-primary/70">
                  // unit economics over vanity metrics
                </div>
              </div>

              <div className="space-y-4 text-base md:text-lg text-muted/80 font-light leading-relaxed">
                <p>
                  Our work is guided by one principle: digital growth must be measurable, predictable, and unit-economic positive. We eliminate the gap between ad creative hooks and post-click web conversion.
                </p>
                <p>
                  We partner with ambitious founders to build custom Next.js web applications, Google search topical authority clusters, and high-converting Meta acquisition flywheels that compound over time.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="font-mono text-xs text-primary hover:text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <span>[ discuss your pipeline goals ]</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-16 md:mb-24 pt-12">
          <div className="max-w-3xl space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-tight">
                  Our Philosophy
                </h2>
              </div>
              <p className="text-lg md:text-xl text-muted/80 font-light leading-relaxed">
                We believe exceptional growth marketing should feel effortless and grounded in architectural discipline. Every millisecond of load speed matters, and every creative hook speaks directly to customer psychology.
              </p>
            </div>
          </div>
        </section>

        {/* Central Spine Values Section */}
        <section className="mb-24 md:mb-32 relative py-24 -mx-6 md:-mx-12 px-6 md:px-12 bg-[var(--background-layer-1)] border-y border-white/20">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-serif text-primary tracking-tight">Our Values</h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            <div className="space-y-16 md:space-y-0">
              {values.map((value, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className="relative min-h-[200px] md:min-h-[250px] flex items-center">
                    <div
                      className={`absolute top-1/2 w-8 md:w-16 h-px bg-white/20 ${
                        isEven ? "right-1/2" : "left-1/2"
                      }`}
                    />

                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`w-1/2 px-4 md:px-12 ${
                        isEven ? "mr-auto text-right" : "ml-auto text-left"
                      }`}
                    >
                      <div className="space-y-2 md:space-y-4">
                        <h3 className="text-xl md:text-4xl font-serif text-primary tracking-tight">
                          {value.title}
                        </h3>
                        <p className="text-muted text-sm md:text-xl font-medium leading-relaxed max-w-md mx-auto md:mx-0 inline-block">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden py-32 px-6 text-center"
        >
          <div className="absolute inset-0 bg-zinc-900/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-80 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1]">
              Create Bold. <br />
              <span className="text-white/40 italic">Deliver Better.</span>
            </h2>

            <p className="text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              We partner with ambitious brands to create digital experiences and client funnels that define the future.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-lg font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-10 py-5 rounded-full hover:bg-primary hover:text-black transition-all duration-500"
            >
              Start Your Project
              <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
