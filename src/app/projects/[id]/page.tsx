"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

export default function ProjectDetailPage() {
    const params = useParams();
    const project = projects.find((p) => p.slug === params.id);

    if (!project) {
        return notFound();
    }

    return (
        <article className="min-h-screen bg-background overflow-hidden relative">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-[60vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/30 via-background to-background pointer-events-none" />

            {/* Hero Section */}
            <header className="relative pt-48 pb-12 md:pb-24 z-10">
                <div className="container mx-auto px-6 md:px-12 w-full">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-white/80 hover:text-white mb-16 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Works
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left Column: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary leading-[1.1]">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
                                    {project.category}
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold tracking-widest uppercase">
                                    {project.timeline}
                                </span>
                            </div>

                            <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-xl">
                                {project.desc}
                            </p>

                            <div className="pt-8">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-black transition-all duration-300 group shadow-2xl"
                                    >
                                        Visit Live Site
                                        <ExternalLink className="w-5 h-5 ml-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </motion.div>

                        {/* Right Column: Hero Image Preview */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] group"
                        >
                            <Image
                                src={project.src}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <div className="container mx-auto px-6 md:px-12 py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Sidebar / Metadata */}
                    <div className="lg:col-span-4 space-y-12">
                        <div>
                            <h3 className="text-white font-serif text-2xl mb-4">Client</h3>
                            <p className="text-muted text-lg">{project.client}</p>
                        </div>
                        <div>
                            <h3 className="text-white font-serif text-2xl mb-4">Services</h3>
                            <p className="text-muted text-lg">{project.role}</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-24">
                        <section>
                            <h2 className="text-4xl font-serif text-white mb-8 border-l-4 border-primary pl-6">The Challenge</h2>
                            <p className="text-xl text-muted leading-relaxed">
                                {project.challenge}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-4xl font-serif text-white mb-8 border-l-4 border-primary pl-6">The Solution</h2>
                            <p className="text-xl text-muted leading-relaxed">
                                {project.solution}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-4xl font-serif text-white mb-8 border-l-4 border-primary pl-6">The Result</h2>
                            <p className="text-xl text-muted leading-relaxed">
                                {project.results}
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            {/* Next Project Teaser */}
            <div className="border-t border-white/10 mt-24 relative z-10">
                <div className="container mx-auto px-6 py-24 text-center">
                    <p className="text-primary tracking-widest uppercase text-sm font-bold mb-6">Next Project</p>
                    <Link href="/projects" className="text-6xl md:text-8xl font-serif text-white hover:text-primary transition-colors inline-flex items-center gap-8 group">
                        View More
                        <ArrowUpRight className="w-16 h-16 md:w-24 md:h-24 group-hover:-translate-y-4 group-hover:translate-x-4 transition-transform" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
