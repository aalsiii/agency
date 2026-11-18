import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | NextCurrent Media",
  description: "Cookie usage and analytics tracking policies for NextCurrent Media.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground max-w-4xl space-y-12">
      <div className="space-y-4 border-b border-white/10 pb-8">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
          Cookie Policy
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // session integrity & analytics tokens
        </div>
      </div>

      <div className="space-y-8 text-sm md:text-base text-muted font-light leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">1. What Are Cookies?</h2>
          <p>
            Cookies are small cryptographic text files placed on your device to maintain session states, remember your currency preferences (INR vs USD), and record anonymous traffic attribution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">2. Essential Cookies</h2>
          <p>
            We use secure HTTP-only cookies (`nc_admin_token`) to authenticate authorized administrative sessions and protect the private dashboard from unauthorized access.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-serif text-white">3. Analytics & Attribution</h2>
          <p>
            We utilize privacy-respecting analytics and conversion pixels (such as Google Analytics 4 and Meta Pixel) to track page impressions, referral UTM parameters, and form conversions.
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
