"use client";

import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link } from "@/lib/i18n/navigation";
import { Card, Badge, Button } from "@/components/ui";
import { ChevronLeft, Calendar, CheckCircle, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface LegalDetailClientProps {
  slug: string;
}

export function LegalDetailClient({ slug }: LegalDetailClientProps) {
  const t = useTranslations();
  const locale = useLocale();

  const document = useQuery(api.legalDocuments.getBySlug, { slug });

  if (document === undefined) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <div className="mx-auto max-w-2xl flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </main>
    );
  }

  if (document === null) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t("legal.documentNotFound")}
          </h1>
          <Link href="/legal">
            <Button>{t("common.back")}</Button>
          </Link>
        </div>
      </main>
    );
  }

  const title = locale === "sw" ? document.title.sw : document.title.en;
  const content = locale === "sw" ? document.content.sw : document.content.en;
  const keyPoints = document.keyPoints;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Back Link */}
        <Link
          href="/legal"
          className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("common.back")}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="info" size="sm">
              {document.category.replace(/_/g, " ")}
            </Badge>
            {document.effectiveDate && (
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                {document.effectiveDate}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        {/* Key Points */}
        {keyPoints && keyPoints.length > 0 && (
          <Card className="p-4 mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
              {t("legal.keyPoints")}
            </h2>
            <ul className="space-y-2">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === "sw" ? point.sw : point.en}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Content */}
        <Card className="p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-table:text-sm">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </Card>

        {/* Last Updated */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          {t("legal.lastUpdated")}: {new Date(document.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
