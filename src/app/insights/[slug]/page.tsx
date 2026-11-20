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
  Share2,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";
import { getArticleCoverImage } from "@/lib/article-images";
import { ReadingProgressBar, ArticleShareButtons } from "@/components/insights/ArticleInteractionBar";
import ArticleContentRenderer, { slugifyHeading } from "@/components/insights/ArticleContentRenderer";
import ArticleTableOfContents, { TocItem } from "@/components/insights/ArticleTableOfContents";
import ArticleFaqAccordion from "@/components/insights/ArticleFaqAccordion";
import { getArticleFaqs } from "@/lib/article-faqs";
import { generateArticleJsonLd } from "@/lib/seo-schema";

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextcurrent.in";
  const pageUrl = `${siteUrl}/insights/${slug}`;

  if (!post) {
    return {
      title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | NextCurrent Insights`,
    };
  }

  const coverUrl = getArticleCoverImage(post.slug, post.category, post.coverImage);

  let tagsArray: string[] = [];
  try {
    tagsArray = JSON.parse(post.tags);
  } catch {
    tagsArray = [post.category];
  }

  return {
    title: `${post.title} | NextCurrent Insights`,
    description: post.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${post.title} | NextCurrent Insights`,
      description: post.excerpt,
      url: pageUrl,
      siteName: "NextCurrent",
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.authorName || "Akshat Bijalwan"],
      tags: tagsArray,
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [coverUrl],
      creator: "@nextcurrent",
    },
  };
}

// Extract headings for the Table of Contents
function extractHeadings(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace(/^##\s+/, "").trim();
      items.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (trimmed.startsWith("### ")) {
      const text = trimmed.replace(/^###\s+/, "").trim();
      items.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }

  return items;
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

  // 3 Related articles for the bottom "More Guides" grid
  let related: any[] = [];
  try {
    related = await prisma.blogPost.findMany({
      where: {
        slug: { not: slug },
        isPublished: true,
      },
      take: 3,
      orderBy: { publishedAt: "desc" },
    });
  } catch (e) {
    console.error("Error fetching related articles:", e);
  }

  // Headings & FAQs for TOC & SEO Schema
  const tocItems = extractHeadings(post.content);
  const faqs = getArticleFaqs(slug);

  // If FAQs exist, add FAQ to TOC
  if (faqs.length > 0) {
    tocItems.push({
      id: "frequently-asked-questions",
      text: "Frequently Asked Questions",
      level: 2,
    });
  }

  const { articleSchema, breadcrumbSchema, faqSchema } = generateArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    coverUrl,
    publishedAt: post.publishedAt,
    authorName: post.authorName,
    category: post.category,
    faqs,
  });

  return (
    <article className="min-h-screen bg-[#050505] text-foreground pt-32 sm:pt-36 pb-28 relative overflow-hidden">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* JSON-LD Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 w-[60vw] h-[40vh] bg-primary/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] left-0 w-[40vw] h-[40vh] bg-blue-500/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-6xl space-y-12">
        {/* Navigation Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <span>NextCurrent</span>
            </Link>
            <ChevronRight size={11} className="text-neutral-600" />
            <Link
              href="/insights"
              className="hover:text-primary transition-colors"
            >
              <span>Insights</span>
            </Link>
            <ChevronRight size={11} className="text-neutral-600" />
            <span className="text-primary/90 font-medium">{post.category}</span>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>[ all playbooks ]</span>
          </Link>
        </nav>

        {/* Article Header */}
        <header className="space-y-6 max-w-4xl">
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

        {/* Cinematic Hero Cover Visual */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
          <Image
            src={coverUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        </div>

        {/* TWO-COLUMN LAYOUT: Content (Left) + Sticky Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Main Content Column (Col 8) */}
          <main className="lg:col-span-8 space-y-8">
            {/* Clean Editorial Blog Body (WordPress-style formatting) */}
            <ArticleContentRenderer content={post.content} articleTitle={post.title} />

            {/* FAQ Accordion Section (Google FAQPage Schema Powered) */}
            <ArticleFaqAccordion faqs={faqs} />

            {/* Author Bio Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c11] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-primary/40 bg-neutral-900 shrink-0">
                <Image
                  src="/images/team-lead.jpg"
                  alt={post.authorName}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="font-sans font-medium text-base text-white">
                    {post.authorName}
                  </span>
                  <span className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                    Lead Architect
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Founder & Lead Architect at NextCurrent. Akshat advises venture-backed startups and growing service brands on direct-response application engineering, performance marketing, and high-ticket customer acquisition systems.
                </p>
                <div className="pt-2">
                  <Link
                    href="/book-a-call"
                    className="font-mono text-xs text-primary hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Book a 1-on-1 Strategy Consultation with Akshat</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-neutral-400 mr-2">
                  Topics:
                </span>
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-neutral-300 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full hover:border-primary/40 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </main>

          {/* Sticky Sidebar Column (Col 4) */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6 hidden lg:block">
            {/* Table of Contents */}
            <ArticleTableOfContents items={tocItems} />

            {/* Sticky Lead Capture & Funnel CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c0c11] to-[#14141c] border border-primary/40 shadow-2xl space-y-5">
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest block bg-primary/10 border border-primary/25 px-2.5 py-1 rounded-full w-fit">
                  // DIRECT-RESPONSE ENGINE
                </span>
                <h3 className="text-lg font-sans font-medium text-white tracking-tight leading-snug">
                  Want this exact growth funnel engineered for your brand?
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  We handle everything: high-converting web apps, direct-response design, ad creatives, and CRM automation under one roof.
                </p>
              </div>

              <div className="space-y-2.5 pt-1 border-t border-white/10 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>Sub-400ms edge web speed for peak CRO</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>Automated qualification & calendar intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>Full-funnel attribution & ROAS tracking</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  href="/book-a-call"
                  className="w-full py-3 px-4 rounded-xl bg-primary text-black font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-[#d6b066] transition shadow-[0_0_20px_rgba(197,160,89,0.3)] cursor-pointer"
                >
                  <span>Book Free Strategy Call</span>
                  <ArrowRight size={13} />
                </Link>

                <Link
                  href="/free-audit"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-primary/40 font-mono text-xs text-center block transition"
                >
                  [ Request Growth Audit ]
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* BOTTOM SECTION 1: More Guides / Related Insights Grid */}
        {related.length > 0 && (
          <section className="pt-16 border-t border-white/10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-primary block uppercase tracking-wider">
                  // MORE PLAYBOOKS · RECOMMENDED READING
                </span>
                <h2 className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight mt-1">
                  More Architectural Insights
                </h2>
              </div>

              <Link
                href="/insights"
                className="font-mono text-xs text-primary hover:text-white transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>View all articles</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {related.map((art) => {
                const cover = getArticleCoverImage(art.slug, art.category, art.coverImage);
                return (
                  <Link
                    key={art.id}
                    href={`/insights/${art.slug}`}
                    className="group rounded-3xl bg-[#0c0c11] border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                      <Image
                        src={cover}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 font-mono text-[10px] text-primary">
                        [ {art.category} ]
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full font-mono text-[10px] text-neutral-300 flex items-center gap-1">
                        <Clock size={10} className="text-primary" />
                        <span>{art.readTime}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <h3 className="text-base sm:text-lg font-sans font-medium text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h3>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="font-mono text-[11px] text-neutral-400">
                          by {art.authorName}
                        </span>
                        <span className="font-mono text-xs text-primary inline-flex items-center gap-1">
                          <span>read</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* BOTTOM SECTION 2: Full-Width Bottom Conversion Banner */}
        <section className="pt-8">
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#0c0c14] via-[#101018] to-[#161424] border border-primary/40 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block">
                // ELEVATE YOUR CONVERSION INFRASTRUCTURE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium text-white tracking-tight leading-tight">
                Turn your traffic into high-paying clients with NextCurrent.
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Stop losing conversions to slow WordPress templates and disconnected ad campaigns. We design, build, and scale direct-response web platforms and creative engines.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/book-a-call"
                className="py-3.5 px-6 rounded-xl bg-primary text-black font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 hover:bg-[#d6b066] transition shadow-[0_0_25px_rgba(197,160,89,0.35)] cursor-pointer"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/free-audit"
                className="py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-primary/40 font-mono text-xs text-center block transition"
              >
                [ Request Free Growth Audit ]
              </Link>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
