import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";

// Recycling method definitions (duplicated for Convex runtime)
const recyclingMethods = [
  {
    id: "composting",
    difficulty: "beginner",
    estimatedDuration: "4-8 weeks",
    requiredResources: ["space", "water"],
    suitableWasteTypes: [
      "maize_stalks", "wheat_straw", "rice_husks", "sugarcane_bagasse",
      "bean_residue", "vegetable_trimmings", "fruit_peels", "coffee_pulp",
      "tea_waste", "cow_dung", "goat_droppings", "chicken_manure",
      "vegetable_peels", "food_leftovers", "spoiled_produce",
    ],
    climateScores: { arid: 5, semi_arid: 7, sub_humid: 9, humid: 10 },
    minimumVolumeKg: 20,
    waterRequirement: "medium",
    laborRequirement: "medium",
  },
  {
    id: "biogas",
    difficulty: "intermediate",
    estimatedDuration: "2-4 weeks setup",
    requiredResources: ["water", "containers", "shade"],
    suitableWasteTypes: [
      "cow_dung", "pig_manure", "chicken_manure", "food_leftovers",
      "vegetable_peels", "fruit_peels", "sugarcane_bagasse",
      "vegetable_trimmings", "maize_stalks",
    ],
    climateScores: { arid: 6, semi_arid: 7, sub_humid: 9, humid: 8 },
    minimumVolumeKg: 50,
    waterRequirement: "high",
    laborRequirement: "low",
  },
  {
    id: "mulching",
    difficulty: "beginner",
    estimatedDuration: "Immediate use",
    requiredResources: ["space"],
    suitableWasteTypes: [
      "maize_stalks", "wheat_straw", "rice_husks", "sugarcane_bagasse",
      "bean_residue", "tea_waste",
    ],
    climateScores: { arid: 10, semi_arid: 9, sub_humid: 7, humid: 5 },
    minimumVolumeKg: 10,
    waterRequirement: "low",
    laborRequirement: "low",
  },
  {
    id: "animal_feed",
    difficulty: "beginner",
    estimatedDuration: "Immediate to 2 weeks",
    requiredResources: ["containers"],
    suitableWasteTypes: [
      "maize_stalks", "wheat_straw", "bean_residue",
      "vegetable_trimmings", "spoiled_produce",
    ],
    climateScores: { arid: 8, semi_arid: 8, sub_humid: 8, humid: 8 },
    minimumVolumeKg: 5,
    waterRequirement: "low",
    laborRequirement: "low",
  },
  {
    id: "vermicompost",
    difficulty: "intermediate",
    estimatedDuration: "2-3 months",
    requiredResources: ["shade", "containers", "water"],
    suitableWasteTypes: [
      "vegetable_peels", "fruit_peels", "coffee_pulp",
      "food_leftovers", "cow_dung", "goat_droppings",
    ],
    climateScores: { arid: 4, semi_arid: 6, sub_humid: 9, humid: 8 },
    minimumVolumeKg: 5,
    waterRequirement: "medium",
    laborRequirement: "medium",
  },
];

// County climate zones (subset for runtime)
const countyClimateZones: Record<string, string> = {
  nairobi: "sub_humid", kiambu: "sub_humid", nakuru: "sub_humid",
  mombasa: "humid", kisumu: "sub_humid", machakos: "semi_arid",
  kajiado: "semi_arid", nyeri: "sub_humid", meru: "sub_humid",
  kakamega: "humid", bungoma: "humid", uasin_gishu: "humid",
  garissa: "arid", wajir: "arid", mandera: "arid", turkana: "arid",
  marsabit: "arid", isiolo: "arid", kitui: "semi_arid", makueni: "semi_arid",
};

// Reasoning templates
const reasoningTemplates = {
  composting: {
    en: "Composting is ideal for your waste type and volume. It will produce nutrient-rich soil amendment in 4-8 weeks.",
    sw: "Kutengeneza mboji ni njia bora kwa aina na kiasi cha taka yako. Itazalisha marekebisho ya udongo yenye virutubisho katika wiki 4-8.",
  },
  biogas: {
    en: "Biogas production suits your waste well, especially with the water access you have. You'll get clean cooking fuel and liquid fertilizer.",
    sw: "Uzalishaji wa biogesi unafaa vizuri kwa taka yako, hasa na upatikanaji wa maji ulio nao. Utapata mafuta safi ya kupikia na mbolea ya kioevu.",
  },
  mulching: {
    en: "Mulching is the quickest option - you can use the waste immediately to conserve soil moisture and suppress weeds.",
    sw: "Kufunika udongo ni chaguo la haraka zaidi - unaweza kutumia taka mara moja kuhifadhi unyevu wa udongo na kuzuia magugu.",
  },
  animal_feed: {
    en: "Your waste can be converted to animal feed, reducing feed costs while providing nutrition for livestock.",
    sw: "Taka yako inaweza kubadilishwa kuwa chakula cha wanyama, kupunguza gharama za lishe huku ikitoa lishe kwa mifugo.",
  },
  vermicompost: {
    en: "Vermicomposting produces high-quality fertilizer faster than traditional composting, perfect for your waste type.",
    sw: "Kutengeneza mboji kwa minyoo huzalisha mbolea ya ubora wa juu haraka kuliko kutengeneza mboji kwa njia ya kawaida, inafaa kwa aina yako ya taka.",
  },
};

// Calculate recommendation score for a method
function calculateScore(
  method: typeof recyclingMethods[0],
  wasteSubType: string,
  volumeKg: number,
  county: string,
  resources: string[],
  season: string
): number {
  let score = 0;

  // Waste type compatibility (0-30 points)
  if (method.suitableWasteTypes.includes(wasteSubType)) {
    score += 30;
  } else {
    return 0; // Not suitable at all
  }

  // Volume appropriateness (0-20 points)
  if (volumeKg >= method.minimumVolumeKg) {
    score += 20;
  } else if (volumeKg >= method.minimumVolumeKg * 0.5) {
    score += 10;
  }

  // Resource availability (0-25 points)
  const requiredResources = method.requiredResources;
  const matchedResources = requiredResources.filter((r) => resources.includes(r));
  score += Math.round((matchedResources.length / requiredResources.length) * 25);

  // Climate suitability (0-15 points)
  const climateZone = countyClimateZones[county] || "sub_humid";
  const climateScore = method.climateScores[climateZone as keyof typeof method.climateScores] || 5;
  score += Math.round((climateScore / 10) * 15);

  // Season adjustment (0-10 points)
  if (method.id === "mulching" && season === "dry") {
    score += 10; // Mulching is excellent in dry season
  } else if (method.id === "biogas" && season === "wet") {
    score += 8; // More water available for biogas
  } else if (method.id === "composting") {
    score += 7; // Composting works year-round
  } else {
    score += 5;
  }

  return Math.min(score, 100);
}

// Generate recommendations for a waste entry
export const generate = mutation({
  args: {
    wasteEntryId: v.id("wasteEntries"),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the waste entry
    const wasteEntry = await ctx.db.get(args.wasteEntryId);
    if (!wasteEntry) {
      throw new Error("Waste entry not found");
    }

    // Calculate scores for each method
    const scores = recyclingMethods.map((method) => ({
      method,
      score: calculateScore(
        method,
        wasteEntry.wasteSubType,
        wasteEntry.volumeKg,
        wasteEntry.location.county,
        wasteEntry.availableResources,
        wasteEntry.currentSeason
      ),
    }));

    // Filter out unsuitable methods and sort by score
    const suitableMethods = scores
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Top 3 recommendations

    // Create recommendation records
    const recommendationIds = [];
    for (const { method, score } of suitableMethods) {
      const reasoning = reasoningTemplates[method.id as keyof typeof reasoningTemplates];

      const recId = await ctx.db.insert("recommendations", {
        wasteEntryId: args.wasteEntryId,
        sessionId: args.sessionId,
        userId: undefined,
        method: method.id,
        matchScore: score,
        reasoning: reasoning,
        estimatedDuration: method.estimatedDuration,
        estimatedYield: undefined,
        requiredResources: method.requiredResources,
        difficulty: method.difficulty,
        benefits: [],
        relatedTutorialIds: [],
        isSelected: false,
        createdAt: Date.now(),
      });

      recommendationIds.push(recId);
    }

    // Update waste entry status
    await ctx.db.patch(args.wasteEntryId, {
      status: "processing",
    });

    return recommendationIds;
  },
});

// Get recommendations by waste entry
export const getByWasteEntry = query({
  args: {
    wasteEntryId: v.id("wasteEntries"),
  },
  handler: async (ctx, args) => {
    const recommendations = await ctx.db
      .query("recommendations")
      .withIndex("by_waste_entry", (q) => q.eq("wasteEntryId", args.wasteEntryId))
      .order("desc")
      .collect();

    return recommendations;
  },
});

// Get recommendations by session
export const getBySession = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const recommendations = await ctx.db
      .query("recommendations")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .collect();

    return recommendations;
  },
});

// Get recent recommendations for a session
export const getRecent = query({
  args: {
    sessionId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    const recommendations = await ctx.db
      .query("recommendations")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .take(limit);

    return recommendations;
  },
});

// Select a recommendation
export const select = mutation({
  args: {
    id: v.id("recommendations"),
  },
  handler: async (ctx, args) => {
    const recommendation = await ctx.db.get(args.id);
    if (!recommendation) {
      throw new Error("Recommendation not found");
    }

    // Deselect other recommendations for the same waste entry
    const otherRecs = await ctx.db
      .query("recommendations")
      .withIndex("by_waste_entry", (q) =>
        q.eq("wasteEntryId", recommendation.wasteEntryId)
      )
      .collect();

    for (const rec of otherRecs) {
      if (rec._id !== args.id && rec.isSelected) {
        await ctx.db.patch(rec._id, { isSelected: false });
      }
    }

    // Select this recommendation
    await ctx.db.patch(args.id, { isSelected: true });

    // Update waste entry status
    await ctx.db.patch(recommendation.wasteEntryId, {
      status: "completed",
    });
  },
});
