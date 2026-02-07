"use client";

import { useLocale } from "next-intl";
import { Card, Badge } from "@/components/ui";
import { MapPin, Quote } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";

interface SuccessStoryCardProps {
  story: Doc<"successStories">;
}

const methodColors: Record<string, string> = {
  composting: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  biogas: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  mulching: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  animal_feed: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  vermicompost: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const methodLabels: Record<string, { en: string; sw: string }> = {
  composting: { en: "Composting", sw: "Mboji" },
  biogas: { en: "Biogas", sw: "Biogesi" },
  mulching: { en: "Mulching", sw: "Kufunika Udongo" },
  animal_feed: { en: "Animal Feed", sw: "Chakula cha Mifugo" },
  vermicompost: { en: "Vermicompost", sw: "Mboji ya Minyoo" },
};

export function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  const locale = useLocale();

  const storyText = locale === "sw" ? story.story.sw : story.story.en;
  const resultsText = locale === "sw" ? story.results.sw : story.results.en;
  const methodLabel = methodLabels[story.method]?.[locale as "en" | "sw"] || story.method;

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {story.farmerName}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5" />
            <span className="capitalize">{story.county.replace(/_/g, " ")}</span>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${methodColors[story.method] || "bg-gray-100 text-gray-700"}`}>
          {methodLabel}
        </span>
      </div>

      {/* Story */}
      <div className="mb-3">
        <div className="flex gap-2">
          <Quote className="h-4 w-4 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {storyText}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
        <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">
          {locale === "sw" ? "Matokeo" : "Results"}
        </p>
        <p className="text-sm text-green-800 dark:text-green-300">
          {resultsText}
        </p>
      </div>
    </Card>
  );
}
