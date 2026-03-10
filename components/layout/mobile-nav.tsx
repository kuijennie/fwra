"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { House as Home, Leaf, BookOpen, Storefront as Store, User } from "@phosphor-icons/react";
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
                <item.icon
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
