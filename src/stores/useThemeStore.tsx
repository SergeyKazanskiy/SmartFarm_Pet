import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRESETS, type PresetKey } from "@/types/theme-presets";

/*
	ThemeStore — zustand-store для управления темой приложения.
	Хранит параметры темы (hue, lightness, chroma) и позволяет применять пресеты.
*/

interface ThemeState {
  hue: number;
  lightness: number;
  chroma: number;

  setHue: (val: number) => void;
  setLightness: (val: number) => void;
  setChroma: (val: number) => void;
  applyPreset: (key: PresetKey) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      hue: 250,
      lightness: 0.6,
      chroma: 0.18,

      setHue: (hue) => set({ hue }),
      setLightness: (lightness) => set({ lightness }),
      setChroma: (chroma) => set({ chroma }),

      applyPreset: (key) => {
        const { hue, lightness, chroma } = PRESETS[key];
        set({ hue, lightness, chroma });
      },
    }),
    { name: "app-theme-hue" }
  )
);