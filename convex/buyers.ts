import { query } from "./_generated/server";
import { v } from "convex/values";

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
