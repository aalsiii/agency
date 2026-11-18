import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ testimonials });
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { clientName, clientRole, company, quote, rating, isFeatured } = await req.json();
    if (!clientName || !quote) {
      return NextResponse.json({ error: "Client name and quote are required" }, { status: 400 });
    }

    const t = await prisma.testimonial.create({
      data: {
        clientName,
        clientRole: clientRole || "",
        company: company || "",
        quote,
        rating: rating || 5,
        isFeatured: isFeatured ?? true,
      },
    });

    return NextResponse.json({ success: true, testimonial: t }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error creating testimonial";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
