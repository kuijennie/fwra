import { query, mutation, QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

async function getCurrentUser(ctx: QueryCtx | MutationCtx): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();
}

async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<Doc<"users">> {
  const user = await getCurrentUser(ctx);
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: admin access required");
  }
  return user;
}

export const getOrCreateFromClerk = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const clerkId = identity.subject;

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, { lastActive: Date.now() });
      return existingUser._id;
    }

    // First user in the system becomes admin automatically
    const anyUser = await ctx.db.query("users").first();
    const role = anyUser ? "farmer" : "admin";

    const userId = await ctx.db.insert("users", {
      clerkId,
      name: identity.name ?? "User",
      email: identity.email,
      phone: undefined,
      role,
      county: "nairobi",
      preferredLanguage: "en",
      createdAt: Date.now(),
      lastActive: Date.now(),
    });

    return userId;
  },
});

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const linkSessionToUser = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const entries = await ctx.db
      .query("wasteEntries")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();
    for (const entry of entries) {
      if (!entry.userId) {
        await ctx.db.patch(entry._id, { userId: user._id });
      }
    }

    const recs = await ctx.db
      .query("recommendations")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();
    for (const rec of recs) {
      if (!rec.userId) {
        await ctx.db.patch(rec._id, { userId: user._id });
      }
    }

    const reminders = await ctx.db
      .query("reminders")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();
    for (const rem of reminders) {
      if (!rem.userId) {
        await ctx.db.patch(rem._id, { userId: user._id });
      }
    }

    return { linked: entries.length + recs.length + reminders.length };
  },
});

// Admin: update a user's role
export const updateRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.string(),
  },
  handler: async (ctx, { userId, role }) => {
    await requireAdmin(ctx);

    if (!["farmer", "buyer", "admin"].includes(role)) {
      throw new Error("Invalid role");
    }

    await ctx.db.patch(userId, { role });
    return { success: true };
  },
});

// Admin: list all users
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const caller = await getCurrentUser(ctx);
    if (!caller || caller.role !== "admin") return null;

    return await ctx.db.query("users").collect();
  },
});

// Admin: get system-wide stats
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const caller = await getCurrentUser(ctx);
    if (!caller || caller.role !== "admin") return null;

    const allUsers = await ctx.db.query("users").collect();

    const farmers = allUsers.filter((u) => u.role === "farmer").length;
    const buyers = allUsers.filter((u) => u.role === "buyer").length;
    const admins = allUsers.filter((u) => u.role === "admin").length;

    // Count unique anonymous sessions
    const allEntries = await ctx.db.query("wasteEntries").collect();
    const uniqueSessions = new Set(allEntries.map((e) => e.sessionId));

    const allRecs = await ctx.db.query("recommendations").collect();
    const allReminders = await ctx.db.query("reminders").collect();

    return {
      totalUsers: allUsers.length,
      farmers,
      buyers,
      admins,
      anonymousSessions: uniqueSessions.size,
      totalEntries: allEntries.length,
      totalRecommendations: allRecs.length,
      totalReminders: allReminders.length,
    };
  },
});
