import { setRequestLocale } from "next-intl/server";
import { LegalDetailClient } from "./client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function LegalDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <LegalDetailClient slug={slug} />;
}

export function generateMetadata() {
  return {
    title: "Legal Document",
  };
}
