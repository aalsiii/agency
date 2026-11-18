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
    const updated = await prisma.service.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.tagline !== undefined && { tagline: body.tagline }),
        ...(body.shortDesc !== undefined && { shortDesc: body.shortDesc }),
        ...(body.fullDesc !== undefined && { fullDesc: body.fullDesc }),
        ...(body.category && { category: body.category }),
        ...(body.icon && { icon: body.icon }),
        ...(body.priceInr !== undefined && { priceInr: Number(body.priceInr) }),
        ...(body.priceUsd !== undefined && { priceUsd: Number(body.priceUsd) }),
        ...(body.billingType && { billingType: body.billingType }),
        ...(body.features !== undefined && {
          features: Array.isArray(body.features) ? JSON.stringify(body.features) : body.features,
        }),
        ...(body.idealFor !== undefined && { idealFor: body.idealFor }),
        ...(body.badge !== undefined && { badge: body.badge }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating service";
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
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error deleting service";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
