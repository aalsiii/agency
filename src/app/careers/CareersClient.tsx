"use client";

import { useState } from "react";
import { ArrowUpRight, Check, CheckCircle2, Briefcase, MapPin, Clock, Sparkles } from "lucide-react";

interface CareerItem {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
}

export default function CareersClient({ initialOpenings }: { initialOpenings: CareerItem[] }) {
  const [selectedJob, setSelectedJob] = useState<CareerItem | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerId: selectedJob.id,
          name,
          email,
          phone,
          portfolioUrl,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Application submission failed");

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground">
      {/* Header */}
      <div className="mb-20 space-y-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Careers & Culture
        </h1>
        <div className="font-mono text-xs text-primary/80">
          // high-agency teams · remote-first · engineering discipline
        </div>
        <p className="text-lg md:text-xl text-muted font-light leading-relaxed pt-2">
          We are building an elite collective of digital growth strategists, Next.js engineers, and motion creative designers. No bureaucratic hierarchy, only high craft and ownership.
        </p>
      </div>

      {/* Cultural Values Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {[
          {
            title: "Extreme Ownership",
            desc: "Every team member owns client outcomes from discovery through launch. We do not pass blame or hide behind vanity metrics.",
            badge: "01 // RESPONSIBILITY",
          },
          {
            title: "Sub-Second Standards",
            desc: "Speed is our architectural moat. Whether it's page load latency, creative iteration, or client communication, we operate with urgency.",
            badge: "02 // VELOCITY",
          },
          {
            title: "Continuous Feedback",
            desc: "Weekly retrospectives and transparent unit economics. We study our campaign data rigorously and refine our playbooks constantly.",
            badge: "03 // RIGOR",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-4"
          >
            <span className="font-mono text-xs text-primary/80 block">{c.badge}</span>
            <h3 className="text-2xl font-serif text-white">{c.title}</h3>
            <p className="text-xs md:text-sm text-muted font-light leading-relaxed">
              {c.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Openings Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              Current Openings ({initialOpenings.length})
            </h2>
            <p className="text-xs font-mono text-primary/70 mt-1">
              // review requirements and submit your application directly below
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {initialOpenings.map((job) => {
            let reqs: string[] = [];
            let bens: string[] = [];
            try {
              reqs = JSON.parse(job.requirements);
              bens = JSON.parse(job.benefits);
            } catch {}

            return (
              <div
                key={job.id}
                className="p-8 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 hover:border-primary/40 transition-all space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-primary/80">
                        [ {job.department} ]
                      </span>
                      <span className="font-mono text-xs text-muted">
                        · {job.type}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        · {job.location}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white">
                      {job.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setSubmitted(false);
                      const el = document.getElementById("application-form-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all cursor-pointer shrink-0"
                  >
                    Apply for this Role
                  </button>
                </div>

                <p className="text-sm text-muted font-light leading-relaxed max-w-4xl">
                  {job.description}
                </p>

                {reqs.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[11px] text-white/50 block">
                      core requirements:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-white/80 font-light">
                      {reqs.map((r, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Application Form Modal / Inline Box */}
      <section id="application-form-section" className="mt-28 max-w-2xl mx-auto">
        <div className="p-8 md:p-12 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 shadow-2xl space-y-6">
          <div>
            <span className="font-mono text-xs text-primary/80 block">
              // candidate application portal
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-white mt-1">
              {selectedJob ? `Apply: ${selectedJob.title}` : "Select a Position to Apply"}
            </h2>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 size={40} className="text-primary mx-auto" />
              <h3 className="text-xl font-serif text-white">Application Received</h3>
              <p className="text-xs text-muted max-w-sm mx-auto font-light leading-relaxed">
                Thank you, {name}. Our hiring team reviews submissions weekly and will reach out if your profile matches an opening.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 font-mono text-xs">
                  {error}
                </div>
              )}

              {!selectedJob && (
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted">Select Role *</label>
                  <select
                    required
                    onChange={(e) => {
                      const found = initialOpenings.find((o) => o.id === e.target.value);
                      if (found) setSelectedJob(found);
                    }}
                    className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-primary/50"
                  >
                    <option value="">-- Choose Position --</option>
                    {initialOpenings.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.title} ({o.department})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sen"
                    className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-muted/40 outline-none focus:border-primary/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-muted/40 outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-muted/40 outline-none focus:border-primary/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted">Portfolio / GitHub / LinkedIn</label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/yourhandle"
                    className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-muted/40 outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-muted">Introduction & Why NextCurrent</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share a project you built that you are proud of..."
                  className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-muted/40 outline-none focus:border-primary/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !selectedJob}
                className="w-full py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? "Transmitting Application..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
