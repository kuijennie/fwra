"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Badge } from "@/components/ui";
import {
  Clock, BookOpen, Eye,
  Plant, Fire, Leaf, Barn, ArrowsCounterClockwise, SquaresFour,
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
  composting:   Plant,
  biogas:       Fire,
  mulching:     Leaf,
  animal_feed:  Barn,
  vermicompost: ArrowsCounterClockwise,
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

  const CategoryIcon = categoryIcons[category] ?? SquaresFour;

  return (
    <Link
      href={`/tutorials/${category}/${slug}`}
      className="group block rounded-xl overflow-hidden transition-all hover:shadow-lg"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-32"
        style={{ background: "var(--brand-50)" }}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={localizedTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CategoryIcon weight="duotone" className="h-14 w-14" style={{ color: "var(--brand-300)" }} />
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
            style={{ background: "var(--brand-100)", color: "var(--brand)" }}
          >
            <CategoryIcon weight="duotone" className="h-3 w-3" />
            {t(`tutorials.${category}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-semibold mb-2 line-clamp-2 transition-colors group-hover:opacity-80"
          style={{ color: "var(--foreground)" }}
        >
          {localizedTitle}
        </h3>

        <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--foreground-muted)" }}>
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

          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--foreground-muted)" }}>
            <Clock weight="duotone" className="h-3 w-3" />
            {duration}
          </span>

          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--foreground-muted)" }}>
            <BookOpen weight="duotone" className="h-3 w-3" />
            {stepsCount} {t("tutorials.steps")}
          </span>

          <span className="flex items-center gap-1 text-xs ml-auto" style={{ color: "var(--foreground-muted)" }}>
            <Eye weight="duotone" className="h-3 w-3" />
            {viewCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
