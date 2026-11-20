"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  X,
  FileText,
  Clock,
  Calendar,
  Sparkles,
  Image as ImageIcon,
  Heading,
  Quote,
  List,
  ListOrdered,
  Bold,
  Save,
  Check,
} from "lucide-react";

interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string;
  readTime: string;
  authorName: string;
  isPublished: boolean;
  publishedAt: string | Date;
}

const sampleCovers = [
  { label: "Code & Web", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80" },
  { label: "Analytics & Ads", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80" },
  { label: "Studio & Creative", url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80" },
  { label: "Strategy & Funnels", url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80" },
  { label: "Design Systems", url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80" },
];

export default function BlogManager({ initialPosts }: { initialPosts: BlogPostItem[] }) {
  const [posts, setPosts] = useState<BlogPostItem[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "Growth & Marketing",
    tags: "Growth, Marketing",
    readTime: "5 min read",
    authorName: "Akshat Bijalwan",
    isPublished: true,
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenEditor = (post?: BlogPostItem) => {
    if (post) {
      setEditingPost(post);
      let parsedTags = "";
      try {
        const arr = JSON.parse(post.tags);
        parsedTags = Array.isArray(arr) ? arr.join(", ") : post.tags;
      } catch {
        parsedTags = post.tags || "";
      }

      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage || "",
        category: post.category,
        tags: parsedTags,
        readTime: post.readTime,
        authorName: post.authorName,
        isPublished: post.isPublished,
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: `### Executive Overview\n\nWrite a compelling opening introducing the strategic challenge and why it matters to modern brand operators.\n\n### Core Methodology\n1. **Step One**: Detail the exact tactical implementation.\n2. **Step Two**: Highlight operational nuances.\n3. **Step Three**: Measure and compound the results.\n\n### Summary & Action Items\nSummarize the actionable takeaways for executive leadership.`,
        coverImage: sampleCovers[0].url,
        category: "Growth & Marketing",
        tags: "Growth, Strategy, ROI",
        readTime: "5 min read",
        authorName: "Akshat Bijalwan",
        isPublished: true,
      });
    }
    setActiveTab("write");
    setIsEditorOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Auto generate slug if creating new
      slug: !editingPost ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : prev.slug,
    }));
  };

  const insertMarkdown = (syntax: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + "\n\n" + syntax,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    setLoading(true);

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      tags: tagsArray,
    };

    try {
      if (editingPost) {
        // Update existing
        const res = await fetch(`/api/blog/${editingPost.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update article");

        setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? data.post : p)));
        showToast("Article updated successfully!");
      } else {
        // Create new
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create article");

        setPosts((prev) => [data.post, ...prev]);
        showToast("Article published successfully!");
      }

      setIsEditorOpen(false);
    } catch (err: any) {
      showToast(err.message || "An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete article");

      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast("Article deleted successfully");
    } catch (err: any) {
      showToast(err.message || "Failed to delete", "error");
    }
  };

  const handleTogglePublish = async (post: BlogPostItem) => {
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !post.isPublished }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setPosts((prev) => prev.map((p) => (p.id === post.id ? data.post : p)));
      showToast(`Article set to ${!post.isPublished ? "Published" : "Draft"}`);
    } catch (err: any) {
      showToast(err.message || "Failed to update", "error");
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl font-mono text-xs flex items-center gap-2 border transition-all animate-in slide-in-from-bottom-5 ${
            toast.type === "success"
              ? "bg-[#0c0c11] border-emerald-500/50 text-emerald-400"
              : "bg-[#0c0c11] border-red-500/50 text-red-400"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={15} /> : <X size={15} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs text-primary/80 flex items-center gap-1.5">
            <FileText size={13} />
            <span>// EDITORIAL DESK · INSIGHTS & ARTICLES</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-white mt-1">
            Blog & Articles Manager
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Create, edit, format, and publish high-performance playbooks and editorial insights.
          </p>
        </div>

        <button
          onClick={() => handleOpenEditor()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-semibold text-xs font-mono hover:bg-white transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category, or slug..."
            className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-primary/50"
          />
        </div>

        <div className="font-mono text-xs text-neutral-400 flex items-center gap-2">
          <span>Total: {posts.length} articles</span>
          <span>·</span>
          <span className="text-emerald-400">
            {posts.filter((p) => p.isPublished).length} Published
          </span>
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl border border-white/10 bg-[var(--background-layer-1)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead className="bg-white/[0.02] border-b border-white/10 font-mono text-[11px] text-neutral-400">
              <tr>
                <th className="py-3.5 px-4">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Read Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono text-xs">
                    No articles found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {post.coverImage ? (
                          <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-9 rounded-lg border border-dashed border-white/20 flex items-center justify-center shrink-0 text-neutral-500">
                            <ImageIcon size={14} />
                          </div>
                        )}
                        <div className="max-w-md">
                          <span className="font-medium text-white block truncate group-hover:text-primary transition-colors">
                            {post.title}
                          </span>
                          <span className="font-mono text-[10px] text-neutral-400 block truncate">
                            /{post.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[11px] text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                        {post.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-300 font-mono text-[11px]">
                      {post.authorName}
                    </td>

                    <td className="py-3.5 px-4 text-neutral-400 font-mono text-[11px]">
                      {post.readTime}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`font-mono text-[10px] px-2.5 py-1 rounded-full cursor-pointer transition-all border ${
                          post.isPublished
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        }`}
                        title="Click to toggle status"
                      >
                        {post.isPublished ? "● Published" : "○ Draft"}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/insights/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                          title="View live article"
                        >
                          <ExternalLink size={13} />
                        </Link>

                        <button
                          onClick={() => handleOpenEditor(post)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-primary transition-colors cursor-pointer"
                          title="Edit article"
                        >
                          <Edit2 size={13} />
                        </button>

                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete article"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-Featured Blog Editor Modal / Drawer */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-5xl bg-[#0c0c11] border border-white/20 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-primary flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>{editingPost ? "// EDIT ARTICLE" : "// COMPOSE NEW ARTICLE"}</span>
                </span>
                <h2 className="text-xl font-sans font-medium text-white mt-1">
                  {editingPost ? `Editing: ${editingPost.title}` : "New Editorial Playbook"}
                </h2>
              </div>

              {/* Tabs: Write vs Preview */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === "write" ? "bg-primary text-black font-semibold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      activeTab === "preview" ? "bg-primary text-black font-semibold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Eye size={12} />
                    <span>Live Preview</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {activeTab === "write" ? (
                <>
                  {/* Title & Slug */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="font-mono text-xs text-neutral-300 block">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="e.g. Why Next.js Converts 3x Higher Than WordPress"
                        className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/60 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-neutral-300 block">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="why-nextjs-converts-higher"
                        className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-primary focus:border-primary/60 outline-none"
                      />
                    </div>
                  </div>

                  {/* Category, Author, Read Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-neutral-300 block">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-primary/60 outline-none cursor-pointer"
                      >
                        <option value="Growth & Marketing">Growth & Marketing</option>
                        <option value="Digital Experiences">Digital Experiences</option>
                        <option value="Creative & Branding">Creative & Branding</option>
                        <option value="Strategy & Consulting">Strategy & Consulting</option>
                        <option value="Web Engineering">Web Engineering</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-neutral-300 block">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-primary/60 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-neutral-300 block">
                        Reading Time
                      </label>
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        placeholder="e.g. 5 min read"
                        className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-primary/60 outline-none"
                      />
                    </div>
                  </div>

                  {/* Cover Image URL with quick presets */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-neutral-300 flex items-center justify-between">
                      <span>Cover Image URL (16:9 recommended)</span>
                      <span className="text-[10px] text-primary">Unsplash / Cloudinary / Local</span>
                    </label>
                    <input
                      type="url"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-primary/60 outline-none"
                    />

                    {/* Quick Image Presets */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="font-mono text-[10px] text-neutral-500">Quick Presets:</span>
                      {sampleCovers.map((cov, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFormData({ ...formData, coverImage: cov.url })}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 hover:text-primary hover:border-primary/40 transition-colors cursor-pointer"
                        >
                          + {cov.label}
                        </button>
                      ))}
                    </div>

                    {formData.coverImage && (
                      <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 mt-2 bg-black">
                        <Image
                          src={formData.coverImage}
                          alt="Cover preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Excerpt / Lead Paragraph */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-neutral-300 block">
                      Article Summary / Excerpt *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief 1-2 sentence lead paragraph explaining the primary thesis..."
                      className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl p-3 text-xs text-white focus:border-primary/60 outline-none leading-relaxed"
                    />
                  </div>

                  {/* Markdown Content Editor with Quick Insert Toolbar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs text-neutral-300">
                        Article Body (Markdown Supported) *
                      </label>

                      {/* Formatting Buttons */}
                      <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/10">
                        <button
                          type="button"
                          onClick={() => insertMarkdown("## Major Section Heading\n\nParagraph text goes here.")}
                          className="px-2 py-1 rounded hover:bg-white/10 text-[10px] font-mono text-neutral-300 hover:text-white"
                          title="Add H2 Heading"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("### Subheading Title\n\nSupporting explanation text.")}
                          className="px-2 py-1 rounded hover:bg-white/10 text-[10px] font-mono text-neutral-300 hover:text-white"
                          title="Add H3 Subheading"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("1. **First Step**: Description of execution.\n2. **Second Step**: Tactical nuance.\n3. **Third Step**: Scaling outcome.")}
                          className="px-2 py-1 rounded hover:bg-white/10 text-[10px] font-mono text-neutral-300 hover:text-white"
                          title="Add Numbered Steps"
                        >
                          1. 2. 3.
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown("- Key tactical takeaway\n- Verified benchmark metric\n- Operational principle")}
                          className="px-2 py-1 rounded hover:bg-white/10 text-[10px] font-mono text-neutral-300 hover:text-white"
                          title="Add Bullet Points"
                        >
                          • List
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={14}
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your article with ## Headings, ### Subheadings, and numbered lists..."
                      className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-4 text-xs font-mono text-neutral-200 focus:border-primary/60 outline-none leading-relaxed"
                    />
                  </div>

                  {/* Tags & Publish Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-neutral-300 block">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="Next.js, Meta Ads, CRO, Scaling"
                        className="w-full bg-[var(--background-layer-1)] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-primary/60 outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                      />
                      <label htmlFor="isPublished" className="font-mono text-xs text-white cursor-pointer select-none">
                        Publish immediately on live website
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                /* Live Preview Mode */
                <div className="space-y-8 bg-[#050505] p-6 sm:p-10 rounded-2xl border border-white/10">
                  <div className="border-b border-white/10 pb-6 space-y-4">
                    <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                      [ {formData.category} ]
                    </span>
                    <h1 className="text-3xl md:text-5xl font-sans font-medium text-white tracking-tight">
                      {formData.title || "Untitled Article"}
                    </h1>
                    <p className="text-sm md:text-base text-neutral-300 font-light border-l-2 border-primary/50 pl-4">
                      {formData.excerpt || "No excerpt provided yet."}
                    </p>
                  </div>

                  {formData.coverImage && (
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15">
                      <Image
                        src={formData.coverImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
                    {formData.content.split("\n\n").map((b, i) => {
                      if (b.startsWith("## ")) {
                        return <h2 key={i} className="text-2xl font-sans font-medium text-white pt-4">{b.replace("## ", "")}</h2>;
                      }
                      if (b.startsWith("### ")) {
                        return <h3 key={i} className="text-xl font-sans font-medium text-white pt-2">{b.replace("### ", "")}</h3>;
                      }
                      return <p key={i}>{b}</p>;
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-black font-semibold text-xs font-mono hover:bg-white transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Save size={13} />
                  <span>{loading ? "Saving..." : editingPost ? "Update Article" : "Publish Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
