"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
  House as Home,
  Leaf,
  BookOpen,
  Storefront as Store,
  User,
  Lightbulb,
  Shield,
  Star,
  Plant as Sprout,
  ShoppingBag,
  Tag,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { getMobileNavItems } from "@/lib/auth/roles";

const iconMap = {
  "/": Home,
  "/admin": Shield,
  "/buyer": ShoppingBag,
  "/farmer": Sprout,
  "/farmer/sell": Tag,
  "/marketplace": Store,
  "/profile": User,
  "/recommendations": Lightbulb,
  "/success-stories": Star,
  "/tutorials": BookOpen,
  "/waste-input": Leaf,
} as const;

export function MobileNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const { user } = useUser();
  const currentUser = useQuery(api.users.getCurrent);
  const signedInEmail = user?.primaryEmailAddress?.emailAddress;
  const fallbackUser = useQuery(
    api.users.getByEmail,
    signedInEmail ? { email: signedInEmail } : "skip"
  );
  const effectiveRole = currentUser?.role ?? fallbackUser?.role;
  const navItems = getMobileNavItems(effectiveRole);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(246,250,247,0.92)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid #cde0d6",
      }}
    >
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = iconMap[item.href as keyof typeof iconMap] ?? User;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-w-[64px] flex-col items-center gap-1 px-3 py-3 text-xs font-medium transition-colors",
                  isActive
                    ? "text-[#06402B]"
                    : "text-[#4a6b58] hover:text-[#06402B]"
                )}
              >
                <Icon
                  weight="duotone"
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "stroke-[#06402B]" : "stroke-[#4a6b58]"
                  )}
                  style={isActive ? { fill: "rgba(6,64,43,0.08)" } : {}}
                />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
