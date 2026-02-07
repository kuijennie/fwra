import { internalMutation } from "./_generated/server";
import { tutorialSeedData } from "./seedData/tutorials";
import { buyerSeedData } from "./seedData/buyers";
import { legalDocumentsSeedData } from "./seedData/legalDocuments";

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

    return {
      seeded: true,
      tutorials: tutorialSeedData.length,
      buyers: buyerSeedData.length,
      legalDocuments: legalDocumentsSeedData.length,
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

    const results = { tutorials: 0, buyers: 0, legalDocuments: 0 };
    const now = Date.now();

    // Seed tutorials if empty
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

    // Seed buyers if empty
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

    // Seed legal documents if empty
    if (!existingLegalDocs) {
      for (const doc of legalDocumentsSeedData) {
        await ctx.db.insert("legalDocuments", {
          ...doc,
          lastUpdated: now,
        });
      }
      results.legalDocuments = legalDocumentsSeedData.length;
    }

    return results;
  },
});
