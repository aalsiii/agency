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
    slug: "why-custom-nextjs-beats-wordpress-for-client-acquisition",
    title: "Why Modern Brands Are Leaving Legacy WordPress for Custom Next.js",
    excerpt: "Slow themes, brittle plugin updates, and sub-optimal Core Web Vitals silently drain ad spend. Here is why bespoke Next.js architecture converts visitors at 2.4x higher rates.",
    content: "When an agency runs Meta ads to a WordPress site with a 3.8-second mobile load time, over 40% of clicks bounce before the hero image even paints. Custom Next.js App Router applications render at the edge in under 400 milliseconds, turning paid clicks into engaged consultations.",
    authorName: "Akshat Bijalwan",
    category: "Web Engineering",
    readTime: "5 min read",
    tags: JSON.stringify(["Next.js", "Performance", "Web Architecture"]),
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    id: "post-2",
    slug: "the-death-of-vanity-metrics-cac-and-blended-roas",
    title: "The Death of Vanity Metrics: How to Track Blended CAC and Real Pipeline",
    excerpt: "Stop celebrating impressions and click-through rates. Discover how modern growth operators structure unified attribution dashboards across paid media and CRM pipelines.",
    content: "Agencies love reporting vanity metrics like video views and reach. But your bank account does not deposit reach. In this breakdown, we share the exact blended ROAS and cost-per-qualified-application framework we deploy for our retainer partners.",
    authorName: "Akshat Bijalwan",
    category: "Performance Marketing",
    readTime: "7 min read",
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
