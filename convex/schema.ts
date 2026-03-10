import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table (optional accounts for data sync)
  users: defineTable({
    clerkId: v.optional(v.string()),
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.string(), // 'farmer' | 'buyer' | 'admin'
    county: v.string(),
    subCounty: v.optional(v.string()),
    preferredLanguage: v.string(), // 'en', 'sw', 'ki', 'lu', 'ka'
    farmSize: v.optional(v.number()), // in acres
    createdAt: v.number(),
    lastActive: v.number(),
  })
    .index("by_county", ["county"])
    .index("by_language", ["preferredLanguage"])
    .index("by_clerk_id", ["clerkId"])
    .index("by_role", ["role"]),

  // Waste entries logged by farmers
  wasteEntries: defineTable({
    sessionId: v.string(), // For anonymous users
    userId: v.optional(v.id("users")), // Optional linked user
    wasteType: v.string(), // 'crop_residue', 'manure', 'food_scraps', 'other'
    wasteSubType: v.string(), // e.g., 'maize_stalks', 'cow_dung', 'vegetable_peels'
    volumeKg: v.number(),
    volumeUnit: v.string(), // 'kg', 'bags', 'wheelbarrows'
    location: v.object({
      county: v.string(),
      subCounty: v.optional(v.string()),
      coordinates: v.optional(
        v.object({
          lat: v.number(),
          lng: v.number(),
        })
      ),
    }),
    availableResources: v.array(v.string()), // ['water', 'labor', 'containers', 'shade']
    currentSeason: v.string(), // 'dry', 'wet', 'transition'
    notes: v.optional(v.string()),
    imageUrls: v.optional(v.array(v.string())),
    status: v.string(), // 'pending', 'processing', 'completed'
    createdAt: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_user", ["userId"])
    .index("by_waste_type", ["wasteType"])
    .index("by_status", ["status"])
    .index("by_county", ["location.county"]),

  // Recommendations generated for waste entries
  recommendations: defineTable({
    wasteEntryId: v.id("wasteEntries"),
    sessionId: v.string(),
    userId: v.optional(v.id("users")),
    method: v.string(), // 'composting', 'biogas', 'mulching', 'animal_feed', 'vermicompost'
    matchScore: v.number(), // 0-100 relevance score
    reasoning: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    estimatedDuration: v.string(), // e.g., '4-6 weeks'
    estimatedYield: v.optional(v.string()), // e.g., '50kg compost'
    requiredResources: v.array(v.string()),
    difficulty: v.string(), // 'beginner', 'intermediate', 'advanced'
    benefits: v.array(
      v.object({
        en: v.string(),
        sw: v.string(),
      })
    ),
    relatedTutorialIds: v.array(v.id("tutorials")),
    isSelected: v.boolean(), // User chose this recommendation
    createdAt: v.number(),
  })
    .index("by_waste_entry", ["wasteEntryId"])
    .index("by_session", ["sessionId"])
    .index("by_user", ["userId"])
    .index("by_method", ["method"])
    .index("by_selected", ["isSelected"]),

  // Tutorial library
  tutorials: defineTable({
    slug: v.string(),
    category: v.string(), // 'composting', 'biogas', 'mulching', 'animal_feed'
    title: v.object({
      en: v.string(),
      sw: v.string(),
      ki: v.optional(v.string()),
      lu: v.optional(v.string()),
      ka: v.optional(v.string()),
    }),
    description: v.object({
      en: v.string(),
      sw: v.string(),
      ki: v.optional(v.string()),
      lu: v.optional(v.string()),
      ka: v.optional(v.string()),
    }),
    difficulty: v.string(), // 'beginner', 'intermediate', 'advanced'
    duration: v.string(), // estimated time to complete
    steps: v.array(
      v.object({
        stepNumber: v.number(),
        title: v.object({
          en: v.string(),
          sw: v.string(),
        }),
        content: v.object({
          en: v.string(),
          sw: v.string(),
        }),
        imageUrl: v.optional(v.string()),
        tipText: v.optional(
          v.object({
            en: v.string(),
            sw: v.string(),
          })
        ),
      })
    ),
    videoUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    applicableWasteTypes: v.array(v.string()),
    requiredResources: v.array(v.string()),
    viewCount: v.number(),
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_slug", ["slug"])
    .index("by_difficulty", ["difficulty"])
    .index("by_published", ["isPublished"]),

  // Success stories / testimonials
  successStories: defineTable({
    tutorialId: v.optional(v.id("tutorials")),
    farmerName: v.string(),
    county: v.string(),
    method: v.string(),
    story: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    results: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    imageUrls: v.optional(v.array(v.string())),
    isApproved: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_method", ["method"])
    .index("by_county", ["county"])
    .index("by_approved", ["isApproved"]),

  // Marketplace buyers directory
  buyers: defineTable({
    userId: v.optional(v.id("users")),
    businessName: v.string(),
    contactPerson: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
    county: v.string(),
    subCounty: v.optional(v.string()),
    address: v.optional(v.string()),
    coordinates: v.optional(
      v.object({
        lat: v.number(),
        lng: v.number(),
      })
    ),
    productTypes: v.array(v.string()), // ['compost', 'bio_fertilizer', 'biogas_equipment', 'organic_feed', 'animal_feed', 'silage', 'mulch']
    description: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    priceRange: v.optional(
      v.object({
        en: v.string(),
        sw: v.string(),
      })
    ),
    logoUrl: v.optional(v.string()),
    isVerified: v.boolean(),
    isActive: v.boolean(),
    rating: v.optional(v.number()),
    reviewCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_county", ["county"])
    .index("by_verified", ["isVerified"])
    .index("by_active", ["isActive"]),

  // User reminders for tasks
  reminders: defineTable({
    sessionId: v.string(),
    userId: v.optional(v.id("users")),
    wasteEntryId: v.optional(v.id("wasteEntries")),
    recommendationId: v.optional(v.id("recommendations")),
    title: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    description: v.optional(
      v.object({
        en: v.string(),
        sw: v.string(),
      })
    ),
    taskType: v.string(), // 'turn_compost', 'check_biogas', 'harvest', 'water', 'custom'
    dueDate: v.number(), // Unix timestamp
    repeatInterval: v.optional(v.string()), // 'daily', 'weekly', 'custom'
    repeatDays: v.optional(v.number()), // for custom intervals
    isCompleted: v.boolean(),
    completedAt: v.optional(v.number()),
    notificationSent: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_user", ["userId"])
    .index("by_due_date", ["dueDate"])
    .index("by_completed", ["isCompleted"]),

  // Legal documents and guidelines
  legalDocuments: defineTable({
    slug: v.string(),
    title: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    content: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    summary: v.object({
      en: v.string(),
      sw: v.string(),
    }),
    category: v.string(), // 'waste_management_act', 'sorting_guidelines', 'permits'
    keyPoints: v.array(
      v.object({
        en: v.string(),
        sw: v.string(),
      })
    ),
    effectiveDate: v.optional(v.string()),
    lastUpdated: v.number(),
    isPublished: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_published", ["isPublished"]),
});
