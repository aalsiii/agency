"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCurrency } from "@/lib/currency-context";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const { currency } = useCurrency();
  const [focused, setFocused] = useState<string | null>(null);
  const [showOther, setShowOther] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "Performance Marketing",
    otherSubject: "",
    budget: "₹50k - ₹1.5L/mo",
    message: "",
  });

  useEffect(() => {
    const serviceParam = searchParams?.get("service");
    const scopeParam = searchParams?.get("scope");
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, subject: serviceParam }));
    } else if (scopeParam) {
      setFormData((prev) => ({
        ...prev,
        subject: "Custom Scope",
        message: `Inquiring about combined package: ${scopeParam}`,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "service-select") {
      if (value === "Other") {
        setShowOther(true);
        setFormData((prev) => ({ ...prev, subject: "Other" }));
      } else {
        setShowOther(false);
        setFormData((prev) => ({ ...prev, subject: value, otherSubject: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalSubject = showOther ? formData.otherSubject : formData.subject;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          serviceInterested: finalSubject,
          budget: formData.budget,
          currency,
          message: formData.message,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const containerClasses = (name: string) => `
    relative p-8 bg-zinc-900/40 border border-white/20 transition-all duration-700 rounded-sm overflow-hidden
    ${
      focused === name
        ? "border-primary/40 bg-zinc-900/60 ring-1 ring-primary/20 shadow-[0_0_40px_rgba(197,160,89,0.05)]"
        : "hover:border-white/20"
    }
  `;

  const labelClasses = (name: string) => `
    text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block transition-colors duration-500
    ${focused === name ? "text-primary" : "text-primary/40"}
  `;

  if (submitted) {
    return (
      <div className="relative p-12 bg-zinc-900/40 border border-primary/40 rounded-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center mx-auto text-primary">
          <CheckCircle2 size={32} />
        </div>
        <div>
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] block mb-2">
            Inquiry Logged
          </span>
          <h3 className="text-3xl font-serif text-white">Thank You, {formData.name}</h3>
          <p className="text-muted text-sm max-w-md mx-auto mt-3 font-light leading-relaxed">
            Your brief has been delivered to our lead growth strategists. We will review your requirements and reach out within 12 hours.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/918057435939?text=Hi%20NextCurrent%20Media%2C%20I%20just%20submitted%20an%20inquiry%20as%20${encodeURIComponent(
              formData.name
            )}.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all duration-300"
          >
            <span>Fast-Track on WhatsApp</span>
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={containerClasses("name")}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
            <label className={labelClasses("name")}>Full Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Type your name..."
              className="w-full bg-transparent text-white text-lg font-serif outline-none placeholder:text-white/10"
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              onChange={handleChange}
              value={formData.name}
            />
            <motion.div
              initial={false}
              animate={{ width: focused === "name" ? "100%" : "0%" }}
              className="absolute bottom-0 left-0 h-[2px] bg-primary"
            />
          </div>

          <div className={containerClasses("email")}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
            <label className={labelClasses("email")}>Email Address *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              className="w-full bg-transparent text-white text-lg font-serif outline-none placeholder:text-white/10"
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              onChange={handleChange}
              value={formData.email}
            />
            <motion.div
              initial={false}
              animate={{ width: focused === "email" ? "100%" : "0%" }}
              className="absolute bottom-0 left-0 h-[2px] bg-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={containerClasses("phone")}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
            <label className={labelClasses("phone")}>Phone / WhatsApp</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 80574 35939"
              className="w-full bg-transparent text-white text-lg font-serif outline-none placeholder:text-white/10"
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused(null)}
              onChange={handleChange}
              value={formData.phone}
            />
            <motion.div
              initial={false}
              animate={{ width: focused === "phone" ? "100%" : "0%" }}
              className="absolute bottom-0 left-0 h-[2px] bg-primary"
            />
          </div>

          <div className={containerClasses("company")}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
            <label className={labelClasses("company")}>Company / Brand</label>
            <input
              type="text"
              name="company"
              placeholder="Brand name..."
              className="w-full bg-transparent text-white text-lg font-serif outline-none placeholder:text-white/10"
              onFocus={() => setFocused("company")}
              onBlur={() => setFocused(null)}
              onChange={handleChange}
              value={formData.company}
            />
            <motion.div
              initial={false}
              animate={{ width: focused === "company" ? "100%" : "0%" }}
              className="absolute bottom-0 left-0 h-[2px] bg-primary"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className={containerClasses("subject")}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
            <label className={labelClasses("subject")}>Interested Capability</label>
            <div className="relative">
              <select
                name="service-select"
                className="w-full bg-transparent text-white text-lg font-serif outline-none appearance-none cursor-pointer relative z-10"
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                onChange={handleChange}
                value={formData.subject}
                required
              >
                <option value="Performance Marketing" className="bg-zinc-900">
                  Performance Marketing (Meta & Google Ads)
                </option>
                <option value="Next.js Web Applications & Funnels" className="bg-zinc-900">
                  Next.js Web Applications & Funnels
                </option>
                <option value="SEO & AI Search Domination" className="bg-zinc-900">
                  SEO & AI Search Domination
                </option>
                <option value="Social Media & Reel Content Engine" className="bg-zinc-900">
                  Social Media & Reel Content Engine
                </option>
                <option value="Google Business Profile & Local Domination" className="bg-zinc-900">
                  Google Business Profile & Local Domination
                </option>
                <option value="CRO & High-Velocity Funnel Sprints" className="bg-zinc-900">
                  CRO & High-Velocity Funnel Sprints
                </option>
                <option value="Other" className="bg-zinc-900">
                  Other / Bespoke Scope
                </option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none w-5 h-5" />
            </div>
            <motion.div
              initial={false}
              animate={{ width: focused === "subject" ? "100%" : "0%" }}
              className="absolute bottom-0 left-0 h-[2px] bg-primary"
            />
          </div>

          {showOther && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={containerClasses("otherSubject")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
              <label className={labelClasses("otherSubject")}>Specific Interest</label>
              <input
                type="text"
                name="otherSubject"
                required={showOther}
                placeholder="Tell us more about what you need..."
                className="w-full bg-transparent text-white text-lg font-serif outline-none placeholder:text-white/10"
                onFocus={() => setFocused("otherSubject")}
                onBlur={() => setFocused(null)}
                onChange={handleChange}
                value={formData.otherSubject}
              />
              <motion.div
                initial={false}
                animate={{ width: focused === "otherSubject" ? "100%" : "0%" }}
                className="absolute bottom-0 left-0 h-[2px] bg-primary"
              />
            </motion.div>
          )}
        </div>

        <div className={containerClasses("message")}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
          <label className={labelClasses("message")}>Your Project Brief *</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us about your brand, current bottlenecks, and target goals..."
            className="w-full bg-transparent text-white text-lg font-serif outline-none resize-none placeholder:text-white/10"
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            onChange={handleChange}
            value={formData.message}
          />
          <motion.div
            initial={false}
            animate={{ width: focused === "message" ? "100%" : "0%" }}
            className="absolute bottom-0 left-0 h-[2px] bg-primary"
          />
        </div>

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-12 py-5 rounded-full hover:bg-primary hover:text-black transition-all duration-500 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Inquiry"}
            <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
