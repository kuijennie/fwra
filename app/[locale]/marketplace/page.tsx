import { setRequestLocale } from "next-intl/server";
import { MarketplaceClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MarketplacePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MarketplaceClient />;
}

export function generateMetadata() {
  return {
    title: "Marketplace - Find Buyers",
  };
}
