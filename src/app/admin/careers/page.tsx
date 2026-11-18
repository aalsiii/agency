import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminCareersClient from "./AdminCareersClient";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const careers = await prisma.career.findMany({
    include: {
      applications: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return <AdminCareersClient initialCareers={careers} />;
}
