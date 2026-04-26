"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { PlantIcon as Plant, ShoppingBagIcon as ShoppingBag } from "@phosphor-icons/react";

export function RoleSelectionModal() {
  const t = useTranslations("roleSelection");
  const router = useRouter();

  // Use Clerk directly — no dependency on Convex JWT auth
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const signedInEmail = clerkUser?.primaryEmailAddress?.emailAddress;

  // Look up by email (same pattern as UserBootstrap fallback)
  const userByEmail = useQuery(
    api.users.getByEmail,
    signedInEmail ? { email: signedInEmail } : "skip"
  );

  const selectRole = useMutation(api.users.selectRoleByClerkId);
  const [selecting, setSelecting] = useState<"farmer" | "buyer" | null>(null);

  // Wait until Clerk is loaded
  if (!isLoaded) return null;
  // Not signed in
  if (!isSignedIn || !clerkUser?.id) return null;
  // Still loading user from DB, or user already has a real role
  if (userByEmail === undefined || !userByEmail || userByEmail.role !== "pending") return null;

  async function handleSelect(role: "farmer" | "buyer") {
    if (selecting) return;
    setSelecting(role);
    try {
      await selectRole({ clerkId: clerkUser!.id, role });
      router.push(role === "farmer" ? "/farmer" : "/marketplace");
    } catch {
      setSelecting(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-900">
        <div className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
          {t("eyebrow")}
        </div>
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RoleCard
            icon={<Plant weight="duotone" className="h-10 w-10 text-green-600" />}
            title={t("farmerTitle")}
            description={t("farmerDesc")}
            loading={selecting === "farmer"}
            disabled={selecting !== null}
            onClick={() => handleSelect("farmer")}
            color="green"
          />
          <RoleCard
            icon={<ShoppingBag weight="duotone" className="h-10 w-10 text-blue-600" />}
            title={t("buyerTitle")}
            description={t("buyerDesc")}
            loading={selecting === "buyer"}
            disabled={selecting !== null}
            onClick={() => handleSelect("buyer")}
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  description,
  loading,
  disabled,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
  color: "green" | "blue";
}) {
  const activeRing =
    color === "green"
      ? "border-green-500 bg-green-50 dark:bg-green-950/30"
      : "border-blue-500 bg-blue-50 dark:bg-blue-950/30";

  const iconBg =
    color === "green"
      ? "bg-green-100 dark:bg-green-900/40"
      : "bg-blue-100 dark:bg-blue-900/40";

  return (
    <button
      className={`flex w-full cursor-pointer flex-col items-center rounded-2xl border-2 border-gray-200 bg-white p-6 text-center transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 ${loading ? activeRing : "hover:" + activeRing}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={`mb-4 rounded-2xl p-3 ${iconBg}`}>{icon}</div>
      <h2 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {loading && (
        <div className="mt-4 h-1 w-16 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" />
      )}
    </button>
  );
}
