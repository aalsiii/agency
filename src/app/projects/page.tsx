"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 md:mb-24"
            >
                <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">Our Work</h1>
                <p className="text-xl text-muted max-w-2xl">
                    A collection of digital experiences crafted with precision, passion, and purpose.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <Link href={`/projects/${project.slug}`} className="group block space-y-4">
                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                                <Image
                                    src={project.src}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Overlay Icon */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <ArrowUpRight className="text-white w-5 h-5" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-serif text-white group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted text-sm mt-1">{project.role}</p>
                                </div>
                                <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/70 uppercase tracking-wider backdrop-blur-sm">
                                    {project.category}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
