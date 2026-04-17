"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RoleGuard } from "@/components/auth/role-guard";
import { useSession } from "@/lib/hooks";
import { Link } from "@/lib/i18n/navigation";
import {
  ChartBarIcon as BarChart3,
  LeafIcon as Leaf,
  ScalesIcon as Scale,
  LightbulbIcon as Lightbulb,
  CheckCircleIcon as CheckCircle2,
  ArrowRightIcon as ArrowRight,
  CircleNotchIcon as Loader2,
  ArrowsCounterClockwiseIcon as Recycle,
  PlantIcon as Plant,
  FireIcon as Fire,
  BarnIcon as Barn,
  DownloadSimpleIcon as Download,
  type Icon,
} from "@phosphor-icons/react";
import { MonthlyActivityChart } from "@/components/reports/monthly-activity-chart";

function computeWeeklyActivity(entries: { createdAt: number; volumeKg: number }[]) {
  const now = new Date();
  const weeks: { week: string; count: number; volumeKg: number }[] = [];

  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() - i * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const weekEntries = entries.filter(
      (e) => e.createdAt >= weekStart.getTime() && e.createdAt < weekEnd.getTime()
    );

    const label = weekStart.toLocaleDateString("en", { month: "short", day: "numeric" });
    weeks.push({
      week: label,
      count: weekEntries.length,
      volumeKg: Math.round(weekEntries.reduce((sum, e) => sum + e.volumeKg, 0) * 10) / 10,
    });
  }

  return weeks;
}

const WASTE_TYPE_COLORS: Record<string, { bar: string; label: string }> = {
  crop_residue: { bar: "bg-green-500", label: "Crop Residue" },
  animal_waste: { bar: "bg-amber-500", label: "Animal Waste" },
  food_waste: { bar: "bg-orange-500", label: "Food Waste" },
  tree_clippings: { bar: "bg-emerald-500", label: "Tree Clippings" },
};

const METHOD_ICONS: Record<string, Icon> = {
  composting: Plant,
  biogas: Fire,
  mulching: Leaf,
  animal_feed: Barn,
  vermicompost: Recycle,
};

function exportToCSV(report: {
  totalEntries: number;
  totalVolumeKg: number;
  totalRecommendations: number;
  totalAdopted: number;
  wasteTypeBreakdown: { type: string; count: number; volumeKg: number }[];
  methodBreakdown: { method: string; recommended: number; adopted: number }[];
  topSubTypes: { subType: string; count: number }[];
}) {
  const rows: string[] = [];

  // Summary
  rows.push("SUMMARY");
  rows.push("Metric,Value");
  rows.push(`Total Waste Entries,${report.totalEntries}`);
  rows.push(`Total Volume (kg),${report.totalVolumeKg}`);
  rows.push(`Recommendations Generated,${report.totalRecommendations}`);
  rows.push(`Methods Adopted,${report.totalAdopted}`);

  // Waste type breakdown
  rows.push("");
  rows.push("WASTE TYPE BREAKDOWN");
  rows.push("Type,Entries,Volume (kg)");
  for (const item of report.wasteTypeBreakdown) {
    rows.push(`${item.type.replace(/_/g, " ")},${item.count},${Math.round(item.volumeKg)}`);
  }

  // Method breakdown
  rows.push("");
  rows.push("RECYCLING METHODS");
  rows.push("Method,Recommended,Adopted");
  for (const item of report.methodBreakdown) {
    rows.push(`${item.method.replace(/_/g, " ")},${item.recommended},${item.adopted}`);
  }

  // Top sub-types
  rows.push("");
  rows.push("TOP WASTE SUB-TYPES");
  rows.push("Sub-Type,Count");
  for (const item of report.topSubTypes) {
    rows.push(`${item.subType.replace(/_/g, " ")},${item.count}`);
  }

  // Trigger download
  const csv = rows.join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fwra-report-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function ReportsPageClient() {
  const t = useTranslations();
  const { sessionId, isLoading: sessionLoading } = useSession();

  const report = useQuery(
    api.reports.getActivityReport,
    sessionId ? { sessionId } : "skip"
  );

  const monthlyActivity = useMemo(
    () => (report ? computeWeeklyActivity(report.entryTimestamps) : []),
    [report]
  );

  return (
    <RoleGuard allowedRoles={["farmer"]}>
      {sessionLoading || report === undefined ? (
        <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto flex min-h-[400px] max-w-4xl items-center justify-center">
            <Loader2 weight="duotone" className="h-8 w-8 animate-spin text-green-600" />
          </div>
        </main>
      ) : report.totalEntries === 0 ? (
        <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-900">
                <BarChart3 weight="duotone" className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {t("reports.noData")}
              </h2>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {t("reports.noDataDesc")}
              </p>
              <Link
                href="/waste-input"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
              >
                {t("home.logWasteAction")}
                <ArrowRight weight="duotone" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {t("reports.title")}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("reports.subtitle")}
                </p>
              </div>
              <button
                onClick={() => exportToCSV(report)}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400 dark:hover:bg-green-900/40"
              >
                <Download weight="duotone" className="h-4 w-4" />
                Export CSV
              </button>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <SummaryCard
                icon={<Scale weight="duotone" className="h-5 w-5" />}
                label={t("reports.totalWaste")}
                value={`${report.totalVolumeKg} kg`}
                color="green"
              />
              <SummaryCard
                icon={<Leaf weight="duotone" className="h-5 w-5" />}
                label={t("reports.totalEntries")}
                value={String(report.totalEntries)}
                color="blue"
              />
              <SummaryCard
                icon={<Lightbulb weight="duotone" className="h-5 w-5" />}
                label={t("reports.methodsRecommended")}
                value={String(report.totalRecommendations)}
                color="amber"
              />
              <SummaryCard
                icon={<CheckCircle2 weight="duotone" className="h-5 w-5" />}
                label={t("reports.methodsAdopted")}
                value={String(report.totalAdopted)}
                color="purple"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {t("reports.wasteBreakdown")}
                </h2>
                <div className="space-y-4">
                  {report.wasteTypeBreakdown.map((item) => {
                    const colors = WASTE_TYPE_COLORS[item.type] || {
                      bar: "bg-gray-500",
                      label: item.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                    };
                    const maxWasteCount = Math.max(...report.wasteTypeBreakdown.map((w) => w.count), 1);
                    const pct = (item.count / maxWasteCount) * 100;

                    return (
                      <div key={item.type}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {colors.label}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {item.count} {t("reports.entries")} · {Math.round(item.volumeKg)} kg
                          </span>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className={`h-full rounded-full ${colors.bar} transition-all`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {t("reports.recyclingMethods")}
                </h2>
                <div className="space-y-3">
                  {report.methodBreakdown.map((item) => {
                    const MethodIcon = METHOD_ICONS[item.method] ?? Recycle;
                    return (
                      <div
                        key={item.method}
                        className="flex items-center justify-between rounded-xl px-4 py-3 border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <MethodIcon weight="duotone" className="h-5 w-5" style={{ color: "var(--brand)" }} />
                          <span className="font-medium capitalize" style={{ color: "var(--foreground)" }}>
                            {item.method.replace("_", " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-gray-900 dark:text-white">{item.recommended}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {t("reports.recommended")}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-900 dark:text-white">{item.adopted}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {t("reports.adopted")}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {report.methodBreakdown.length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No recommendations generated yet
                    </p>
                  )}
                </div>
              </section>
            </div>

            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {t("reports.weeklyActivity")}
              </h2>
              <MonthlyActivityChart data={monthlyActivity} />
            </section>

            {report.topSubTypes.length > 0 && (
              <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Top Waste Types Logged
                </h2>
                <div className="flex flex-wrap gap-2">
                  {report.topSubTypes.map((item) => (
                    <span
                      key={item.subType}
                      className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300"
                    >
                      <Recycle weight="duotone" className="h-3.5 w-3.5" />
                      {item.subType.replace(/_/g, " ")}
                      <span className="ml-1 rounded-full bg-green-200 px-1.5 text-xs dark:bg-green-800">
                        {item.count}
                      </span>
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      )}
    </RoleGuard>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "green" | "blue" | "amber" | "purple";
}) {
  const colorClasses = {
    green: "text-green-600 dark:text-green-400",
    blue: "text-blue-600 dark:text-blue-400",
    amber: "text-amber-600 dark:text-amber-400",
    purple: "text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className={`mb-2 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}
