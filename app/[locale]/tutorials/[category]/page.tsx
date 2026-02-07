import { setRequestLocale } from "next-intl/server";
import { CategoryPageClient } from "./client";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  return <CategoryPageClient category={category} />;
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const categoryNames: Record<string, string> = {
    composting: "Composting Tutorials",
    biogas: "Biogas Tutorials",
    mulching: "Mulching Tutorials",
    animal_feed: "Animal Feed Tutorials",
    vermicompost: "Vermicomposting Tutorials",
  };

  return {
    title: categoryNames[params.category] || "Tutorials",
  };
}
