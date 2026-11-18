import prisma from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let services: any[] = [];
  let testimonials: any[] = [];
  let caseStudies: any[] = [];

  try {
    [services, testimonials, caseStudies] = await Promise.all([
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
  } catch (error) {
    console.error("Database connection fallback on HomePage:", error);
  }

  // Resilient fallback testimonials if database is empty or cold-starting
  if (!testimonials || testimonials.length === 0) {
    testimonials = [
      {
        id: "nada-yoga-t1",
        clientName: "B.M. Joshi",
        clientRole: "Founder & Director",
        company: "Nada Yoga School",
        quote: "NextCurrent took over our complete digital management from a slow, old WordPress site to our SEO and social media. Our courses are now almost fully booked through next year.",
        rating: 5,
      },
      {
        id: "val-alino-t1",
        clientName: "Val Alino",
        clientRole: "Transformational Executive Coach",
        company: "Val Alino Coaching",
        quote: "Akshat and the NextCurrent team transformed my personal brand presence. The visual consistency across my socials and website has brought tremendous clarity and executive credibility.",
        rating: 5,
      },
      {
        id: "eazy-pregnancy-t1",
        clientName: "Dr. Ananya Sharma",
        clientRole: "Co-Founder",
        company: "Eazy Pregnancy",
        quote: "The SEO articles and copywriting delivered by NextCurrent are exceptional. They understand search intent and write with precision, establishing our Google organic footprint.",
        rating: 5,
      },
      {
        id: "luisa-photo-t1",
        clientName: "Luisa",
        clientRole: "Fine Art & Editorial Photographer",
        company: "Luisa Photography",
        quote: "The bespoke portfolio website built for my photography is breathtakingly fast and minimalist. It presents my imagery with the exact luxury editorial tone I wanted.",
        rating: 5,
      },
      {
        id: "rudraksha-t1",
        clientName: "G. Sharma",
        clientRole: "Founder",
        company: "Rudraksha Antiquei",
        quote: "Building our luxury sacred antiquities brand from scratch on Next.js has been a game changer. The speed, mobile responsiveness, and design pedigree are first class.",
        rating: 5,
      },
    ];
  }

  return <HomeClient services={services} testimonials={testimonials} caseStudies={caseStudies} />;
}
