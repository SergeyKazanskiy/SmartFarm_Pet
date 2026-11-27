/*
Этот файл содержит предустановленные цветовые схемы для темы приложения.
Каждая схема включает в себя иконку, оттенок (hue), светлоту (lightness) и насыщенность (chroma).
*/

export const PRESETS = {
  ocean:  { icon: "🌊", hue: 220, lightness: 0.55, chroma: 0.15 },
  sunset: { icon: "🌅", hue: 20,  lightness: 0.60, chroma: 0.18 },
  forest: { icon: "🌿", hue: 145, lightness: 0.50, chroma: 0.12 },
  violet: { icon: "🔮", hue: 285, lightness: 0.55, chroma: 0.17 },
  rose:   { icon: "🌸", hue: 350, lightness: 0.65, chroma: 0.14 },
} as const;

export type PresetKey = keyof typeof PRESETS;