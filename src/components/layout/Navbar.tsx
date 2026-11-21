"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import TextRoll from "@/components/ui/TextRoll";
import { useAdmin } from "@/lib/use-admin";

const navLeft = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
];

const navRight = [
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render public navbar on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-background/90 backdrop-blur-md py-3 border-b border-white/10" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden lg:flex flex-1 items-center justify-start space-x-7 xl:space-x-8">
          {navLeft.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/70 hover:text-white transition-colors duration-300"
            >
              <TextRoll>{link.name}</TextRoll>
            </Link>
          ))}
        </div>

        {/* Center Brand */}
        <Link href="/" className="flex items-center gap-3 group px-4">
          <div className="w-8 h-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary font-sans font-semibold text-xs group-hover:border-primary group-hover:scale-105 transition-all duration-500">
            NC
          </div>
          <span className="text-xl md:text-2xl font-sans font-medium tracking-tight text-white transition-colors duration-300 relative z-10">
            NextCurrent
          </span>
        </Link>

        {/* Right Links & Primary CTA */}
        <div className="hidden lg:flex flex-1 items-center justify-end space-x-6 xl:space-x-7">
          {navRight.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/70 hover:text-white transition-colors duration-300"
            >
              <TextRoll>{link.name}</TextRoll>
            </Link>
          ))}

          {/* Primary Navigation CTA: Start a Project */}
          <Link
            href="/start-a-project"
            className="px-5 py-2 rounded-full border border-primary bg-primary text-black font-semibold text-[11px] tracking-wider hover:bg-white hover:border-white transition-all duration-300 shrink-0"
          >
            Start a Project
          </Link>

          {/* Admin Portal Link - Strictly visible only to authenticated administrator */}
          {isAdmin && (
            <Link
              href="/admin"
              title="Admin Backstage"
              className="p-1.5 text-primary hover:text-white transition-colors"
            >
              <Shield size={15} />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-6 px-6"
          >
            <button
              className="absolute top-6 right-6 text-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>

            {[...navLeft, ...navRight].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-serif font-medium text-foreground hover:text-primary transition-colors tracking-wide"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/start-a-project"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 rounded-full bg-primary text-black font-semibold text-xs tracking-wider"
            >
              Start a Project
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-[0.3em] text-primary hover:text-white pt-4 flex items-center gap-1.5"
              >
                <Shield size={12} />
                <span>Admin Portal</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
