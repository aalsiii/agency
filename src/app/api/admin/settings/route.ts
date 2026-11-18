import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = settings.reduce<Record<string, string>>((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return NextResponse.json({ settings: settingsMap, raw: settings });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching settings";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updates = Object.entries(body);

    for (const [key, value] of updates) {
      if (typeof value === "string") {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    return NextResponse.json({ success: true, message: "Settings updated" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error saving settings";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
