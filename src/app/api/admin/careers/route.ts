import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const careers = await prisma.career.findMany({
    include: {
      applications: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalApplications = await prisma.application.count();

  return NextResponse.json({ careers, totalApplications });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, department, location, type, experience, description, requirements, benefits, isActive } = await req.json();
    if (!title || !department) {
      return NextResponse.json({ error: "Title and department are required" }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const c = await prisma.career.create({
      data: {
        slug,
        title,
        department,
        location: location || "Remote / Hybrid",
        type: type || "Full-Time",
        experience: experience || "2+ years",
        description: description || "",
        requirements: typeof requirements === "string" ? requirements : JSON.stringify(requirements || []),
        benefits: typeof benefits === "string" ? benefits : JSON.stringify(benefits || []),
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, career: c }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error creating career position";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
