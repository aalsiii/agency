import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await prisma.caseStudy.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.clientName && { clientName: body.clientName }),
        ...(body.industry && { industry: body.industry }),
        ...(body.category && { category: body.category }),
        ...(body.heroMetricNumber && { heroMetricNumber: body.heroMetricNumber }),
        ...(body.heroMetricLabel && { heroMetricLabel: body.heroMetricLabel }),
        ...(body.challenge !== undefined && { challenge: body.challenge }),
        ...(body.strategy !== undefined && { strategy: body.strategy }),
        ...(body.execution !== undefined && { execution: body.execution }),
        ...(body.solution !== undefined && { solution: body.solution }),
        ...(body.technologies !== undefined && { technologies: body.technologies }),
        ...(body.websiteUrl !== undefined && { websiteUrl: body.websiteUrl }),
        ...(body.resultsSummary !== undefined && { resultsSummary: body.resultsSummary }),
        ...(body.metrics !== undefined && {
          metrics: Array.isArray(body.metrics) ? JSON.stringify(body.metrics) : body.metrics,
        }),
        ...(body.deliverables !== undefined && {
          deliverables: Array.isArray(body.deliverables) ? JSON.stringify(body.deliverables) : body.deliverables,
        }),
        ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
        ...(body.testimonialQuote !== undefined && { testimonialQuote: body.testimonialQuote }),
        ...(body.testimonialAuthor !== undefined && { testimonialAuthor: body.testimonialAuthor }),
        ...(body.testimonialRole !== undefined && { testimonialRole: body.testimonialRole }),
        ...(body.isFeatured !== undefined && { isFeatured: Boolean(body.isFeatured) }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
    });

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating case study";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.caseStudy.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error deleting case study";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
