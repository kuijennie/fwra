"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BuyerGrid, SearchFilters } from "@/components/marketplace";
import { Badge } from "@/components/ui";
import { Storefront as Store, CheckCircle, Users } from "@phosphor-icons/react";

export function MarketplaceClient() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("all");
  const [selectedProductType, setSelectedProductType] = useState("all");

  // Fetch buyers based on filters
  const buyers = useQuery(api.buyers.search, {
    query: searchQuery,
    county: selectedCounty !== "all" ? selectedCounty : undefined,
    productType: selectedProductType !== "all" ? selectedProductType : undefined,
  });

  // Get stats
  const stats = useQuery(api.buyers.getStats);

  const isLoading = buyers === undefined;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Store weight="duotone" className="h-7 w-7 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("marketplace.title")}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t("marketplace.subtitle")}
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <Users weight="duotone" className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("marketplace.totalBuyers")}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <CheckCircle weight="duotone" className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.verified}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("marketplace.verifiedBuyers")}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <Store weight="duotone" className="h-5 w-5 text-purple-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Object.keys(stats.byCounty).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("marketplace.countiesCovered")}
              </div>
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCounty={selectedCounty}
          onCountyChange={setSelectedCounty}
          selectedProductType={selectedProductType}
          onProductTypeChange={setSelectedProductType}
        />

        {/* Active Filters */}
        {(selectedCounty !== "all" || selectedProductType !== "all") && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("marketplace.activeFilters")}:
            </span>
            {selectedCounty !== "all" && (
              <Badge
                variant="secondary"
                size="sm"
                className="cursor-pointer"
                onClick={() => setSelectedCounty("all")}
              >
                {selectedCounty.replace(/_/g, " ")} ✕
              </Badge>
            )}
            {selectedProductType !== "all" && (
              <Badge
                variant="secondary"
                size="sm"
                className="cursor-pointer"
                onClick={() => setSelectedProductType("all")}
              >
                {selectedProductType.replace(/_/g, " ")} ✕
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        {buyers && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t("marketplace.showingResults", { count: buyers.length })}
          </p>
        )}

        {/* Buyer Grid */}
        <BuyerGrid buyers={buyers || []} isLoading={isLoading} />

        {/* CTA */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t("marketplace.ctaTitle")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t("marketplace.ctaDescription")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("marketplace.ctaContact")}
          </p>
        </div>
      </div>
    </main>
  );
}
