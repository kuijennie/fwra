import { setRequestLocale } from "next-intl/server";
import { SuccessStoriesClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SuccessStoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SuccessStoriesClient />;
}

export function generateMetadata() {
  return {
    title: "Success Stories - Farmer Experiences",
  };
}
