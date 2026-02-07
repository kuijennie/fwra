import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import {
  Leaf,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Recycle,
  Droplets,
  Flame,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="px-4 pt-12 pb-8 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900">
              <Recycle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {t("home.welcome")}
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            {t("home.subtitle")}
          </p>
          <Link
            href="/waste-input"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-green-700"
          >
            {t("common.getStarted")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
            {t("home.quickActions")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <QuickActionCard
              href="/waste-input"
              icon={<Leaf className="h-6 w-6" />}
              title={t("home.logWasteAction")}
              description={t("home.logWasteDesc")}
              color="green"
            />
            <QuickActionCard
              href="/recommendations"
              icon={<Lightbulb className="h-6 w-6" />}
              title={t("home.getRecommendations")}
              description={t("home.getRecommendationsDesc")}
              color="amber"
            />
            <QuickActionCard
              href="/tutorials"
              icon={<BookOpen className="h-6 w-6" />}
              title={t("home.browseTutorials")}
              description={t("home.browseTutorialsDesc")}
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* Recycling Methods Preview */}
      <section className="px-4 py-8 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
            {t("tutorials.categories")}
          </h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            <MethodCard
              icon={<Leaf className="h-8 w-8" />}
              title={t("recommendations.composting")}
              color="green"
            />
            <MethodCard
              icon={<Flame className="h-8 w-8" />}
              title={t("recommendations.biogas")}
              color="orange"
            />
            <MethodCard
              icon={<Droplets className="h-8 w-8" />}
              title={t("recommendations.mulching")}
              color="blue"
            />
            <MethodCard
              icon={<Recycle className="h-8 w-8" />}
              title={t("recommendations.animalFeed")}
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-green-600 p-8 text-white">
            <h2 className="mb-6 text-center text-2xl font-bold">
              Why Recycle Farm Waste?
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <StatCard value="3,000-4,000" label="tons of waste daily in Kenya" />
              <StatCard value="80%" label="organic waste in Nairobi" />
              <StatCard value="30-40%" label="food lost or wasted" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Ready to turn waste into value?
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Start by logging your farm waste and get personalized recommendations
            for recycling methods that work for you.
          </p>
          <Link
            href="/waste-input"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-700"
          >
            {t("home.logWasteAction")}
            <ArrowRight className="h-5 w-5" />
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
  color,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "green" | "amber" | "blue";
}) {
  const colorClasses = {
    green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  };

  return (
    <Link
      href={href}
      className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <div className={`mb-4 rounded-full p-3 ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </Link>
  );
}

function MethodCard({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  color: "green" | "orange" | "blue" | "purple";
}) {
  const colorClasses = {
    green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  };

  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-700">
      <div className={`mb-3 rounded-full p-3 ${colorClasses[color]}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </span>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-green-100">{label}</div>
    </div>
  );
}
