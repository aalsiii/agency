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
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <HorizonHeroSection />

      <HorizontalServices />
      <PortfolioPreview />
    </main>
  );
}
