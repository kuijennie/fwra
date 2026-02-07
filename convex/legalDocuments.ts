import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all published legal documents
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("legalDocuments")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();
  },
});

// Get legal document by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("legalDocuments")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

// Get legal documents by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    return await ctx.db
      .query("legalDocuments")
      .withIndex("by_category", (q) => q.eq("category", category))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
  },
});
