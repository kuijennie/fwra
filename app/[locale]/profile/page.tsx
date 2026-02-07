import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProfilePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfileContent />;
}

function ProfileContent() {
  const t = useTranslations("profile");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t("subtitle")}
        </p>

        <div className="space-y-4">
          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {t("anonymous")}
                </h2>
                <button className="text-sm text-green-600 hover:text-green-700 dark:text-green-400">
                  {t("createAccount")}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("language")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Language selector coming soon...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
