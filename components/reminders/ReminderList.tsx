"use client";

import { useTranslations } from "next-intl";
import { ReminderCard } from "./ReminderCard";
import { Skeleton } from "@/components/ui";
import type { Doc } from "@/convex/_generated/dataModel";

interface ReminderListProps {
  reminders: Doc<"reminders">[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function ReminderList({ reminders, isLoading, emptyMessage }: ReminderListProps) {
  const t = useTranslations();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reminders.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-4xl mb-4">📅</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {emptyMessage || t("reminders.noReminders")}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t("reminders.noRemindersDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reminders.map((reminder) => (
        <ReminderCard key={reminder._id} reminder={reminder} />
      ))}
    </div>
  );
}
