import type { Locale } from "./i18n-config";

const dictionaries = {
  en: () => import("../../messages/en.json").then((m) => m.default),
  ar: () => import("../../messages/ar.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) =>
  (dictionaries[locale] ?? dictionaries.en)();

export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;
