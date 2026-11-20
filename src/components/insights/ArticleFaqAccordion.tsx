"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function ArticleFaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  if (!faqs || faqs.length === 0) return null;

  const toggleIndex = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <section className="pt-10 pb-6 space-y-6 border-t border-white/10" id="frequently-asked-questions">
      <div className="flex items-center gap-2.5 font-mono text-xs text-primary uppercase tracking-wider">
        <HelpCircle size={15} />
        <span>// STRATEGIC ADVISORY · FREQUENTLY ASKED QUESTIONS</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3 pt-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-[#0c0c11] transition-all overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-sans font-medium text-sm sm:text-base text-white">
                  {faq.question}
                </span>
                <span
                  className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-neutral-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary border-primary/30" : ""
                  }`}
                >
                  <ChevronDown size={14} />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
