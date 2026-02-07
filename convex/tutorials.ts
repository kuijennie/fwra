import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all published tutorials
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const tutorials = await ctx.db
      .query("tutorials")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .order("desc")
      .collect();

    return tutorials;
  },
});

// Get tutorials by category
export const getByCategory = query({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const tutorials = await ctx.db
      .query("tutorials")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .order("desc")
      .collect();

    return tutorials.filter((t) => t.isPublished);
  },
});

// Get a single tutorial by slug
export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const tutorials = await ctx.db
      .query("tutorials")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    return tutorials[0] || null;
  },
});

// Get a single tutorial by ID
export const getById = query({
  args: {
    id: v.id("tutorials"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get featured tutorials (most viewed)
export const getFeatured = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 4;

    const tutorials = await ctx.db
      .query("tutorials")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    // Sort by view count and take top N
    return tutorials
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  },
});

// Increment view count
export const incrementViewCount = mutation({
  args: {
    id: v.id("tutorials"),
  },
  handler: async (ctx, args) => {
    const tutorial = await ctx.db.get(args.id);
    if (tutorial) {
      await ctx.db.patch(args.id, {
        viewCount: tutorial.viewCount + 1,
      });
    }
  },
});

// Get tutorials by IDs (for related tutorials)
export const getByIds = query({
  args: {
    ids: v.array(v.id("tutorials")),
  },
  handler: async (ctx, args) => {
    const tutorials = await Promise.all(
      args.ids.map((id) => ctx.db.get(id))
    );
    return tutorials.filter((t) => t !== null && t.isPublished);
  },
});

// Search tutorials
export const search = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const searchTerm = args.query.toLowerCase();

    const tutorials = await ctx.db
      .query("tutorials")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    return tutorials.filter((tutorial) => {
      const titleMatch =
        tutorial.title.en.toLowerCase().includes(searchTerm) ||
        tutorial.title.sw.toLowerCase().includes(searchTerm);
      const descMatch =
        tutorial.description.en.toLowerCase().includes(searchTerm) ||
        tutorial.description.sw.toLowerCase().includes(searchTerm);
      return titleMatch || descMatch;
    });
  },
});
