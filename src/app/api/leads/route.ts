import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { sendLeadNotification } from "@/lib/email";

// Public: Submit a lead / contact message / multi-step project enquiry
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      phone,
      country,
      company,
      website,
      serviceInterested,
      servicesRequested,
      projectObjectives,
      timeline,
      budget,
      currency,
      message,
      notes,
      source,
    } = data;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const servicesStr = Array.isArray(servicesRequested)
      ? JSON.stringify(servicesRequested)
      : servicesRequested || null;

    const lead = await prisma.lead.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        country: country || null,
        company: company || null,
        website: website || null,
        serviceInterested: serviceInterested || (Array.isArray(servicesRequested) ? servicesRequested[0] : null) || "General Inquiry",
        servicesRequested: servicesStr,
        projectObjectives: projectObjectives || null,
        timeline: timeline || null,
        budget: budget || null,
        currency: currency || "INR",
        message: message || projectObjectives || "Project inquiry via Start a Project portal",
        notes: notes || null,
        status: "NEW",
        priority: "MEDIUM",
        source: source || "start-a-project",
      },
    });

    // Create initial activity log
    try {
      await prisma.leadActivity.create({
        data: {
          leadId: lead.id,
          action: "STATUS_CHANGE",
          details: `Enquiry submitted with status NEW via ${source || "start-a-project"}`,
          createdBy: "System Intake",
        },
      });
    } catch {
      // ignore activity log error
    }

    // Trigger instant Resend email notification (non-blocking)
    sendLeadNotification({
      name,
      email,
      phone,
      company,
      website,
      serviceInterested: lead.serviceInterested,
      budget,
      currency,
      timeline,
      message,
      source: lead.source,
    }).catch(err => console.error("Lead email alert error:", err));

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error saving lead";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// Protected: Get all leads for admin
export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where = status && status !== "ALL" ? { status } : {};

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ leads });
}
