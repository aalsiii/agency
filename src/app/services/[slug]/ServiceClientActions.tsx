"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

interface Props {
  title: string;
  priceInr?: number;
  priceUsd?: number;
  billingType?: string;
}

export default function ServiceClientActions({ title }: Props) {
  return (
    <div className="pt-6 flex flex-wrap items-center justify-between gap-6 border-t border-white/10">
      <div className="space-y-1">
        <span className="font-mono text-[11px] text-muted block">
          engagement architecture
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-primary font-semibold tracking-wide">
            Tailored Scope · Dedicated Execution Squad
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={`/start-a-project?service=${encodeURIComponent(title)}`}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all duration-300"
        >
          <span>Request Custom Proposal</span>
          <ArrowUpRight size={14} />
        </Link>
        <Link
          href="/book-a-call"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 text-white hover:text-black hover:bg-white hover:border-white font-mono text-xs transition-all duration-300"
        >
          <Calendar size={13} />
          <span>Book Strategy Call</span>
        </Link>
      </div>
    </div>
  );
}
