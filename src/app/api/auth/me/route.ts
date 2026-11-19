import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  const registeredAdminEmail = (process.env.ADMIN_EMAIL || "bijalwanakshat@gmail.com").toLowerCase().trim();

  if (!admin || admin.email.toLowerCase().trim() !== registeredAdminEmail || admin.role !== "ADMIN") {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: admin });
}
