import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { legalDocumentsSeedData } from "./seedData/legalDocuments";

// Get all published legal documents (shown on the public /legal page)
export const getPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("legalDocuments")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();
  },
});

// Get a single document by its slug (used on the /legal/[slug] detail page)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("legalDocuments")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

// One-time seed mutation — run once from the Convex dashboard to populate legal documents
// Safe to run multiple times: skips documents that already exist (checks by slug)
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    for (const doc of legalDocumentsSeedData) {
      const existing = await ctx.db
        .query("legalDocuments")
        .withIndex("by_slug", (q) => q.eq("slug", doc.slug))
        .first();

      if (existing) continue; // already seeded, skip

      await ctx.db.insert("legalDocuments", {
        slug: doc.slug,
        category: doc.category,
        title: doc.title,
        summary: doc.summary,
        content: doc.content,
        effectiveDate: doc.effectiveDate,
        isPublished: doc.isPublished,
        createdAt: now,
        updatedAt: now,
      });
    }

    return { seeded: legalDocumentsSeedData.length };
  },
});
