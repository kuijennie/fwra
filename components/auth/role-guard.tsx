"use client";

import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { CircleNotch as Loader2, ShieldWarning as ShieldAlert } from "@phosphor-icons/react";
import { api } from "@/convex/_generated/api";
import { Link } from "@/lib/i18n/navigation";
import { AppRole, isAppRole } from "@/lib/auth/roles";

type RoleGuardProps = {
  allowedRoles: AppRole[];
  children: React.ReactNode;
};

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const t = useTranslations();
  const currentUser = useQuery(api.users.getCurrent);

  if (currentUser === undefined) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
        <div className="mx-auto flex min-h-[320px] max-w-2xl items-center justify-center">
          <Loader2 weight="duotone" className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </main>
    );
  }

  if (!currentUser || allowedRoles.includes(currentUser.role as AppRole)) {
    return <>{children}</>;
  }

  const fallbackHref = getFallbackHref(currentUser.role);
  const allowedRoleLabels = allowedRoles.map((role) => t(`roles.${role}`)).join(", ");

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <ShieldAlert weight="duotone" className="h-8 w-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {t("roleGuard.accessDenied")}
          </h1>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            {t("roleGuard.roleRestricted", { roles: allowedRoleLabels })}
          </p>
          <Link
            href={fallbackHref}
            className="inline-flex items-center rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            {t("roleGuard.takeMeThere")}
          </Link>
        </div>
      </div>
    </main>
  );
}

function getFallbackHref(role: string | null | undefined) {
  if (!isAppRole(role)) {
    return "/";
  }

  switch (role) {
    case "admin":
      return "/admin";
    case "buyer":
      return "/buyer";
    case "farmer":
    default:
      return "/";
  }
}
