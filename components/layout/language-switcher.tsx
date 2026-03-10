"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { Globe, CaretDown as ChevronDown } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe weight="duotone" className="h-4 w-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
        <ChevronDown
          weight="duotone"
          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 rounded-lg py-1 shadow-lg"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className="w-full px-4 py-2 text-left text-sm transition-colors"
              style={
                loc === locale
                  ? { background: "var(--brand-100)", color: "var(--brand)" }
                  : { color: "var(--foreground-muted)" }
              }
              onMouseEnter={(e) => {
                if (loc !== locale) (e.currentTarget as HTMLButtonElement).style.background = "var(--brand-50)";
              }}
              onMouseLeave={(e) => {
                if (loc !== locale) (e.currentTarget as HTMLButtonElement).style.background = "";
              }}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
