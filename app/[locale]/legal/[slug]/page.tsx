import { setRequestLocale } from "next-intl/server";
import { LegalDocumentClient } from "./client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function LegalDocumentPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <LegalDocumentClient slug={slug} />;
}
