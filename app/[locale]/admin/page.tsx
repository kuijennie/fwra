import { setRequestLocale } from "next-intl/server";
import { AdminDashboardClient } from "./client";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminDashboardClient />;
}
