"use client";

import { useTranslations } from "next-intl";
import {
  Grains, Barn, ForkKnife, ArrowsCounterClockwise,
  Plant, Leaf, Drop, Coffee, Flower,
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
  crop_residue: Grains,
  manure:       Barn,
  food_scraps:  ForkKnife,
  other:        ArrowsCounterClockwise,
};

const subTypeIconMap: Record<string, Icon> = {
  maize_stalks:        Grains,
  wheat_straw:         Grains,
  rice_husks:          Grains,
  sugarcane_bagasse:   Plant,
  bean_residue:        Flower,
  vegetable_trimmings: Leaf,
  fruit_peels:         Drop,
  coffee_pulp:         Coffee,
  tea_waste:           Coffee,
  cow_dung:            Barn,
  goat_droppings:      Barn,
  chicken_manure:      Barn,
  pig_manure:          Barn,
  vegetable_peels:     Leaf,
  food_leftovers:      ForkKnife,
  spoiled_produce:     Plant,
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
        <label className="block text-sm font-medium mb-3" style={{ color: "var(--foreground-muted)" }}>
          {t("wasteInput.wasteType")}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {wasteCategories.map((category) => {
            const CatIcon = categoryIconMap[category.id] ?? Grains;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor: isSelected ? "var(--brand)" : "var(--border)",
                  background: isSelected ? "var(--brand-50)" : "var(--surface)",
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: isSelected ? "var(--brand-100)" : "var(--brand-50)",
                    color: "var(--brand)",
                  }}
                >
                  <CatIcon weight="duotone" className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-center" style={{ color: "var(--foreground)" }}>
                  {t(category.labelKey)}
                </span>
                <span className="text-xs text-center line-clamp-2" style={{ color: "var(--foreground-muted)" }}>
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
          <label className="block text-sm font-medium mb-3" style={{ color: "var(--foreground-muted)" }}>
            {t("wasteInput.wasteSubType")}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {subTypes.map((subType) => {
              const SubIcon = subTypeIconMap[subType.id] ?? Grains;
              const isSelected = selectedSubType === subType.id;
              return (
                <button
                  key={subType.id}
                  type="button"
                  onClick={() => onSubTypeChange(subType.id)}
                  className="flex items-center gap-2 p-3 rounded-lg border transition-all text-left"
                  style={{
                    borderColor: isSelected ? "var(--brand)" : "var(--border)",
                    background: isSelected ? "var(--brand-50)" : "var(--surface)",
                  }}
                >
                  <SubIcon
                    weight="duotone"
                    className="h-5 w-5 shrink-0"
                    style={{ color: "var(--brand)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
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
