import { query, mutation, QueryCtx, MutationCtx } from "./_generated/server";
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

// Get all active buyers
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("buyers")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Get buyers by county
export const getByCounty = query({
  args: { county: v.string() },
  handler: async (ctx, { county }) => {
    return await ctx.db
      .query("buyers")
      .withIndex("by_county", (q) => q.eq("county", county))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Get buyers by product type
export const getByProductType = query({
  args: { productType: v.string() },
  handler: async (ctx, { productType }) => {
    const allBuyers = await ctx.db
      .query("buyers")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    return allBuyers.filter((buyer) =>
      buyer.productTypes.includes(productType)
    );
  },
});

// Get verified buyers only
export const getVerified = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("buyers")
      .withIndex("by_verified", (q) => q.eq("isVerified", true))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Search buyers
export const search = query({
  args: {
    query: v.string(),
    county: v.optional(v.string()),
    productType: v.optional(v.string()),
  },
  handler: async (ctx, { query: searchQuery, county, productType }) => {
    let buyers = await ctx.db
      .query("buyers")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    // Filter by county if provided
    if (county) {
      buyers = buyers.filter((buyer) => buyer.county === county);
    }

    // Filter by product type if provided
    if (productType) {
      buyers = buyers.filter((buyer) =>
        buyer.productTypes.includes(productType)
      );
    }

    // Search by name or description
    if (searchQuery && searchQuery.length > 0) {
      const lowerQuery = searchQuery.toLowerCase();
      buyers = buyers.filter(
        (buyer) =>
          buyer.businessName.toLowerCase().includes(lowerQuery) ||
          buyer.description.en.toLowerCase().includes(lowerQuery) ||
          buyer.description.sw.toLowerCase().includes(lowerQuery) ||
          buyer.contactPerson.toLowerCase().includes(lowerQuery)
      );
    }

    return buyers;
  },
});

// Get single buyer by ID
export const getById = query({
  args: { id: v.id("buyers") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

// Buyer: create own listing
export const createListing = mutation({
  args: {
    businessName: v.string(),
    contactPerson: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    county: v.string(),
    subCounty: v.optional(v.string()),
    address: v.optional(v.string()),
    productTypes: v.array(v.string()),
    description: v.object({ en: v.string(), sw: v.string() }),
    priceRange: v.optional(v.object({ en: v.string(), sw: v.string() })),
  },
  handler: async (ctx, args) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || (caller.role !== "buyer" && caller.role !== "admin")) {
      throw new Error("Unauthorized: buyer or admin role required");
    }

    const now = Date.now();
    return await ctx.db.insert("buyers", {
      userId: caller._id,
      businessName: args.businessName,
      contactPerson: args.contactPerson,
      phone: args.phone,
      email: args.email,
      whatsapp: args.whatsapp,
      county: args.county,
      subCounty: args.subCounty,
      address: args.address,
      productTypes: args.productTypes,
      description: args.description,
      priceRange: args.priceRange,
      logoUrl: undefined,
      isVerified: false,
      isActive: true,
      rating: undefined,
      reviewCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Buyer: update own listing
export const updateListing = mutation({
  args: {
    id: v.id("buyers"),
    businessName: v.optional(v.string()),
    contactPerson: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    county: v.optional(v.string()),
    subCounty: v.optional(v.string()),
    address: v.optional(v.string()),
    productTypes: v.optional(v.array(v.string())),
    description: v.optional(v.object({ en: v.string(), sw: v.string() })),
    priceRange: v.optional(v.object({ en: v.string(), sw: v.string() })),
  },
  handler: async (ctx, { id, ...updates }) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller) throw new Error("Not authenticated");

    const listing = await ctx.db.get(id);
    if (!listing) throw new Error("Listing not found");

    // Only the listing owner or an admin can update
    if (caller.role !== "admin" && listing.userId !== caller._id) {
      throw new Error("Unauthorized: can only update your own listing");
    }

    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(id, patch);
    return { success: true };
  },
});

// Admin: list all buyers (including inactive)
export const adminListAll = query({
  args: {},
  handler: async (ctx) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || caller.role !== "admin") return null;
    return await ctx.db.query("buyers").order("desc").collect();
  },
});

// Admin: set verification status
export const adminSetVerified = mutation({
  args: { id: v.id("buyers"), isVerified: v.boolean() },
  handler: async (ctx, { id, isVerified }) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || caller.role !== "admin") throw new Error("Unauthorized");
    await ctx.db.patch(id, { isVerified, updatedAt: Date.now() });
    return { success: true };
  },
});

// Admin: toggle active status
export const adminSetActive = mutation({
  args: { id: v.id("buyers"), isActive: v.boolean() },
  handler: async (ctx, { id, isActive }) => {
    const caller = await getCallerWithRole(ctx);
    if (!caller || caller.role !== "admin") throw new Error("Unauthorized");
    await ctx.db.patch(id, { isActive, updatedAt: Date.now() });
    return { success: true };
  },
});

// Get buyer stats
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const allBuyers = await ctx.db
      .query("buyers")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const verifiedCount = allBuyers.filter((b) => b.isVerified).length;

    // Count by product type
    const productCounts: Record<string, number> = {};
    allBuyers.forEach((buyer) => {
      buyer.productTypes.forEach((type) => {
        productCounts[type] = (productCounts[type] || 0) + 1;
      });
    });

    // Count by county
    const countyCounts: Record<string, number> = {};
    allBuyers.forEach((buyer) => {
      countyCounts[buyer.county] = (countyCounts[buyer.county] || 0) + 1;
    });

    return {
      total: allBuyers.length,
      verified: verifiedCount,
      byProductType: productCounts,
      byCounty: countyCounts,
    };
  },
});
