"use client";

import { useTranslations, useLocale } from "next-intl";
import { Select } from "@/components/ui";
import { KENYA_COUNTIES } from "@/lib/constants/counties";
import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCounty: string;
  onCountyChange: (county: string) => void;
  selectedProductType: string;
  onProductTypeChange: (type: string) => void;
}

const productTypes = [
  { value: "all", label: { en: "All Products", sw: "Bidhaa Zote" } },
  { value: "compost", label: { en: "Compost", sw: "Mboji" } },
  { value: "vermicompost", label: { en: "Vermicompost", sw: "Mboji ya Minyoo" } },
  { value: "bio_fertilizer", label: { en: "Bio-Fertilizer", sw: "Mbolea ya Kibiolojia" } },
  { value: "biogas_slurry", label: { en: "Biogas Slurry", sw: "Tope la Biogesi" } },
  { value: "animal_feed", label: { en: "Animal Feed", sw: "Chakula cha Mifugo" } },
  { value: "silage", label: { en: "Silage", sw: "Silaji" } },
  { value: "mulch", label: { en: "Mulch", sw: "Kifuniko" } },
];

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCounty,
  onCountyChange,
  selectedProductType,
  onProductTypeChange,
}: SearchFiltersProps) {
  const t = useTranslations();
  const locale = useLocale();

  const countyOptions = [
    { value: "all", label: locale === "sw" ? "Kaunti Zote" : "All Counties" },
    ...KENYA_COUNTIES.map((county) => ({
      value: county.value,
      label: county.label,
    })),
  ];

  const productOptions = productTypes.map((type) => ({
    value: type.value,
    label: type.label[locale as "en" | "sw"],
  }));

  return (
    <div className="space-y-4 mb-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("marketplace.searchPlaceholder")}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Filter className="h-4 w-4" />
          <span>{t("marketplace.filters")}:</span>
        </div>

        <Select
          options={countyOptions}
          value={selectedCounty}
          onChange={(e) => onCountyChange(e.target.value)}
          className="min-w-[150px]"
        />

        <Select
          options={productOptions}
          value={selectedProductType}
          onChange={(e) => onProductTypeChange(e.target.value)}
          className="min-w-[150px]"
        />
      </div>
    </div>
  );
}
