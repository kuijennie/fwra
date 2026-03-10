"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui";
import { WasteTypeSelector } from "./waste-type-selector";
import { VolumeInput } from "./volume-input";
import { LocationPicker } from "./location-picker";
import { ResourceChecklist } from "./resource-checklist";
import { SeasonSelector } from "./season-selector";
import { type WasteCategory, volumeUnits } from "@/lib/constants";
import { ArrowRight, CircleNotch as Loader2 } from "@phosphor-icons/react";

export interface WasteInputData {
  wasteType: WasteCategory;
  wasteSubType: string;
  volume: number;
  volumeUnit: string;
  volumeKg: number;
  county: string;
  resources: string[];
  season: string;
  notes: string;
}

interface WasteInputFormProps {
  onSubmit: (data: WasteInputData) => Promise<void>;
}

export function WasteInputForm({ onSubmit }: WasteInputFormProps) {
  const t = useTranslations();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [wasteCategory, setWasteCategory] = useState<WasteCategory | null>(null);
  const [wasteSubType, setWasteSubType] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const [volumeUnit, setVolumeUnit] = useState<string>("kg");
  const [county, setCounty] = useState<string>("");
  const [resources, setResources] = useState<string[]>([]);
  const [season, setSeason] = useState<string>("dry");
  const [notes, setNotes] = useState<string>("");

  const handleResourceToggle = (resourceId: string) => {
    setResources((prev) =>
      prev.includes(resourceId)
        ? prev.filter((r) => r !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleCategoryChange = (category: WasteCategory) => {
    setWasteCategory(category);
    setWasteSubType(null); // Reset sub-type when category changes
  };

  const calculateVolumeKg = (): number => {
    const unitInfo = volumeUnits.find((u) => u.id === volumeUnit);
    return volume * (unitInfo?.conversionToKg || 1);
  };

  const isFormValid = (): boolean => {
    return (
      wasteCategory !== null &&
      wasteSubType !== null &&
      volume > 0 &&
      county !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid() || !wasteCategory || !wasteSubType) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        wasteType: wasteCategory,
        wasteSubType,
        volume,
        volumeUnit,
        volumeKg: calculateVolumeKg(),
        county,
        resources,
        season,
        notes,
      });

      // Navigate to recommendations after successful submission
      router.push("/recommendations");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Waste Type Selection */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <WasteTypeSelector
          selectedCategory={wasteCategory}
          selectedSubType={wasteSubType}
          onCategoryChange={handleCategoryChange}
          onSubTypeChange={setWasteSubType}
        />
      </section>

      {/* Volume Input */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <VolumeInput
          volume={volume}
          unit={volumeUnit}
          onVolumeChange={setVolume}
          onUnitChange={setVolumeUnit}
        />
      </section>

      {/* Location */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <LocationPicker county={county} onCountyChange={setCounty} />
      </section>

      {/* Resources */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <ResourceChecklist
          selectedResources={resources}
          onResourceToggle={handleResourceToggle}
        />
      </section>

      {/* Season */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <SeasonSelector selectedSeason={season} onSeasonChange={setSeason} />
      </section>

      {/* Notes */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t("wasteInput.notes")}
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t("wasteInput.notesPlaceholder")}
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </section>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={!isFormValid() || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 weight="duotone" className="h-5 w-5 animate-spin" />
            {t("common.loading")}
          </>
        ) : (
          <>
            {t("wasteInput.getRecommendations")}
            <ArrowRight weight="duotone" className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}
