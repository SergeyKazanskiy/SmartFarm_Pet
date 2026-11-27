// src/types/stage-colors.ts
//
// Статические цвета индикаторов стадии.
// Не зависят от темы и пользовательских настроек.
// Используются в StageIndicator.

export const STAGE_COLORS = {
    pending: "#9ca3af",   // серый — не начата
    planned: "#60a5fa",   // голубой — запланирована
    active:  "#f59e0b",   // янтарный — в работе
    done:    "#10b981",   // зелёный — завершена
    error:   "#ef4444",   // красный — ошибка
  } as const;
  
  export type StageKey = keyof typeof STAGE_COLORS;