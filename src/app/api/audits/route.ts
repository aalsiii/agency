import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      businessName,
      websiteUrl,
      instagramHandle,
      industry,
      primaryGoal,
      monthlySpend,
      name,
      email,
      phone,
    } = data;

    if (!businessName || !websiteUrl || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Business name, website URL, your name, email, and phone are required." },
        { status: 400 }
      );
    }

    // Calculate preliminary baseline audit score (simulating intelligent heuristic breakdown)
    let baseScore = 65;
    if (websiteUrl.includes("https://")) baseScore += 4;
    if (instagramHandle && instagramHandle.trim().length > 2) baseScore += 5;
    if (monthlySpend && monthlySpend.includes("₹2L") || monthlySpend?.includes("$2,000")) baseScore += 6;
    const finalScore = Math.min(88, Math.max(54, baseScore));

    const audit = await prisma.auditRequest.create({
      data: {
        businessName,
        websiteUrl,
        instagramHandle: instagramHandle || null,
        industry: industry || "General",
        primaryGoal: primaryGoal || "Generate More Leads",
        monthlySpend: monthlySpend || "Not specified",
        name,
        email: email.toLowerCase().trim(),
        phone,
        auditScore: finalScore,
        status: "PENDING",
        reportNotes: `Initial submission received. Website: ${websiteUrl}. Goal: ${primaryGoal}.`,
      },
    });

    return NextResponse.json({
      success: true,
      auditId: audit.id,
      score: finalScore,
      businessName: audit.businessName,
    }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error submitting audit request";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const audits = await prisma.auditRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ audits });
}
