"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import HorizontalServices from "@/components/home/HorizontalServices";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";

const HorizonHeroSection = dynamic(
  () => import("@/components/ui/horizon-hero-section").then((mod) => mod.HorizonHeroSection),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    // Force scroll to top on mount to handle browser scroll restoration
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      // Immediate reset
      window.scrollTo(0, 0);

      // Delayed reset to catch any layout shifts or late-rendering components
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="min-h-[300vh]">
        <HorizonHeroSection />
      </div>

      <HorizontalServices />
      <PortfolioPreview />
    </main>
  );
}
