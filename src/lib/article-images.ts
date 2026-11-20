// Fallback and default image mapping for NextCurrent Insights
export const getArticleCoverImage = (slug?: string, category?: string, currentImage?: string | null): string => {
  if (currentImage && currentImage.trim().length > 0) {
    return currentImage;
  }

  // Slug-specific imagery
  if (slug) {
    if (slug.includes("nextjs") || slug.includes("wordpress") || slug.includes("web")) {
      return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80";
    }
    if (slug.includes("meta") || slug.includes("google-ads") || slug.includes("budget")) {
      return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80";
    }
    if (slug.includes("creative-fatigue") || slug.includes("creative")) {
      return "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80";
    }
    if (slug.includes("high-ticket") || slug.includes("funnel")) {
      return "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80";
    }
    if (slug.includes("instagram") || slug.includes("dm") || slug.includes("social")) {
      return "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80";
    }
    if (slug.includes("figma") || slug.includes("design-system")) {
      return "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80";
    }
  }

  // Category fallback
  switch (category) {
    case "Growth & Marketing":
      return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80";
    case "Digital Experiences":
      return "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80";
    case "Creative & Branding":
      return "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80";
    case "Strategy & Consulting":
      return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";
    default:
      return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80";
  }
};
