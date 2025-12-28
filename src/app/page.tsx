"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import HorizontalServices from "@/components/home/HorizontalServices";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";

const HorizonHeroSection = dynamic(
  () => import("@/components/ui/horizon-hero-section").then((mod) => mod.HorizonHeroSection),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HorizonHeroSection />

      <HorizontalServices />
      <PortfolioPreview />

      {/* Spacer for visual breathing room before footer */}
      <div className="h-32 bg-background" />
    </main>
  );
}
