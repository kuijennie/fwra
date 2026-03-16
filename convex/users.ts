import { query, mutation, internalQuery, QueryCtx, MutationCtx } from "./_generated/server";
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

async function getUserByEmail(ctx: QueryCtx | MutationCtx, email: string): Promise<Doc<"users"> | null> {
  return await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("email"), email))
    .first();
}

async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<Doc<"users">> {
  const user = await getCurrentUser(ctx);
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: admin access required");
  }
  return user;
}

async function requireAdminByEmail(ctx: QueryCtx | MutationCtx, email: string): Promise<Doc<"users">> {
  const user = await getUserByEmail(ctx, email);
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: admin access required");
  }
  return user;
}

function buildStats(allUsers: Doc<"users">[], allEntries: { sessionId: string }[], totalRecommendations: number, totalReminders: number) {
  const farmers = allUsers.filter((u) => u.role === "farmer").length;
  const buyers = allUsers.filter((u) => u.role === "buyer").length;
  const admins = allUsers.filter((u) => u.role === "admin").length;
  const uniqueSessions = new Set(allEntries.map((e) => e.sessionId));

  return {
    totalUsers: allUsers.length,
    farmers,
    buyers,
    admins,
    anonymousSessions: uniqueSessions.size,
    totalEntries: allEntries.length,
    totalRecommendations,
    totalReminders,
  };
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

    const anyUser = await ctx.db.query("users").first();
    const role = anyUser ? "pending" : "admin";

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

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await getUserByEmail(ctx, email);
  },
});

export const linkSessionToUser = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { linked: 0 };
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      return { linked: 0 };
    }

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

export const selectRole = mutation({
  args: {
    role: v.union(v.literal("farmer"), v.literal("buyer")),
  },
  handler: async (ctx, { role }) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");
    if (user.role !== "pending") throw new Error("Role already set");
    await ctx.db.patch(user._id, { role });
    return { role };
  },
});

// JWT-auth-free version: looks up user by clerkId directly (mirrors seedUser pattern)
export const selectRoleByClerkId = mutation({
  args: {
    clerkId: v.string(),
    role: v.union(v.literal("farmer"), v.literal("buyer")),
  },
  handler: async (ctx, { clerkId, role }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();
    if (!user) throw new Error("User not found");
    if (user.role !== "pending") throw new Error("Role already set");
    await ctx.db.patch(user._id, { role });
    return { role };
  },
});

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

export const updateRoleByEmail = mutation({
  args: {
    adminEmail: v.string(),
    userId: v.id("users"),
    role: v.string(),
  },
  handler: async (ctx, { adminEmail, userId, role }) => {
    await requireAdminByEmail(ctx, adminEmail);

    if (!["farmer", "buyer", "admin"].includes(role)) {
      throw new Error("Invalid role");
    }

    await ctx.db.patch(userId, { role });
    return { success: true };
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const caller = await getCurrentUser(ctx);
    if (!caller || caller.role !== "admin") return null;

    return await ctx.db.query("users").collect();
  },
});

export const listAllByEmail = query({
  args: { adminEmail: v.string() },
  handler: async (ctx, { adminEmail }) => {
    await requireAdminByEmail(ctx, adminEmail);
    return await ctx.db.query("users").collect();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const caller = await getCurrentUser(ctx);
    if (!caller || caller.role !== "admin") return null;

    const allUsers = await ctx.db.query("users").collect();
    const allEntries = await ctx.db.query("wasteEntries").collect();
    const allRecs = await ctx.db.query("recommendations").collect();
    const allReminders = await ctx.db.query("reminders").collect();

    return buildStats(allUsers, allEntries, allRecs.length, allReminders.length);
  },
});

export const getStatsByEmail = query({
  args: { adminEmail: v.string() },
  handler: async (ctx, { adminEmail }) => {
    await requireAdminByEmail(ctx, adminEmail);

    const allUsers = await ctx.db.query("users").collect();
    const allEntries = await ctx.db.query("wasteEntries").collect();
    const allRecs = await ctx.db.query("recommendations").collect();
    const allReminders = await ctx.db.query("reminders").collect();

    return buildStats(allUsers, allEntries, allRecs.length, allReminders.length);
  },
});

// Internal: get current user (used by Convex actions)
export const getCurrentUserInternal = internalQuery({
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

// Internal: get all users who have an email address (used for email campaigns)
export const getUsersWithEmails = internalQuery({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.filter((u) => !!u.email);
  },
});

// Dev helper: seed the first admin user when auth bootstrap is unavailable.
export const seedAdmin = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, { clerkId, email, name }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        email,
        name,
        role: "admin",
        lastActive: Date.now(),
      });
      return existingUser._id;
    }

    return await ctx.db.insert("users", {
      clerkId,
      name,
      email,
      phone: undefined,
      role: "admin",
      county: "nairobi",
      preferredLanguage: "en",
      createdAt: Date.now(),
      lastActive: Date.now(),
    });
  },
});

export const seedUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.string(),
  },
  handler: async (ctx, { clerkId, email, name, role }) => {
    if (!["farmer", "buyer", "admin", "pending"].includes(role)) {
      throw new Error("Invalid role");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        email,
        name,
        role,
        lastActive: Date.now(),
      });
      return existingUser._id;
    }

    return await ctx.db.insert("users", {
      clerkId,
      name,
      email,
      phone: undefined,
      role,
      county: "nairobi",
      preferredLanguage: "en",
      createdAt: Date.now(),
      lastActive: Date.now(),
    });
  },
});
