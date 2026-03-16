"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { WasteInputForm, type WasteInputData } from "@/components/forms";
import { RoleGuard } from "@/components/auth/role-guard";
import { useSession } from "@/lib/hooks";
import { CircleNotch as Loader2 } from "@phosphor-icons/react";

export function WasteInputPageClient() {
  const t = useTranslations();
  const { sessionId, isLoading: sessionLoading } = useSession();

  const createWasteEntry = useMutation(api.wasteEntries.create);
  const generateRecommendations = useMutation(api.recommendations.generate);

  const handleSubmit = async (data: WasteInputData) => {
    if (!sessionId) {
      throw new Error("Session not initialized");
    }

    // Create waste entry
    const wasteEntryId = await createWasteEntry({
      sessionId,
      wasteType: data.wasteType,
      wasteSubType: data.wasteSubType,
      volumeKg: data.volumeKg,
      volumeUnit: data.volumeUnit,
      county: data.county,
      availableResources: data.resources,
      currentSeason: data.season,
      notes: data.notes || undefined,
    });

    // Generate recommendations
    await generateRecommendations({
      wasteEntryId,
      sessionId,
    });
  };

  return (
    <RoleGuard allowedRoles={["farmer"]}>
      {sessionLoading ? (
        <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto flex min-h-[400px] max-w-2xl items-center justify-center">
            <Loader2 weight="duotone" className="h-8 w-8 animate-spin text-green-600" />
          </div>
        </main>
      ) : (
        <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {t("wasteInput.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t("wasteInput.subtitle")}
              </p>
            </div>

            <WasteInputForm onSubmit={handleSubmit} />
          </div>
        </main>
      )}
    </RoleGuard>
  );
}
