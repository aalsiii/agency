import prisma from "@/lib/prisma";
import WorkClient from "./WorkClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Work & Case Studies | NextCurrent Media",
  description: "Audited client outcomes, bespoke Next.js web applications, and high-ROAS performance growth partnerships.",
};

export default async function WorkPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { order: "asc" },
  });

  return <WorkClient initialCaseStudies={caseStudies} />;
}
