"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  SquaresFourIcon,
  PlantIcon,
  FireIcon,
  LeafIcon,
  BarnIcon,
  ArrowsCounterClockwiseIcon,
  type Icon,
} from "@phosphor-icons/react";

const categories: { id: string; labelKey: string; Icon: Icon }[] = [
  { id: "all",          labelKey: "tutorials.all",                Icon: SquaresFourIcon },
  { id: "composting",   labelKey: "tutorials.composting",         Icon: PlantIcon },
  { id: "biogas",       labelKey: "tutorials.biogas",             Icon: FireIcon },
  { id: "mulching",     labelKey: "tutorials.mulching",           Icon: LeafIcon },
  { id: "animal_feed",  labelKey: "tutorials.animalFeed",         Icon: BarnIcon },
  { id: "vermicompost", labelKey: "recommendations.vermicompost", Icon: ArrowsCounterClockwiseIcon },
];

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const t = useTranslations();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              isSelected
                ? "bg-green-700 text-white dark:bg-green-600 dark:text-white"
                : "bg-green-50 text-gray-600 dark:bg-green-900/20 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/40"
            )}
          >
            <category.Icon weight="duotone" className="h-4 w-4" />
            <span>{t(category.labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
}
