import { setRequestLocale } from "next-intl/server";
import { LegalClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalClient />;
}

export function generateMetadata() {
  return {
    title: "Legal Information",
  };
}
