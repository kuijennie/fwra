"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Recycle, Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-green-600 p-1.5">
              <Recycle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white hidden sm:block">
              FWRA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/waste-input"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("nav.logWaste")}
            </Link>
            <Link
              href="/recommendations"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("nav.recommendations")}
            </Link>
            <Link
              href="/tutorials"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("nav.tutorials")}
            </Link>
            <Link
              href="/marketplace"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("nav.marketplace")}
            </Link>
            <Link
              href="/success-stories"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {t("nav.stories")}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-2">
              <Link
                href="/waste-input"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {t("nav.logWaste")}
              </Link>
              <Link
                href="/recommendations"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {t("nav.recommendations")}
              </Link>
              <Link
                href="/tutorials"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {t("nav.tutorials")}
              </Link>
              <Link
                href="/marketplace"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {t("nav.marketplace")}
              </Link>
              <Link
                href="/success-stories"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {t("nav.stories")}
              </Link>
              <Link
                href="/reminders"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {t("nav.reminders")}
              </Link>
              <Link
                href="/legal"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {t("nav.legal")}
              </Link>
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              >
                {t("nav.profile")}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
