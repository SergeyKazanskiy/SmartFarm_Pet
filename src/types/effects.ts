// src/types/effects.ts
//
// Слоты состояний и эффекты, которые в них можно положить.
// Пользователь выбирает эффект per-slot глобально.
// Компонент решает, к каким слотам он подключается.

export type EffectSlot = "hover" | "focus" | "pressed";

export type EffectId =
  | "none"
  | "glow"
  | "shimmer"
  | "iridescence"
  | "pulse"
  | "press";

export interface EffectEntry {
  id: EffectId;
  labelKey: string;
  /** Слоты, в которых эффект имеет смысл. */
  slots: EffectSlot[];
}

export interface EffectSlotEntry {
  id: EffectSlot;
  labelKey: string;
}

export const EFFECT_SLOTS: EffectSlotEntry[] = [
  { id: "hover",   labelKey: "effectSlots.hover" },
  { id: "focus",   labelKey: "effectSlots.focus" },
  { id: "pressed", labelKey: "effectSlots.pressed" },
];

export const EFFECTS: EffectEntry[] = [
  { id: "none",        labelKey: "effects.none",        slots: ["hover", "focus", "pressed"] },
  { id: "glow",        labelKey: "effects.glow",        slots: ["hover", "focus", "pressed"] },
  { id: "shimmer",     labelKey: "effects.shimmer",     slots: ["hover"] },
  { id: "iridescence", labelKey: "effects.iridescence", slots: ["hover"] },
  { id: "pulse",       labelKey: "effects.pulse",       slots: ["hover"] },
  { id: "press",       labelKey: "effects.press",       slots: ["pressed"] },
];