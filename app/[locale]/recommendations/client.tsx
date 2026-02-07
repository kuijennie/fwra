"use client";

import { useTranslations } from "next-intl";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RecommendationList } from "@/components/recommendations";
import { useSession } from "@/lib/hooks";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui";
import { Loader2, Plus } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

export function RecommendationsPageClient() {
  const t = useTranslations();
  const { sessionId, isLoading: sessionLoading } = useSession();

  const recommendations = useQuery(
    api.recommendations.getRecent,
    sessionId ? { sessionId, limit: 10 } : "skip"
  );

  const selectRecommendation = useMutation(api.recommendations.select);

  const handleSelect = async (id: Id<"recommendations">) => {
    await selectRecommendation({ id });
  };

  const isLoading = sessionLoading || recommendations === undefined;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("recommendations.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("recommendations.subtitle")}
            </p>
          </div>

          <Link href="/waste-input">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              {t("nav.logWaste")}
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : (
          <RecommendationList
            recommendations={recommendations || []}
            onSelect={handleSelect}
          />
        )}

        {/* Empty state with CTA */}
        {!isLoading && (!recommendations || recommendations.length === 0) && (
          <div className="mt-6 text-center">
            <Link href="/waste-input">
              <Button size="lg">
                <Plus className="h-5 w-5" />
                {t("home.logWasteAction")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
