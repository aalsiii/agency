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
    const updated = await prisma.career.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.department && { department: data.department }),
        ...(data.location && { location: data.location }),
        ...(data.type && { type: data.type }),
        ...(data.experience && { experience: data.experience }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.isActive !== undefined && { isActive: Boolean(data.isActive) }),
      },
    });
    return NextResponse.json({ success: true, career: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating career";
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
    await prisma.career.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error deleting career";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
