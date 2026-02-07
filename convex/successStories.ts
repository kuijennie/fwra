import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all approved success stories
export const getApproved = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("successStories")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .collect();
  },
});

// Get stories by recycling method
export const getByMethod = query({
  args: { method: v.string() },
  handler: async (ctx, { method }) => {
    return await ctx.db
      .query("successStories")
      .withIndex("by_method", (q) => q.eq("method", method))
      .filter((q) => q.eq(q.field("isApproved"), true))
      .collect();
  },
});

// Get single story by ID
export const getById = query({
  args: { id: v.id("successStories") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});
