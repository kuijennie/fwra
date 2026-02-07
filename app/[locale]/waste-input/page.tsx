import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { WasteInputPageClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function WasteInputPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WasteInputPageClient />;
}

export function generateMetadata() {
  return {
    title: "Log Waste",
  };
}
