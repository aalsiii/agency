import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ caseStudies });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching case studies";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newCaseStudy = await prisma.caseStudy.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        clientName: body.clientName,
        industry: body.industry || "General",
        category: body.category || "Digital Experiences",
        heroMetricNumber: body.heroMetricNumber || "+250%",
        heroMetricLabel: body.heroMetricLabel || "Growth",
        challenge: body.challenge || "",
        strategy: body.strategy || "",
        execution: body.execution || "",
        solution: body.solution || body.execution || "",
        technologies: body.technologies || "",
        websiteUrl: body.websiteUrl || null,
        resultsSummary: body.resultsSummary || "",
        metrics: Array.isArray(body.metrics) ? JSON.stringify(body.metrics) : (body.metrics || "[]"),
        deliverables: Array.isArray(body.deliverables) ? JSON.stringify(body.deliverables) : (body.deliverables || "[]"),
        coverImage: body.coverImage || null,
        testimonialQuote: body.testimonialQuote || null,
        testimonialAuthor: body.testimonialAuthor || null,
        testimonialRole: body.testimonialRole || null,
        isFeatured: Boolean(body.isFeatured),
        order: Number(body.order) || 0,
      },
    });

    return NextResponse.json({ success: true, caseStudy: newCaseStudy }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error creating case study";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
