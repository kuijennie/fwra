import { setRequestLocale } from "next-intl/server";
import { FarmerDashboardClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function FarmerDashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FarmerDashboardClient />;
}
