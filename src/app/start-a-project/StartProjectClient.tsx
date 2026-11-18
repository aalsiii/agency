"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Calendar,
  Globe,
  Layers,
  FileText,
  DollarSign,
} from "lucide-react";
import { useCurrency } from "@/lib/currency-context";

const availableServices = [
  "Search Engine Optimization (SEO)",
  "Social Media Marketing (SMM)",
  "Performance Marketing & Paid Ads",
  "Custom Next.js Website Development",
  "WordPress & Headless CMS Engineering",
  "High-Velocity Website Redesign",
  "Brand Identity & Positioning",
  "Content Production & Video Editing",
  "Digital Strategy & Growth Consulting",
  "Other / Custom Requirement",
];

const budgetRangesInr = [
  "₹35,000 - ₹75,000 ($450 - $900)",
  "₹75,000 - ₹1.5 Lakh ($900 - $1.8k)",
  "₹1.5 Lakh - ₹3.5 Lakh ($1.8k - $4.2k)",
  "₹3.5 Lakh - ₹7 Lakh ($4.2k - $8.5k)",
  "₹7 Lakh+ ($8.5k+)",
];

const budgetRangesUsd = [
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

const timelineOptions = [
  { id: "Immediately", label: "Immediately", desc: "Ready to kick off this week" },
  { id: "Within 2-4 weeks", label: "Within 2–4 weeks", desc: "Planning for next month" },
  { id: "Within 1-3 months", label: "Within 1–3 months", desc: "Q2/Q3 strategic rollout" },
  { id: "Flexible", label: "Flexible", desc: "Looking for the right partner first" },
];

export default function StartProjectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Personal Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");

  // Step 2: Services
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Step 3: Project Details
  const [businessDesc, setBusinessDesc] = useState("");
  const [projectObjectives, setProjectObjectives] = useState("");
  const [currentChallenges, setCurrentChallenges] = useState("");

  // Step 4: Budget
  const [budget, setBudget] = useState(
    currency === "INR" ? budgetRangesInr[1] : budgetRangesUsd[1]
  );

  // Step 5: Timeline
  const [timeline, setTimeline] = useState("Immediately");

  // Step 6: Notes & Consent
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [consent, setConsent] = useState(true);

  // Pre-fill service from URL if provided
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const refParam = searchParams.get("reference");
    if (serviceParam) {
      const match = availableServices.find((s) =>
        s.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (match && !selectedServices.includes(match)) {
        setSelectedServices([match]);
      }
    } else if (refParam) {
      setAdditionalNotes(`Referencing case study: ${refParam}`);
    }
  }, [searchParams]);

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (!name || !email) {
        setError("Please enter your name and work email.");
        return;
      }
    }
    if (step === 2) {
      if (selectedServices.length === 0) {
        setError("Please select at least one service capability.");
        return;
      }
    }
    if (step === 3) {
      if (!projectObjectives) {
        setError("Please describe what you want to achieve with this project.");
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please confirm consent to proceed.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          country,
          company,
          website,
          servicesRequested: selectedServices,
          serviceInterested: selectedServices[0],
          projectObjectives,
          timeline,
          budget,
          currency,
          message: `Business Description: ${businessDesc || "N/A"}\n\nObjectives: ${projectObjectives}\n\nChallenges: ${currentChallenges || "N/A"}\n\nAdditional Notes: ${additionalNotes || "N/A"}`,
          notes: `Timeline: ${timeline} | Country: ${country}`,
          source: "start-a-project-multistep",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      router.push(`/thank-you?leadId=${encodeURIComponent(data.leadId)}&name=${encodeURIComponent(name)}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error submitting project inquiry.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-36 pb-24 px-6 md:px-12 container mx-auto text-foreground">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Start a Project
          </h1>
          <div className="font-mono text-xs text-primary/80">
            // structured intake · step 0{step} of 06 · 24-hour partner response
          </div>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Tell us about your objectives, required capabilities, budget, and timeline to receive a custom scope and strategy review.
          </p>
        </div>

        {/* Step Progress Indicator */}
        <div className="max-w-xl mx-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span className="text-primary font-semibold">
              Step 0{step}: {
                step === 1 ? "Personal Info" :
                step === 2 ? "Services Required" :
                step === 3 ? "Project Details" :
                step === 4 ? "Budget Range" :
                step === 5 ? "Timeline" :
                "Review & Submit"
              }
            </span>
            <span>{Math.round((step / 6) * 100)}% complete</span>
          </div>

          <div className="h-1.5 w-full bg-[var(--background-layer-2)] border border-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="p-8 md:p-12 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 font-mono text-xs">
              {error}
            </div>
          )}

          <form onSubmit={step === 6 ? handleSubmit : handleNext}>
            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-white flex items-center gap-2.5">
                    <Globe className="text-primary w-5 h-5" />
                    <span>Contact & Company Information</span>
                  </h2>
                  <p className="text-xs text-muted font-light mt-1">
                    Who should our lead strategist address during the discovery review?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@company.com"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="India / United States / UAE"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">Company / Brand Name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">Current Website URL</label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourbrand.com"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Services Required */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-white flex items-center gap-2.5">
                    <Layers className="text-primary w-5 h-5" />
                    <span>Select Required Capabilities</span>
                  </h2>
                  <p className="text-xs text-muted font-light mt-1">
                    Select all capabilities you need for your growth sprint (multi-select enabled).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {availableServices.map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <div
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_15px_rgba(197,160,89,0.12)] text-white"
                            : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/20 text-muted"
                        }`}
                      >
                        <span className="text-xs font-sans font-medium">{srv}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-primary border-primary text-black"
                              : "border-white/30"
                          }`}
                        >
                          {isSelected && <Check size={11} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Project Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-white flex items-center gap-2.5">
                    <FileText className="text-primary w-5 h-5" />
                    <span>Project Objectives & Context</span>
                  </h2>
                  <p className="text-xs text-muted font-light mt-1">
                    Brief us on your current commercial bottlenecks and desired end state.
                  </p>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">
                      What does your business sell or provide?
                    </label>
                    <input
                      type="text"
                      value={businessDesc}
                      onChange={(e) => setBusinessDesc(e.target.value)}
                      placeholder="e.g. Premium dental clinic offering smile makeovers and dental implants in Gurgaon"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">
                      Primary Project Objectives * (What does winning look like?)
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={projectObjectives}
                      onChange={(e) => setProjectObjectives(e.target.value)}
                      placeholder="e.g. Generate 40+ qualified patient calls per month at under ₹500 CAC, and redesign our clinic site on Next.js"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-muted">
                      Current Bottlenecks & Frustrations
                    </label>
                    <textarea
                      rows={2}
                      value={currentChallenges}
                      onChange={(e) => setCurrentChallenges(e.target.value)}
                      placeholder="e.g. Inconsistent word of mouth, previous agency ran ads with high no-show rates, current site takes 5 seconds to load"
                      className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Budget Range */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-white flex items-center gap-2.5">
                    <DollarSign className="text-primary w-5 h-5" />
                    <span>Expected Investment / Budget</span>
                  </h2>
                  <p className="text-xs text-muted font-light mt-1">
                    Select a ballpark investment range. All retainers are month-to-month with zero lock-in contracts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {(currency === "INR" ? budgetRangesInr : budgetRangesUsd).map((b) => {
                    const isSelected = budget === b;
                    return (
                      <div
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_15px_rgba(197,160,89,0.12)] text-white"
                            : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/20 text-muted"
                        }`}
                      >
                        <span className="font-mono text-xs font-semibold">{b}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-primary border-primary text-black"
                              : "border-white/30"
                          }`}
                        >
                          {isSelected && <Check size={11} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: Timeline */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-white flex items-center gap-2.5">
                    <Calendar className="text-primary w-5 h-5" />
                    <span>Project Timeline & Launch Target</span>
                  </h2>
                  <p className="text-xs text-muted font-light mt-1">
                    When are you planning to begin implementation?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {timelineOptions.map((opt) => {
                    const isSelected = timeline === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setTimeline(opt.id)}
                        className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? "bg-[var(--surface-highlight)] border-primary shadow-[0_0_15px_rgba(197,160,89,0.12)]"
                            : "bg-[var(--background-layer-2)] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div>
                          <h4 className="text-sm font-serif text-white font-semibold">
                            {opt.label}
                          </h4>
                          <p className="font-mono text-[11px] text-muted mt-1">
                            {opt.desc}
                          </p>
                        </div>

                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? "bg-primary border-primary text-black"
                              : "border-white/30"
                          }`}
                        >
                          {isSelected && <Check size={11} strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: Submission & Consent */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-white flex items-center gap-2.5">
                    <ShieldCheck className="text-primary w-5 h-5" />
                    <span>Review & Confirmation</span>
                  </h2>
                  <p className="text-xs text-muted font-light mt-1">
                    Verify your enquiry summary before dispatching directly to our senior partners.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-6 rounded-xl bg-[var(--background-layer-2)] border border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted">Contact:</span>
                    <span className="text-white">{name} ({email})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted">Company:</span>
                    <span className="text-white">{company || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted">Services:</span>
                    <span className="text-primary">{selectedServices.join(", ")}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted">Budget:</span>
                    <span className="text-white">{budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Timeline:</span>
                    <span className="text-white">{timeline}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-muted">Additional Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any specific questions or links to drive files..."
                    className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-muted/40 outline-none focus:border-primary/50 transition-colors font-sans resize-none"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#C5A059] rounded"
                  />
                  <span className="text-xs text-muted font-light leading-relaxed">
                    I consent to NextCurrent Media storing my contact information to review this inquiry and prepare a confidential proposal. (Read our <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link>).
                  </span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="font-mono text-xs text-muted hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>[ previous step ]</span>
                </button>
              ) : (
                <Link
                  href="/"
                  className="font-mono text-xs text-muted hover:text-white transition-colors"
                >
                  ← cancel & return home
                </Link>
              )}

              {step < 6 ? (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-9 py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? "Transmitting Dossier..." : "Submit Project Intake"}</span>
                  <Sparkles size={14} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
