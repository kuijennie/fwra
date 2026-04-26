"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { 
  DropIcon, 
  HardHatIcon, 
  CubeIcon, 
  HouseIcon, 
  RulerIcon, 
  type Icon, 
 } from "@phosphor-icons/react";
import { availableResources } from "@/lib/constants";

const resourceIconMap: Record<string, Icon> = {
  water:      DropIcon,
  labor:      HardHatIcon,
  containers: CubeIcon,
  shade:      HouseIcon,
  space:      RulerIcon,
};

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
        <label className="block text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
          {t("wasteInput.resources")}
        </label>
        <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
          {t("wasteInput.resourcesDesc")}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {availableResources.map((resource) => {
          const isSelected = selectedResources.includes(resource.id);
          const ResIcon = resourceIconMap[resource.id] ?? DropIcon;

          return (
            <button
              key={resource.id}
              type="button"
              onClick={() => onResourceToggle(resource.id)}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border transition-all text-left",
                isSelected
                  ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              <ResIcon
                weight="duotone"
                className={cn(
                  "h-5 w-5 shrink-0",
                  isSelected
                    ? "text-green-600 dark:text-green-400"
                    : "text-green-600 dark:text-green-500"
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
                {t(resource.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
