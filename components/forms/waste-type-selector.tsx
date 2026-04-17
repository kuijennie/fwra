"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  GrainsIcon,
  BarnIcon,
  ForkKnifeIcon,
  ArrowsCounterClockwiseIcon,
  PlantIcon,
  LeafIcon,
  DropIcon,
  CoffeeIcon,
  FlowerIcon,
  type Icon,
} from "@phosphor-icons/react";
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

const categoryIconMap: Record<string, Icon> = {
  crop_residue: GrainsIcon,
  manure:       BarnIcon,
  food_scraps:  ForkKnifeIcon,
  other:        ArrowsCounterClockwiseIcon,
};

const subTypeIconMap: Record<string, Icon> = {
  maize_stalks:        GrainsIcon,
  wheat_straw:         GrainsIcon,
  rice_husks:          GrainsIcon,
  sugarcane_bagasse:   PlantIcon,
  bean_residue:        FlowerIcon,
  vegetable_trimmings: LeafIcon,
  fruit_peels:         DropIcon,
  coffee_pulp:         CoffeeIcon,
  tea_waste:           CoffeeIcon,
  cow_dung:            BarnIcon,
  goat_droppings:      BarnIcon,
  chicken_manure:      BarnIcon,
  pig_manure:          BarnIcon,
  vegetable_peels:     LeafIcon,
  food_leftovers:      ForkKnifeIcon,
  spoiled_produce:     PlantIcon,
};

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
        <label className="block text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">
          {t("wasteInput.wasteType")}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {wasteCategories.map((category) => {
            const CatIcon = categoryIconMap[category.id] ?? GrainsIcon;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                  isSelected
                    ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                )}
              >
                <CatIcon
                  weight="duotone"
                  className={cn(
                    "h-7 w-7",
                    isSelected
                      ? "text-green-600 dark:text-green-400"
                      : "text-green-600 dark:text-green-500"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium text-center",
                    isSelected
                      ? "text-green-700 dark:text-green-300"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {t(category.labelKey)}
                </span>
                <span className="text-xs text-center line-clamp-2 text-gray-500 dark:text-gray-400">
                  {t(category.descKey)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-type Selection */}
      {selectedCategory && subTypes.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-500 dark:text-gray-400">
            {t("wasteInput.wasteSubType")}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {subTypes.map((subType) => {
              const SubIcon = subTypeIconMap[subType.id] ?? GrainsIcon;
              const isSelected = selectedSubType === subType.id;
              return (
                <button
                  key={subType.id}
                  type="button"
                  onClick={() => onSubTypeChange(subType.id)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border transition-all text-left",
                    isSelected
                      ? "border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <SubIcon
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
                    {t(subType.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
