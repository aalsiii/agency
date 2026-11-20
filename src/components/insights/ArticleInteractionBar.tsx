"use client";

import React, { useEffect, useState } from "react";
import { Share2, Check, Twitter, Linkedin, Bookmark } from "lucide-react";

export function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/[0.05]">
      <div
        className="h-full bg-gradient-to-r from-primary via-[#FFE5B4] to-primary transition-all duration-150 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}

export function ArticleShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://nextcurrent.media/insights/${slug}`;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-primary/50 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check size={12} className="text-emerald-400" />
            <span className="text-emerald-400">Copied</span>
          </>
        ) : (
          <>
            <Share2 size={12} className="text-primary" />
            <span>Share</span>
          </>
        )}
      </button>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 hover:border-primary/50 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
        title="Share on X"
      >
        <Twitter size={12} />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 hover:border-primary/50 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
        title="Share on LinkedIn"
      >
        <Linkedin size={12} />
      </a>
    </div>
  );
}
