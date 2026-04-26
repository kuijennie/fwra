"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RoleGuard } from "@/components/auth/role-guard";
import { useSession } from "@/lib/hooks/use-session";
import { ReminderList, ReminderForm } from "@/components/reminders";
import { Button, Card } from "@/components/ui";
import { BellIcon as Bell, PlusIcon as Plus, ClockIcon as Clock, CheckCircleIcon as CheckCircle, WarningCircleIcon as AlertCircle, CircleNotchIcon as Loader2, 
 } from "@phosphor-icons/react";

export function RemindersClient() {
  const t = useTranslations();
  const { sessionId, isLoading: sessionLoading } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "overdue" | "completed">("upcoming");

  const allReminders = useQuery(
    api.reminders.getBySession,
    sessionId ? { sessionId } : "skip"
  );
  const stats = useQuery(
    api.reminders.getStats,
    sessionId ? { sessionId } : "skip"
  );

  const isLoading = sessionLoading || allReminders === undefined;

  const getFilteredReminders = () => {
    if (!allReminders) return [];

    const now = Date.now();

    switch (activeTab) {
      case "upcoming":
        return allReminders
          .filter((r) => !r.isCompleted && r.dueDate >= now)
          .sort((a, b) => a.dueDate - b.dueDate);
      case "overdue":
        return allReminders
          .filter((r) => !r.isCompleted && r.dueDate < now)
          .sort((a, b) => a.dueDate - b.dueDate);
      case "completed":
        return allReminders
          .filter((r) => r.isCompleted)
          .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
      default:
        return allReminders;
    }
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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Bell weight="duotone" className="h-6 w-6 text-green-600" />
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t("reminders.title")}
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("reminders.subtitle")}
                </p>
              </div>
              {!showForm && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus weight="bold" className="h-4 w-4" />
                  {t("reminders.addReminder")}
                </Button>
              )}
            </div>

            {stats && (
              <div className="mb-6 grid grid-cols-3 gap-3">
                <Card className="p-4 text-center">
                  <Clock weight="duotone" className="mx-auto mb-1 h-5 w-5 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.pending}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t("reminders.pending")}
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <AlertCircle weight="duotone" className="mx-auto mb-1 h-5 w-5 text-red-600" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.overdue}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t("reminders.overdue")}
                  </div>
                </Card>
                <Card className="p-4 text-center">
                  <CheckCircle weight="duotone" className="mx-auto mb-1 h-5 w-5 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.completed}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t("reminders.completed")}
                  </div>
                </Card>
              </div>
            )}

            {showForm && sessionId && (
              <div className="mb-6">
                <ReminderForm
                  sessionId={sessionId}
                  onSuccess={() => setShowForm(false)}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}

            <div className="mb-4 flex gap-2 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "upcoming"
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {t("reminders.upcoming")} {stats && stats.pending - stats.overdue > 0 && `(${stats.pending - stats.overdue})`}
              </button>
              <button
                onClick={() => setActiveTab("overdue")}
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "overdue"
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {t("reminders.overdue")} {stats && stats.overdue > 0 && `(${stats.overdue})`}
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "completed"
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {t("reminders.completed")} {stats && stats.completed > 0 && `(${stats.completed})`}
              </button>
            </div>

            <ReminderList
              reminders={getFilteredReminders()}
              isLoading={isLoading}
              emptyMessage={
                activeTab === "overdue"
                  ? t("reminders.noOverdue")
                  : activeTab === "completed"
                    ? t("reminders.noCompleted")
                    : undefined
              }
            />

            <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                {t("reminders.tipsTitle")}
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• {t("reminders.tip1")}</li>
                <li>• {t("reminders.tip2")}</li>
                <li>• {t("reminders.tip3")}</li>
              </ul>
            </div>
          </div>
        </main>
      )}
    </RoleGuard>
  );
}
