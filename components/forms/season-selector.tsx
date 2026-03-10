"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { seasons } from "@/lib/constants";
import { Sun, CloudRain, CloudSun } from "@phosphor-icons/react";

interface SeasonSelectorProps {
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

const seasonIcons = {
  dry: Sun,
  wet: CloudRain,
  transition: CloudSun,
};

export function SeasonSelector({
  selectedSeason,
  onSeasonChange,
}: SeasonSelectorProps) {
  const t = useTranslations();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("wasteInput.season")}
      </label>

      <div className="flex gap-2">
        {seasons.map((season) => {
          const Icon = seasonIcons[season.id as keyof typeof seasonIcons];
          const isSelected = selectedSeason === season.id;

          return (
            <button
              key={season.id}
              type="button"
              onClick={() => onSeasonChange(season.id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                isSelected
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              <Icon
                weight="duotone"
                className={cn(
                  "h-6 w-6",
                  isSelected
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  isSelected
                    ? "text-green-700 dark:text-green-300"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {t(season.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
