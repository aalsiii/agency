import prisma from "@/lib/prisma";
import CareersClient from "./CareersClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers & Culture | NextCurrent Media",
  description: "Join our high-performance digital growth engineering and performance marketing studio.",
};

export default async function CareersPage() {
  const openings = await prisma.career.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return <CareersClient initialOpenings={openings} />;
}
