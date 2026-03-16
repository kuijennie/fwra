"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { Link } from "@/lib/i18n/navigation";
import { api } from "@/convex/_generated/api";
import {
  Leaf,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Plant as Sprout,
  Drop as Droplets,
  Fire as Flame,
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
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <section className="px-4 pb-10 pt-14 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 flex justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: "#06402B" }}
            >
              <Sprout weight="duotone" className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1
            className="font-display mb-4 text-4xl font-bold italic leading-tight sm:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            {t("home.welcome")}
          </h1>
          <p className="mb-8 text-lg leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            {roleSubtitle}
          </p>
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#06402B" }}
          >
            {t(getPrimaryCtaKey(role))}
            <ArrowRight weight="duotone" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#5a9e7c" }}
          >
            {t("home.quickActions")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.href}
                href={action.href}
                icon={action.icon}
                title={t(action.titleKey)}
                description={t(action.descriptionKey)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#5a9e7c" }}
          >
            {t("tutorials.categories")}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <MethodCard icon={<Leaf weight="duotone" className="h-7 w-7" />} title={t("recommendations.composting")} />
            <MethodCard icon={<Flame weight="duotone" className="h-7 w-7" />} title={t("recommendations.biogas")} />
            <MethodCard icon={<Droplets weight="duotone" className="h-7 w-7" />} title={t("recommendations.mulching")} />
            <MethodCard icon={<Sprout weight="duotone" className="h-7 w-7" />} title={t("recommendations.animalFeed")} />
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <div
            className="overflow-hidden rounded-2xl p-10 text-white"
            style={{ background: "#06402B" }}
          >
            <h2 className="font-display mb-2 text-center text-2xl font-bold italic">
              Why Recycle Farm Waste?
            </h2>
            <p className="mb-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              The numbers that drive our mission
            </p>
            <div className="grid gap-8 sm:grid-cols-3">
              <StatItem value="3,000-4,000" label="tons of waste daily in Kenya" />
              <StatItem value="80%" label="of Nairobi waste is organic" />
              <StatItem value="30-40%" label="of food is lost or wasted" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 text-center">
        <div className="mx-auto max-w-xl">
          <h2
            className="font-display mb-3 text-2xl font-bold italic"
            style={{ color: "var(--foreground)" }}
          >
            Ready to turn waste into value?
          </h2>
          <p className="mb-7 text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
            Start with the next action that fits your role.
          </p>
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#06402B" }}
          >
            {t(getPrimaryCtaKey(role))}
            <ArrowRight weight="duotone" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function QuickActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border p-6 text-center transition-shadow hover:shadow-md"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-colors group-hover:opacity-90"
        style={{ background: "var(--brand-100)", color: "var(--brand)" }}
      >
        {icon}
      </div>
      <h3 className="mb-1.5 font-semibold" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
        {description}
      </p>
    </Link>
  );
}

function MethodCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div
      className="flex flex-col items-center rounded-xl border p-5 text-center"
      style={{ background: "var(--brand-50)", borderColor: "var(--border)" }}
    >
      <div
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: "var(--brand-100)", color: "var(--brand)" }}
      >
        {icon}
      </div>
      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
        {title}
      </span>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display mb-1 text-3xl font-bold italic">{value}</div>
      <div className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
        {label}
      </div>
    </div>
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
      {
        href: "/admin",
        icon: <Lightbulb weight="duotone" className="h-5 w-5" />,
        titleKey: "roles.admin",
        descriptionKey: "admin.subtitle",
      },
      {
        href: "/marketplace",
        icon: <Leaf weight="duotone" className="h-5 w-5" />,
        titleKey: "nav.marketplace",
        descriptionKey: "marketplace.subtitle",
      },
      {
        href: "/tutorials",
        icon: <BookOpen weight="duotone" className="h-5 w-5" />,
        titleKey: "nav.tutorials",
        descriptionKey: "tutorials.subtitle",
      },
    ];
  }

  if (role === "buyer") {
    return [
      {
        href: "/marketplace",
        icon: <Leaf weight="duotone" className="h-5 w-5" />,
        titleKey: "nav.marketplace",
        descriptionKey: "marketplace.subtitle",
      },
      {
        href: "/tutorials",
        icon: <BookOpen weight="duotone" className="h-5 w-5" />,
        titleKey: "home.browseTutorials",
        descriptionKey: "home.browseTutorialsDesc",
      },
      {
        href: "/profile",
        icon: <Lightbulb weight="duotone" className="h-5 w-5" />,
        titleKey: "nav.profile",
        descriptionKey: "profile.subtitle",
      },
    ];
  }

  if (role === "farmer") {
    return [
      {
        href: "/farmer",
        icon: <Sprout weight="duotone" className="h-5 w-5" />,
        titleKey: "nav.farmer",
        descriptionKey: "farmerDashboard.subtitle",
      },
      {
        href: "/waste-input",
        icon: <Leaf weight="duotone" className="h-5 w-5" />,
        titleKey: "home.logWasteAction",
        descriptionKey: "home.logWasteDesc",
      },
      {
        href: "/recommendations",
        icon: <Lightbulb weight="duotone" className="h-5 w-5" />,
        titleKey: "home.getRecommendations",
        descriptionKey: "home.getRecommendationsDesc",
      },
    ];
  }

  return [
    {
      href: "/waste-input",
      icon: <Leaf weight="duotone" className="h-5 w-5" />,
      titleKey: "home.logWasteAction",
      descriptionKey: "home.logWasteDesc",
    },
    {
      href: "/recommendations",
      icon: <Lightbulb weight="duotone" className="h-5 w-5" />,
      titleKey: "home.getRecommendations",
      descriptionKey: "home.getRecommendationsDesc",
    },
    {
      href: "/tutorials",
      icon: <BookOpen weight="duotone" className="h-5 w-5" />,
      titleKey: "home.browseTutorials",
      descriptionKey: "home.browseTutorialsDesc",
    },
  ];
}
