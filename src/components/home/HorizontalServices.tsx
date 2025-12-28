"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";

const services = [
    { id: "01", title: "Web Design", desc: "Immersive digital experiences." },
    { id: "02", title: "Development", desc: "Robust and scalable code." },
    { id: "03", title: "Marketing", desc: "Data-driven global reach." },
    { id: "04", title: "Branding", desc: "Identity that resonates." },
    { id: "05", title: "Graphic Design", desc: "Visuals that speak volumes." },
];

export default function HorizontalServices() {
    return (
        <section className="relative py-40 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
            {/* Background Texture/Noise could go here */}

            <div className="container mx-auto px-6 mb-20 flex items-end justify-between relative z-10">
                <div>
                    <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase block mb-4">Our Expertise</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
                        We Make It <br /> Happen.
                    </h2>
                </div>
                <Link href="/services" className="hidden md:flex hover-trigger items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm tracking-widest uppercase mb-2">
                    All Services <ArrowRight size={16} />
                </Link>
            </div>

            <div className="flex overflow-x-auto pb-12 scrollbar-hide snap-x relative z-10">
                <div className="flex gap-8 px-6 min-w-max">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                            className="group relative w-[350px] md:w-[450px] h-[500px] p-10 bg-zinc-900/40 border border-white/10 backdrop-blur-sm flex flex-col justify-between hover:bg-zinc-900/60 hover:border-primary/30 transition-all duration-500 snap-center hover-trigger cursor-none"
                        >
                            <div className="relative z-10">
                                <span className="text-7xl font-serif text-white/5 group-hover:text-primary/10 transition-colors duration-500 block mb-12 font-bold">
                                    {service.id}
                                </span>
                                <h3 className="text-4xl font-serif text-white mb-4 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                                <p className="text-muted text-lg font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300">{service.desc}</p>
                            </div>

                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all duration-500">
                                <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                            </div>

                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

