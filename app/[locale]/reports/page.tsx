import { setRequestLocale } from "next-intl/server";
import { ReportsPageClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ReportsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ReportsPageClient />;
}

export function generateMetadata() {
  return {
    title: "Reports",
  };
}
