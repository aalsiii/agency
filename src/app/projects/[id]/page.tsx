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
        <article className="min-h-screen bg-background">
            {/* Hero Section */}
            <header className="relative h-[70vh] w-full flex items-end pb-12 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Works
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium tracking-wide uppercase">
                                {project.category}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm font-medium tracking-wide uppercase">
                                {project.timeline}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted max-w-2xl leading-relaxed mb-8">
                            {project.desc}
                        </p>

                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-primary hover:text-black transition-all duration-300 group"
                            >
                                Visit Live Site
                                <ExternalLink className="w-5 h-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </a>
                        )}
                    </motion.div>
                </div>
            </header>

            {/* Content Section */}
            <div className="container mx-auto px-6 md:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Sidebar / Metadata */}
                    <div className="lg:col-span-4 space-y-12">
                        <div>
                            <h3 className="text-white font-serif text-xl mb-4">Client</h3>
                            <p className="text-muted text-lg">{project.client}</p>
                        </div>
                        <div>
                            <h3 className="text-white font-serif text-xl mb-4">Services</h3>
                            <p className="text-muted text-lg">{project.role}</p>
                        </div>

                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-16">
                        <section>
                            <h2 className="text-3xl font-serif text-white mb-6">The Challenge</h2>
                            <p className="text-lg text-muted leading-relaxed">
                                {project.challenge}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-serif text-white mb-6">The Solution</h2>
                            <p className="text-lg text-muted leading-relaxed">
                                {project.solution}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-serif text-white mb-6">The Result</h2>
                            <p className="text-lg text-muted leading-relaxed">
                                {project.results}
                            </p>
                        </section>
                    </div>
                </div>

                {/* Gallery Grid */}
                {project.galleryImages.length > 0 && (
                    <div className="mt-24 space-y-8">
                        <h2 className="text-3xl font-serif text-white text-center mb-12">Project Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.galleryImages.map((img, idx) => (
                                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 shadow-2xl border border-white/5">
                                    <Image
                                        src={img}
                                        alt={`${project.title} screenshot ${idx + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Next Project Teaser (Simple) */}
            <div className="border-t border-white/10 mt-24">
                <div className="container mx-auto px-6 py-24 text-center">
                    <p className="text-primary tracking-widest uppercase text-sm font-bold mb-4">Next Project</p>
                    <Link href="/projects" className="text-5xl md:text-7xl font-serif text-white hover:text-primary transition-colors inline-flex items-center gap-4 group">
                        View All Works
                        <ArrowUpRight className="w-12 h-12 md:w-20 md:h-20 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
