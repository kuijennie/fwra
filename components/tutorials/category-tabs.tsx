"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", labelKey: "tutorials.all", icon: "📚" },
  { id: "composting", labelKey: "tutorials.composting", icon: "🌱" },
  { id: "biogas", labelKey: "tutorials.biogas", icon: "🔥" },
  { id: "mulching", labelKey: "tutorials.mulching", icon: "🍂" },
  { id: "animal_feed", labelKey: "tutorials.animalFeed", icon: "🐄" },
  { id: "vermicompost", labelKey: "recommendations.vermicompost", icon: "🪱" },
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
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            selectedCategory === category.id
              ? "bg-green-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          <span>{category.icon}</span>
          <span>{t(category.labelKey)}</span>
        </button>
      ))}
    </div>
  );
}
