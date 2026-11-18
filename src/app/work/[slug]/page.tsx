import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Layers, Cpu, Award, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cs = await prisma.caseStudy.findUnique({ where: { slug } });
  if (!cs) return { title: "Case Study Not Found | NextCurrent Media" };

  return {
    title: `${cs.title} | NextCurrent Media`,
    description: cs.resultsSummary,
    openGraph: {
      title: `${cs.title} | NextCurrent Media`,
      description: cs.resultsSummary,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await prisma.caseStudy.findUnique({
    where: { slug },
  });

  if (!project) {
    return notFound();
  }

  const imgSrc =
    project.coverImage ||
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80";

  let deliverablesArr: string[] = [];
  let metricsArr: { label: string; value: string }[] = [];
  let technologiesArr: string[] = [];
  let galleryArr: string[] = [];

  try {
    if (project.deliverables) deliverablesArr = JSON.parse(project.deliverables);
    if (project.metrics) metricsArr = JSON.parse(project.metrics);
    if (project.technologies) technologiesArr = JSON.parse(project.technologies);
    if (project.galleryImages) galleryArr = JSON.parse(project.galleryImages);
  } catch {}

  // Fetch related case studies
  const relatedProjects = await prisma.caseStudy.findMany({
    where: {
      slug: { not: slug },
    },
    take: 2,
    orderBy: { order: "asc" },
  });

  return (
    <article className="min-h-screen bg-background text-foreground pt-36 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl space-y-24">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-primary transition-colors pb-1 border-b border-transparent hover:border-primary/30"
          >
            <ArrowLeft size={13} />
            <span>[ back to all case studies ]</span>
          </Link>
        </div>

        {/* 1. Project Introduction & Client Overview */}
        <header className="space-y-6 max-w-4xl border-b border-white/10 pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-primary/80">
              [ {project.category} ]
            </span>
            <span className="font-mono text-xs text-muted/70">
              · {project.industry}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <div className="font-mono text-xs text-primary/80">
            // Client: {project.clientName}
          </div>

          <p className="text-lg md:text-2xl text-muted font-light leading-relaxed pt-2">
            {project.resultsSummary}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/start-a-project?reference=${encodeURIComponent(project.title)}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all duration-300"
            >
              <span>Start a Project Like This</span>
              <ArrowUpRight size={14} />
            </Link>

            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/15 bg-white/5 text-white font-mono text-xs hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
              >
                <span>Visit Live Client Site</span>
                <ExternalLink size={14} className="text-primary" />
              </a>
            )}
          </div>
        </header>

        {/* Hero Visual Asset */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/15 font-mono text-xs text-primary font-bold">
            {project.heroMetricNumber} · {project.heroMetricLabel}
          </div>
        </div>

        {/* 2 & 3. Project Challenge & Strategy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          <div className="p-8 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-4">
            <span className="font-mono text-xs text-primary/80 block">
              // 01 · the commercial challenge
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              The Bottleneck
            </h2>
            <p className="text-sm md:text-base text-muted/90 font-light leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-4">
            <span className="font-mono text-xs text-primary/80 block">
              // 02 · strategic approach
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              The Growth Strategy
            </h2>
            <p className="text-sm md:text-base text-muted/90 font-light leading-relaxed">
              {project.strategy || project.solution}
            </p>
          </div>
        </section>

        {/* 4 & 5. Execution & Deliverables */}
        <section className="p-8 md:p-12 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              Execution & Architecture
            </h2>
            <div className="font-mono text-xs text-primary/80 mt-2">
              // implementation methodology and delivered scope
            </div>
          </div>

          <p className="text-base md:text-lg text-muted/90 font-light leading-relaxed max-w-4xl">
            {project.execution || project.solution}
          </p>

          {deliverablesArr.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="font-mono text-xs text-muted block">
                core deliverables deployed:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deliverablesArr.map((d, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[var(--background-layer-2)] border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/85 font-light leading-relaxed">
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 6. Results and Outcomes (Metrics) */}
        {metricsArr.length > 0 && (
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                Verifiable Business Impact
              </h2>
              <div className="font-mono text-xs text-primary/80 mt-2">
                // measured unit economics and revenue lift
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metricsArr.map((m, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[var(--background-layer-1)] border border-white/10 text-center space-y-2"
                >
                  <span className="text-3xl md:text-4xl font-mono text-primary font-bold block">
                    {m.value}
                  </span>
                  <span className="font-mono text-xs text-muted block">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client Testimonial */}
        {project.testimonialQuote && (
          <section className="p-8 md:p-12 rounded-2xl bg-[var(--background-layer-2)] border border-white/10 relative overflow-hidden">
            <div className="font-serif text-primary/10 text-8xl absolute -top-4 -right-2 select-none pointer-events-none">
              “
            </div>
            <blockquote className="relative z-10 text-lg md:text-xl font-serif text-white/95 leading-relaxed max-w-3xl">
              &ldquo;{project.testimonialQuote}&rdquo;
            </blockquote>
            {project.testimonialAuthor && (
              <div className="font-mono text-xs text-primary mt-6">
                // {project.testimonialAuthor}, {project.testimonialRole}
              </div>
            )}
          </section>
        )}

        {/* 7. Technologies Used */}
        {technologiesArr.length > 0 && (
          <section className="space-y-4 border-t border-white/10 pt-16">
            <span className="font-mono text-xs text-muted block">
              technologies & frameworks deployed:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {technologiesArr.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg bg-[var(--background-layer-1)] border border-white/10 font-mono text-xs text-white/80"
                >
                  [ {tech} ]
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 8. Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="space-y-8 border-t border-white/10 pt-16">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white">
                  Related Case Studies
                </h2>
                <div className="font-mono text-xs text-primary/80 mt-2">
                  // more documented client partnerships
                </div>
              </div>
              <Link
                href="/work"
                className="font-mono text-xs text-muted hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>[ all case studies ]</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/work/${p.slug}`}
                  className="group block p-6 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 hover:border-primary/50 transition-all duration-300 space-y-4"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                    <Image
                      src={p.coverImage || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 font-mono text-xs text-primary font-bold">
                      {p.heroMetricNumber} · {p.heroMetricLabel}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-primary/70 block">// {p.clientName}</span>
                    <h3 className="text-xl font-serif text-white group-hover:text-primary transition-colors mt-1">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 9. Final CTA */}
        <section className="border-t border-white/10 pt-20 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Ready to achieve similar revenue outcomes?
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto font-light leading-relaxed">
            Discuss your requirements in a structured discovery conversation or request our preliminary funnel diagnostic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all duration-300"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/free-audit"
              className="font-mono text-xs text-muted hover:text-white transition-colors"
            >
              or request free diagnostic teardown →
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
