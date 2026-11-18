import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowUpRight, Share2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Article Not Found | NextCurrent Media" };

  return {
    title: `${post.title} | NextCurrent Insights`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | NextCurrent Insights`,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return notFound();
  }

  let tags: string[] = [];
  try {
    tags = JSON.parse(post.tags);
  } catch {}

  // Related articles
  const related = await prisma.blogPost.findMany({
    where: {
      slug: { not: slug },
      isPublished: true,
    },
    take: 2,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <article className="min-h-screen bg-background text-foreground pt-36 pb-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-primary transition-colors pb-1 border-b border-transparent hover:border-primary/30"
          >
            <ArrowLeft size={13} />
            <span>[ back to insights ]</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 border-b border-white/10 pb-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs text-primary/80">
              [ {post.category} ]
            </span>
            <span className="font-mono text-xs text-muted flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span className="font-mono text-xs text-muted/60">
              Published {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-muted font-light leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 font-mono text-xs text-muted">
            <span>author: {post.authorName}</span>
            <div className="flex items-center gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="text-primary/70">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert prose-lg max-w-none space-y-6 font-light leading-relaxed text-muted/90">
          {post.content.split("\n\n").map((block, i) => {
            if (block.startsWith("### ")) {
              return (
                <h3 key={i} className="text-2xl md:text-3xl font-serif text-white pt-6 mb-3">
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("1. ") || block.startsWith("2. ") || block.startsWith("3. ")) {
              const lines = block.split("\n");
              return (
                <ol key={i} className="list-decimal pl-6 space-y-2 text-sm md:text-base">
                  {lines.map((l, idx) => (
                    <li key={idx} className="text-white/80">
                      {l.replace(/^\d+\.\s*/, "")}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={i} className="text-sm md:text-base leading-relaxed text-muted/90">
                {block}
              </p>
            );
          })}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="border-t border-white/10 pt-16 space-y-8">
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/insights/${r.slug}`}
                  className="p-6 rounded-xl bg-[var(--background-layer-1)] border border-white/10 hover:border-primary/40 transition-all space-y-3 block group"
                >
                  <span className="font-mono text-xs text-primary/70 block">[ {r.category} ]</span>
                  <h3 className="text-lg font-serif text-white group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted font-light line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Conversion Footnote */}
        <section className="border-t border-white/10 pt-16 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif text-white">
            Implement this growth playbook in your business
          </h2>
          <p className="text-muted text-sm max-w-md mx-auto font-light leading-relaxed">
            Our team handles the strategy, creative production, and technical execution so you can focus on scaling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all duration-300"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/free-audit"
              className="font-mono text-xs text-muted hover:text-white transition-colors"
            >
              or request free audit →
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
