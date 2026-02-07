"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";
import { Clock, BookOpen, Eye } from "lucide-react";

interface TutorialCardProps {
  slug: string;
  title: { en: string; sw: string };
  description: { en: string; sw: string };
  category: string;
  difficulty: string;
  duration: string;
  stepsCount: number;
  viewCount: number;
  thumbnailUrl?: string;
}

const categoryColors = {
  composting: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  biogas: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  mulching: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  animal_feed: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  vermicompost: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const categoryIcons = {
  composting: "🌱",
  biogas: "🔥",
  mulching: "🍂",
  animal_feed: "🐄",
  vermicompost: "🪱",
};

export function TutorialCard({
  slug,
  title,
  description,
  category,
  difficulty,
  duration,
  stepsCount,
  viewCount,
  thumbnailUrl,
}: TutorialCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const localizedTitle = locale === "sw" ? title.sw : title.en;
  const localizedDescription = locale === "sw" ? description.sw : description.en;

  const difficultyColors = {
    beginner: "success",
    intermediate: "warning",
    advanced: "danger",
  } as const;

  return (
    <Link
      href={`/tutorials/${category}/${slug}`}
      className="group block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-all hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
    >
      {/* Thumbnail */}
      <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={localizedTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">
              {categoryIcons[category as keyof typeof categoryIcons] || "📚"}
            </span>
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              categoryColors[category as keyof typeof categoryColors]
            )}
          >
            {categoryIcons[category as keyof typeof categoryIcons]}
            {t(`tutorials.${category}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {localizedTitle}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {localizedDescription}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={difficultyColors[difficulty as keyof typeof difficultyColors]}
            size="sm"
          >
            {t(`recommendations.${difficulty}`)}
          </Badge>

          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3 w-3" />
            {duration}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <BookOpen className="h-3 w-3" />
            {stepsCount} {t("tutorials.steps")}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 ml-auto">
            <Eye className="h-3 w-3" />
            {viewCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
