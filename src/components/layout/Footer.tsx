"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import TextRoll from "@/components/ui/TextRoll";

export default function Footer() {
    const pathname = usePathname();
    const isServicesOrAboutPage = pathname === "/services" || pathname === "/about";

    return (
        <footer className={`bg-[var(--background-layer-1)] pb-12 relative z-50 ${isServicesOrAboutPage ? 'pt-0 border-none' : 'pt-32 border-t border-[var(--border-subtle)]'}`}>
            <div className="container mx-auto px-6">
                {!isServicesOrAboutPage && (
                    <div className="mb-24 text-center">
                        <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6">Start a Project</p>
                        <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif text-white leading-none mb-12">
                            LET'S CREATE <br />
                            <span className="italic font-light text-white/50">Something Timeless</span>
                        </h2>
                        <a href="mailto:bijalwanakshat@gmail.com" className="text-xl md:text-3xl text-white hover:text-primary transition-colors border-b border-white/20 pb-2 inline-block">
                            <TextRoll>bijalwanakshat@gmail.com</TextRoll>
                        </a>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 border-t border-[var(--border-subtle)] pt-12 text-center">
                    <div>
                        <h4 className="text-white font-serif text-lg mb-4">Visit Us</h4>
                        <p className="text-muted text-sm leading-relaxed">
                            Rishikesh, Uttarakhand<br />
                            India
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
                            <a href="tel:+919389403190" className="hover:text-primary transition-colors">
                                +91 9389403190
                            </a>
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-lg mb-4">Follow</h4>
                        <div className="flex flex-col space-y-2 text-muted text-sm uppercase tracking-wider items-center">
                            <a href="https://www.instagram.com/akxhatzzz/" target="_blank" rel="noopener noreferrer" className="transition-colors">
                                <TextRoll>Instagram</TextRoll>
                            </a>
                            <a href="https://www.linkedin.com/in/akshat-bijalwan-2910a7378/" target="_blank" rel="noopener noreferrer" className="transition-colors">
                                <TextRoll>LinkedIn</TextRoll>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-8 text-muted text-xs tracking-widest uppercase pt-12 border-t border-[var(--border-subtle)] text-center">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Aalsiii Logo"
                            width={32}
                            height={32}
                            className="opacity-80 transition-opacity duration-500"
                        />
                        <span className="text-2xl font-sans font-bold tracking-tight text-white/60">
                            AALSIII
                        </span>
                    </div>
                    <div>
                        <p>&copy; {new Date().getFullYear()} AALSIII. All rights reserved.</p>
                        <p className="mt-2 text-[10px] opacity-50 tracking-[0.2em]"> Designed by AALSIII </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
