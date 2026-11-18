"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { projects } from "@/lib/projects";


export default function PortfolioPreview() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const currentProject = projects[currentIndex];

    // Animation variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95,
        }),
    };

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <section className="bg-background py-32 relative overflow-hidden min-h-[90vh] flex items-center">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                            Documented client outcomes
                        </h2>
                        <div className="font-mono text-xs text-primary/70 mt-3">
                            // verified performance data across active partnerships
                        </div>
                    </div>
                    <Link href="/projects" className="hidden md:flex group items-center gap-2 font-mono text-xs text-muted hover:text-primary transition-colors pb-1 border-b border-transparent hover:border-primary/30">
                        <span>[ inspect all case studies ]</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Stacked Images */}
                    <div className="relative flex justify-center lg:justify-end w-full">
                        {/* 
                           Updated to W-FULL and MAX-W-4XL with ASPECT-VIDEO (16:9) 
                           to ensure images look like full landscape screenshots 
                        */}
                        <div className="relative w-full max-w-4xl aspect-video">

                            {/* Decorative Back Cards */}
                            <div className="absolute top-0 left-0 w-full h-full bg-[var(--background-layer-1)] rounded-[1.5rem] -rotate-2 scale-[0.98] translate-x-[-10px] translate-y-[-5px] z-0" />
                            <div className="absolute top-0 left-0 w-full h-full bg-[var(--background-layer-2)] border border-white/20 rounded-[1.5rem] -rotate-1 scale-[0.99] translate-x-[-5px] translate-y-[-2px] z-10" />

                            {/* Main Active Image */}
                            <div className="absolute inset-0 z-20 overflow-hidden rounded-[1.5rem] shadow-2xl bg-[var(--background-layer-2)] border border-white/20">
                                <AnimatePresence initial={false} custom={direction} mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 }
                                        }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={currentProject.src}
                                            alt={currentProject.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        {/* Subtle overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col justify-center text-left max-w-xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-primary/70">
                                            [ case 0{currentIndex + 1} of 0{projects.length} ]
                                        </span>
                                        <span className="font-mono text-xs text-muted/60">
                                            · {currentProject.category}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                                        {currentProject.title}
                                    </h3>
                                    <p className="font-mono text-xs text-primary/80">
                                        // {currentProject.role}
                                    </p>
                                </div>

                                <p className="text-muted text-base font-light leading-relaxed">
                                    {currentProject.desc}
                                </p>

                                <div className="pt-2 flex flex-wrap items-center gap-4">
                                    <Link
                                        href={`/work/${currentProject.slug}`}
                                        className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-white border-b border-primary/30 pb-1 transition-colors"
                                    >
                                        <span>read case study</span>
                                        <ArrowRight size={13} />
                                    </Link>

                                    {currentProject.liveUrl && (
                                        <a
                                            href={currentProject.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors"
                                        >
                                            <span>visit live client site</span>
                                            <ExternalLink size={12} className="text-primary" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-6 mt-12">
                            <button
                                onClick={handlePrev}
                                className="group w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95 cursor-pointer"
                                aria-label="Previous Project"
                            >
                                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="group w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95 cursor-pointer"
                                aria-label="Next Project"
                            >
                                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Mobile Navigation Link */}
                <div className="mt-16 lg:hidden text-center">
                    <Link href="/work" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold">
                        Explore All Case Studies <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
