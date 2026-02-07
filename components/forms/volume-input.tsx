"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { volumeUnits } from "@/lib/constants";

interface VolumeInputProps {
  volume: number;
  unit: string;
  onVolumeChange: (volume: number) => void;
  onUnitChange: (unit: string) => void;
}

export function VolumeInput({
  volume,
  unit,
  onVolumeChange,
  onUnitChange,
}: VolumeInputProps) {
  const t = useTranslations();

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("wasteInput.volume")}
      </label>

      <div className="flex gap-3">
        {/* Volume Number Input */}
        <div className="flex-1">
          <input
            type="number"
            min="0"
            step="1"
            value={volume || ""}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            placeholder={t("wasteInput.enterVolume")}
            className={cn(
              "w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
              "dark:bg-gray-800 dark:text-white dark:placeholder-gray-400",
              "border-gray-300 dark:border-gray-600"
            )}
          />
        </div>

        {/* Unit Selector */}
        <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
          {volumeUnits.map((unitOption) => (
            <button
              key={unitOption.id}
              type="button"
              onClick={() => onUnitChange(unitOption.id)}
              className={cn(
                "px-3 py-2.5 text-sm font-medium transition-colors",
                unit === unitOption.id
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              {unitOption.id === "kg"
                ? "kg"
                : unitOption.id === "bags"
                  ? t("wasteInput.bags")
                  : t("wasteInput.wheelbarrows")}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion hint */}
      {unit !== "kg" && volume > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ≈{" "}
          {volume *
            (volumeUnits.find((u) => u.id === unit)?.conversionToKg || 1)}{" "}
          kg
        </p>
      )}
    </div>
  );
}
