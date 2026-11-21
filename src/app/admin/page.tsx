import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import AgencyDashboardClient from "./AgencyDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  const adminName = admin?.name || "Akshat";

  let totalLeads = 0;
  let recentLeads: any[] = [];
  let totalAudits = 0;
  let recentAudits: any[] = [];

  try {
    const [leadsCount, auditsCount, leads, audits] = await Promise.all([
      prisma.lead.count(),
      prisma.auditRequest.count(),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          budget: true,
          createdAt: true,
        },
      }),
      prisma.auditRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          businessName: true,
          email: true,
          primaryGoal: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    totalLeads = leadsCount;
    totalAudits = auditsCount;
    recentLeads = leads.map((l) => ({
      ...l,
      createdAt: l.createdAt.toISOString(),
    }));
    recentAudits = audits.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Database connection fallback on AdminDashboardPage:", error);
  }

  return (
    <AgencyDashboardClient
      adminName={adminName}
      totalLeads={totalLeads}
      recentLeads={recentLeads}
      totalAudits={totalAudits}
      recentAudits={recentAudits}
    />
  );
}
