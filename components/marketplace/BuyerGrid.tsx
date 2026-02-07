"use client";

import { useTranslations } from "next-intl";
import { BuyerCard } from "./BuyerCard";
import { Skeleton } from "@/components/ui";
import type { Doc } from "@/convex/_generated/dataModel";

interface BuyerGridProps {
  buyers: Doc<"buyers">[];
  isLoading?: boolean;
}

export function BuyerGrid({ buyers, isLoading }: BuyerGridProps) {
  const t = useTranslations();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
          >
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <Skeleton className="h-4 w-1/3 mb-3" />
            <Skeleton className="h-16 w-full mb-3" />
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 flex-1 rounded-lg" />
              <Skeleton className="h-9 flex-1 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (buyers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t("marketplace.noBuyers")}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t("marketplace.noBuyersDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {buyers.map((buyer) => (
        <BuyerCard key={buyer._id} buyer={buyer} />
      ))}
    </div>
  );
}
