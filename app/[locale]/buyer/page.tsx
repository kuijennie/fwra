import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BuyerDashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const prefix = locale === "en" ? "" : `/${locale}`;
  redirect(`${prefix}/marketplace`);
}
