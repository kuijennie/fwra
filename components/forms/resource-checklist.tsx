"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { availableResources } from "@/lib/constants";

interface ResourceChecklistProps {
  selectedResources: string[];
  onResourceToggle: (resourceId: string) => void;
}

export function ResourceChecklist({
  selectedResources,
  onResourceToggle,
}: ResourceChecklistProps) {
  const t = useTranslations();

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("wasteInput.resources")}
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t("wasteInput.resourcesDesc")}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {availableResources.map((resource) => {
          const isSelected = selectedResources.includes(resource.id);

          return (
            <button
              key={resource.id}
              type="button"
              onClick={() => onResourceToggle(resource.id)}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border transition-all text-left",
                isSelected
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              <span className="text-xl">{resource.icon}</span>
              <span
                className={cn(
                  "text-sm font-medium",
                  isSelected
                    ? "text-green-700 dark:text-green-300"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {t(resource.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
