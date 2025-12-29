"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Stacked Images */}
                    <div className="relative flex justify-center lg:justify-end w-full">
                        {/* 
                           Updated to W-FULL and MAX-W-4XL with ASPECT-VIDEO (16:9) 
                           to ensure images look like full landscape screenshots 
                        */}
                        <div className="relative w-full max-w-4xl aspect-video">

                            {/* Decorative Back Cards */}
                            <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-[1.5rem] -rotate-2 scale-[0.98] translate-x-[-10px] translate-y-[-5px] z-0" />
                            <div className="absolute top-0 left-0 w-full h-full bg-zinc-900 border border-white/5 rounded-[1.5rem] -rotate-1 scale-[0.99] translate-x-[-5px] translate-y-[-2px] z-10" />

                            {/* Main Active Image */}
                            <div className="absolute inset-0 z-20 overflow-hidden rounded-[1.5rem] shadow-2xl bg-zinc-900 border border-white/10">
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
                                <div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-2">
                                        {currentProject.title}
                                    </h2>
                                    <p className="text-primary font-medium tracking-wide">
                                        {currentProject.role}
                                    </p>
                                </div>

                                <p className="text-muted text-lg leading-relaxed">
                                    {currentProject.desc}
                                </p>

                                {/* Category Tag */}
                                <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-bold tracking-widest uppercase text-white/80">
                                    {currentProject.category}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-6 mt-12">
                            <button
                                onClick={handlePrev}
                                className="group w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95"
                                aria-label="Previous Project"
                            >
                                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="group w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95"
                                aria-label="Next Project"
                            >
                                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
