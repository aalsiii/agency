import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | NextCurrent Media",
  description: "Privacy policy and data protection standards for NextCurrent Media.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground max-w-4xl space-y-12">
      <div className="space-y-4 border-b border-white/10 pb-8">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
          Privacy Policy
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // last updated: January 2026 · NextCurrent Media
        </div>
      </div>

      <div className="space-y-8 text-sm md:text-base text-muted font-light leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">1. Information We Collect</h2>
          <p>
            When you initiate a project enquiry, request a complimentary website audit, or apply for an open position on our platform, we collect information you voluntarily provide, including your full name, work email, phone number, company name, website URL, and project specifications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">2. How We Use Your Information</h2>
          <p>
            We use collected data strictly to:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-white/80">
            <li>Review and diagnose your marketing funnels, website speed, and search visibility.</li>
            <li>Prepare and dispatch confidential scope proposals and strategic roadmaps.</li>
            <li>Communicate with you regarding your inquiry via email, WhatsApp, or discovery calls.</li>
            <li>Process career applications submitted through our platform.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">3. Zero Third-Party Sale Policy</h2>
          <p>
            We never sell, rent, or trade your personal or business information to any third-party brokers, advertisers, or affiliates. Your data is stored securely in our private administrative system.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">4. Data Security</h2>
          <p>
            We implement strict technical access controls, SSL encryption, server-side authentication, and sanitized database queries to prevent unauthorized access or disclosure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">5. Contact Information</h2>
          <p>
            For any questions or data removal requests regarding this policy, please reach out to <a href="mailto:bijalwanakshat@gmail.com" className="text-primary underline">bijalwanakshat@gmail.com</a>.
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
