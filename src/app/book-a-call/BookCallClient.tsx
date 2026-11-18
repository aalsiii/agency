"use client";

import { useState } from "react";
import { Clock, CheckCircle2, Calendar } from "lucide-react";

export default function BookCallClient() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:00 AM IST");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: What to Expect */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-8 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-6">
          <span className="font-mono text-xs text-primary/80 block">
            // call agenda:
          </span>

          <div className="space-y-4 text-xs font-light text-white/85">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Duration:</strong> 30 Minutes via Google Meet</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Review current ad spend, CAC, and conversion bottlenecks</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Evaluate custom Next.js web application requirements</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Provide a frank recommendation on channel prioritization</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <span className="font-mono text-[11px] text-muted block">
              Direct WhatsApp alternative:
            </span>
            <a
              href="https://wa.me/918057435939"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-primary hover:text-white transition-colors block mt-1"
            >
              +91 80574 35939 →
            </a>
          </div>
        </div>
      </div>

      {/* Right: Booking Form */}
      <div className="lg:col-span-7">
        <div className="p-8 md:p-10 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-primary/80 block">
              // reserve consultation slot
            </span>
            <h2 className="text-2xl font-serif text-white">
              Select Your Preferred Window
            </h2>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Discovery Window Requested</h3>
              <p className="font-mono text-xs text-muted max-w-sm mx-auto">
                Thank you, {name}. A Google Meet invitation and calendar confirmation will be sent to {email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-muted">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-muted/40 outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-muted">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@company.com"
                  className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-muted/40 outline-none focus:border-primary/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-primary/50 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-muted">Preferred Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-primary/50 font-mono"
                  >
                    <option className="bg-black">11:00 AM IST</option>
                    <option className="bg-black">02:00 PM IST</option>
                    <option className="bg-black">04:30 PM IST</option>
                    <option className="bg-black">07:00 PM IST</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all cursor-pointer mt-4"
              >
                Confirm Discovery Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
