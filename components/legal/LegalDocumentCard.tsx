"use client";

import { useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Card, Badge } from "@/components/ui";
import { FileText, CaretRight as ChevronRight, CalendarBlank as Calendar } from "@phosphor-icons/react";
import type { Doc } from "@/convex/_generated/dataModel";

interface LegalDocumentCardProps {
  document: Doc<"legalDocuments">;
}

const categoryIcons: Record<string, string> = {
  waste_management_act: "📜",
  sorting_guidelines: "♻️",
  permits: "📋",
};

const categoryColors: Record<string, "info" | "success" | "warning"> = {
  waste_management_act: "info",
  sorting_guidelines: "success",
  permits: "warning",
};

export function LegalDocumentCard({ document }: LegalDocumentCardProps) {
  const locale = useLocale();

  const title = locale === "sw" ? document.title.sw : document.title.en;
  const summary = locale === "sw" ? document.summary.sw : document.summary.en;

  return (
    <Link href={`/legal/${document.slug}`}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="text-2xl">
            {categoryIcons[document.category] || "📄"}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                {title}
              </h3>
              <Badge variant={categoryColors[document.category] || "info"} size="sm">
                {document.category.replace(/_/g, " ")}
              </Badge>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
              {summary}
            </p>

            {document.effectiveDate && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar weight="duotone" className="h-3 w-3" />
                <span>
                  {locale === "sw" ? "Kuanzia" : "Effective"}: {document.effectiveDate}
                </span>
              </div>
            )}
          </div>

          {/* Arrow */}
          <ChevronRight weight="duotone" className="h-5 w-5 text-gray-400 flex-shrink-0" />
        </div>
      </Card>
    </Link>
  );
}
