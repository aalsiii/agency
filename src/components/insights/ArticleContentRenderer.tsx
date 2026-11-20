import React from "react";
import Image from "next/image";
import Link from "next/link";

// Helper to convert heading text to a clean URL anchor slug
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Parses inline links [text](url), bold **text**, and `code`
export function renderRichText(text: string): React.ReactNode[] {
  // Regex matches: [link](url) OR **bold** OR `code`
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    // Markdown link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const href = linkMatch[2];
      const isInternal = href.startsWith("/") || href.startsWith("#");

      if (isInternal) {
        return (
          <Link
            key={idx}
            href={href}
            className="text-primary hover:text-white underline underline-offset-4 decoration-primary/40 hover:decoration-white font-medium transition-colors"
          >
            {linkText}
          </Link>
        );
      }

      return (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-white underline underline-offset-4 decoration-primary/40 hover:decoration-white font-medium transition-colors"
        >
          {linkText}
        </a>
      );
    }

    // Bold text: **bold**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-primary text-[0.9em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

interface ContentRendererProps {
  content: string;
  articleTitle: string;
}

export default function ArticleContentRenderer({
  content,
  articleTitle,
}: ContentRendererProps) {
  const blocks = content.split("\n\n").map((b) => b.trim()).filter(Boolean);

  let sectionCounter = 0;

  return (
    <div className="space-y-8 font-light leading-relaxed text-neutral-300">
      {blocks.map((block, i) => {
        // Image markdown: ![alt](url)
        const imgMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          const alt = imgMatch[1];
          const src = imgMatch[2];
          return (
            <figure key={i} className="my-8 space-y-3">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-xl">
                <Image
                  src={src}
                  alt={alt || articleTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
              {alt && (
                <figcaption className="text-center font-mono text-xs text-neutral-400">
                  // {alt}
                </figcaption>
              )}
            </figure>
          );
        }

        // Level 2 Heading: ## Heading
        if (block.startsWith("## ")) {
          sectionCounter++;
          const text = block.replace(/^##\s+/, "");
          const anchorId = slugifyHeading(text);

          return (
            <div key={i} id={anchorId} className="pt-10 pb-2 border-b border-white/10 space-y-2 scroll-mt-28">
              <span className="font-mono text-xs text-primary/80 uppercase tracking-widest block">
                // SECTION 0{sectionCounter} · STRATEGIC DIRECTIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
                {text}
              </h2>
            </div>
          );
        }

        // Level 3 Subheading: ### Heading
        if (block.startsWith("### ")) {
          const text = block.replace(/^###\s+/, "");
          const anchorId = slugifyHeading(text);

          return (
            <div key={i} id={anchorId} className="pt-6 pb-1 space-y-1 scroll-mt-28">
              <h3 className="text-xl sm:text-2xl font-sans font-medium text-white tracking-tight flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{text}</span>
              </h3>
            </div>
          );
        }

        // Blockquote / Callout: > Quote
        if (block.startsWith("> ")) {
          const quoteText = block.replace(/^>\s*/, "");
          return (
            <blockquote
              key={i}
              className="p-6 sm:p-7 rounded-2xl bg-[#0c0c11] border border-primary/30 border-l-4 border-l-primary italic text-neutral-200 text-sm sm:text-base my-6 shadow-xl leading-relaxed"
            >
              {renderRichText(quoteText)}
            </blockquote>
          );
        }

        // Numbered Steps: 1. , 2. , 3.
        if (block.startsWith("1. ") || block.startsWith("2. ") || block.startsWith("3. ")) {
          const lines = block.split("\n");
          return (
            <div key={i} className="grid grid-cols-1 gap-3.5 my-6">
              {lines.map((l, idx) => {
                const stepNum = String(idx + 1).padStart(2, "0");
                const cleaned = l.replace(/^\d+\.\s*/, "");
                const parts = cleaned.split("**:");
                const title = parts.length > 1 ? parts[0].replace(/\*\*/g, "") : null;
                const desc = parts.length > 1 ? parts[1] : cleaned;

                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:border-primary/40 transition-colors"
                  >
                    <span className="font-mono text-sm text-primary font-bold bg-primary/10 border border-primary/20 w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
                      {stepNum}
                    </span>
                    <div className="space-y-1 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                      {title && (
                        <span className="font-medium text-white block">
                          {renderRichText(title)}
                        </span>
                      )}
                      <span>{renderRichText(desc)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // Bulleted Lists: - or *
        if (block.startsWith("- ") || block.startsWith("* ")) {
          const lines = block.split("\n");
          return (
            <div key={i} className="space-y-2.5 my-4 pl-2">
              {lines.map((l, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="leading-relaxed">
                    {renderRichText(l.replace(/^[-*]\s*/, ""))}
                  </span>
                </div>
              ))}
            </div>
          );
        }

        // Standard Paragraph with inline formatting and links
        return (
          <p key={i} className="text-sm sm:text-base leading-relaxed text-neutral-300">
            {renderRichText(block)}
          </p>
        );
      })}
    </div>
  );
}
