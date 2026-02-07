export const locales = ["en", "sw", "ki", "lu", "ka"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  sw: "Kiswahili",
  ki: "Gikuyu",
  lu: "Dholuo",
  ka: "Kikamba",
};

export const localeFlags: Record<Locale, string> = {
  en: "GB",
  sw: "KE",
  ki: "KE",
  lu: "KE",
  ka: "KE",
};
