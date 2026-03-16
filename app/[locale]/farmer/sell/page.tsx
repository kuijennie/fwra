import { setRequestLocale } from "next-intl/server";
import { FarmerSellClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function FarmerSellPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FarmerSellClient />;
}
