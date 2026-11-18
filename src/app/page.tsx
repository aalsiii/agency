import prisma from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, testimonials, caseStudies] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.caseStudy.findMany({
      where: { isFeatured: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return <HomeClient services={services} testimonials={testimonials} caseStudies={caseStudies} />;
}
