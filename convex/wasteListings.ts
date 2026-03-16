import { query, mutation, QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

// Resolve the caller — tries JWT auth first, falls back to clerkId param
async function getCallerByClerkId(
  ctx: QueryCtx | MutationCtx,
  clerkId?: string
): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  const id = identity?.subject ?? clerkId;
  if (!id) return null;
  return ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", id))
    .first();
}

async function requireFarmer(
  ctx: QueryCtx | MutationCtx,
  clerkId?: string
): Promise<Doc<"users">> {
  const user = await getCallerByClerkId(ctx, clerkId);
  if (!user || user.role !== "farmer") throw new Error("Farmer role required");
  return user;
}

async function requireFarmerOrAdmin(
  ctx: QueryCtx | MutationCtx,
  clerkId?: string
): Promise<Doc<"users">> {
  const user = await getCallerByClerkId(ctx, clerkId);
  if (!user || (user.role !== "farmer" && user.role !== "admin")) {
    throw new Error("Farmer or admin role required");
  }
  return user;
}

// Public: browse available listings (buyers, farmers, anyone)
export const getAvailable = query({
  args: {
    county: v.optional(v.string()),
    wasteType: v.optional(v.string()),
  },
  handler: async (ctx, { county, wasteType }) => {
    let listings = await ctx.db
      .query("wasteListings")
      .withIndex("by_status", (q) => q.eq("status", "available"))
      .collect();

    if (county) {
      listings = listings.filter((l) => l.county === county);
    }
    if (wasteType) {
      listings = listings.filter((l) => l.wasteType === wasteType);
    }

    const withFarmer = await Promise.all(
      listings.map(async (listing) => {
        const farmer = await ctx.db.get(listing.userId);
        return { ...listing, farmerName: farmer?.name ?? "Farmer" };
      })
    );

    return withFarmer.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Farmer: get their own listings
export const getMine = query({
  args: { clerkId: v.optional(v.string()) },
  handler: async (ctx, { clerkId }) => {
    const user = await getCallerByClerkId(ctx, clerkId);
    if (!user || user.role !== "farmer") return null;

    return await ctx.db
      .query("wasteListings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

// Farmer: create a new listing
export const create = mutation({
  args: {
    clerkId: v.optional(v.string()),
    title: v.string(),
    wasteType: v.string(),
    processedFrom: v.optional(v.string()),
    quantityKg: v.number(),
    pricePerKg: v.optional(v.number()),
    county: v.string(),
    subCounty: v.optional(v.string()),
    description: v.string(),
    contactPhone: v.string(),
    contactWhatsapp: v.optional(v.string()),
  },
  handler: async (ctx, { clerkId, ...args }) => {
    const farmer = await requireFarmer(ctx, clerkId);
    const now = Date.now();
    return await ctx.db.insert("wasteListings", {
      userId: farmer._id,
      title: args.title,
      wasteType: args.wasteType,
      processedFrom: args.processedFrom,
      quantityKg: args.quantityKg,
      pricePerKg: args.pricePerKg,
      county: args.county,
      subCounty: args.subCounty,
      description: args.description,
      contactPhone: args.contactPhone,
      contactWhatsapp: args.contactWhatsapp,
      status: "available",
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Farmer: update status of own listing
export const updateStatus = mutation({
  args: {
    clerkId: v.optional(v.string()),
    id: v.id("wasteListings"),
    status: v.string(),
  },
  handler: async (ctx, { clerkId, id, status }) => {
    const user = await requireFarmerOrAdmin(ctx, clerkId);
    const listing = await ctx.db.get(id);
    if (!listing) throw new Error("Listing not found");
    if (user.role !== "admin" && listing.userId !== user._id) {
      throw new Error("Unauthorized");
    }
    if (!["available", "sold", "expired"].includes(status)) {
      throw new Error("Invalid status");
    }
    await ctx.db.patch(id, { status, updatedAt: Date.now() });
    return { success: true };
  },
});

// Farmer or admin: delete listing
export const remove = mutation({
  args: {
    clerkId: v.optional(v.string()),
    id: v.id("wasteListings"),
  },
  handler: async (ctx, { clerkId, id }) => {
    const user = await requireFarmerOrAdmin(ctx, clerkId);
    const listing = await ctx.db.get(id);
    if (!listing) throw new Error("Listing not found");
    if (user.role !== "admin" && listing.userId !== user._id) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(id);
    return { success: true };
  },
});

// Admin: get all listings
export const adminListAll = query({
  args: { clerkId: v.optional(v.string()) },
  handler: async (ctx, { clerkId }) => {
    const user = await getCallerByClerkId(ctx, clerkId);
    if (!user || user.role !== "admin") return null;
    return await ctx.db.query("wasteListings").order("desc").collect();
  },
});

// Stats for buyer dashboard
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const available = await ctx.db
      .query("wasteListings")
      .withIndex("by_status", (q) => q.eq("status", "available"))
      .collect();

    const countiesCovered = new Set(available.map((l) => l.county)).size;
    const typeCount: Record<string, number> = {};
    available.forEach((l) => {
      typeCount[l.wasteType] = (typeCount[l.wasteType] || 0) + 1;
    });

    return {
      total: available.length,
      countiesCovered,
      byType: typeCount,
    };
  },
});
