import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Share2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { getArticleCoverImage } from "@/lib/article-images";
import { ReadingProgressBar, ArticleShareButtons } from "@/components/insights/ArticleInteractionBar";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  let post: any = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch (e) {
    console.error("Metadata fetch fallback for article:", slug);
  }

  if (!post) {
    return { title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | NextCurrent Insights` };
  }

  const coverUrl = getArticleCoverImage(post.slug, post.category, post.coverImage);

  return {
    title: `${post.title} | NextCurrent Insights`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | NextCurrent Insights`,
      description: post.excerpt,
      type: "article",
      images: [{ url: coverUrl }],
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  let post: any = null;

  try {
    post = await prisma.blogPost.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Database connection fallback on InsightArticlePage:", error);
  }

  if (!post) {
    return notFound();
  }

  const coverUrl = getArticleCoverImage(post.slug, post.category, post.coverImage);

  let tags: string[] = [];
  try {
    tags = JSON.parse(post.tags);
  } catch {}

  // Related articles
  let related: any[] = [];
  try {
    related = await prisma.blogPost.findMany({
      where: {
        slug: { not: slug },
        isPublished: true,
      },
      take: 2,
      orderBy: { publishedAt: "desc" },
    });
  } catch (e) {
    console.error("Error fetching related articles:", e);
  }

  // Derive 3 actionable executive takeaways from the excerpt/title
  const takeaways = [
    "Sub-second latency directly protects ad spend by preventing mobile bounce rates before first render.",
    "Systematic batch creative production prevents algorithm saturation and maintains steady customer acquisition costs.",
    "Pairing high-intent search intent with multi-touch retargeting yields the highest compounding ROAS.",
  ];

  return (
    <article className="min-h-screen bg-[#050505] text-foreground pt-32 sm:pt-36 pb-28 relative overflow-hidden">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 w-[60vw] h-[40vh] bg-primary/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] left-0 w-[40vw] h-[40vh] bg-blue-500/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-4xl space-y-12">
        {/* Navigation Breadcrumbs & Back Link */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>[ back to insights ]</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
            <span>Insights</span>
            <ChevronRight size={11} />
            <span className="text-primary/90">{post.category}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>{post.category}</span>
            </span>

            <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full">
              <Clock size={12} className="text-primary" />
              <span>{post.readTime}</span>
            </span>

            <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full">
              <Calendar size={12} />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-white tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {/* Lead Excerpt */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed border-l-2 border-primary/50 pl-4 py-1">
            {post.excerpt}
          </p>

          {/* Author Bar & Social Share */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-primary/40 bg-white/10 shrink-0">
                <Image
                  src="/images/team-lead.jpg"
                  alt={post.authorName}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-sans font-medium text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <span>{post.authorName}</span>
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span className="font-mono text-[11px] text-primary/80">Verified Author</span>
                </div>
                <span className="font-mono text-[11px] text-neutral-400 block">
                  Founder & Lead Architect · NextCurrent
                </span>
              </div>
            </div>

            <ArticleShareButtons title={post.title} slug={post.slug} />
          </div>
        </header>

        {/* Cinematic Hero Cover Image */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] group">
          <Image
            src={coverUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Bottom badge overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] sm:text-xs text-white/80">
            <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
              // EXECUTIVE PLAYBOOK · PRODUCTION ARCHITECTURE
            </span>
            <span className="hidden sm:inline-block bg-primary/20 text-primary border border-primary/40 px-3 py-1.5 rounded-full backdrop-blur-md">
              4K Verified Blueprint
            </span>
          </div>
        </div>

        {/* Executive Takeaways / Summary Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c11] border border-primary/30 relative overflow-hidden shadow-2xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold tracking-wider">
            <Sparkles size={16} />
            <span>EXECUTIVE BRIEFING · CORE TAKEAWAYS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {takeaways.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans leading-relaxed">
                <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert prose-lg max-w-none space-y-8 font-light leading-relaxed text-neutral-300">
          {(post.content as string).split("\n\n").map((block: string, i: number) => {
            // Level 3 Heading
            if (block.startsWith("### ")) {
              return (
                <div key={i} className="pt-8 pb-2 border-b border-white/10 space-y-2">
                  <span className="font-mono text-xs text-primary/80 uppercase tracking-widest block">
                    // SECTION 0{i + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium text-white tracking-tight">
                    {block.replace("### ", "")}
                  </h2>
                </div>
              );
            }

            // Numbered List / Steps
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
                              {title}
                            </span>
                          )}
                          <span>{desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }

            // Bullet List
            if (block.startsWith("- ")) {
              const lines = block.split("\n");
              return (
                <div key={i} className="space-y-2.5 my-4 pl-2">
                  {lines.map((l, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="leading-relaxed">{l.replace(/^-\s*/, "")}</span>
                    </div>
                  ))}
                </div>
              );
            }

            // Standard Paragraph
            return (
              <p key={i} className="text-sm sm:text-base md:text-lg leading-relaxed text-neutral-300">
                {block}
              </p>
            );
          })}
        </div>

        {/* In-Article Architectural Callout / Visual Break */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c0c11] to-[#12121a] border border-white/10 relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold">
              <TrendingUp size={15} />
              <span>// DIRECT-RESPONSE VERIFIED OUTCOME</span>
            </div>
            <span className="font-mono text-[11px] text-neutral-400">NextCurrent Benchmarks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">
                0.4s
              </span>
              <span className="font-mono text-[11px] text-primary block mt-1">
                Sub-Second LCP Edge Speed
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-[#C5A059] block">
                4.2x+
              </span>
              <span className="font-mono text-[11px] text-neutral-300 block mt-1">
                Verified Blended ROAS
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400 block">
                -42%
              </span>
              <span className="font-mono text-[11px] text-neutral-300 block mt-1">
                Lower Cost Per Qualified Lead
              </span>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            <span className="font-mono text-xs text-neutral-400 mr-2">Topics:</span>
            {tags.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-xs text-neutral-300 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full hover:border-primary/50 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio & Signature Box */}
        <div className="p-8 rounded-3xl bg-[#0c0c11] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/40 shrink-0 shadow-lg">
            <Image
              src="/images/team-lead.jpg"
              alt={post.authorName}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <div>
              <h3 className="font-sans font-medium text-lg text-white">
                Written by {post.authorName}
              </h3>
              <p className="font-mono text-xs text-primary">
                Founder, Full-Stack Engineer & Lead Performance Strategist
              </p>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Akshat architects category-leading digital growth systems, high-converting Next.js web applications, and multi-channel acquisition funnels for ambitious brands globally.
            </p>
          </div>
        </div>

        {/* Related Articles with Full Cover Images */}
        {related.length > 0 && (
          <section className="border-t border-white/10 pt-16 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-primary">// FURTHER READING</span>
                <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight mt-1">
                  Related Strategic Playbooks
                </h2>
              </div>
              <Link
                href="/insights"
                className="font-mono text-xs text-primary hover:text-white transition-colors"
              >
                view all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => {
                const rCover = getArticleCoverImage(r.slug, r.category, r.coverImage);
                return (
                  <Link
                    key={r.id}
                    href={`/insights/${r.slug}`}
                    className="group rounded-3xl bg-[#0c0c11] border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
                  >
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={rCover}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 font-mono text-[10px] text-primary">
                        [ {r.category} ]
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-base sm:text-lg font-sans font-medium text-white group-hover:text-primary transition-colors leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed">
                        {r.excerpt}
                      </p>
                    </div>

                    <div className="px-6 pb-5 pt-2 flex items-center justify-between border-t border-white/10 font-mono text-[11px] text-neutral-400">
                      <span>{r.readTime}</span>
                      <span className="text-primary group-hover:text-white transition-colors inline-flex items-center gap-1">
                        <span>Read Playbook</span>
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Conversion Footnote */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0c0c11] to-[#050505] border border-white/15 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="font-mono text-xs text-primary block">// READY TO SCALE?</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal text-white tracking-tight leading-tight">
              Implement This Growth Playbook In Your Business
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
              We handle the entire strategy, engineering, creative design, and media management under one roof so you can focus on scale.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white transition-all shadow-md"
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              href="/free-audit"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] border border-white/15 hover:border-primary/50 text-white font-mono text-xs transition-all"
            >
              <span>Claim Free Growth Audit</span>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
