import prisma from "@/lib/prisma";
import CareersClient from "./CareersClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers & Culture | NextCurrent Media",
  description: "Join our high-performance digital growth engineering and performance marketing studio.",
};

const defaultOpenings = [
  {
    id: "career-1",
    title: "Senior Next.js & Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / Hybrid (India)",
    type: "Full-Time",
    experience: "3+ Years",
    salaryRange: "Competitive / Equity",
    description: "Architect sub-second web applications, headless commerce systems, and conversion-optimized funnels using Next.js 16, TypeScript, and modern edge tools.",
    requirements: JSON.stringify([
      "Deep expertise in Next.js App Router, React 19, and TypeScript",
      "Proven track record of optimizing Core Web Vitals to 95+ scores",
      "Experience with Tailwind CSS, Framer Motion, and database ORMs (Prisma)",
      "Obsession with micro-interactions, responsive polish, and clean code",
    ]),
    responsibilities: JSON.stringify([
      "Build and maintain flagship client platforms and internal tools",
      "Collaborate with lead strategists on conversion architecture",
      "Conduct code reviews and ensure performance benchmarks",
    ]),
    isActive: true,
  },
  {
    id: "career-2",
    title: "Performance Marketing & Meta Ads Specialist",
    department: "Growth",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "2+ Years",
    salaryRange: "Competitive + Performance Bonus",
    description: "Manage and scale multi-channel paid acquisition budgets across Meta and Google, focusing ruthlessly on blended CAC and booked revenue.",
    requirements: JSON.stringify([
      "Demonstrated experience managing $10k+ monthly paid ad budgets",
      "Strong direct-response copywriting and creative angle iteration",
      "Proficiency with Meta Ads Manager, CAPI, and Google Analytics 4",
      "Data-driven mindset with focus on unit economics and ROAS",
    ]),
    responsibilities: JSON.stringify([
      "Structure and optimize campaign funnels and audience exclusions",
      "Develop weekly creative briefs for video editors and copywriters",
      "Deliver transparent performance reporting and video teardowns",
    ]),
    isActive: true,
  },
];

export default async function CareersPage() {
  let openings: any[] = [];
  try {
    openings = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database connection fallback on CareersPage:", error);
  }

  const finalOpenings = openings && openings.length > 0 ? openings : defaultOpenings;

  return <CareersClient initialOpenings={finalOpenings} />;
}
