import BookCallClient from "./BookCallClient";

export const metadata = {
  title: "Book a Discovery Call | NextCurrent Media",
  description: "Schedule a 30-minute growth and architecture consultation with our lead partners.",
};

export default function BookACallPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground max-w-4xl space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
          Schedule a Discovery Session
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // 30-minute video conference · no sales pitch · strategic diagnosis
        </div>
        <p className="text-muted text-base md:text-lg font-light leading-relaxed pt-2">
          Pick a time with our lead strategists to review your current customer acquisition channels, examine unit economics, and determine if an ongoing partnership aligns.
        </p>
      </div>

      <BookCallClient />
    </main>
  );
}
