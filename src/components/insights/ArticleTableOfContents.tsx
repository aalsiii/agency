"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function ArticleTableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="p-6 rounded-2xl bg-[#0c0c11] border border-white/10 shadow-xl space-y-4"
    >
      <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold tracking-wider border-b border-white/10 pb-3">
        <List size={14} className="text-primary" />
        <span>TABLE OF CONTENTS</span>
      </div>

      <ul className="space-y-2 font-sans text-xs sm:text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={item.level === 3 ? "pl-3.5" : ""}>
              <button
                type="button"
                onClick={() => scrollToHeading(item.id)}
                className={`text-left w-full py-1 transition-all flex items-start gap-2 group cursor-pointer ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-colors ${
                    isActive
                      ? "bg-primary shadow-[0_0_8px_rgba(197,160,89,0.8)]"
                      : "bg-white/20 group-hover:bg-white/60"
                  }`}
                />
                <span className="leading-snug">{item.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
