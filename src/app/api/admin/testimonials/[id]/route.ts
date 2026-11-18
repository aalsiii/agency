import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const data = await req.json();
    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(data.clientName && { clientName: data.clientName }),
        ...(data.clientRole !== undefined && { clientRole: data.clientRole }),
        ...(data.company !== undefined && { company: data.company }),
        ...(data.quote && { quote: data.quote }),
        ...(data.rating !== undefined && { rating: Number(data.rating) }),
        ...(data.isFeatured !== undefined && { isFeatured: Boolean(data.isFeatured) }),
      },
    });

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating testimonial";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.testimonial.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error deleting testimonial";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
