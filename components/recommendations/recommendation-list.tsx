"use client";

import { useTranslations } from "next-intl";
import { RecommendationCard } from "./recommendation-card";
import { Lightbulb } from "@phosphor-icons/react";
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

interface RecommendationListProps {
  recommendations: Recommendation[];
  onSelect?: (id: Id<"recommendations">) => void;
  onViewDetails?: (id: Id<"recommendations">) => void;
  isLoading?: boolean;
}

export function RecommendationList({
  recommendations,
  onSelect,
  onViewDetails,
  isLoading = false,
}: RecommendationListProps) {
  const t = useTranslations();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 animate-pulse"
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <Lightbulb weight="duotone" className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
          {t("recommendations.noRecommendations")}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Log your waste to get personalized recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, index) => (
        <div key={recommendation._id} className="relative">
          {/* Rank indicator */}
          {index < 3 && (
            <div className="absolute -left-3 top-5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
              {index + 1}
            </div>
          )}
          <RecommendationCard
            recommendation={recommendation}
            onSelect={onSelect}
            onViewDetails={onViewDetails}
          />
        </div>
      ))}
    </div>
  );
}
