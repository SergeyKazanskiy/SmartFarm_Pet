import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "@/types/languages";

/*
  Хранение состояния выбранного языка.
  Используется в приложении для управления языком интерфейса.
*/

type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "ru",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "smartfarm-language",
    }
  )
);

