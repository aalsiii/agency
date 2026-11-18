import prisma from "@/lib/prisma";
import InsightsClient from "./InsightsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Insights & Articles | NextCurrent Media",
  description: "Direct-response marketing strategies, Next.js engineering breakdowns, and search optimization frameworks.",
};

export default async function InsightsPage() {
  const articles = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return <InsightsClient initialArticles={articles} />;
}
