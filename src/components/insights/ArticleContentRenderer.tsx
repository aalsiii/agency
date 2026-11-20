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

  return (
    <div className="prose-content text-neutral-300 font-light leading-relaxed">
      {blocks.map((block, i) => {
        // Image markdown: ![alt](url)
        const imgMatch = block.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          const alt = imgMatch[1];
          const src = imgMatch[2];
          return (
            <figure key={i} className="my-8">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-lg">
                <Image
                  src={src}
                  alt={alt || articleTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
              {alt && (
                <figcaption className="text-center font-sans text-xs text-neutral-400 mt-2">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        }

        // Level 2 Heading: ## Heading (Clean WordPress-style H2)
        if (block.startsWith("## ")) {
          const text = block.replace(/^##\s+/, "");
          const anchorId = slugifyHeading(text);

          return (
            <h2
              key={i}
              id={anchorId}
              className="text-2xl sm:text-3xl font-sans font-bold text-white mt-10 mb-4 tracking-tight scroll-mt-28"
            >
              {text}
            </h2>
          );
        }

        // Level 3 Subheading: ### Heading (Clean WordPress-style H3)
        if (block.startsWith("### ")) {
          const text = block.replace(/^###\s+/, "");
          const anchorId = slugifyHeading(text);

          return (
            <h3
              key={i}
              id={anchorId}
              className="text-xl sm:text-2xl font-sans font-semibold text-white mt-8 mb-3 tracking-tight scroll-mt-28"
            >
              {text}
            </h3>
          );
        }

        // Blockquote / Quote: > Quote (Clean WordPress-style Blockquote)
        if (block.startsWith("> ")) {
          const quoteText = block.replace(/^>\s*/, "");
          return (
            <blockquote
              key={i}
              className="border-l-4 border-primary/70 pl-5 py-2 my-6 italic text-neutral-200 text-base sm:text-lg bg-white/[0.02] rounded-r-lg"
            >
              {renderRichText(quoteText)}
            </blockquote>
          );
        }

        // Numbered List: 1. , 2. , 3. (Clean Standard WordPress Ordered List)
        if (block.startsWith("1. ") || block.startsWith("2. ") || block.startsWith("3. ")) {
          const lines = block.split("\n");
          return (
            <ol key={i} className="list-decimal pl-6 my-4 space-y-2 text-base text-neutral-300">
              {lines.map((l, idx) => (
                <li key={idx} className="leading-relaxed pl-1">
                  {renderRichText(l.replace(/^\d+\.\s*/, ""))}
                </li>
              ))}
            </ol>
          );
        }

        // Bulleted List: - or * (Clean Standard WordPress Unordered List)
        if (block.startsWith("- ") || block.startsWith("* ")) {
          const lines = block.split("\n");
          return (
            <ul key={i} className="list-disc pl-6 my-4 space-y-2 text-base text-neutral-300">
              {lines.map((l, idx) => (
                <li key={idx} className="leading-relaxed pl-1">
                  {renderRichText(l.replace(/^[-*]\s*/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={i} className="text-base sm:text-lg leading-relaxed text-neutral-300 my-4 font-normal">
            {renderRichText(block)}
          </p>
        );
      })}
    </div>
  );
}
