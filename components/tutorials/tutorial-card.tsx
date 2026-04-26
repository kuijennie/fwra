"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Badge } from "@/components/ui";
import { 
  ClockIcon, 
  BookOpenIcon, 
  EyeIcon, 
  PlantIcon, 
  FireIcon, 
  LeafIcon, 
  BarnIcon, 
  ArrowsCounterClockwiseIcon, 
  SquaresFourIcon, 
  type Icon, 
 } from "@phosphor-icons/react";

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

const categoryIcons: Record<string, Icon> = {
  composting:   PlantIcon,
  biogas:       FireIcon,
  mulching:     LeafIcon,
  animal_feed:  BarnIcon,
  vermicompost: ArrowsCounterClockwiseIcon,
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

  const CategoryIcon = categoryIcons[category] ?? SquaresFourIcon;

  return (
    <Link
      href={`/tutorials/${category}/${slug}`}
      className="group block rounded-xl overflow-hidden border transition-all hover:shadow-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      {/* Thumbnail */}
      <div className="relative h-32">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={localizedTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CategoryIcon
              weight="duotone"
              className="h-8 w-8 text-green-400 dark:text-green-500"
            />
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium text-green-700 dark:text-green-300">
            {t(`tutorials.${category}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2 transition-colors text-gray-900 dark:text-white group-hover:opacity-80">
          {localizedTitle}
        </h3>

        <p className="text-sm mb-3 line-clamp-2 text-gray-500 dark:text-gray-400">
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
            <ClockIcon weight="duotone" className="h-3 w-3" />
            {duration}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <BookOpenIcon weight="duotone" className="h-3 w-3" />
            {stepsCount} {t("tutorials.steps")}
          </span>

          {/* <span className="flex items-center gap-1 text-xs ml-auto text-gray-500 dark:text-gray-400">
            <EyeIcon weight="duotone" className="h-3 w-3" />
            {viewCount}
          </span> */}
        </div>
      </div>
    </Link>
  );
}
