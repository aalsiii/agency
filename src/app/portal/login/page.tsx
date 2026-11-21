"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function ClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/client/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/portal");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("client@yogamani.com");
    setPassword("yogamani2026");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans selection:bg-[#C5A059] selection:text-black">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#C5A059]/10 to-purple-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 flex items-center justify-center font-bold text-[#C5A059] font-serif text-xs">
            NC
          </span>
          <div>
            <span className="font-serif font-bold text-sm tracking-tight text-white block">
              NextCurrent
            </span>
            <span className="font-mono text-[9px] text-[#C5A059]/80 uppercase tracking-widest block">
              Client Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-mono text-neutral-400 hover:text-white transition flex items-center gap-1"
        >
          <span>Return to site</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-12 relative z-10">
        <div className="rounded-3xl bg-[#0c0c0c] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Isolated Client Enclave</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Client Account Access
            </h1>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Sign in to monitor live campaigns, weekly performance updates, attribution reports, and roadmap execution.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider">
                Client Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@yourbrand.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A059]/60 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="mailto:bijalwanakshat@gmail.com?subject=NextCurrent%20Client%20Password%20Reset"
                  className="text-[10px] text-[#C5A059] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A059]/60 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#C5A059] hover:bg-[#d6b268] text-black font-semibold text-xs tracking-wider uppercase transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Access Client Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span className="font-mono">Demo Client Credentials:</span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[#C5A059] font-medium hover:underline cursor-pointer"
              >
                Auto-fill Yogamani
              </button>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-neutral-400 space-y-1">
              <div>Email: <span className="text-white">client@yogamani.com</span></div>
              <div>Pass: <span className="text-white">yogamani2026</span></div>
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-[10px] font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
            256-Bit Client Enclave
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
            Admin Isolated
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
            Direct Attribution
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] font-mono text-neutral-500 relative z-10">
        &copy; {new Date().getFullYear()} NextCurrent Media. Client Enclave Architecture.
      </div>
    </div>
  );
}
