"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SuccessStoryCard } from "@/components/success-stories";
import { Badge } from "@/components/ui";
import { Skeleton } from "@/components/ui";
import { Trophy as Award, MapPin, Leaf } from "@phosphor-icons/react";

const methods = ["all", "composting", "biogas", "mulching", "animal_feed", "vermicompost"] as const;

export function SuccessStoriesClient() {
  const t = useTranslations();
  const [selectedMethod, setSelectedMethod] = useState<string>("all");

  const stories = useQuery(api.successStories.getApproved);
  const isLoading = stories === undefined;

  const filteredStories = stories
    ? selectedMethod === "all"
      ? stories
      : stories.filter((s) => s.method === selectedMethod)
    : [];

  // Stats
  const uniqueMethods = stories
    ? new Set(stories.map((s) => s.method)).size
    : 0;
  const uniqueCounties = stories
    ? new Set(stories.map((s) => s.county)).size
    : 0;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Award weight="duotone" className="h-7 w-7 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("stories.title")}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t("stories.subtitle")}
          </p>
        </div>

        {/* Stats */}
        {stories && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <Award weight="duotone" className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stories.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("stories.totalStories")}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <Leaf weight="duotone" className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {uniqueMethods}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("stories.methodsUsed")}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <MapPin weight="duotone" className="h-5 w-5 text-purple-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {uniqueCounties}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("stories.counties")}
              </div>
            </div>
          </div>
        )}

        {/* Method Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {methods.map((method) => (
            <button
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedMethod === method
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {method === "all" ? t("stories.allMethods") : t(`stories.methods.${method}`)}
            </button>
          ))}
        </div>

        {/* Results count */}
        {stories && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t("stories.showingResults", { count: filteredStories.length })}
          </p>
        )}

        {/* Stories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-3" />
                <Skeleton className="h-24 w-full mb-3" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("stories.noStories")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("stories.noStoriesDescription")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStories.map((story) => (
              <SuccessStoryCard key={story._id} story={story} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t("stories.ctaTitle")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t("stories.ctaDescription")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t("stories.ctaContact")}
          </p>
        </div>
      </div>
    </main>
  );
}
