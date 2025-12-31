"use client";

import { process, values } from "@/lib/about-data";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

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
                {/* Hero Header - Kept as requested */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 md:mb-8"
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-primary mb-8 tracking-tighter">
                        About Us
                    </h1>
                    <p className="text-xl md:text-2xl text-muted max-w-4xl leading-relaxed font-light">
                        We are a forward-thinking creative agency dedicated to bridging the gap between sophisticated aesthetics and high-performance functionality. Our collective of designers, engineers, and digital strategists work at the intersection of architectural precision and artistic intuition, crafting bespoke digital experiences that don't just look stunning—they drive meaningful impact.
                    </p>
                </motion.div>

                {/* Team Lead Section - Sandwich Layer 1 */}
                <section className="mb-16 md:mb-24 pt-24 pb-24 -mx-6 md:-mx-12 px-6 md:px-12 bg-[var(--background-layer-1)] border-y border-white/20">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5 max-w-screen-xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden group flex-shrink-0"
                        >
                            <img
                                src="/images/team-lead.jpg"
                                alt="Team Lead"
                                className="w-full h-full object-cover grayscale transition-transform duration-1000 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-40" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-xl space-y-6"
                        >
                            <div className="space-y-3">
                                <span className="text-primary font-bold uppercase tracking-widest text-xs">Creative Direction</span>
                                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">Our Focus</h2>
                                <div className="h-px w-16 bg-primary/30" />
                            </div>

                            <div className="space-y-4 text-base md:text-lg text-muted/80 font-light leading-relaxed">
                                <p>
                                    Our technical direction is guided by a commitment to making digital growth accessible and straightforward. We focus on building robust, scalable solutions that solve real business challenges without unnecessary complexity, ensuring your technology evolves with your needs.
                                </p>
                                <p>
                                    We work closely with our partners to ensure the technology we build serves their long-term strategic goals, providing a solid foundation for sustainable growth. It's about more than just code; it's about building a resilient digital presence that works as hard as you do, day in and day out.
                                </p>
                                <p>
                                    By prioritizing clarity and efficiency, we help businesses navigate the complexities of the digital landscape with confidence, turning ambitious visions into functional realities.
                                </p>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="/contact"
                                    className="text-primary hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm font-medium"
                                >
                                    Let's discuss your vision <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Our Philosophy Section - Base Background (Sandwich Middle) */}
                <section className="mb-16 md:mb-24 pt-12">
                    <div className="max-w-3xl space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                                <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-tight">Our Philosophy</h2>
                            </div>
                            <p className="text-lg md:text-xl text-muted/80 font-light leading-relaxed">
                                We believe good design should feel effortless and grounded in purpose. Every detail matters, from the way a page moves to how it makes someone feel.
                            </p>
                        </div>

                        <div className="space-y-6 text-lg md:text-xl text-muted/80 font-light leading-relaxed max-w-2xl">
                            <p>
                                Our approach combines architectural precision with artistic intuition to create digital landscapes that are both beautiful and high-performing.
                            </p>
                            <p>
                                At Visuaria, design is not just about how things look but how clearly they communicate and how seamlessly they perform. We craft digital identities that define the future of brands.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Values Section - Sandwich Layer 1 */}
                <section className="mb-24 md:mb-32 relative py-24 -mx-6 md:-mx-12 px-6 md:px-12 bg-[var(--background-layer-1)] border-y border-white/20">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl md:text-6xl font-serif text-primary tracking-tight">Our Values</h2>
                    </div>

                    <div className="relative">
                        {/* Central Spine Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                        <div className="space-y-16 md:space-y-0">
                            {values.map((value, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <div key={index} className="relative min-h-[200px] md:min-h-[250px] flex items-center">
                                        {/* Connector Line */}
                                        <div
                                            className={`absolute top-1/2 w-8 md:w-16 h-px bg-white/20 
                                                ${isEven ? 'right-1/2' : 'left-1/2'}`}
                                        />

                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, delay: index * 0.1 }}
                                            className={`w-1/2 px-4 md:px-12 
                                                ${isEven ? 'mr-auto text-right' : 'ml-auto text-left'}`}
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

                {/* CTA Section - Consistent with other pages */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden py-32 px-6"
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
                                Create Bold. <br />
                                <span className="text-white/40 italic">Deliver Better.</span>
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
            </div>
        </main>
    );
}
