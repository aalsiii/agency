import prisma from "@/lib/prisma";
import InsightsClient from "./InsightsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Insights & Articles | NextCurrent Media",
  description: "Direct-response marketing strategies, Next.js engineering breakdowns, and search optimization frameworks.",
};

const defaultArticles = [
  {
    id: "post-1",
    slug: "why-nextjs-converts-higher-than-wordpress-for-modern-brands",
    title: "Why Next.js Websites Convert 3x Higher Than WordPress for Growing Brands",
    excerpt: "Slow themes, brittle plugin updates, and sub-optimal Core Web Vitals silently drain ad spend. Here is why bespoke Next.js architecture converts visitors at 2.4x higher rates.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
    content: "When an agency runs Meta ads to a WordPress site with a 3.8-second mobile load time, over 40% of clicks bounce before the hero image even paints. Custom Next.js App Router applications render at the edge in under 400 milliseconds, turning paid clicks into engaged consultations.",
    authorName: "Akshat Bijalwan",
    category: "Digital Experiences",
    readTime: "4 min read",
    tags: JSON.stringify(["Next.js", "Performance", "Web Architecture"]),
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    id: "post-2",
    slug: "meta-ads-vs-google-ads-where-should-you-invest-first",
    title: "Meta Ads vs Google Ads in 2026: Where Should Your Growth Budget Go First?",
    excerpt: "Push vs Pull marketing explained. Discover the exact decision framework we use to allocate monthly marketing budgets for client ROI.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    content: "Agencies love reporting vanity metrics like video views and reach. But your bank account does not deposit reach. In this breakdown, we share the exact blended ROAS and cost-per-qualified-application framework we deploy for our retainer partners.",
    authorName: "Akshat Bijalwan",
    category: "Growth & Marketing",
    readTime: "5 min read",
    tags: JSON.stringify(["Meta Ads", "CAC", "Attribution", "ROAS"]),
    isPublished: true,
    publishedAt: new Date(),
  },
];

export default async function InsightsPage() {
  let articles: any[] = [];
  try {
    articles = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Database connection fallback on InsightsPage:", error);
  }

  const finalArticles = articles && articles.length > 0 ? articles : defaultArticles;

  return <InsightsClient initialArticles={finalArticles} />;
}
