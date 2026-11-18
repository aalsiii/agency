import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ services });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching services";
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
    const {
      title,
      slug,
      tagline,
      shortDesc,
      fullDesc,
      category,
      icon,
      priceInr,
      priceUsd,
      billingType,
      features,
      idealFor,
      badge,
      order,
    } = body;

    const newService = await prisma.service.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tagline: tagline || "",
        shortDesc: shortDesc || "",
        fullDesc: fullDesc || "",
        category: category || "Growth",
        icon: icon || "Zap",
        priceInr: Number(priceInr) || 14999,
        priceUsd: Number(priceUsd) || 599,
        billingType: billingType || "monthly",
        features: Array.isArray(features) ? JSON.stringify(features) : (features || "[]"),
        idealFor: idealFor || "",
        badge: badge || null,
        order: Number(order) || 0,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error creating service";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
