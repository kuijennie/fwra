"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  wasteCategories,
  getWasteSubTypesByCategory,
  type WasteCategory,
} from "@/lib/constants";

interface WasteTypeSelectorProps {
  selectedCategory: WasteCategory | null;
  selectedSubType: string | null;
  onCategoryChange: (category: WasteCategory) => void;
  onSubTypeChange: (subType: string) => void;
}

export function WasteTypeSelector({
  selectedCategory,
  selectedSubType,
  onCategoryChange,
  onSubTypeChange,
}: WasteTypeSelectorProps) {
  const t = useTranslations();

  const subTypes = selectedCategory
    ? getWasteSubTypesByCategory(selectedCategory)
    : [];

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {t("wasteInput.wasteType")}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {wasteCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                selectedCategory === category.id
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {t(category.labelKey)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center line-clamp-2">
                {t(category.descKey)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub-type Selection */}
      {selectedCategory && subTypes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t("wasteInput.wasteSubType")}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {subTypes.map((subType) => (
              <button
                key={subType.id}
                type="button"
                onClick={() => onSubTypeChange(subType.id)}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg border transition-all text-left",
                  selectedSubType === subType.id
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                )}
              >
                <span className="text-xl">{subType.icon}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {t(subType.labelKey)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
