import prisma from "@/lib/prisma";
import BlogManager from "./BlogManager";

export const metadata = {
  title: "Blog & Articles | NextCurrent Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching blog posts in admin:", error);
  }

  // Convert Date objects to ISO strings for client component serialization
  const serializedPosts = posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt instanceof Date ? post.publishedAt.toISOString() : String(post.publishedAt),
    createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : undefined,
    updatedAt: post.updatedAt instanceof Date ? post.updatedAt.toISOString() : undefined,
  }));

  return <BlogManager initialPosts={serializedPosts} />;
}
