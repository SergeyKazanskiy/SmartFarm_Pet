// src/hooks/ui/useMaterialStyle.ts
"use client";

import type { CSSProperties } from "react";
import { useUIStore } from "@/stores/useUIStore";
import {
  isCrystalMaterial,
  NO_MATERIAL,
  type MaterialFamily,
  type MaterialId,
  type NoMaterial,
} from "@/types/materials";

interface MaterialStyleResult {
  /** Есть ли материал (задан family или override). */
  hasMaterial: boolean;
  /** Резолвнутый материал. Для нейтрального режима — "none". */
  materialId: MaterialId | NoMaterial;
  /** true только если crystal. Для Button. Container/Surface не читают. */
  isCrystal: boolean;
  /** backdrop-filter для glass, undefined для нейтрального/не-glass. */
  style: CSSProperties | undefined;
}

/**
 * Резолвит материал.
 * family — семейство (пользователь выбирает вариант в настройках).
 * override — конкретный материал (escape-hatch).
 * Если ничего не задано — нейтральный режим (materialId = "none").
 */

export function useMaterialStyle(family?: MaterialFamily, override?: MaterialId): MaterialStyleResult {
  const familyVariants = useUIStore((s) => s.materialFamilyVariants);
  const hasMaterial = Boolean(family || override);

  const materialId: MaterialId | NoMaterial = override
    ?? (family ? familyVariants[family] : NO_MATERIAL);

  return {
    hasMaterial,
    materialId,
    isCrystal: hasMaterial && isCrystalMaterial(materialId as MaterialId),
    style: hasMaterial
      ? {
          backdropFilter: "var(--surface-backdrop, none)",
          WebkitBackdropFilter: "var(--surface-backdrop, none)",
        }
      : undefined,
  };
}