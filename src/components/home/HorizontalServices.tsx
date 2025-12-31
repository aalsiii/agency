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
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div>
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase block mb-6">Our Expertise</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                            We Make It <br /> Happen.
                        </h2>
                    </div>
                    <Link href="/services" className="hidden md:flex group items-center gap-3 text-white/60 hover:text-primary transition-colors text-xs tracking-[0.2em] uppercase pb-2 border-b border-transparent hover:border-primary/30">
                        View All Services
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                            className="group relative p-8 h-[380px] bg-[var(--background-layer-2)] border border-white/20 hover:bg-[var(--surface-highlight)] hover:border-primary/40 backdrop-blur-sm flex flex-col justify-between transition-all duration-500 rounded-lg overflow-hidden"
                        >
                            {/* Permanent Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-100 pointer-events-none" />

                            <div className="relative z-10">
                                <span className="text-6xl font-serif text-primary/20 block mb-8 font-bold select-none">
                                    {service.id}
                                </span>
                                <h3 className="text-3xl font-serif text-primary mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-white/80 text-base font-light leading-relaxed max-w-[90%]">
                                    {service.description}
                                </p>
                            </div>

                            <div className="relative z-10 flex justify-end">
                                <div className="w-12 h-12 rounded-full border border-primary bg-primary text-black flex items-center justify-center transition-all duration-500 scale-100">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 md:hidden text-center">
                    <Link href="/services" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold">
                        All Services <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

