"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { services } from "@/lib/services";

export default function ContactForm() {
    const [focused, setFocused] = useState<string | null>(null);
    const [showOther, setShowOther] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        otherSubject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "service-select") {
            if (value === "Other") {
                setShowOther(true);
                setFormData(prev => ({ ...prev, subject: "Other" }));
            } else {
                setShowOther(false);
                setFormData(prev => ({ ...prev, subject: value, otherSubject: "" }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalSubject = showOther ? formData.otherSubject : formData.subject;

        const mailtoLink = `mailto:bijalwanakshat@gmail.com?subject=${encodeURIComponent(finalSubject || "Project Inquiry")}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.subject}\n\nMessage:\n${formData.message}`
        )}`;

        window.location.href = mailtoLink;

        // Clear form after a short delay
        setTimeout(() => {
            setFormData({ name: "", email: "", subject: "", otherSubject: "", message: "" });
            setShowOther(false);
        }, 1000);
    };

    const containerClasses = (name: string) => `
        relative p-8 bg-zinc-900/40 border border-white/20 transition-all duration-700 rounded-sm overflow-hidden
        ${focused === name ? "border-primary/40 bg-zinc-900/60 ring-1 ring-primary/20 shadow-[0_0_40px_rgba(197,160,89,0.05)]" : "hover:border-white/20"}
    `;

    const labelClasses = (name: string) => `
        text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block transition-colors duration-500
        ${focused === name ? "text-primary" : "text-primary/40"}
    `;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={containerClasses("name")}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                        <label className={labelClasses("name")}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Type your name..."
                            className="w-full bg-transparent text-white text-lg font-serif outline-none placeholder:text-white/10"
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <motion.div
                            initial={false}
                            animate={{ width: focused === "name" ? "100%" : "0%" }}
                            className="absolute bottom-0 left-0 h-[2px] bg-primary"
                        />
                    </div>
                    <div className={containerClasses("email")}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                        <label className={labelClasses("email")}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="bijalwanakshat@gmail.com"
                            className="w-full bg-transparent text-white text-lg font-serif outline-none placeholder:text-white/10"
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <motion.div
                            initial={false}
                            animate={{ width: focused === "email" ? "100%" : "0%" }}
                            className="absolute bottom-0 left-0 h-[2px] bg-primary"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={containerClasses("subject")}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                        <label className={labelClasses("subject")}>Interested Service</label>
                        <div className="relative">
                            <select
                                name="service-select"
                                className="w-full bg-transparent text-white text-lg font-serif outline-none appearance-none cursor-pointer relative z-10"
                                onFocus={() => setFocused("subject")}
                                onBlur={() => setFocused(null)}
                                onChange={handleChange}
                                value={formData.subject}
                                required
                            >
                                <option value="" disabled className="bg-zinc-900">Select a service...</option>
                                {services.map(s => (
                                    <option key={s.id} value={s.title} className="bg-zinc-900">{s.title}</option>
                                ))}
                                <option value="Other" className="bg-zinc-900">Other / Custom Inquiry</option>
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none w-5 h-5" />
                        </div>
                        <motion.div
                            initial={false}
                            animate={{ width: focused === "subject" ? "100%" : "0%" }}
                            className="absolute bottom-0 left-0 h-[2px] bg-primary"
                        />
                    </div>

                    {showOther && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={containerClasses("otherSubject")}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                            <label className={labelClasses("otherSubject")}>Specific Interest</label>
                            <input
                                type="text"
                                name="otherSubject"
                                required={showOther}
                                placeholder="Tell us more about what you need..."
                                className="w-full bg-transparent text-white text-lg font-serif outline-none placeholder:text-white/10"
                                onFocus={() => setFocused("otherSubject")}
                                onBlur={() => setFocused(null)}
                                onChange={handleChange}
                                value={formData.otherSubject}
                            />
                            <motion.div
                                initial={false}
                                animate={{ width: focused === "otherSubject" ? "100%" : "0%" }}
                                className="absolute bottom-0 left-0 h-[2px] bg-primary"
                            />
                        </motion.div>
                    )}
                </div>

                <div className={containerClasses("message")}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                    <label className={labelClasses("message")}>Your Message</label>
                    <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell us about your project..."
                        className="w-full bg-transparent text-white text-lg font-serif outline-none resize-none placeholder:text-white/10"
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        onChange={handleChange}
                        value={formData.message}
                    />
                    <motion.div
                        initial={false}
                        animate={{ width: focused === "message" ? "100%" : "0%" }}
                        className="absolute bottom-0 left-0 h-[2px] bg-primary"
                    />
                </div>

                <div className="pt-8">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="group inline-flex items-center gap-4 text-lg font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-12 py-6 rounded-full hover:bg-primary hover:text-black transition-all duration-500"
                    >
                        Submit Inquiry
                        <ArrowUpRight className="w-6 h-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}
