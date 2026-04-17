"use client";

import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "@/lib/i18n/navigation";
import { Badge } from "@/components/ui";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeftIcon as ArrowLeft,
  CalendarBlankIcon as Calendar,
  CircleNotchIcon as Loader2,
  WarningIcon as AlertTriangle,
} from "@phosphor-icons/react";

const categoryColors: Record<string, "info" | "success" | "warning"> = {
  waste_management_act: "info",
  sorting_guidelines: "success",
  permits: "warning",
};

type Props = {
  slug: string;
};

export function LegalDocumentClient({ slug }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  const document = useQuery(api.legalDocuments.getBySlug, { slug });

  // Loading state
  if (document === undefined) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <div className="mx-auto flex min-h-64 max-w-2xl items-center justify-center">
          <Loader2 weight="duotone" className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </main>
    );
  }

  // Not found state
  if (document === null) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <div className="mx-auto max-w-2xl text-center py-16">
          <AlertTriangle weight="duotone" className="mx-auto mb-4 h-12 w-12 text-amber-500" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t("legal.documentNotFound")}
          </h1>
          <Link
            href="/legal"
            className="mt-4 inline-flex items-center gap-2 text-sm text-green-600 hover:underline dark:text-green-400"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            {t("legal.title")}
          </Link>
        </div>
      </main>
    );
  }

  const title = locale === "sw" ? document.title.sw : document.title.en;
  const content = locale === "sw" ? document.content.sw : document.content.en;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">

        {/* Back link */}
        <Link
          href="/legal"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
          {t("legal.title")}
        </Link>

        {/* Document header */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <Badge variant={categoryColors[document.category] ?? "info"} size="sm">
              {document.category.replace(/_/g, " ")}
            </Badge>
          </div>

          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>

          {document.effectiveDate && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Calendar weight="duotone" className="h-4 w-4" />
              {t("legal.effectiveDate")}: {document.effectiveDate}
            </div>
          )}
        </div>

        {/* Document content rendered as Markdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="prose prose-sm prose-green dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-li:text-gray-600 dark:prose-li:text-gray-300
            prose-table:text-sm prose-th:bg-gray-50 dark:prose-th:bg-gray-700
            prose-strong:text-gray-900 dark:prose-strong:text-white">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
            {t("legal.disclaimerTitle")}
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            {t("legal.disclaimerText")}
          </p>
        </div>

      </div>
    </main>
  );
}
