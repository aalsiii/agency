"use client";

import { process, values } from "@/lib/about-data";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 container mx-auto">
            {/* Hero Section */}
            <section className="mb-24 md:mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1]"
                    >
                        We define the <br />
                        <span className="text-white/40 italic">digital landscape.</span>
                    </motion.h1>

                    <div className="space-y-6 text-xl text-muted max-w-lg">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Born from a desire to bridge the gap between aesthetics and functionality, we are a collective of dreamers, doers, and digital artisans.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            We believe that great design is not just about how things look, but how they work.
                        </motion.p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                        alt="Abstract Digital Vision"
                        fill
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>
            </section>

            {/* Values Section */}
            <section className="mb-32">
                <div className="mb-16">
                    <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Our DNA</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white max-w-2xl">
                        Guided by principles, <br /> driven by passion.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl hover:border-primary/30 transition-colors group"
                        >
                            <div className="mb-6 p-4 bg-primary/10 w-fit rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                                <value.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                            <p className="text-muted leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Process Section */}
            <section className="mb-32">
                <div className="mb-16 md:text-center">
                    <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">How We Work</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white">
                        From concept to <span className="italic text-white/50">reality.</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-8 md:gap-0 relative">
                    {/* Vertical Line for Desktop */}
                    <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                    {process.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col md:flex-row gap-8 md:gap-24 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                        >
                            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                <h3 className="text-3xl font-serif font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-muted text-lg leading-relaxed max-w-md mx-auto md:mx-0 inline-block">{step.description}</p>
                            </div>

                            <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-zinc-950 border border-primary text-primary font-bold shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                                {step.step}
                            </div>

                            <div className="md:w-1/2 opacity-20 hidden md:block">
                                {/* Placeholder or spacer for balance */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
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
