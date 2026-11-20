/**
 * Generates JSON-LD Structured Data Schema for Google Search Indexing & Ranking
 */

interface ArticleSchemaParams {
  title: string;
  description: string;
  slug: string;
  coverUrl: string;
  publishedAt: string | Date;
  authorName: string;
  category: string;
  faqs?: { question: string; answer: string }[];
}

export function generateArticleJsonLd({
  title,
  description,
  slug,
  coverUrl,
  publishedAt,
  authorName,
  category,
  faqs = [],
}: ArticleSchemaParams) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextcurrent.in";
  const articleUrl = `${siteUrl}/insights/${slug}`;
  const pubDate = new Date(publishedAt).toISOString();

  // 1. Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: title,
    description: description,
    image: [coverUrl],
    datePublished: pubDate,
    dateModified: pubDate,
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: "Founder & Lead Architect",
      worksFor: {
        "@type": "Organization",
        name: "NextCurrent",
        url: siteUrl,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "NextCurrent",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.png`,
      },
    },
    articleSection: category,
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${siteUrl}/insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category,
        item: `${siteUrl}/insights?category=${encodeURIComponent(category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: title,
        item: articleUrl,
      },
    ],
  };

  // 3. Optional FAQPage Schema (enables Google Rich Snippets with expandable questions in SERP)
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return {
    articleSchema,
    breadcrumbSchema,
    faqSchema,
  };
}
