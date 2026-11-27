import { useLanguageStore } from '@/stores/useLanguageStore';
import ru from "@/locales/ru.json";
import en from "@/locales/en.json";
import uk from "@/locales/uk.json";

/*
  Хук для получения переводов на основе текущего выбранного языка.
*/

const translations = { ru, en, uk };

type Dict = Record<string, unknown>;

/** Резолв по точкам: "categories.general.name" → "Общее". */
function resolvePath(dict: Dict, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Dict)) {
      return (acc as Dict)[key];
    }
    return undefined;
  }, dict);
}

export interface Translator {
  [section: string]: unknown; // Все секции словаря: t.flows, t.views, t.categories
  path: (key: string) => unknown; // Узел по пути (строка | объект | undefined)
  str: (key: string) => string | undefined; // Гарантированно строка (или undefined)
  obj: <T = Dict>(key: string) => T | undefined; // Узел с типом T (для объектов)
}

/**
 * Хук переводов.
 * @param namespace — опциональный префикс. Если задан, t.path("general")
 *   ищет "namespace.general". Свойства (t.flows, t.views) — без префикса.
 */

export const useTranslations = (namespace?: string): Translator => {
  const { language } = useLanguageStore();
  const dict = translations[language] as Dict;

  const resolve = (key: string): unknown => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return resolvePath(dict, fullKey);
  };

  return {
    ...dict,
    path: resolve,
    str: (key) => {
      const v = resolve(key);
      return typeof v === "string" ? v : undefined;
    },
    obj: <T = Dict>(key: string) => {
      const v = resolve(key);
      return v && typeof v === "object" ? (v as T) : undefined;
    },
  };
};

/** Вне React (в actions, тестах). */
export const getT = (namespace?: string): Translator => {
  const lang = useLanguageStore.getState().language || "ru";
  const dict = translations[lang] as Dict;
  const resolve = (key: string): unknown => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return resolvePath(dict, fullKey);
  };
  return {
    ...dict,
    path: resolve,
    str: (key) => {
      const v = resolve(key);
      return typeof v === "string" ? v : undefined;
    },
    obj: <T = Dict>(key: string) => {
      const v = resolve(key);
      return v && typeof v === "object" ? (v as T) : undefined;
    },
  };
};

// import { useLanguageStore } from '@/stores/useLanguageStore';
// import ru from '@/translations/ru.json';
// import uk from '@/translations/uk.json';
// import en from '@/translations/en.json';

// /*
// * Хук для получения переводов на основе текущего выбранного языка.
// */

// const translations = { ru, en, uk };

// // Используйте этот хук в компонентах, чтобы получить доступ к переводам
// export const useTranslations = () => {
//   const { language } = useLanguageStore();
//   return translations[language];
// };

// // Если вам нужно получить переводы вне React-компонента, используйте эту функцию
// export const getT = () => {
//   const language = useLanguageStore.getState().language || 'ru'; 
//   return translations[language];
// };