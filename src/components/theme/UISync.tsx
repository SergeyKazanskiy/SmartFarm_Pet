// Мост стор → CSS. Брат ThemeSync (тот отвечает за цвета).
// Работает синхронно с useUIStore: множители → :root, материал → data-атрибут,
// эффекты → data-атрибуты по слотам.

"use client";

import { useEffect } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { UI_SCALES } from "@/types/ui-scales";
import { EFFECT_SLOTS } from "@/types/effects";

/*
	Компонент, который синхронизирует состояние UI из zustand-хранилища в CSS-переменные и data-атрибуты.
	Используется в Layout.tsx.
*/

export function UISync() {
  const material = useUIStore((s) => s.material);
  const effects = useUIStore((s) => s.effects);
  const scales = useUIStore((s) => s.scales);

  useEffect(() => {
    const root = document.documentElement;

    for (const s of UI_SCALES) {
      root.style.setProperty(s.cssVar, String(scales[s.key]));
    }

    root.setAttribute("data-material", material);

    for (const slot of EFFECT_SLOTS) {
      root.setAttribute(`data-effect-${slot.id}`, effects[slot.id]);
    }
  }, [material, effects, scales]);

  return null;
}