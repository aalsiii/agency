"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Premium Mock Data
const projects = [
    {
        id: 1,
        title: "Maison de Luxe",
        category: "Luxury Real Estate",
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Quantum Finance",
        category: "FinTech App",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Ethereal Beauty",
        category: "E-Commerce",
        src: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Vertex Aerospace",
        category: "Corporate Identity",
        src: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop"
    },
];

export default function PortfolioPreview() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            // Calculate relative to the section
            x.set(e.clientX - rect.left);
            y.set(e.clientY - rect.top);
        }
    };

    return (
        <section
            ref={ref}
            className="relative py-32 bg-background overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-end mb-24">
                    <div>
                        <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase block mb-4">Selected Works</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white">
                            Crafted Nuances
                        </h2>
                    </div>
                    <Link href="/projects" className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase group">
                        View All Works
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>

                <div className="flex flex-col">
                    {projects.map((project) => (
                        <Link
                            href={`/projects`}
                            key={project.id}
                            className="group relative border-t border-white/10 py-12 md:py-16 flex flex-col md:flex-row md:items-center justify-between transition-colors hover:bg-white/5 px-4 md:px-8"
                            onMouseEnter={() => setActiveProject(project.id)}
                            onMouseLeave={() => setActiveProject(null)}
                        >
                            <h3 className="text-3xl md:text-6xl font-serif text-white/80 group-hover:text-white transition-colors duration-300 group-hover:translate-x-4">
                                {project.title}
                            </h3>
                            <div className="mt-4 md:mt-0 flex items-center gap-8">
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/50 group-hover:text-primary transition-colors">
                                    {project.category}
                                </span>
                                <span className="hidden md:block text-white/20 group-hover:text-white transition-colors transform group-hover:-rotate-45 duration-300">
                                    <ArrowUpRight className="w-8 h-8" />
                                </span>
                            </div>
                        </Link>
                    ))}
                    <div className="border-t border-white/10" />
                </div>
            </div>

            {/* Floating Image Reveal */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 w-[400px] h-[300px] z-20 hidden md:block rounded-xl overflow-hidden"
                style={{
                    x: xSpring,
                    y: ySpring,
                    opacity: activeProject ? 1 : 0,
                    scale: activeProject ? 1 : 0.8,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${activeProject === project.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={project.src}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </motion.div>

            <div className="mt-12 md:hidden text-center">
                <Link href="/projects" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold">
                    All Projects <ArrowUpRight size={14} />
                </Link>
            </div>
        </section>
    );
}
