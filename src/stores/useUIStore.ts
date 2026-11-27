"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_MATERIAL_VARIANTS, type MaterialId, type MaterialFamily, type MaterialFamilyVariants } from "@/types/materials";
import type { EffectId, EffectSlot } from "@/types/effects";
import { UI_SCALES, type UIScaleKey } from "@/types/ui-scales";
import { PALETTES, DEFAULT_PALETTE_ID } from "@/types/palettes";

// Настройки пользователя: материал, эффекты по слотам, множители, палитра.
// Persist в localStorage. UISync читает и пишет в CSS.

interface UIState {
  material: MaterialId; // Глобальный материал для Panel и других нейтральных контейнеров
  materialFamilyVariants: MaterialFamilyVariants; // Вариант для каждого семейства. Используется Plate / Surface / Button
  effects: Record<EffectSlot, EffectId>;
  scales: Record<UIScaleKey, number>;
  activePaletteId: string | null;

  setMaterial: (id: MaterialId) => void;
  setFamilyVariant: (family: MaterialFamily, id: MaterialId) => void;
  setEffect: (slot: EffectSlot, id: EffectId) => void;
  setScale: (key: UIScaleKey, value: number) => void;
  applyPalette: (id: string) => void;
  resetAll: () => void;
}

// Значения по умолчанию для эффектов и множителей, если палитра их не задаёт.
const DEFAULT_SCALES = Object.fromEntries(UI_SCALES.map((s) => [s.key, s.defaultValue])) as Record<UIScaleKey, number>;
const DEFAULT_EFFECTS: Record<EffectSlot, EffectId> = { hover: "none", focus: "none", pressed: "none"};

// Возвращает состояние UI, соответствующее палитре. Если палитра не найдена, берёт первую.
function paletteState(paletteId: string): Pick<UIState, "material" | "materialFamilyVariants" | "effects" | "scales" | "activePaletteId"> {
  const p = PALETTES.find((x) => x.id === paletteId) ?? PALETTES[0];
  return {
    material: p.material,
    materialFamilyVariants: { ...DEFAULT_MATERIAL_VARIANTS },
    effects: { ...DEFAULT_EFFECTS, ...p.effects },
    scales: { ...DEFAULT_SCALES, ...p.scales },
    activePaletteId: p.id,
  };
}

export const useUIStore = create<UIState>()(

  persist(
    (set) => ({
      ...paletteState(DEFAULT_PALETTE_ID),
      

      setMaterial: (id) => set({ material: id, activePaletteId: null }),

      setFamilyVariant: (family, id) =>
        set((s) => ({
            materialFamilyVariants: { ...s.materialFamilyVariants, [family]: id },
            activePaletteId: null,
        })),

      setEffect: (slot, id) =>
        set((s) => ({
          effects: { ...s.effects, [slot]: id },
          activePaletteId: null,
        })),

      setScale: (key, value) =>
        set((s) => ({
          scales: { ...s.scales, [key]: value },
          activePaletteId: null,
        })),

      applyPalette: (id) => set(paletteState(id)),

      resetAll: () => set(paletteState(DEFAULT_PALETTE_ID)),
    }),
    { name: "smartfarm-ui" },
  ),
);