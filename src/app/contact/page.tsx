"use client";

import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background text-foreground relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Initiate Project Inquiry
          </h1>
          <div className="font-mono text-xs text-primary/80">
            // direct strategist response within 24 hours · month-to-month retainers
          </div>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed pt-2">
            Whether you want to scale Meta and Google ad spend profitably, engineer a custom Next.js web application, or dominate local search in your city, our lead strategists are ready to review your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-muted">loading inquiry form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
        </div>
      </div>
    </main>
  );
}
