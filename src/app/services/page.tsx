"use client";

import { services } from "@/lib/services";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 container mx-auto">
            <div className="mb-16 md:mb-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-serif text-primary mb-6"
                >
                    Our Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl text-muted max-w-2xl"
                >
                    We offer a comprehensive suite of digital solutions designed to elevate your brand and drive sustainable growth.
                </motion.p>
            </div>

            <div className="flex flex-col gap-24 md:gap-32">
                {services.map((service, index) => (
                    <motion.section
                        key={service.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="grid md:grid-cols-12 gap-10 md:gap-16 items-start border-t border-white/20 pt-16"
                    >
                        {/* Service ID & Title */}
                        <div className="md:col-span-4">
                            <span className="text-secondary/60 text-sm font-bold tracking-widest uppercase mb-4 block">
                                {service.id}
                            </span>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-secondary/10 rounded-lg text-primary">
                                    <service.icon size={32} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold">
                                    {service.title}
                                </h2>
                            </div>
                        </div>

                        {/* Description & Features */}
                        <div className="md:col-span-8">
                            <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
                                {service.longDescription}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group">
                                        <CheckCircle2 className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors flex-shrink-0" />
                                        <span className="text-white/80 group-hover:text-white transition-colors">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                ))}
            </div>

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-32 relative rounded-3xl overflow-hidden py-32 px-6"
            >
                <div className="absolute inset-0 bg-zinc-900/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-80 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block"
                    >
                        <h2 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1]">
                            Have an idea? <br />
                            <span className="text-white/40 italic">Let's craft it.</span>
                        </h2>
                    </motion.div>

                    <p className="text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        We partner with ambitious brands to create digital experiences that define the future.
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
        </main>
    );
}
