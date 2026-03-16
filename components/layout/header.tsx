"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Leaf, List as Menu, X } from "@phosphor-icons/react";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDesktopNavItems } from "@/lib/auth/roles";

const BRAND = "#06402B";

const mobileOnlyLinks = [
  { href: "/reminders", labelKey: "nav.reminders" },
  { href: "/legal", labelKey: "nav.legal" },
  { href: "/profile", labelKey: "nav.profile" },
] as const;

export function Header() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const currentUser = useQuery(api.users.getCurrent);
  const signedInEmail = user?.primaryEmailAddress?.emailAddress;
  const fallbackUser = useQuery(
    api.users.getByEmail,
    signedInEmail ? { email: signedInEmail } : "skip"
  );
  const effectiveRole = currentUser?.role ?? fallbackUser?.role;
  const navLinks = getDesktopNavItems(effectiveRole);
  const showMobileOnlyLinks = effectiveRole !== "buyer" && effectiveRole !== "admin";

  return (
    <header className="sticky top-0 z-50" style={{ background: BRAND }}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors group-hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.12)", outline: "1px solid rgba(255,255,255,0.18)" }}
            >
              <Leaf weight="duotone" className="h-4 w-4 text-white" />
            </div>
            <span className="font-display hidden text-base font-semibold italic tracking-wide text-white sm:block">
              FWRA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-7 w-7",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.12)", outline: "1px solid rgba(255,255,255,0.22)" }}
                >
                  {t.has("nav.signIn") ? t("nav.signIn") : t("common.getStarted")}
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-1.5 text-white/75 transition-colors hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X weight="bold" className="h-5 w-5" /> : <Menu weight="bold" className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav className="border-t py-3 md:hidden" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              {showMobileOnlyLinks &&
                mobileOnlyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
