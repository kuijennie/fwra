import { v } from "convex/values";
import { mutation, query, internalQuery, QueryCtx, MutationCtx } from "./_generated/server";
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

// Admin: list all tutorials (including unpublished)
export const adminListAll = query({
  args: { adminEmail: v.optional(v.string()) },
  handler: async (ctx, { adminEmail }) => {
    const caller = await getCallerWithRole(ctx);
    if (caller?.role === "admin") return await ctx.db.query("tutorials").order("desc").collect();
    if (adminEmail) {
      const byEmail = await getAdminByEmail(ctx, adminEmail);
      if (byEmail) return await ctx.db.query("tutorials").order("desc").collect();
    }
    return null;
  },
});

// Internal: get by ID (used by email action)
export const getByIdInternal = internalQuery({
  args: { id: v.id("tutorials") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

// Admin: create a new tutorial
export const adminCreate = mutation({
  args: {
    adminEmail: v.optional(v.string()),
    slug: v.string(),
    category: v.string(),
    title: v.object({ en: v.string(), sw: v.string() }),
    description: v.object({ en: v.string(), sw: v.string() }),
    difficulty: v.string(),
    duration: v.string(),
    steps: v.array(
      v.object({
        stepNumber: v.number(),
        title: v.object({ en: v.string(), sw: v.string() }),
        content: v.object({ en: v.string(), sw: v.string() }),
      })
    ),
  },
  handler: async (ctx, { adminEmail, ...args }) => {
    await requireAdmin(ctx, adminEmail);
    return await ctx.db.insert("tutorials", {
      ...args,
      applicableWasteTypes: [],
      requiredResources: [],
      viewCount: 0,
      isPublished: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Admin: update an existing tutorial
export const adminUpdate = mutation({
  args: {
    adminEmail: v.optional(v.string()),
    id: v.id("tutorials"),
    category: v.string(),
    title: v.object({ en: v.string(), sw: v.string() }),
    description: v.object({ en: v.string(), sw: v.string() }),
    difficulty: v.string(),
    duration: v.string(),
    steps: v.array(
      v.object({
        stepNumber: v.number(),
        title: v.object({ en: v.string(), sw: v.string() }),
        content: v.object({ en: v.string(), sw: v.string() }),
      })
    ),
  },
  handler: async (ctx, { adminEmail, id, ...rest }) => {
    await requireAdmin(ctx, adminEmail);
    await ctx.db.patch(id, { ...rest, updatedAt: Date.now() });
    return { success: true };
  },
});

// Admin: delete a tutorial
export const adminDelete = mutation({
  args: { adminEmail: v.optional(v.string()), id: v.id("tutorials") },
  handler: async (ctx, { adminEmail, id }) => {
    await requireAdmin(ctx, adminEmail);
    await ctx.db.delete(id);
    return { success: true };
  },
});

// Admin: set published status
export const adminSetPublished = mutation({
  args: { adminEmail: v.optional(v.string()), id: v.id("tutorials"), isPublished: v.boolean() },
  handler: async (ctx, { adminEmail, id, isPublished }) => {
    await requireAdmin(ctx, adminEmail);
    await ctx.db.patch(id, { isPublished, updatedAt: Date.now() });
    return { success: true };
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
