import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { careerId, name, email, phone, resumeUrl, portfolioUrl, notes } = await req.json();

    if (!careerId || !name || !email) {
      return NextResponse.json(
        { error: "Career position, full name, and email are required." },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        careerId,
        name,
        email: email.toLowerCase().trim(),
        phone: phone || "",
        resumeUrl: resumeUrl || null,
        portfolioUrl: portfolioUrl || null,
        notes: notes || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, applicationId: application.id }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error saving application";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
