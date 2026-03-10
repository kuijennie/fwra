"use client";

import { useTranslations } from "next-intl";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useUser,
} from "@clerk/nextjs";
import { Shield, ShoppingBag, Plant as Sprout } from "@phosphor-icons/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "@/lib/hooks";
import { useEffect, useRef } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export default function ProfilePage() {
  return <ProfileContent />;
}

function ProfileContent() {
  const t = useTranslations("profile");
  const { user: clerkUser, isSignedIn } = useUser();
  const { sessionId } = useSession();

  const convexUser = useQuery(api.users.getCurrent);
  const getOrCreate = useMutation(api.users.getOrCreateFromClerk);
  const linkSession = useMutation(api.users.linkSessionToUser);

  const hasLinked = useRef(false);

  useEffect(() => {
    if (isSignedIn && sessionId && !hasLinked.current) {
      hasLinked.current = true;
      getOrCreate({}).then(() => {
        linkSession({ sessionId });
      });
    }
  }, [isSignedIn, sessionId, getOrCreate, linkSession]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t("subtitle")}
        </p>

        <div className="space-y-4">
          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
            <SignedIn>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={clerkUser?.imageUrl}
                  alt={clerkUser?.fullName ?? ""}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {clerkUser?.fullName}
                    </h2>
                    {convexUser?.role && <RoleBadge role={convexUser.role} />}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {clerkUser?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>

              {convexUser && (
                <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {t("location")}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {convexUser.county.replace(/_/g, " ")}
                    </span>
                  </div>
                  {convexUser.farmSize && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        {t("farmSize")}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {convexUser.farmSize} {t("acres")}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {t("anonymous")}
                  </h2>
                  <SignInButton mode="modal">
                    <button className="text-sm text-green-600 hover:text-green-700 dark:text-green-400">
                      {t("createAccount")}
                    </button>
                  </SignInButton>
                </div>
              </div>
            </SignedOut>
          </div>

          <div className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("language")}
            </h3>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </main>
  );
}

const roleConfig: Record<string, { icon: typeof Shield; bg: string; text: string }> = {
  admin: { icon: Shield, bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-300" },
  buyer: { icon: ShoppingBag, bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300" },
  farmer: { icon: Sprout, bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300" },
};

function RoleBadge({ role }: { role: string }) {
  const t = useTranslations();
  const config = roleConfig[role] ?? roleConfig.farmer;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon weight="duotone" className="h-3 w-3" />
      {t(`roles.${role}`)}
    </span>
  );
}
