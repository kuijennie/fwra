"use client";

import { useTranslations } from "next-intl";
import { counties, regions } from "@/lib/constants";
import { Select, type SelectOption } from "@/components/ui";

interface LocationPickerProps {
  county: string;
  onCountyChange: (county: string) => void;
}

export function LocationPicker({ county, onCountyChange }: LocationPickerProps) {
  const t = useTranslations();

  // Group counties by region for better UX
  const countyOptions: SelectOption[] = regions.flatMap((region) => {
    const regionCounties = counties
      .filter((c) => c.region === region)
      .map((c) => ({
        value: c.id,
        label: c.name,
      }));

    return regionCounties;
  });

  return (
    <div className="space-y-4">
      <Select
        label={t("wasteInput.location")}
        value={county}
        onChange={(e) => onCountyChange(e.target.value)}
        options={countyOptions}
        placeholder={t("wasteInput.selectCounty")}
      />
    </div>
  );
}
