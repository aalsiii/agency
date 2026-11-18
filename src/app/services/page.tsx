import prisma from "@/lib/prisma";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services & Capabilities | NextCurrent Media",
  description: "Performance marketing, conversion-engineered Next.js websites, SEO domination, and viral social media engines.",
};

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return <ServicesClient initialServices={dbServices} />;
}
