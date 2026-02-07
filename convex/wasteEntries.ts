import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new waste entry
export const create = mutation({
  args: {
    sessionId: v.string(),
    wasteType: v.string(),
    wasteSubType: v.string(),
    volumeKg: v.number(),
    volumeUnit: v.string(),
    county: v.string(),
    subCounty: v.optional(v.string()),
    availableResources: v.array(v.string()),
    currentSeason: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const entryId = await ctx.db.insert("wasteEntries", {
      sessionId: args.sessionId,
      userId: undefined,
      wasteType: args.wasteType,
      wasteSubType: args.wasteSubType,
      volumeKg: args.volumeKg,
      volumeUnit: args.volumeUnit,
      location: {
        county: args.county,
        subCounty: args.subCounty,
      },
      availableResources: args.availableResources,
      currentSeason: args.currentSeason,
      notes: args.notes,
      status: "pending",
      createdAt: Date.now(),
    });

    return entryId;
  },
});

// Get waste entries by session
export const getBySession = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("wasteEntries")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .collect();

    return entries;
  },
});

// Get a single waste entry by ID
export const getById = query({
  args: {
    id: v.id("wasteEntries"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get recent waste entries for a session
export const getRecent = query({
  args: {
    sessionId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 5;

    const entries = await ctx.db
      .query("wasteEntries")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .take(limit);

    return entries;
  },
});

// Update waste entry status
export const updateStatus = mutation({
  args: {
    id: v.id("wasteEntries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});

// Delete a waste entry
export const remove = mutation({
  args: {
    id: v.id("wasteEntries"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
