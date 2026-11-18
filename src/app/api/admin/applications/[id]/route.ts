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
    const { status } = await req.json();
    const updated = await prisma.application.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, application: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating application";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
