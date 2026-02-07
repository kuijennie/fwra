import { setRequestLocale } from "next-intl/server";
import { RecommendationsPageClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RecommendationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RecommendationsPageClient />;
}

export function generateMetadata() {
  return {
    title: "Recommendations",
  };
}
