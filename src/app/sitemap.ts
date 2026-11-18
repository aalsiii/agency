import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nextcurrentmedia.com";

  // Static routes
  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/process",
    "/insights",
    "/about",
    "/contact",
    "/start-a-project",
    "/careers",
    "/pricing",
    "/free-audit",
    "/free-tools",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic service pages
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    serviceRoutes = services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));
  } catch {}

  // Dynamic case studies / work pages
  let workRoutes: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      select: { slug: true, updatedAt: true },
    });
    workRoutes = caseStudies.map((cs) => ({
      url: `${baseUrl}/work/${cs.slug}`,
      lastModified: cs.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));
  } catch {}

  // Dynamic insights / articles
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((p) => ({
      url: `${baseUrl}/insights/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));
  } catch {}

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...blogRoutes];
}
