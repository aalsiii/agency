"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Video,
  Target,
  FileText,
  Gauge,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type ToolType = "reel-hooks" | "ad-copy" | "caption-gen" | "website-health";

export default function FreeToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolType>("reel-hooks");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // States
  const [niche, setNiche] = useState("Clinics & Wellness");
  const [topic, setTopic] = useState("Why your consultations aren't booking");
  const [hooksResult, setHooksResult] = useState<any>(null);

  const [product, setProduct] = useState("Cosmetic Dentistry");
  const [targetAudience, setTargetAudience] = useState("Professionals 25-45");
  const [offer, setOffer] = useState("Free 3D Smile Consultation");
  const [platform, setPlatform] = useState("Meta Ads");
  const [adResult, setAdResult] = useState<any>(null);

  const [captionTopic, setCaptionTopic] = useState("3 signs your website is losing clients");
  const [captionTone, setCaptionTone] = useState("Direct & Strategic");
  const [captionResult, setCaptionResult] = useState<any>(null);

  const [websiteUrl, setWebsiteUrl] = useState("https://yourbrand.com");
  const [healthResult, setHealthResult] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    let inputs: any = {};

    if (activeTool === "reel-hooks") inputs = { niche, topic };
    else if (activeTool === "ad-copy") inputs = { product, targetAudience, offer, platform };
    else if (activeTool === "caption-gen") inputs = { topic: captionTopic, tone: captionTone };
    else if (activeTool === "website-health") inputs = { url: websiteUrl };

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: activeTool, inputs }),
      });
      const data = await res.json();
      if (data.result) {
        if (activeTool === "reel-hooks") setHooksResult(data.result);
        if (activeTool === "ad-copy") setAdResult(data.result);
        if (activeTool === "caption-gen") setCaptionResult(data.result);
        if (activeTool === "website-health") setHealthResult(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Marketing & creative utilities
          </h1>
          <div className="font-mono text-xs text-primary/80">
            // algorithmic generators · ad copy structures · Core Web Vitals diagnostics
          </div>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed pt-2">
            Deploy the exact viral hook formulas, direct-response ad angles, and speed diagnostics our media buyers run daily.
          </p>
        </div>

        {/* Tool Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[var(--background-layer-1)] border border-white/15 rounded-full max-w-2xl mx-auto">
          {[
            { id: "reel-hooks", label: "reel hooks", icon: Video },
            { id: "ad-copy", label: "ad copy", icon: Target },
            { id: "caption-gen", label: "captions", icon: FileText },
            { id: "website-health", label: "speed & seo", icon: Gauge },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id as ToolType)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                    : "text-muted hover:text-white"
                }`}
              >
                <Icon size={13} />
                <span>[ {t.label} ]</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace */}
        <div className="bg-[var(--background-layer-1)] border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          {activeTool === "reel-hooks" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                  <Video className="text-primary w-6 h-6" />
                  Viral Reel Hook Generator
                </h3>
                <p className="text-xs text-muted uppercase tracking-widest mt-1">
                  5 psychological patterns to stop thumbs in under 2 seconds.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    Industry / Niche
                  </label>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    Core Topic or Objection
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-5 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all cursor-pointer"
              >
                {loading ? "Generating Frameworks..." : "Generate 5 High-Retention Hooks"}
              </button>

              {hooksResult && (
                <div className="space-y-4 pt-6 border-t border-white/10">
                  {hooksResult.hooks.map((h: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 rounded-xl bg-[var(--background-layer-2)] border border-white/10 hover:border-primary/40 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary block">
                          // {h.type}
                        </span>
                        <h4 className="text-lg font-serif text-white">&quot;{h.hook}&quot;</h4>
                        <p className="text-xs text-muted font-light leading-relaxed">
                          Format: {h.scriptPreview}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(h.hook, idx)}
                        className="p-3 rounded-full border border-white/20 hover:border-primary text-muted hover:text-primary transition-colors shrink-0"
                        title="Copy Hook"
                      >
                        {copiedIndex === idx ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTool === "ad-copy" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                  <Target className="text-primary w-6 h-6" />
                  Meta & Google Ad Copy Crafter
                </h3>
                <p className="text-xs text-muted uppercase tracking-widest mt-1">
                  Full-funnel copywriting angles formulated for direct return on spend.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    Product / Offering
                  </label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    Hook Offer / Incentive
                  </label>
                  <input
                    type="text"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Meta Ads">Meta Ads (Instagram / Facebook)</option>
                    <option value="Google Search Ads">Google Search Ads</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-5 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all cursor-pointer"
              >
                {loading ? "Crafting Copies..." : "Generate 3 High-ROAS Ad Copies"}
              </button>

              {adResult && (
                <div className="space-y-6 pt-6 border-t border-white/10">
                  {adResult.copies.map((c: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 rounded-xl bg-[var(--background-layer-2)] border border-white/10 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                          // {c.angle}
                        </span>
                        <button
                          onClick={() => copyToClipboard(`${c.headline}\n\n${c.primaryText}`, idx)}
                          className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors"
                        >
                          {copiedIndex === idx ? "Copied" : "Copy Ad"}
                        </button>
                      </div>
                      <h4 className="text-xl font-serif text-white font-bold">{c.headline}</h4>
                      <p className="text-muted text-sm whitespace-pre-wrap leading-relaxed font-light">
                        {c.primaryText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTool === "caption-gen" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                  <FileText className="text-primary w-6 h-6" />
                  Instagram Caption & Hashtags Suite
                </h3>
                <p className="text-xs text-muted uppercase tracking-widest mt-1">
                  Format high-engagement captions with clean spacing and comment triggers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    Topic / Core Point
                  </label>
                  <input
                    type="text"
                    value={captionTopic}
                    onChange={(e) => setCaptionTopic(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    Tone
                  </label>
                  <select
                    value={captionTone}
                    onChange={(e) => setCaptionTone(e.target.value)}
                    className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Direct & Strategic">Direct & Strategic</option>
                    <option value="Educational & Authoritative">Educational & Authoritative</option>
                    <option value="Story-Driven">Story-Driven</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-5 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all cursor-pointer"
              >
                {loading ? "Writing Caption..." : "Generate Caption"}
              </button>

              {captionResult && (
                <div className="p-6 rounded-xl bg-[var(--background-layer-2)] border border-white/10 space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                      Ready to Publish
                    </span>
                    <button
                      onClick={() => copyToClipboard(captionResult.caption, 999)}
                      className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors"
                    >
                      {copiedIndex === 999 ? "Copied" : "Copy Caption"}
                    </button>
                  </div>
                  <div className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed font-light">
                    {captionResult.caption}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTool === "website-health" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                  <Gauge className="text-primary w-6 h-6" />
                  Website Health & Speed Scanner
                </h3>
                <p className="text-xs text-muted uppercase tracking-widest mt-1">
                  Evaluate Core Web Vitals, mobile speed, and conversion friction.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                  Website Domain
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourbrand.com"
                  className="w-full bg-[var(--background-layer-2)] border border-white/20 focus:border-primary rounded-sm p-4 text-sm text-white outline-none font-mono"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-5 rounded-full border border-primary bg-primary text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:border-white transition-all cursor-pointer"
              >
                {loading ? "Scanning Site..." : "Analyze Performance"}
              </button>

              {healthResult && (
                <div className="space-y-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between p-6 rounded-xl bg-[var(--background-layer-2)] border border-white/10">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted">Domain</span>
                      <h4 className="text-lg font-serif text-white font-bold">{healthResult.url}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-widest text-muted">Performance</span>
                      <p className="text-3xl font-serif text-primary font-bold">
                        {healthResult.overallScore}/100
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {healthResult.metrics.map((m: any, idx: number) => (
                      <div key={idx} className="p-5 rounded-xl bg-[var(--background-layer-2)] border border-white/10 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-serif text-white">{m.name}</span>
                          <span className="text-xs font-bold text-primary">{m.score}/100</span>
                        </div>
                        <p className="text-xs text-muted font-light">{m.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                      Recommended Strategic Remediation:
                    </span>
                    <ul className="space-y-1 text-xs text-white/80 list-disc list-inside font-light">
                      {healthResult.quickWins.map((w: string, i: number) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
