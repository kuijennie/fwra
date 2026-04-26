"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { Link } from "@/lib/i18n/navigation";
import { api } from "@/convex/_generated/api";
import { RoleGuard } from "@/components/auth/role-guard";
import { useSession } from "@/lib/hooks";
import { 
  LeafIcon, 
  LightbulbIcon, 
  BellIcon, 
  ChartBarIcon, 
  BookOpenIcon, 
  CircleNotchIcon as Loader2, 
  ArrowRightIcon, 
  StorefrontIcon, 
 } from "@phosphor-icons/react";

export function FarmerDashboardClient() {
  const t = useTranslations();
  const tf = useTranslations("farmerDashboard");
  const { sessionId, isLoading: sessionLoading } = useSession();
  const currentUser = useQuery(api.users.getCurrent);
  const report = useQuery(api.reports.getActivityReport, sessionId ? { sessionId } : "skip");

  return (
    <RoleGuard allowedRoles={["farmer"]}>
      {sessionLoading || report === undefined ? (
        <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto flex min-h-[320px] max-w-5xl items-center justify-center">
            <Loader2 weight="duotone" className="h-8 w-8 animate-spin text-green-600" />
          </div>
        </main>
      ) : (
        <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto max-w-5xl">
            <section className="mb-6 rounded-3xl border border-green-200 bg-gradient-to-br from-[#06402B] via-[#0b5a3d] to-[#d8eddc] px-6 py-8 text-white">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                {tf("eyebrow")}
              </p>
              <h1 className="mb-2 text-3xl font-bold">
                {tf("title", { name: currentUser?.name ?? t("roles.farmer") })}
              </h1>
              <p className="max-w-2xl text-sm text-white/80">
                {tf("subtitle")}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <PrimaryLink href="/waste-input" label={t("home.logWasteAction")} />
                <SecondaryLink href="/recommendations" label={t("home.getRecommendations")} />
              </div>
            </section>

            <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label={t("reports.totalEntries")} value={String(report.totalEntries)} icon={<Leaf weight="duotone" className="h-5 w-5" />} />
              <StatCard label={t("reports.totalWaste")} value={`${report.totalVolumeKg} kg`} icon={<ChartBar weight="duotone" className="h-5 w-5" />} />
              <StatCard label={t("reports.methodsRecommended")} value={String(report.totalRecommendations)} icon={<Lightbulb weight="duotone" className="h-5 w-5" />} />
              <StatCard label={t("reports.methodsAdopted")} value={String(report.totalAdopted)} icon={<Bell weight="duotone" className="h-5 w-5" />} />
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{tf("quickActions")}</h2>
                  <Link href="/reports" className="text-sm text-green-700 dark:text-green-400">
                    {t("nav.reports")}
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ActionCard href="/waste-input" title={t("nav.logWaste")} description={t("home.logWasteDesc")} icon={<Leaf weight="duotone" className="h-5 w-5" />} />
                  <ActionCard href="/recommendations" title={t("nav.recommendations")} description={t("home.getRecommendationsDesc")} icon={<Lightbulb weight="duotone" className="h-5 w-5" />} />
                  <ActionCard href="/farmer/sell" title={t("nav.sell")} description={t("sell.actionDesc")} icon={<Storefront weight="duotone" className="h-5 w-5" />} />
                  <ActionCard href="/reminders" title={t("nav.reminders")} description={t("reminders.subtitle")} icon={<Bell weight="duotone" className="h-5 w-5" />} />
                  <ActionCard href="/tutorials" title={t("nav.tutorials")} description={t("tutorials.subtitle")} icon={<BookOpen weight="duotone" className="h-5 w-5" />} />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{tf("snapshot")}</h2>
                {report.topSubTypes.length > 0 ? (
                  <div className="space-y-3">
                    {report.topSubTypes.map((item) => (
                      <div key={item.subType} className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 dark:bg-green-950/30">
                        <span className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                          {item.subType.replace(/_/g, " ")}
                        </span>
                        <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-semibold text-green-900 dark:bg-green-900 dark:text-green-100">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    {tf("empty")}
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      )}
    </RoleGuard>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 text-green-600 dark:text-green-400">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

function ActionCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href} className="rounded-2xl border border-gray-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50 dark:border-gray-700 dark:hover:border-green-700 dark:hover:bg-green-950/20">
      <div className="mb-3 text-green-600 dark:text-green-400">
        {icon}
      </div>
      <div className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
    </Link>
  );
}

function PrimaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#06402B] transition-opacity hover:opacity-90">
      {label}
      <ArrowRight weight="bold" className="h-3.5 w-3.5" />
    </Link>
  );
}

function SecondaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
      {label}
    </Link>
  );
}
