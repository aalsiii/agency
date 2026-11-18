import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json({ posts });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching blog posts";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newPost = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        excerpt: body.excerpt || "",
        content: body.content || "",
        coverImage: body.coverImage || null,
        category: body.category || "Growth",
        tags: Array.isArray(body.tags) ? JSON.stringify(body.tags) : (body.tags || "[]"),
        readTime: body.readTime || "4 min read",
        authorName: body.authorName || "NextCurrent Team",
        isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
      },
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error creating blog post";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
