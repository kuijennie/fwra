import { query, mutation, internalQuery, QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

async function getCallerWithRole(ctx: QueryCtx | MutationCtx): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();
}

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

// Internal: get by ID (used by email action)
export const getByIdInternal = internalQuery({
  args: { id: v.id("successStories") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

// Admin: create a new story
export const adminCreate = mutation({
  args: {
    farmerName: v.string(),
    county: v.string(),
    method: v.string(),
    story: v.object({ en: v.string(), sw: v.string() }),
    results: v.object({ en: v.string(), sw: v.string() }),
  },
  handler: async (ctx, args) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || caller.role !== "admin") throw new Error("Unauthorized");
    return await ctx.db.insert("successStories", {
      ...args,
      isApproved: false,
      createdAt: Date.now(),
    });
  },
});

// Admin: update an existing story
export const adminUpdate = mutation({
  args: {
    id: v.id("successStories"),
    farmerName: v.string(),
    county: v.string(),
    method: v.string(),
    story: v.object({ en: v.string(), sw: v.string() }),
    results: v.object({ en: v.string(), sw: v.string() }),
  },
  handler: async (ctx, { id, ...rest }) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || caller.role !== "admin") throw new Error("Unauthorized");
    await ctx.db.patch(id, rest);
    return { success: true };
  },
});

// Admin: list all stories (including unapproved)
export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || caller.role !== "admin") return null;
    return await ctx.db.query("successStories").order("desc").collect();
  },
});

// Admin: approve or reject a story
export const adminSetApproved = mutation({
  args: { id: v.id("successStories"), isApproved: v.boolean() },
  handler: async (ctx, { id, isApproved }) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || caller.role !== "admin") throw new Error("Unauthorized");
    await ctx.db.patch(id, { isApproved });
    return { success: true };
  },
});

// Admin: delete a story
export const adminDelete = mutation({
  args: { id: v.id("successStories") },
  handler: async (ctx, { id }) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || caller.role !== "admin") throw new Error("Unauthorized");
    await ctx.db.delete(id);
    return { success: true };
  },
});
