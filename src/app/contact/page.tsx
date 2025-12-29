"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
    return (
        <main className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/30 via-background to-background pointer-events-none" />

            {/* Background Stroke Text */}
            <div className="absolute top-1/4 -right-20 pointer-events-none select-none overflow-hidden">
                <span className="text-[15rem] md:text-[25rem] font-serif font-black text-stroke uppercase leading-none opacity-20">
                    Contact
                </span>
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <header className="mb-16 md:mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">
                            Contact Us
                        </h1>
                        <p className="text-xl text-muted max-w-2xl">
                            Whether you have a question about our services, a project idea, or just want to say hello, we&apos;d love to hear from you.
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left Column: Form */}
                    <div className="order-2 lg:order-1 relative">
                        <div className="absolute -inset-12 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                        <ContactForm />
                    </div>

                    {/* Right Column: Info */}
                    <div className="order-1 lg:order-2">
                        <ContactInfo />
                    </div>
                </div>
            </div>
        </main>
    );
}
