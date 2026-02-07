import { setRequestLocale } from "next-intl/server";
import { TutorialsPageClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TutorialsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TutorialsPageClient />;
}

export function generateMetadata() {
  return {
    title: "Tutorials",
  };
}
