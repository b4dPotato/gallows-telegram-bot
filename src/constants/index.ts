export const LANGUAGES = ["en", "ru"] as const;
export const DEFAULT_LANGUAGE = LANGUAGES[0];
export const CURRENCIES = ["USD", "RUB"] as const;
export const LANGUAGE_CURRENCIES = {
  en: "USD",
  ru: "RUB",
} as const;
export const DEFAULT_CURRENCY = LANGUAGE_CURRENCIES[DEFAULT_LANGUAGE];
