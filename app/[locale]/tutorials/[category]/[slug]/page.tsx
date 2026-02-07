import { setRequestLocale } from "next-intl/server";
import { TutorialDetailClient } from "./client";

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export default async function TutorialDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <TutorialDetailClient slug={slug} />;
}

export function generateMetadata() {
  return {
    title: "Tutorial",
  };
}
