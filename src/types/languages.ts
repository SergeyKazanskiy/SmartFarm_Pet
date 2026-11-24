/*
  Этот файл содержит типы и константы, связанные с поддерживаемыми языками в приложении.
  LANGUAGES - объект, содержащий информацию о поддерживаемых языках, включая их метки и флаги.
  Language - тип, представляющий ключи объекта LANGUAGES, то есть поддерживаемые языки.
*/

export const LANGUAGES = {
  ru: { label: "Русский", flag: "🇷🇺" },
  uk: { label: "Українська", flag: "🇺🇦" },
  en: { label: "English", flag: "🇬🇧" },
} as const;

export type Language = keyof typeof LANGUAGES;