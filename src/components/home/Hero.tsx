"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
        title: "Timeless Architecture",
        subtitle: "Designing spaces that inspire."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        title: "Digital Excellence",
        subtitle: "Crafting brands for the future."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        title: "Global Reach",
        subtitle: "Marketing that transcends borders."
    }
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [current]);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-background">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Ken Burns Background */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
                        className="absolute inset-0 z-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slides[current].image})` }}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60" />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-primary font-bold tracking-[0.2em] uppercase mb-4"
                        >
                            {slides[current].subtitle}
                        </motion.p>

                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-5xl md:text-8xl font-serif text-white max-w-4xl leading-tight"
                        >
                            {slides[current].title}
                        </motion.h1>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-12 right-12 z-20 flex items-center gap-6">
                <div className="text-white font-mono text-sm">
                    <span className="text-primary">0{current + 1}</span> / 0{slides.length}
                </div>

                <div className="flex gap-2">
                    <button onClick={prevSlide} className="p-3 border border-white/20 rounded-full hover:bg-white/10 hover:border-primary transition-all text-white hover:text-primary">
                        <ArrowLeft size={18} />
                    </button>
                    <button onClick={nextSlide} className="p-3 border border-white/20 rounded-full hover:bg-white/10 hover:border-primary transition-all text-white hover:text-primary">
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}
