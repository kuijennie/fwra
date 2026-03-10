"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TutorialGrid, CategoryTabs } from "@/components/tutorials";
import { Input } from "@/components/ui";
import { MagnifyingGlass as Search } from "@phosphor-icons/react";

export function TutorialsPageClient() {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all tutorials or by category
  const allTutorials = useQuery(api.tutorials.getAll);
  const categoryTutorials = useQuery(
    api.tutorials.getByCategory,
    selectedCategory !== "all" ? { category: selectedCategory } : "skip"
  );
  const searchResults = useQuery(
    api.tutorials.search,
    searchQuery.length > 2 ? { query: searchQuery } : "skip"
  );

  // Determine which tutorials to display
  const tutorials = searchQuery.length > 2
    ? searchResults
    : selectedCategory === "all"
      ? allTutorials
      : categoryTutorials;

  const isLoading = tutorials === undefined;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("tutorials.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("tutorials.subtitle")}
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search weight="duotone" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("common.search")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <CategoryTabs
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Tutorial Grid */}
        <TutorialGrid tutorials={tutorials || []} isLoading={isLoading} />
      </div>
    </main>
  );
}
