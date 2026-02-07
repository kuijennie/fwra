import { setRequestLocale } from "next-intl/server";
import { RemindersClient } from "./client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RemindersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RemindersClient />;
}

export function generateMetadata() {
  return {
    title: "Reminders",
  };
}
