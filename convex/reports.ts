import { query } from "./_generated/server";
import { v } from "convex/values";

export const getActivityReport = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    // Fetch all waste entries for this session
    const wasteEntries = await ctx.db
      .query("wasteEntries")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    // Fetch all recommendations for this session
    const recommendations = await ctx.db
      .query("recommendations")
      .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
      .collect();

    // Total volume
    const totalVolumeKg = wasteEntries.reduce((sum, e) => sum + e.volumeKg, 0);

    // Waste type breakdown (by wasteType category)
    const wasteTypeMap: Record<string, { count: number; volumeKg: number }> = {};
    for (const entry of wasteEntries) {
      if (!wasteTypeMap[entry.wasteType]) {
        wasteTypeMap[entry.wasteType] = { count: 0, volumeKg: 0 };
      }
      wasteTypeMap[entry.wasteType].count++;
      wasteTypeMap[entry.wasteType].volumeKg += entry.volumeKg;
    }
    const wasteTypeBreakdown = Object.entries(wasteTypeMap)
      .map(([type, data]) => ({ type, ...data }))
      .sort((a, b) => b.count - a.count);

    // Top waste sub-types
    const subTypeMap: Record<string, number> = {};
    for (const entry of wasteEntries) {
      subTypeMap[entry.wasteSubType] = (subTypeMap[entry.wasteSubType] || 0) + 1;
    }
    const topSubTypes = Object.entries(subTypeMap)
      .map(([subType, count]) => ({ subType, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recycling methods breakdown
    const methodMap: Record<string, { recommended: number; adopted: number }> = {};
    for (const rec of recommendations) {
      if (!methodMap[rec.method]) {
        methodMap[rec.method] = { recommended: 0, adopted: 0 };
      }
      methodMap[rec.method].recommended++;
      if (rec.isSelected) {
        methodMap[rec.method].adopted++;
      }
    }
    const methodBreakdown = Object.entries(methodMap)
      .map(([method, data]) => ({ method, ...data }))
      .sort((a, b) => b.recommended - a.recommended);

    // Return raw entry timestamps for client-side monthly grouping
    const entryTimestamps = wasteEntries.map((e) => ({
      createdAt: e.createdAt,
      volumeKg: e.volumeKg,
    }));

    return {
      totalEntries: wasteEntries.length,
      totalVolumeKg: Math.round(totalVolumeKg * 10) / 10,
      totalRecommendations: recommendations.length,
      totalAdopted: recommendations.filter((r) => r.isSelected).length,
      wasteTypeBreakdown,
      topSubTypes,
      methodBreakdown,
      entryTimestamps,
    };
  },
});
