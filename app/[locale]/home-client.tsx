"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { Link } from "@/lib/i18n/navigation";
import { api } from "@/convex/_generated/api";
import { 
  LeafIcon, 
  LightbulbIcon, 
  BookOpenIcon, 
  ArrowRightIcon, 
  PlantIcon, 
  DropIcon, 
  FireIcon, 
  ScalesIcon, 
 } from "@phosphor-icons/react";

export function HomeContent() {
  const t = useTranslations();
  const currentUser = useQuery(api.users.getCurrent);
  const role = currentUser?.role;
  const primaryHref = role === "admin" ? "/admin" : role === "buyer" ? "/marketplace" : role === "farmer" ? "/farmer" : "/waste-input";
  const quickActions = getHomeQuickActions(role);
  const roleSubtitle =
    role === "admin"
      ? t("admin.subtitle")
      : role === "buyer"
        ? t("marketplace.subtitle")
        : t("home.subtitle");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Hero */}
      <section className="px-4 pb-12 pt-16 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 flex justify-center">
            <PlantIcon weight="duotone" className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="font-display mb-4 text-4xl font-bold italic leading-tight text-gray-900 dark:text-white sm:text-5xl">
            {t("home.welcome")}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            {roleSubtitle}
          </p>
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-7 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 dark:bg-green-600"
          >
            {t(getPrimaryCtaKey(role))}
            <ArrowRightIcon weight="duotone" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-500">
            {t("home.quickActions")}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 text-center transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mx-auto mb-4 text-green-600 dark:text-green-400 transition-opacity group-hover:opacity-80">
                  {action.icon}
                </div>
                <h3 className="mb-1.5 font-semibold text-gray-900 dark:text-white">
                  {t(action.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {t(action.descriptionKey)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-500">
            {t("tutorials.categories")}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: <LeafIcon weight="duotone" className="h-7 w-7" />, label: t("recommendations.composting") },
              { icon: <FireIcon weight="duotone" className="h-7 w-7" />, label: t("recommendations.biogas") },
              { icon: <DropIcon weight="duotone" className="h-7 w-7" />, label: t("recommendations.mulching") },
              { icon: <PlantIcon weight="duotone" className="h-7 w-7" />, label: t("recommendations.animalFeed") },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-5 text-center dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 text-green-600 dark:text-green-400">{icon}</div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-500">
            {t("legal.title")}
          </p>
          <Link
            href="/legal"
            className="group flex items-center gap-6 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <ScalesIcon weight="duotone" className="h-7 w-7 shrink-0 text-green-600 dark:text-green-400" />
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                {t("legal.wasteManagementAct")}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {t("legal.subtitle")}
              </p>
            </div>
            <ArrowRightIcon
              weight="duotone"
              className="h-5 w-5 shrink-0 text-green-600 transition-transform group-hover:translate-x-1 dark:text-green-400"
            />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-xl bg-green-700 p-10 text-white dark:bg-green-800">
            <h2 className="font-display mb-2 text-center text-2xl font-bold italic">
              Why Recycle Farm Waste?
            </h2>
            <p className="mb-8 text-center text-sm text-white/65">
              The numbers that drive our mission
            </p>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="font-display mb-1 text-3xl font-bold italic">3,000–4,000</div>
                <div className="text-sm text-white/65">tons of waste daily in Kenya</div>
              </div>
              <div className="text-center">
                <div className="font-display mb-1 text-3xl font-bold italic">80%</div>
                <div className="text-sm text-white/65">of Nairobi waste is organic</div>
              </div>
              <div className="text-center">
                <div className="font-display mb-1 text-3xl font-bold italic">30–40%</div>
                <div className="text-sm text-white/65">of food is lost or wasted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-16 pt-4 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display mb-3 text-2xl font-bold italic text-gray-900 dark:text-white">
            Ready to turn waste into value?
          </h2>
          <p className="mb-7 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Start with the next action that fits your role.
          </p>
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 dark:bg-green-600"
          >
            {t(getPrimaryCtaKey(role))}
            <ArrowRightIcon weight="duotone" className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}

function getPrimaryCtaKey(role: string | null | undefined) {
  if (role === "admin") return "roles.admin";
  if (role === "buyer") return "nav.marketplace";
  if (role === "farmer") return "nav.farmer";
  return "home.logWasteAction";
}

function getHomeQuickActions(role: string | null | undefined) {
  if (role === "admin") {
    return [
      { href: "/admin",       icon: <LightbulbIcon weight="duotone" className="h-5 w-5" />, titleKey: "roles.admin",           descriptionKey: "admin.subtitle" },
      { href: "/marketplace", icon: <LeafIcon      weight="duotone" className="h-5 w-5" />, titleKey: "nav.marketplace",       descriptionKey: "marketplace.subtitle" },
      { href: "/tutorials",   icon: <BookOpenIcon  weight="duotone" className="h-5 w-5" />, titleKey: "nav.tutorials",         descriptionKey: "tutorials.subtitle" },
    ];
  }
  if (role === "buyer") {
    return [
      { href: "/marketplace", icon: <LeafIcon      weight="duotone" className="h-5 w-5" />, titleKey: "nav.marketplace",       descriptionKey: "marketplace.subtitle" },
      { href: "/tutorials",   icon: <BookOpenIcon  weight="duotone" className="h-5 w-5" />, titleKey: "home.browseTutorials",  descriptionKey: "home.browseTutorialsDesc" },
      { href: "/profile",     icon: <LightbulbIcon weight="duotone" className="h-5 w-5" />, titleKey: "nav.profile",           descriptionKey: "profile.subtitle" },
    ];
  }
  if (role === "farmer") {
    return [
      { href: "/farmer",          icon: <PlantIcon     weight="duotone" className="h-5 w-5" />, titleKey: "nav.farmer",            descriptionKey: "farmerDashboard.subtitle" },
      { href: "/waste-input",     icon: <LeafIcon      weight="duotone" className="h-5 w-5" />, titleKey: "home.logWasteAction",   descriptionKey: "home.logWasteDesc" },
      { href: "/recommendations", icon: <LightbulbIcon weight="duotone" className="h-5 w-5" />, titleKey: "home.getRecommendations", descriptionKey: "home.getRecommendationsDesc" },
    ];
  }
  return [
    { href: "/waste-input",     icon: <LeafIcon      weight="duotone" className="h-5 w-5" />, titleKey: "home.logWasteAction",   descriptionKey: "home.logWasteDesc" },
    { href: "/recommendations", icon: <LightbulbIcon weight="duotone" className="h-5 w-5" />, titleKey: "home.getRecommendations", descriptionKey: "home.getRecommendationsDesc" },
    { href: "/tutorials",       icon: <BookOpenIcon  weight="duotone" className="h-5 w-5" />, titleKey: "home.browseTutorials",  descriptionKey: "home.browseTutorialsDesc" },
  ];
}
