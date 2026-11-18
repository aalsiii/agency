"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Instagram,
  Target,
  DollarSign,
  MessageSquare,
} from "lucide-react";

export default function FreeAuditPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [auditResult, setAuditResult] = useState<{ score: number; businessName: string } | null>(null);

  // Form states
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [industry, setIndustry] = useState("D2C & E-Commerce");

  const [primaryGoal, setPrimaryGoal] = useState("Generate More Qualified Leads");
  const [monthlySpend, setMonthlySpend] = useState("₹50k - ₹1.5L ($1k - $2k)");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          websiteUrl,
          instagramHandle,
          industry,
          primaryGoal,
          monthlySpend,
          name,
          email,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setAuditResult({
        score: data.score || 74,
        businessName: data.businessName || businessName,
      });
      setCompleted(true);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error submitting audit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Diagnostic funnel & website review
          </h1>
          <div className="font-mono text-xs text-primary/80">
            // 5-minute video teardown · mobile latency · ad creative fatigue analysis
          </div>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed pt-2">
            We inspect your mobile load speed, meta creative attrition, and conversion drop-offs, then record a private 5-minute video showing the exact bottlenecks to resolve.
          </p>
        </div>

        {/* Step Progress Bar */}
        {!completed && (
          <div className="max-w-md mx-auto flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/20 w-full z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary transition-all duration-500 z-0"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs relative z-10 transition-all ${
                  step === s
                    ? "bg-primary text-black font-bold shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                    : step > s
                    ? "bg-primary/20 border border-primary text-primary"
                    : "bg-[var(--background-layer-1)] border border-white/20 text-muted"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
            ))}
          </div>
        )}

        {/* Form Container in original luxury styling */}
        <div className="bg-[var(--background-layer-1)] border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          {!completed ? (
            <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
              {/* Step 1: Business Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                      <Globe className="text-primary w-6 h-6" />
                      Tell Us About Your Brand
                    </h2>
                    <p className="text-xs text-muted uppercase tracking-widest mt-1">
                      Step 01 / 04 · Digital Footprint
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                        Business / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Luminary Skincare, Apex Studios"
                        className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none font-serif"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                        Website URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://yourbrand.com"
                        className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                        Instagram Handle (Optional)
                      </label>
                      <input
                        type="text"
                        value={instagramHandle}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                        placeholder="@yourbrand"
                        className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                        Industry / Sector
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none cursor-pointer"
                      >
                        <option value="D2C & E-Commerce">D2C & E-Commerce</option>
                        <option value="Clinics & Healthcare">Clinics & Healthcare</option>
                        <option value="Cafes & Hospitality">Cafes & Hospitality</option>
                        <option value="Gyms & Fitness">Gyms & Fitness</option>
                        <option value="Coaching & Education">Coaching & Education</option>
                        <option value="Real Estate & Consulting">Real Estate & Consulting</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      disabled={!businessName || !websiteUrl}
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all disabled:opacity-30 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Growth Bottleneck */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                      <Target className="text-primary w-6 h-6" />
                      What Is Your Primary Growth Objective?
                    </h2>
                    <p className="text-xs text-muted uppercase tracking-widest mt-1">
                      Step 02 / 04 · Strategic Focus
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Generate More Qualified Leads",
                        desc: "Consistent phone calls, WhatsApp consultations, and high-ticket bookings.",
                      },
                      {
                        title: "Scale ROAS on Paid Ads",
                        desc: "Lower customer acquisition costs across Meta and Google campaigns.",
                      },
                      {
                        title: "Rank #1 on Google Search & Maps",
                        desc: "Capture high-intent local and organic search traffic.",
                      },
                      {
                        title: "Redesign Website for Conversions",
                        desc: "Replace slow pages with a bespoke, sub-second Next.js web application.",
                      },
                    ].map((g) => (
                      <div
                        key={g.title}
                        onClick={() => setPrimaryGoal(g.title)}
                        className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          primaryGoal === g.title
                            ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_20px_rgba(197,160,89,0.15)]"
                            : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-base text-white">{g.title}</h4>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                              primaryGoal === g.title
                                ? "bg-primary border-primary text-black font-bold"
                                : "border-white/30"
                            }`}
                          >
                            {primaryGoal === g.title ? "✓" : ""}
                          </span>
                        </div>
                        <p className="text-xs text-muted font-light mt-3">{g.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Monthly Ad Spend */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                      <DollarSign className="text-primary w-6 h-6" />
                      Current Monthly Marketing Investment
                    </h2>
                    <p className="text-xs text-muted uppercase tracking-widest mt-1">
                      Step 03 / 04 · Scale Assessment
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        range: "< ₹50,000 / month ($500)",
                        label: "Early Stage",
                        desc: "Looking to build initial predictable customer acquisition.",
                      },
                      {
                        range: "₹50,000 - ₹2,00,000 ($1k - $2.5k)",
                        label: "Growth Stage",
                        desc: "Have some traction, ready for creative testing and funnels.",
                      },
                      {
                        range: "₹2,00,000 - ₹5,00,000 ($2.5k - $6k)",
                        label: "Scaling Pipeline",
                        desc: "Proven offer needing high-velocity ad production.",
                      },
                      {
                        range: "₹5,00,000+ / month ($6k+)",
                        label: "Enterprise",
                        desc: "Full-scale custom engineering, server-side tracking, and multi-market scale.",
                      },
                    ].map((item) => (
                      <div
                        key={item.range}
                        onClick={() => setMonthlySpend(item.range)}
                        className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          monthlySpend === item.range
                            ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_20px_rgba(197,160,89,0.15)]"
                            : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-serif text-base text-white">{item.range}</h4>
                            <span className="text-[10px] text-primary uppercase tracking-widest font-bold">
                              {item.label}
                            </span>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                              monthlySpend === item.range
                                ? "bg-primary border-primary text-black font-bold"
                                : "border-white/30"
                            }`}
                          >
                            {monthlySpend === item.range ? "✓" : ""}
                          </span>
                        </div>
                        <p className="text-xs text-muted font-light mt-3">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all cursor-pointer"
                    >
                      <span>Final Step</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Details */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                      <Sparkles className="text-primary w-6 h-6" />
                      Where Should We Deliver Your Audit?
                    </h2>
                    <p className="text-xs text-muted uppercase tracking-widest mt-1">
                      Step 04 / 04 · Delivery Destination
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Siddharth Verma"
                        className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none font-serif"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="siddharth@brand.com"
                          className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                          WhatsApp Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 80574 35939"
                          className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-sm border border-white/10 bg-white/[0.02] flex items-center gap-3 text-xs text-muted">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>Strict confidentiality. Your business metrics are never shared.</span>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !name || !email || !phone}
                      className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all disabled:opacity-40 cursor-pointer"
                    >
                      {loading ? "Generating Diagnostic..." : "Submit & Generate Audit"}
                      <Sparkles size={14} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* Completed Result Screen */
            <div className="text-center py-8 space-y-8">
              <div className="w-16 h-16 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 size={32} />
              </div>

              <div className="space-y-2">
                <div className="font-mono text-xs text-primary/80">
                  // dossier logged successfully
                </div>
                <h2 className="text-3xl md:text-5xl font-serif text-white">
                  Preliminary Funnel Health for {auditResult?.businessName}
                </h2>
              </div>

              <div className="p-8 rounded-xl bg-[var(--background-layer-2)] border border-white/10 max-w-sm mx-auto">
                <span className="text-6xl font-mono text-primary font-bold block">
                  {auditResult?.score}/100
                </span>
                <p className="font-mono text-xs text-muted mt-2">
                  preliminary health index
                </p>
              </div>

              <p className="text-muted text-sm max-w-md mx-auto font-light leading-relaxed">
                Our senior strategists are preparing your custom 5-minute video teardown. The review link will be dispatched to <strong className="text-white">{email}</strong> and your WhatsApp within 24 hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/918057435939?text=Hi%20NextCurrent%2C%20I%20just%20submitted%20an%20audit%20request%20for%20${encodeURIComponent(
                    businessName
                  )}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all"
                >
                  <MessageSquare size={16} />
                  <span>Notify on WhatsApp</span>
                </a>
                <Link
                  href="/"
                  className="font-mono text-xs text-muted hover:text-white transition-colors"
                >
                  return to overview →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
