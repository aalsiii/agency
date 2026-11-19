"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Linkedin, MessageSquare } from "lucide-react";

const infoItems = [
  {
    icon: Mail,
    label: "Digital Inquiry",
    value: "bijalwanakshat@gmail.com",
    href: "mailto:bijalwanakshat@gmail.com",
  },
  {
    icon: Phone,
    label: "Direct & WhatsApp Line",
    value: "+91 93894 03190",
    href: "https://wa.me/919389403190",
  },
  {
    icon: MapPin,
    label: "Studio Location",
    value: "Rishikesh / Dehradun, Uttarakhand, India",
    href: "https://maps.google.com/?q=Rishikesh,+Uttarakhand",
  },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/akxhatzzz/", name: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/akshat-bijalwan-2910a7378/", name: "LinkedIn" },
  { icon: MessageSquare, href: "https://wa.me/919389403190", name: "WhatsApp" },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="space-y-16 lg:pl-12"
    >
      <div className="space-y-12">
        {infoItems.map((item, index) => (
          <div key={index} className="group relative">
            <span className="font-mono text-xs text-primary/80 mb-2 block">
              [ {item.label.toLowerCase()} ]
            </span>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-2xl md:text-3xl font-serif text-white hover:text-primary transition-all duration-300 flex items-center gap-4 group-hover:translate-x-1"
            >
              <item.icon size={20} className="text-muted/40 group-hover:text-primary transition-colors shrink-0" />
              <span className="break-all">{item.value}</span>
            </a>
          </div>
        ))}
      </div>

      <div className="pt-10 border-t border-white/10">
        <div>
          <span className="font-mono text-xs text-primary/80 mb-5 block">
            [ direct networks ]
          </span>
          <div className="flex flex-wrap gap-4">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  y: -3,
                  backgroundColor: "rgba(197, 160, 89, 0.1)",
                  borderColor: "#C5A059",
                }}
                className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center text-muted hover:text-primary transition-all duration-300 bg-white/[0.02]"
                title={social.name}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 py-4 px-6 bg-white/[0.02] border border-white/10 rounded-xl">
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
        </div>
        <span className="font-mono text-xs text-white/70">
          onboarding active · 3 partner slots open
        </span>
      </div>
    </motion.div>
  );
}
