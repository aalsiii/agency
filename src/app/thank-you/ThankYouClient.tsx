"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MessageSquare, ArrowRight, Calendar } from "lucide-react";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");
  const name = searchParams.get("name") || "there";

  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto relative z-10 p-8 md:p-14 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 shadow-2xl text-center space-y-8">
        <div className="w-16 h-16 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center mx-auto text-primary">
          <CheckCircle2 size={32} />
        </div>

        <div className="space-y-3">
          <div className="font-mono text-xs text-primary/80">
            {leadId ? `// dossier reference: [ ${leadId} ]` : "// project intake confirmed"}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Thank you, {name}.
          </h1>
          <p className="text-muted text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
            Your project brief has been logged into our executive CRM. A senior partner will review your requirements and reach out within 24 hours with an actionable roadmap.
          </p>
        </div>

        {/* Immediate Next Step Card */}
        <div className="p-6 rounded-xl bg-[var(--background-layer-2)] border border-white/5 text-left space-y-3 font-mono text-xs">
          <span className="text-primary font-semibold block">
            What happens next:
          </span>
          <div className="space-y-2 text-muted">
            <p>1. We review your current funnel, search footprint, and stated objectives.</p>
            <p>2. We draft a preliminary scope breakdown and budget estimate.</p>
            <p>3. We schedule an executive 30-minute discovery conversation.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={`https://wa.me/918057435939?text=Hi%20NextCurrent%20Media%2C%20I%20just%20submitted%20project%20inquiry%20${encodeURIComponent(leadId || "online")}.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all w-full sm:w-auto justify-center"
          >
            <MessageSquare size={15} />
            <span>Notify via WhatsApp</span>
          </a>

          <Link
            href="/book-a-call"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 bg-white/5 text-white font-mono text-xs hover:border-primary transition-all w-full sm:w-auto justify-center"
          >
            <Calendar size={14} />
            <span>[ book discovery call ]</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Link
            href="/"
            className="font-mono text-xs text-muted hover:text-white transition-colors"
          >
            ← return to agency overview
          </Link>
        </div>
      </div>
    </main>
  );
}
