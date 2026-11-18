import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | NextCurrent Media",
  description: "Terms of engagement and service guidelines for NextCurrent Media.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground max-w-4xl space-y-12">
      <div className="space-y-4 border-b border-white/10 pb-8">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
          Terms & Conditions
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // engagement terms · NextCurrent Media
        </div>
      </div>

      <div className="space-y-8 text-sm md:text-base text-muted font-light leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">1. Retainers & Agreements</h2>
          <p>
            All marketing management and engineering services operate under signed Statements of Work (SOW) specifying deliverables, milestones, and payment schedules. Unless explicitly agreed otherwise, ongoing advisory and performance retainers operate on rolling month-to-month agreements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">2. Intellectual Property</h2>
          <p>
            Upon full settlement of project invoices, all custom web code, copywriting, and design collateral produced specifically for the client transfer directly to client ownership. Proprietary internal toolsets and libraries remain the property of NextCurrent Media.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">3. Third-Party Media Spend</h2>
          <p>
            Media budgets on platforms such as Meta Ads and Google Ads are paid directly by the client to the advertising platforms. NextCurrent Media charges management and strategic production fees separate from platform ad spend.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">4. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of Uttarakhand, India, without regard to conflict of law principles.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-white/10">
        <Link href="/" className="font-mono text-xs text-primary hover:text-white transition-colors">
          ← return to homepage
        </Link>
      </div>
    </main>
  );
}
