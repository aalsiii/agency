import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import ServiceClientActions from "./ServiceClientActions";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let service: any = null;
  try {
    service = await prisma.service.findUnique({ where: { slug } });
  } catch (error) {
    console.error("Metadata fetch fallback for service:", slug);
  }

  if (!service) {
    return { title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | NextCurrent Media` };
  }

  return {
    title: `${service.title} | NextCurrent Media`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | NextCurrent Media`,
      description: service.shortDesc,
    },
  };
}

export default async function IndividualServicePage({ params }: PageProps) {
  const { slug } = await params;
  let service: any = null;

  try {
    service = await prisma.service.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("Database connection fallback on ServiceDetail:", error);
  }

  if (!service) {
    return notFound();
  }

  // Parse JSON fields safely
  let features: string[] = [];
  let problems: string[] = [];
  let methodology: string[] = [];
  let benefits: string[] = [];
  let deliverables: string[] = [];
  let faqs: { question: string; answer: string }[] = [];

  try {
    if (service.features) features = JSON.parse(service.features);
    if (service.problems) problems = JSON.parse(service.problems);
    if (service.methodology) methodology = JSON.parse(service.methodology);
    if (service.benefits) benefits = JSON.parse(service.benefits);
    if (service.deliverables) deliverables = JSON.parse(service.deliverables);
    if (service.faqs) faqs = JSON.parse(service.faqs);
  } catch {}

  // Fetch relevant case studies matching category
  let relevantProjects: any[] = [];
  try {
    relevantProjects = await prisma.caseStudy.findMany({
      where: {
        OR: [
          { category: service.category },
          { isFeatured: true },
        ],
      },
      take: 2,
    });
  } catch (e) {
    console.error("Error fetching relevant projects:", e);
  }

  return (
    <article className="min-h-screen bg-background text-foreground pt-36 pb-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl space-y-24">
        {/* Back Link & Breadcrumb */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-primary transition-colors pb-1 border-b border-transparent hover:border-primary/30"
          >
            <ArrowLeft size={13} />
            <span>[ back to all services ]</span>
          </Link>
        </div>

        {/* 1. Service Hero */}
        <header className="space-y-6 max-w-4xl border-b border-white/10 pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-primary/80">
              [ {service.category} ]
            </span>
            {service.badge && (
              <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary">
                [ {service.badge} ]
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-tight">
            {service.title}
          </h1>

          <p className="text-lg md:text-2xl text-muted font-light leading-relaxed">
            {service.tagline}
          </p>

          <ServiceClientActions
            title={service.title}
            priceInr={service.priceInr}
            priceUsd={service.priceUsd}
            billingType={service.billingType}
          />
        </header>

        {/* 2. Overview & Problem Diagnosis (Colhead layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              Executive Overview
            </h2>
            <div className="font-mono text-xs text-primary/80">
              // strategic rationale & context
            </div>
            {service.idealFor && (
              <div className="p-4 rounded-xl bg-[var(--background-layer-1)] border border-white/10 mt-6">
                <span className="font-mono text-[11px] text-muted block mb-1">
                  optimal candidate:
                </span>
                <p className="text-xs text-white/90 font-light leading-relaxed">
                  {service.idealFor}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-base md:text-lg text-muted/90 leading-relaxed font-light">
              {service.fullDesc || service.shortDesc}
            </p>

            {problems.length > 0 && (
              <div className="pt-6 space-y-4">
                <span className="font-mono text-xs text-primary/80 block">
                  // core bottlenecks addressed:
                </span>
                <div className="space-y-3">
                  {problems.map((prob, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[var(--background-layer-1)] border border-white/10 flex items-start gap-3"
                    >
                      <AlertCircle className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
                      <span className="text-xs text-white/80 font-light leading-relaxed">
                        {prob}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. Methodology & Deliverables */}
        <section className="p-8 md:p-12 rounded-2xl bg-[var(--background-layer-1)] border border-white/10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                Methodology & Deliverables
              </h2>
              <div className="font-mono text-xs text-primary/80 mt-2">
                // step-by-step engineering & deliverables checklist
              </div>
            </div>
            <Link
              href={`/start-a-project?service=${encodeURIComponent(service.slug)}`}
              className="font-mono text-xs text-primary hover:text-white flex items-center gap-1.5"
            >
              <span>[ start project with this service ]</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Methodology Steps */}
            {methodology.length > 0 && (
              <div className="space-y-4">
                <span className="font-mono text-xs text-muted block">
                  execution phases:
                </span>
                <div className="space-y-4">
                  {methodology.map((step, idx) => {
                    const [stepTitle, stepDesc] = step.split(": ");
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-[var(--background-layer-2)] border border-white/5 space-y-2"
                      >
                        <span className="font-mono text-xs text-primary font-semibold">
                          [ Phase 0{idx + 1} // {stepTitle} ]
                        </span>
                        {stepDesc && (
                          <p className="text-xs text-muted font-light leading-relaxed">
                            {stepDesc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Deliverables Checklist */}
            <div className="space-y-4">
              <span className="font-mono text-xs text-muted block">
                included deliverables:
              </span>
              <div className="space-y-3">
                {(deliverables.length > 0 ? deliverables : features).map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[var(--background-layer-2)] border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-white/85 font-light leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Tangible Benefits */}
        {benefits.length > 0 && (
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                Compounding Returns
              </h2>
              <div className="font-mono text-xs text-primary/80 mt-2">
                // measurable business outcomes
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((ben, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[var(--background-layer-1)] border border-white/10 space-y-3"
                >
                  <span className="font-mono text-xs text-primary font-bold">
                    [ outcome 0{idx + 1} ]
                  </span>
                  <p className="text-sm text-white/90 font-light leading-relaxed">
                    {ben}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Relevant Projects */}
        {relevantProjects.length > 0 && (
          <section className="space-y-8 border-t border-white/10 pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white">
                  Relevant Case Studies
                </h2>
                <div className="font-mono text-xs text-primary/80 mt-2">
                  // verified outcomes in {service.category}
                </div>
              </div>
              <Link
                href="/work"
                className="font-mono text-xs text-muted hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>[ explore all projects ]</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relevantProjects.map((p) => (
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

        {/* 6. Frequently Asked Questions */}
        {faqs.length > 0 && (
          <section className="space-y-8 border-t border-white/10 pt-16 max-w-3xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                Frequently Asked Questions
              </h2>
              <div className="font-mono text-xs text-primary/80 mt-2">
                // transparent details & clarifications
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-5 rounded-xl bg-[var(--background-layer-1)] border border-white/10 hover:border-white/20 transition-colors open:bg-[var(--background-layer-2)] open:border-primary/30"
                >
                  <summary className="font-serif text-base text-white cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className="font-mono text-xs text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-xs text-muted font-light leading-relaxed pt-3 border-t border-white/5 mt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 7. Final Conversion Section */}
        <section className="border-t border-white/10 pt-20 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Ready to deploy {service.title}?
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto font-light leading-relaxed">
            Begin with a customized project scope estimate or request our diagnostic review to identify immediate revenue opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href={`/start-a-project?service=${encodeURIComponent(service.slug)}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary bg-primary text-black font-semibold text-xs tracking-wider hover:bg-white hover:border-white transition-all duration-300"
            >
              <span>Start Project Enquiry</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/free-audit"
              className="font-mono text-xs text-muted hover:text-white transition-colors"
            >
              or claim free diagnostic audit →
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
