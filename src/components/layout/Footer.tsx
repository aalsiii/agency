"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import TextRoll from "@/components/ui/TextRoll";
import { Shield } from "lucide-react";
import { useAdmin } from "@/lib/use-admin";

export default function Footer() {
  const pathname = usePathname();
  const { isAdmin } = useAdmin();
  const isExcludedFromBanner =
    pathname === "/services" ||
    pathname === "/about" ||
    pathname?.startsWith("/insights");

  // Hide footer on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer
      className={`bg-[var(--background-layer-1)] pb-12 relative z-50 ${
        isExcludedFromBanner ? "pt-12 border-t border-[var(--border-subtle)]" : "pt-32 border-t border-[var(--border-subtle)]"
      }`}
    >
      <div className="container mx-auto px-6">
        {!isExcludedFromBanner && (
          <div className="mb-24 text-center space-y-6">
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-sans font-normal text-white tracking-tight leading-none">
              LET&apos;S BUILD SOMETHING ENDURING
            </h2>
            <div className="font-mono text-xs text-primary/80">
              // direct strategist access · month-to-month retainers · 24-hour response
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link
                href="/free-audit"
                className="group inline-flex items-center gap-3 text-xs font-semibold tracking-wider text-primary border border-primary/30 bg-primary/5 px-8 py-4 rounded-full hover:bg-primary hover:text-black transition-all duration-300"
              >
                Claim Free Brand Audit
              </Link>
              <a
                href="mailto:bijalwanakshat@gmail.com"
                className="text-xl md:text-2xl text-white hover:text-primary transition-colors border-b border-white/20 pb-1"
              >
                <TextRoll>bijalwanakshat@gmail.com</TextRoll>
              </a>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-t border-[var(--border-subtle)] pt-12 text-center md:text-left">
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Location</h4>
            <p className="text-muted text-sm leading-relaxed">
              Rishikesh / Dehradun, Uttarakhand<br />
              India & Serving Worldwide
            </p>
          </div>
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Inquiries</h4>
            <p className="text-muted text-sm leading-relaxed mb-2">
              <a href="mailto:bijalwanakshat@gmail.com" className="hover:text-primary transition-colors">
                bijalwanakshat@gmail.com
              </a>
            </p>
            <p className="text-muted text-sm leading-relaxed">
              <a href="https://wa.me/919389403190" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                +91 93894 03190 (WhatsApp)
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Navigation</h4>
            <div className="flex flex-col space-y-2 text-muted text-xs uppercase tracking-widest font-mono">
              <Link href="/work" className="hover:text-primary transition-colors">Work</Link>
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <Link href="/process" className="hover:text-primary transition-colors">Process</Link>
              <Link href="/insights" className="hover:text-primary transition-colors">Insights</Link>
              <Link href="/start-a-project" className="text-primary hover:text-white transition-colors font-bold">Start a Project</Link>
              <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-serif text-lg mb-4">Connect & Legal</h4>
            <div className="flex flex-col space-y-2 text-muted text-xs uppercase tracking-widest font-mono">
              <a href="https://www.instagram.com/akxhatzzz/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/akshat-bijalwan-2910a7378/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
              <Link href="/privacy-policy" className="hover:text-primary transition-colors pt-2">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-primary/70 hover:text-white flex items-center gap-1.5 pt-2">
                  <Shield size={12} />
                  <span>Admin Backstage</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-muted text-xs tracking-widest uppercase pt-12 border-t border-[var(--border-subtle)] text-center">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-primary font-serif font-bold text-xs">
              NC
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-white/80">
              NextCurrent Media
            </span>
          </div>
          <div>
            <p>&copy; {new Date().getFullYear()} NextCurrent Media. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
