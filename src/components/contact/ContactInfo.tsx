"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

const infoItems = [
    {
        icon: Mail,
        label: "Digital Inquiry",
        value: "bijalwanakshat@gmail.com",
        href: "mailto:bijalwanakshat@gmail.com"
    },
    {
        icon: Phone,
        label: "Direct Line",
        value: "+91 9389403190",
        href: "tel:+919389403190"
    },
    {
        icon: MapPin,
        label: "Studio Location",
        value: "Rishikesh, Uttarakhand, India",
        href: "https://www.google.com/maps/search/Rishikesh,+Uttarakhand"
    }
];

const socials = [
    { icon: Instagram, href: "https://www.instagram.com/akxhatzzz/", name: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/akshat-bijalwan-2910a7378/", name: "LinkedIn" }
];

export default function ContactInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-20 lg:pl-12"
        >
            <div className="space-y-16">
                {infoItems.map((item, index) => (
                    <div key={index} className="group relative">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
                            {item.label}
                        </span>
                        <a
                            href={item.href}
                            className="text-2xl md:text-3xl font-serif text-white hover:text-primary transition-all duration-500 flex items-center gap-6 group-hover:translate-x-2"
                        >
                            <item.icon size={20} className="text-muted/40 group-hover:text-primary transition-colors" />
                            {item.value}
                        </a>
                    </div>
                ))}
            </div>

            <div className="pt-16 border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <div>
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block">
                            Social Connection
                        </span>
                        <div className="flex flex-wrap gap-4">
                            {socials.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ y: -5, backgroundColor: "rgba(197, 160, 89, 0.1)", borderColor: "#C5A059" }}
                                    className="w-14 h-14 rounded-sm border border-white/5 flex items-center justify-center text-muted hover:text-primary transition-all duration-500 bg-white/[0.02] backdrop-blur-md"
                                    title={social.name}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 py-8 px-8 bg-white/[0.02] border border-white/5 rounded-sm backdrop-blur-md">
                <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium">
                    Our team is currently online
                </span>
            </div>
        </motion.div>
    );
}
