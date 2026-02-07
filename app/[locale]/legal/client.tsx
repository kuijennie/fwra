"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LegalDocumentList } from "@/components/legal";
import { Scale, AlertTriangle } from "lucide-react";

export function LegalClient() {
  const t = useTranslations();

  const documents = useQuery(api.legalDocuments.getAll);
  const isLoading = documents === undefined;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("legal.title")}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t("legal.subtitle")}
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                {t("legal.disclaimerTitle")}
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                {t("legal.disclaimerText")}
              </p>
            </div>
          </div>
        </div>

        {/* Document List */}
        <LegalDocumentList documents={documents || []} isLoading={isLoading} />

        {/* Contact Info */}
        <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t("legal.needHelp")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {t("legal.needHelpDescription")}
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• NEMA: 0800 723 253</li>
            <li>• County Environment Office</li>
            <li>• Agricultural Extension Officer</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
