import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { tool, inputs } = await req.json();

    if (!tool || !inputs) {
      return NextResponse.json({ error: "Tool name and inputs are required." }, { status: 400 });
    }

    let result: unknown = null;

    if (tool === "reel-hooks") {
      const { niche, topic, style } = inputs;
      const cleanNiche = niche || "Business / Marketing";
      const cleanTopic = topic || "Scaling revenue";

      result = {
        niche: cleanNiche,
        topic: cleanTopic,
        hooks: [
          {
            type: "Pattern Interrupt",
            hook: `Stop doing this in your ${cleanNiche} business immediately. Here's what's actually working in 2026.`,
            scriptPreview: "Hook -> Call out common mistake -> Reveal 3-step modern playbook -> Call to action to follow.",
          },
          {
            type: "Contrarian / Hot Take",
            hook: `Most people think ${cleanTopic} takes months. We did it in 14 days using this exact framework:`,
            scriptPreview: "Display screenshot/proof -> Show the 1 counter-intuitive rule -> Give clear takeaway.",
          },
          {
            type: "Pain Point Agitation",
            hook: `If you're spending money on ${cleanTopic} and seeing zero results, watch this for 30 seconds.`,
            scriptPreview: "Identify the exact bottleneck -> Provide quick-win remedy -> Ask them to comment 'GUIDE'.",
          },
          {
            type: "Curiosity Loop",
            hook: `The 1 sentence that completely transformed how we approach ${cleanTopic}:`,
            scriptPreview: "Build suspense -> Drop quote or mental model -> Give real-world implementation example.",
          },
          {
            type: "Secret / Insider Breakdown",
            hook: `How top 1% brands in ${cleanNiche} dominate without burning ad budget:`,
            scriptPreview: "List 3 high-impact leverage points -> Show why amateurs fail at step 2 -> Offer free audit.",
          },
        ],
      };
    } else if (tool === "ad-copy") {
      const { product, targetAudience, offer, platform } = inputs;
      const p = product || "Digital Services";
      const aud = targetAudience || "Business Owners";
      const off = offer || "Claim 14-Day Free Audit";

      result = {
        platform: platform || "Meta Ads",
        copies: [
          {
            angle: "Direct & Results-Focused",
            headline: `Scale Your ${p} Without The Guesswork`,
            primaryText: `Attention ${aud}: Are you tired of burning ad spend with zero pipeline to show for it?\n\nAt NextCurrent Media, we engineer high-converting client acquisition funnels that turn clicks into revenue.\n\n👉 Limited time: ${off}.`,
            cta: "Learn More",
          },
          {
            angle: "Pain Point & Transformation",
            headline: `The Last Agency You'll Ever Need`,
            primaryText: `Most agencies send you clicks and vanity metrics. We focus on what matters: qualified calls and pipeline ROI.\n\nWhether you need bespoke Next.js web applications, Meta ads that scale, or #1 Google rankings, we've got you covered.\n\nReady to scale? ${off} today.`,
            cta: "Get Offer",
          },
          {
            angle: "Social Proof & Urgency",
            headline: `How Brands Are Generating 4.8x ROAS`,
            primaryText: `What if your acquisition cost was cut in half while your monthly revenue tripled?\n\nSee how our client flywheel generated +740% growth in under 6 months.\n\nClick below to check your eligibility: ${off}.`,
            cta: "Book Now",
          },
        ],
      };
    } else if (tool === "caption-gen") {
      const { topic, tone, targetAudience } = inputs;
      const t = topic || "Growing an online brand";
      const aud = targetAudience || "Founders and creators";

      result = {
        caption: `Here is the truth about ${t} that nobody wants to admit 👇\n\nMost people think success is about doing 100 things at once. In reality, it’s about doing 3 high-leverage things consistently:\n\n1️⃣ Clear value proposition that speaks directly to ${aud}\n2️⃣ A frictionless conversion path (no bloated funnels)\n3️⃣ Irresistible creative that hooks attention in under 3 seconds\n\nIf you fix these three, everything else becomes 10x easier.\n\nSave this for your next strategy session 📌\n\nDrop a "GROW" in the comments and we’ll DM you our private breakdown!\n\n#DigitalMarketing #GrowthHacking #BusinessStrategy #AgencyLife #NextCurrent #ScaleYourBrand #FunnelOptimization`,
        hashtags: ["#DigitalMarketing", "#GrowthHacking", "#BusinessStrategy", "#LeadGeneration", "#NextCurrent", "#ScaleOnline"],
      };
    } else if (tool === "website-health") {
      const { url } = inputs;
      const domain = url?.replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "example.com";

      result = {
        url: url || `https://${domain}`,
        overallScore: 78,
        metrics: [
          { name: "Performance & Mobile Speed", score: 82, status: "Good", detail: "Fast response, minor script deferral recommended" },
          { name: "SEO & Meta Readiness", score: 74, status: "Needs Improvement", detail: "Missing OpenGraph description and structured schema markup" },
          { name: "Conversion & CTA Placement", score: 71, status: "Opportunity", detail: "Primary call to action is below the fold on mobile viewports" },
          { name: "Security & HTTPS", score: 95, status: "Excellent", detail: "Valid SSL certificate and secure headers detected" },
        ],
        quickWins: [
          "Move primary inquiry button above the fold on mobile screens",
          "Add FAQ Schema markup for rich snippets in Google search results",
          "Convert hero PNG images to modern WebP/AVIF formats to save ~60% payload",
        ],
      };
    }

    // Log tool usage to DB asynchronously
    try {
      await prisma.toolLog.create({
        data: {
          toolName: tool,
          input: JSON.stringify(inputs),
          output: JSON.stringify(result),
        },
      });
    } catch {
      // ignore logging error
    }

    return NextResponse.json({ success: true, result });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error processing tool request";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
