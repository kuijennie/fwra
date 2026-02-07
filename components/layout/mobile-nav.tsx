"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Home, Leaf, BookOpen, Store, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, labelKey: "nav.home" },
  { href: "/waste-input", icon: Leaf, labelKey: "nav.logWaste" },
  { href: "/tutorials", icon: BookOpen, labelKey: "nav.tutorials" },
  { href: "/marketplace", icon: Store, labelKey: "nav.marketplace" },
  { href: "/profile", icon: User, labelKey: "nav.profile" },
] as const;

export function MobileNav() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 md:hidden">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-3 text-xs font-medium transition-colors min-w-[64px]",
                  isActive
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive && "fill-green-100 dark:fill-green-900"
                  )}
                />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
