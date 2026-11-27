// src/types/palettes.ts
//
// 5 фиксированных палитр. Каждая — пресет материала + эффектов + множителей.
// Применение палитры перезаписывает все три группы разом.

import type { MaterialId } from "./materials";
import type { EffectId, EffectSlot } from "./effects";
import type { UIScaleKey } from "./ui-scales";

export interface Palette {
  id: string;
  labelKey: string;
  material: MaterialId;
  effects: Partial<Record<EffectSlot, EffectId>>;
  scales: Partial<Record<UIScaleKey, number>>;
}

export const PALETTES: Palette[] = [
  {
    id: "minimal",
    labelKey: "palettes.minimal",
    material: "metal-silver",
    effects: { hover: "none", focus: "none", pressed: "none" },
    scales: { radius: 0.3, shadow: 0, elevation: 0, recess: 0, intensity: 0.4, weight: 0.9, shift: 0.4, speed: 1 },
  },
  {
    id: "classic",
    labelKey: "palettes.classic",
    material: "metal-silver",
    effects: { hover: "glow", focus: "glow", pressed: "press" },
    scales: { radius: 1, shadow: 1, elevation: 1, recess: 1, intensity: 1, weight: 1, shift: 1, speed: 1 },
  },
  {
    id: "luxury",
    labelKey: "palettes.luxury",
    material: "metal-gold",
    effects: { hover: "iridescence", focus: "glow", pressed: "glow" },
    scales: { radius: 1.2, shadow: 1.5, elevation: 1.5, recess: 0.8, intensity: 1.5, weight: 1.1, shift: 1.2, speed: 0.8 },
  },
  {
    id: "natural",
    labelKey: "palettes.natural",
    material: "wood-light-brown",
    effects: { hover: "glow", focus: "glow", pressed: "press" },
    scales: { radius: 1.8, shadow: 0.8, elevation: 0.5, recess: 1.5, intensity: 0.9, weight: 1, shift: 1, speed: 1.2 },
  },
  {
    id: "stone",
    labelKey: "palettes.stone",
    material: "stone-marble",
    effects: { hover: "pulse", focus: "glow", pressed: "press" },
    scales: { radius: 0.6, shadow: 0.5, elevation: 0.5, recess: 1.2, intensity: 0.7, weight: 1.05, shift: 0.8, speed: 1.1 },
  },
];

export const DEFAULT_PALETTE_ID = "classic";