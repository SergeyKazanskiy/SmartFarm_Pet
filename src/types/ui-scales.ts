// src/types/ui-scales.ts
//
// Множители, которые пользователь крутит слайдерами.
// Значения из @theme (globals.css) умножаются на них.
// Влияют на ВСЕ компоненты сразу — согласованность сохраняется.

export type UIScaleKey =
  | "radius" | "shadow" | "elevation" | "recess"
  | "speed" | "intensity" | "weight" | "shift";

export interface UIScaleDef {
  key: UIScaleKey;
  labelKey: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  /** CSS-переменная, которую пишет UISync на :root. */
  cssVar: string;
}

export const UI_SCALES: UIScaleDef[] = [
  { key: "radius",    labelKey: "scales.radius",    min: 0,    max: 2.5, step: 0.05, defaultValue: 1, cssVar: "--radius-scale"    },
  { key: "shadow",    labelKey: "scales.shadow",    min: 0,    max: 3,   step: 0.05, defaultValue: 1, cssVar: "--shadow-scale"    },
  { key: "elevation", labelKey: "scales.elevation", min: 0,    max: 3,   step: 0.05, defaultValue: 1, cssVar: "--elevation-scale" },
  { key: "recess",    labelKey: "scales.recess",    min: 0,    max: 3,   step: 0.05, defaultValue: 1, cssVar: "--recess-scale"    },
  { key: "speed",     labelKey: "scales.speed",     min: 0.25, max: 3,   step: 0.05, defaultValue: 1, cssVar: "--speed-scale"     },
  { key: "intensity", labelKey: "scales.intensity", min: 0,    max: 2,   step: 0.05, defaultValue: 1, cssVar: "--intensity-scale" },
  { key: "weight",    labelKey: "scales.weight",    min: 0.8,  max: 1.3, step: 0.05, defaultValue: 1, cssVar: "--weight-scale"    },
  { key: "shift",     labelKey: "scales.shift",     min: 0,    max: 2,   step: 0.05, defaultValue: 1, cssVar: "--shift-scale"     },
];