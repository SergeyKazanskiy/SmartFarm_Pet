import { create } from "zustand";
import { persist } from "zustand/middleware";

/* 
	Настройки приложения (UI, UX, поведение компонентов и т.д.)
	Хранение настроек в localStorage через zustand/persist
	Ключевой момент: onRehydrateStorage → setHasHydrated(true)
*/

type SettingsState = {
  _hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  drawerWidth: number;
  drawerDuration: number;
  // … остальные настройки
  setDrawerWidth: (w: number) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),
      drawerWidth: 240,      // дефолт
      drawerDuration: 300,   // дефолт
      setDrawerWidth: (w) => set({ drawerWidth: w }),
    }),
    {
      name: "smartfarm-settings",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);  // ← ключевой момент
      },
    }
  )
);