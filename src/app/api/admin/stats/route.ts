import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      totalLeads,
      newLeads,
      totalAudits,
      pendingAudits,
      totalServices,
      totalCaseStudies,
      recentLeads,
      recentAudits,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.auditRequest.count(),
      prisma.auditRequest.count({ where: { status: "PENDING" } }),
      prisma.service.count(),
      prisma.caseStudy.count(),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.auditRequest.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);

    return NextResponse.json({
      stats: {
        totalLeads,
        newLeads,
        totalAudits,
        pendingAudits,
        totalServices,
        totalCaseStudies,
      },
      recentLeads,
      recentAudits,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error retrieving stats";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
