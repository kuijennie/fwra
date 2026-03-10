"use client";

import { useTranslations } from "next-intl";
import { Drop, HardHat, Cube, House, Ruler, type Icon } from "@phosphor-icons/react";
import { availableResources } from "@/lib/constants";


const resourceIconMap: Record<string, Icon> = {
  water:      Drop,
  labor:      HardHat,
  containers: Cube,
  shade:      House,
  space:      Ruler,
};

interface ResourceChecklistProps {
  selectedResources: string[];
  onResourceToggle: (resourceId: string) => void;
}

export function ResourceChecklist({
  selectedResources,
  onResourceToggle,
}: ResourceChecklistProps) {
  const t = useTranslations();

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground-muted)" }}>
          {t("wasteInput.resources")}
        </label>
        <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
          {t("wasteInput.resourcesDesc")}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {availableResources.map((resource) => {
          const isSelected = selectedResources.includes(resource.id);
          const ResIcon = resourceIconMap[resource.id] ?? Drop;

          return (
            <button
              key={resource.id}
              type="button"
              onClick={() => onResourceToggle(resource.id)}
              className="flex items-center gap-2 p-3 rounded-lg border transition-all text-left"
              style={{
                borderColor: isSelected ? "var(--brand)" : "var(--border)",
                background: isSelected ? "var(--brand-50)" : "var(--surface)",
              }}
            >
              <ResIcon
                weight="duotone"
                className="h-5 w-5 shrink-0"
                style={{ color: "var(--brand)" }}
              />
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {t(resource.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
