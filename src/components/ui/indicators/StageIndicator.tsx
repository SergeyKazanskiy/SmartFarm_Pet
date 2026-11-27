"use client";

import type { ReactNode } from "react";
import { STAGE_COLORS, type StageKey } from "@/types/stage-colors";

// Обёртка над кнопкой (или любым элементом) — кружок стадии в правом
// верхнем углу. Кружок лежит НАД элементом (z-10, pointer-events: none).
//
// Если stage не передан — просто рендерит children без обёртки.
// Цвет — из STAGE_COLORS (статический, не из настроек).

interface StageIndicatorProps {
  stage?: StageKey;
  children: ReactNode;
}

export function StageIndicator({ stage, children }: StageIndicatorProps) {
  if (!stage) return <>{children}</>;

  return (
    <span className="relative inline-flex">
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-0.5 -top-0.5 z-10",
          "h-2.5 w-2.5 rounded-full",
          "ring-2 ring-[var(--color-background)]",
        )}
        style={{ backgroundColor: STAGE_COLORS[stage] }}
      />
    </span>
  );
}

import { cn } from "@/utils/cn";