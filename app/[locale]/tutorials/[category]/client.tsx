"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TutorialGrid } from "@/components/tutorials";
import { Link } from "@/lib/i18n/navigation";
import { CaretLeft as ChevronLeft } from "@phosphor-icons/react";

interface CategoryPageClientProps {
  category: string;
}

const categoryIcons: Record<string, string> = {
  composting: "🌱",
  biogas: "🔥",
  mulching: "🍂",
  animal_feed: "🐄",
  vermicompost: "🪱",
};

export function CategoryPageClient({ category }: CategoryPageClientProps) {
  const t = useTranslations();

  const tutorials = useQuery(api.tutorials.getByCategory, { category });

  const isLoading = tutorials === undefined;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ChevronLeft weight="duotone" className="h-4 w-4" />
          {t("common.back")}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{categoryIcons[category] || "📚"}</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t(`tutorials.${category === "animal_feed" ? "animalFeed" : category}`)}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {tutorials?.length || 0} tutorials available
          </p>
        </div>

        {/* Tutorial Grid */}
        <TutorialGrid tutorials={tutorials || []} isLoading={isLoading} />
      </div>
    </main>
  );
}
