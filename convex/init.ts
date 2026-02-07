import { internalMutation } from "./_generated/server";
import { tutorialSeedData } from "./seedData/tutorials";
import { buyerSeedData } from "./seedData/buyers";
import { legalDocumentsSeedData } from "./seedData/legalDocuments";
import { successStoriesSeedData } from "./seedData/successStories";

// This runs automatically on first Convex deployment
// To re-run seeding, use: npx convex run init:seed
export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded by looking for existing tutorials
    const existingTutorials = await ctx.db.query("tutorials").first();
    if (existingTutorials) {
      console.log("Database already seeded, skipping...");
      return { seeded: false, message: "Already seeded" };
    }

    const now = Date.now();

    // Seed tutorials
    for (const tutorial of tutorialSeedData) {
      await ctx.db.insert("tutorials", {
        ...tutorial,
        createdAt: now,
        updatedAt: now,
      });
    }
    console.log(`Seeded ${tutorialSeedData.length} tutorials`);

    // Seed buyers
    for (const buyer of buyerSeedData) {
      await ctx.db.insert("buyers", {
        businessName: buyer.businessName,
        contactPerson: buyer.contactPerson,
        phone: buyer.phone,
        email: buyer.email,
        whatsapp: buyer.whatsapp,
        county: buyer.county,
        subCounty: buyer.subCounty,
        address: buyer.address,
        productTypes: buyer.productTypes,
        description: buyer.description,
        priceRange: buyer.priceRange,
        isVerified: buyer.isVerified,
        isActive: true,
        rating: buyer.rating,
        reviewCount: buyer.totalReviews,
        createdAt: now,
        updatedAt: now,
      });
    }
    console.log(`Seeded ${buyerSeedData.length} buyers`);

    // Seed legal documents
    for (const doc of legalDocumentsSeedData) {
      await ctx.db.insert("legalDocuments", {
        ...doc,
        lastUpdated: now,
      });
    }
    console.log(`Seeded ${legalDocumentsSeedData.length} legal documents`);

    // Seed success stories
    for (const story of successStoriesSeedData) {
      await ctx.db.insert("successStories", {
        ...story,
        createdAt: now,
      });
    }
    console.log(`Seeded ${successStoriesSeedData.length} success stories`);

    return {
      seeded: true,
      tutorials: tutorialSeedData.length,
      buyers: buyerSeedData.length,
      legalDocuments: legalDocumentsSeedData.length,
      successStories: successStoriesSeedData.length,
    };
  },
});

// Manual seed function (can be called from dashboard or CLI)
export const seedIfEmpty = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existingTutorials = await ctx.db.query("tutorials").first();
    const existingBuyers = await ctx.db.query("buyers").first();
    const existingLegalDocs = await ctx.db.query("legalDocuments").first();
    const existingStories = await ctx.db.query("successStories").first();

    const results = { tutorials: 0, buyers: 0, legalDocuments: 0, successStories: 0 };
    const now = Date.now();

    if (!existingTutorials) {
      for (const tutorial of tutorialSeedData) {
        await ctx.db.insert("tutorials", {
          ...tutorial,
          createdAt: now,
          updatedAt: now,
        });
      }
      results.tutorials = tutorialSeedData.length;
    }

    if (!existingBuyers) {
      for (const buyer of buyerSeedData) {
        await ctx.db.insert("buyers", {
          businessName: buyer.businessName,
          contactPerson: buyer.contactPerson,
          phone: buyer.phone,
          email: buyer.email,
          whatsapp: buyer.whatsapp,
          county: buyer.county,
          subCounty: buyer.subCounty,
          address: buyer.address,
          productTypes: buyer.productTypes,
          description: buyer.description,
          priceRange: buyer.priceRange,
          isVerified: buyer.isVerified,
          isActive: true,
          rating: buyer.rating,
          reviewCount: buyer.totalReviews,
          createdAt: now,
          updatedAt: now,
        });
      }
      results.buyers = buyerSeedData.length;
    }

    if (!existingLegalDocs) {
      for (const doc of legalDocumentsSeedData) {
        await ctx.db.insert("legalDocuments", {
          ...doc,
          lastUpdated: now,
        });
      }
      results.legalDocuments = legalDocumentsSeedData.length;
    }

    if (!existingStories) {
      for (const story of successStoriesSeedData) {
        await ctx.db.insert("successStories", {
          ...story,
          createdAt: now,
        });
      }
      results.successStories = successStoriesSeedData.length;
    }

    return results;
  },
});

// Reseed a specific table (clears existing data first)
export const reseedTable = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const results = { tutorials: 0, buyers: 0, successStories: 0 };

    // Reseed tutorials
    const existingTutorials = await ctx.db.query("tutorials").collect();
    for (const t of existingTutorials) {
      await ctx.db.delete(t._id);
    }
    for (const tutorial of tutorialSeedData) {
      await ctx.db.insert("tutorials", {
        ...tutorial,
        createdAt: now,
        updatedAt: now,
      });
    }
    results.tutorials = tutorialSeedData.length;
    console.log(`Reseeded ${results.tutorials} tutorials`);

    // Reseed buyers
    const existingBuyers = await ctx.db.query("buyers").collect();
    for (const b of existingBuyers) {
      await ctx.db.delete(b._id);
    }
    for (const buyer of buyerSeedData) {
      await ctx.db.insert("buyers", {
        businessName: buyer.businessName,
        contactPerson: buyer.contactPerson,
        phone: buyer.phone,
        email: buyer.email,
        whatsapp: buyer.whatsapp,
        county: buyer.county,
        subCounty: buyer.subCounty,
        address: buyer.address,
        productTypes: buyer.productTypes,
        description: buyer.description,
        priceRange: buyer.priceRange,
        isVerified: buyer.isVerified,
        isActive: true,
        rating: buyer.rating,
        reviewCount: buyer.totalReviews,
        createdAt: now,
        updatedAt: now,
      });
    }
    results.buyers = buyerSeedData.length;
    console.log(`Reseeded ${results.buyers} buyers`);

    // Seed success stories
    const existingStories = await ctx.db.query("successStories").collect();
    for (const s of existingStories) {
      await ctx.db.delete(s._id);
    }
    for (const story of successStoriesSeedData) {
      await ctx.db.insert("successStories", {
        ...story,
        createdAt: now,
      });
    }
    results.successStories = successStoriesSeedData.length;
    console.log(`Seeded ${results.successStories} success stories`);

    return results;
  },
});
