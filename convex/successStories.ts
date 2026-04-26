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

async function getAdminByEmail(ctx: QueryCtx | MutationCtx, email: string): Promise<Doc<"users"> | null> {
  const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), email)).first();
  return user?.role === "admin" ? user : null;
}

async function requireAdmin(ctx: QueryCtx | MutationCtx, adminEmail?: string): Promise<Doc<"users">> {
  const caller = await getCallerWithRole(ctx);
  if (caller?.role === "admin") return caller;
  if (adminEmail) {
    const byEmail = await getAdminByEmail(ctx, adminEmail);
    if (byEmail) return byEmail;
  }
  throw new Error("Unauthorized");
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
    adminEmail: v.optional(v.string()),
    farmerName: v.string(),
    county: v.string(),
    method: v.string(),
    story: v.object({ en: v.string(), sw: v.string() }),
    results: v.object({ en: v.string(), sw: v.string() }),
  },
  handler: async (ctx, { adminEmail, ...args }) => {
    await requireAdmin(ctx, adminEmail);
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
    adminEmail: v.optional(v.string()),
    id: v.id("successStories"),
    farmerName: v.string(),
    county: v.string(),
    method: v.string(),
    story: v.object({ en: v.string(), sw: v.string() }),
    results: v.object({ en: v.string(), sw: v.string() }),
  },
  handler: async (ctx, { adminEmail, id, ...rest }) => {
    await requireAdmin(ctx, adminEmail);
    await ctx.db.patch(id, rest);
    return { success: true };
  },
});

// Admin: list all stories (including unapproved)
export const adminListAll = query({
  args: { adminEmail: v.optional(v.string()) },
  handler: async (ctx, { adminEmail }) => {
    const caller = await getCallerWithRole(ctx);
    if (caller?.role === "admin") return await ctx.db.query("successStories").order("desc").collect();
    if (adminEmail) {
      const byEmail = await getAdminByEmail(ctx, adminEmail);
      if (byEmail) return await ctx.db.query("successStories").order("desc").collect();
    }
    return null;
  },
});

// Admin: approve or reject a story
export const adminSetApproved = mutation({
  args: { adminEmail: v.optional(v.string()), id: v.id("successStories"), isApproved: v.boolean() },
  handler: async (ctx, { adminEmail, id, isApproved }) => {
    await requireAdmin(ctx, adminEmail);
    await ctx.db.patch(id, { isApproved });
    return { success: true };
  },
});

// Admin: delete a story
export const adminDelete = mutation({
  args: { adminEmail: v.optional(v.string()), id: v.id("successStories") },
  handler: async (ctx, { adminEmail, id }) => {
    await requireAdmin(ctx, adminEmail);
    await ctx.db.delete(id);
    return { success: true };
  },
});
