"use client";

import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge, Button } from "@/components/ui";
import {
  Leaf,
  Flame,
  Droplets,
  Recycle,
  Bug,
  Clock,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

interface Recommendation {
  _id: Id<"recommendations">;
  method: string;
  matchScore: number;
  reasoning: { en: string; sw: string };
  estimatedDuration: string;
  difficulty: string;
  requiredResources: string[];
  isSelected: boolean;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSelect?: (id: Id<"recommendations">) => void;
  onViewDetails?: (id: Id<"recommendations">) => void;
}

const methodIcons = {
  composting: Leaf,
  biogas: Flame,
  mulching: Droplets,
  animal_feed: Recycle,
  vermicompost: Bug,
};

const methodColors = {
  composting: "green",
  biogas: "orange",
  mulching: "amber",
  animal_feed: "purple",
  vermicompost: "red",
} as const;

export function RecommendationCard({
  recommendation,
  onSelect,
  onViewDetails,
}: RecommendationCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const Icon = methodIcons[recommendation.method as keyof typeof methodIcons] || Leaf;
  const color = methodColors[recommendation.method as keyof typeof methodColors] || "green";

  const colorClasses = {
    green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };

  const reasoning =
    locale === "sw" ? recommendation.reasoning.sw : recommendation.reasoning.en;

  const difficultyColors = {
    beginner: "success",
    intermediate: "warning",
    advanced: "danger",
  } as const;

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-white dark:bg-gray-800 p-5 transition-all",
        recommendation.isSelected
          ? "border-green-500 ring-2 ring-green-500/20"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
      )}
    >
      {/* Selected Badge */}
      {recommendation.isSelected && (
        <div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1">
          <CheckCircle className="h-4 w-4 text-white" />
        </div>
      )}

      <div className="flex gap-4">
        {/* Icon */}
        <div className={cn("rounded-xl p-3 h-fit", colorClasses[color])}>
          <Icon className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t(`recommendations.${recommendation.method}`)}
            </h3>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
              <span>{recommendation.matchScore}%</span>
              <span className="text-gray-400 dark:text-gray-500">
                {t("recommendations.matchScore")}
              </span>
            </div>
          </div>

          {/* Reasoning */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {reasoning}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant={difficultyColors[recommendation.difficulty as keyof typeof difficultyColors]}
              size="sm"
            >
              {t(`recommendations.${recommendation.difficulty}`)}
            </Badge>
            <Badge variant="default" size="sm">
              <Clock className="h-3 w-3 mr-1" />
              {recommendation.estimatedDuration}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {!recommendation.isSelected && onSelect && (
              <Button
                size="sm"
                onClick={() => onSelect(recommendation._id)}
              >
                {t("recommendations.selectMethod")}
              </Button>
            )}
            {onViewDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(recommendation._id)}
              >
                {t("common.learnMore")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
