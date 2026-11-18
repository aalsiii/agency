"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";

import { services } from "@/lib/services";

export default function HorizontalServices() {
    return (
        <section className="relative py-32 bg-[var(--background-layer-1)] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-background to-background pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                            Acquisition channels & digital systems
                        </h2>
                        <div className="font-mono text-xs text-primary/70 mt-3">
                            // full-funnel growth architecture built for compounding scale
                        </div>
                    </div>
                    <Link href="/services" className="hidden md:flex group items-center gap-2 font-mono text-xs text-muted hover:text-primary transition-colors pb-1 border-b border-transparent hover:border-primary/30">
                        <span>[ view full capabilities ]</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                            className="group relative p-8 h-[380px] bg-[var(--background-layer-2)] border border-white/10 hover:border-primary/50 flex flex-col justify-between transition-all duration-300 rounded-xl overflow-hidden"
                        >
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs text-primary/70">
                                        [ 0{index + 1} // system ]
                                    </span>
                                </div>
                                <h3 className="text-2xl font-serif text-white group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted text-sm font-light leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className="font-mono text-[11px] text-muted/60">rolling retainer</span>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:text-white transition-colors"
                                >
                                    <span>explore</span>
                                    <ArrowRight size={12} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Link href="/services" className="font-mono inline-flex items-center gap-2 text-primary text-xs">
                        <span>[ view all services ]</span>
                        <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

