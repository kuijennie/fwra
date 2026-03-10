"use client";

import { useTranslations } from "next-intl";
import {
  SquaresFour,
  Plant,
  Fire,
  Leaf,
  Barn,
  ArrowsCounterClockwise,
  type Icon,
} from "@phosphor-icons/react";

const categories: { id: string; labelKey: string; Icon: Icon }[] = [
  { id: "all",          labelKey: "tutorials.all",                Icon: SquaresFour },
  { id: "composting",   labelKey: "tutorials.composting",         Icon: Plant },
  { id: "biogas",       labelKey: "tutorials.biogas",             Icon: Fire },
  { id: "mulching",     labelKey: "tutorials.mulching",           Icon: Leaf },
  { id: "animal_feed",  labelKey: "tutorials.animalFeed",         Icon: Barn },
  { id: "vermicompost", labelKey: "recommendations.vermicompost", Icon: ArrowsCounterClockwise },
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
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
          style={
            selectedCategory === category.id
              ? { background: "var(--brand)", color: "white" }
              : { background: "var(--brand-50)", color: "var(--foreground-muted)" }
          }
        >
          <category.Icon weight="duotone" className="h-4 w-4" />
          <span>{t(category.labelKey)}</span>
        </button>
      ))}
    </div>
  );
}
