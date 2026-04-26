import { query, mutation, internalQuery, QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

// Looks up the currently logged-in user using the Clerk JWT token.
// Convex verifies the token and gives us the identity — I then use the clerkId
// to find the matching user record in my database.
async function getCurrentUser(ctx: QueryCtx | MutationCtx): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();
}

// Fallback lookup for when JWT auth isn't available.
// I use this in admin mutations that need to support email-based verification.
async function getUserByEmail(ctx: QueryCtx | MutationCtx, email: string): Promise<Doc<"users"> | null> {
  return await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("email"), email))
    .first();
}

// Guard for JWT-authenticated admin mutations.
// Throws immediately if the caller isn't logged in or isn't an admin.
async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<Doc<"users">> {
  const user = await getCurrentUser(ctx);
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: admin access required");
  }
  return user;
}

// Fallback guard used when Clerk JWT isn't configured on Convex.
// Verifies admin status by email instead of JWT — used in the admin dashboard
// when the CLERK_ISSUER_URL environment variable isn't set.
async function requireAdminByEmail(ctx: QueryCtx | MutationCtx, email: string): Promise<Doc<"users">> {
  const user = await getUserByEmail(ctx, email);
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: admin access required");
  }
  return user;
}

// Shared stats builder used by both getStats and getStatsByEmail so I don't repeat the logic
function buildStats(allUsers: Doc<"users">[], allEntries: { sessionId: string }[], totalRecommendations: number, totalReminders: number) {
  const farmers = allUsers.filter((u) => u.role === "farmer").length;
  const buyers = allUsers.filter((u) => u.role === "buyer").length;
  const admins = allUsers.filter((u) => u.role === "admin").length;
  // Count unique anonymous sessions from waste entries
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

// Called every time a user signs in via Clerk.
// If they already exist in my database I just update their last active time.
// If they're new — the first user ever becomes admin, everyone else starts as "pending"
// and must pick a role (farmer or buyer) before accessing the app.
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

    // First user ever = admin. Everyone after that starts as pending.
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

// Returns the currently logged-in user's full record — used across the app
// to check roles and personalize the UI
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

// Looks up any user by email — used as a fallback when JWT auth isn't available
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await getUserByEmail(ctx, email);
  },
});

// When a user signs in after using the app anonymously, I link all their
// previous data (waste entries, recommendations, reminders) to their account
// so nothing gets lost from their anonymous session.
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

    // Attach userId to all waste entries from this anonymous session
    const entries = await ctx.db
      .query("wasteEntries")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();
    for (const entry of entries) {
      if (!entry.userId) {
        await ctx.db.patch(entry._id, { userId: user._id });
      }
    }

    // Attach userId to all recommendations from this anonymous session
    const recs = await ctx.db
      .query("recommendations")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();
    for (const rec of recs) {
      if (!rec.userId) {
        await ctx.db.patch(rec._id, { userId: user._id });
      }
    }

    // Attach userId to all reminders from this anonymous session
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

// New users start as "pending" — they must choose farmer or buyer before proceeding.
// This mutation sets their role. I only allow it once (role must still be "pending").
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

// Same as selectRole but bypasses JWT — used when Clerk JWT isn't available on Convex.
// Identifies the user directly by their Clerk ID instead.
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

// Admin only: change any user's role via the admin dashboard
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

// Email-based fallback for updateRole — used when JWT auth isn't available
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

// Admin only: list all users in the system (JWT auth version)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const caller = await getCurrentUser(ctx);
    if (!caller || caller.role !== "admin") return null;

    return await ctx.db.query("users").collect();
  },
});

// Admin only: list all users (email fallback version)
export const listAllByEmail = query({
  args: { adminEmail: v.string() },
  handler: async (ctx, { adminEmail }) => {
    await requireAdminByEmail(ctx, adminEmail);
    return await ctx.db.query("users").collect();
  },
});

// Admin only: dashboard stats (JWT auth version)
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

// Admin only: dashboard stats (email fallback version)
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

// Internal query used by Convex actions (not callable from the browser)
export const getCurrentUserInternal = internalQuery({
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

// Internal query used by email actions to get all users who have an email address
export const getUsersWithEmails = internalQuery({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.filter((u) => !!u.email);
  },
});

// Dev/setup helper — seeds an admin user directly from the Convex dashboard.
// I use this when Clerk JWT isn't configured yet and I need to bootstrap the first admin.
// It updates the user if they already exist, or creates them if they don't.
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

// Dev helper — seeds any user with any role. Useful for testing different roles
// without going through the full sign-up flow.
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
