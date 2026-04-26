"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LegalDocumentList } from "@/components/legal";
import {  ScalesIcon as Scale  } from "@phosphor-icons/react";

export function LegalClient() {
  const t = useTranslations();

  const documents = useQuery(api.legalDocuments.getPublished);
  const isLoading = documents === undefined;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Scale weight="duotone" className="h-7 w-7 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("legal.title")}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t("legal.subtitle")}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
            {t("legal.disclaimerTitle")}
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            {t("legal.disclaimerText")}
          </p>
        </div>

        {/* Document list */}
        <LegalDocumentList documents={documents ?? []} isLoading={isLoading} />

      </div>
    </main>
  );
}
