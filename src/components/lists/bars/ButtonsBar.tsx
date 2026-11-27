"use client";

import { Button } from "@/components/ui/buttons/Button";
import { MaterialButton } from "@/components/ui/buttons/MaterialButton";
import { StageIndicator } from "@/components/ui/indicators/StageIndicator";
import { cn } from "@/utils/cn";
import type { SelectItem, StageItem } from "@/types/array-types";
import { useTranslations } from "@/hooks/useTranslations";
import { Tooltip } from "@/components/ui/tooltips/Tooltip";

/*
  Панель кнопок с индикаторами стадий.
  Используется в списках и формах для выбора одного из вариантов.
  Может быть горизонтальной или вертикальной, с обычным или вертикальным текстом.
  Может использовать обычные кнопки или MaterialButton (камень).
*/ 

interface ButtonsBarProps {
  label?: string; // Для разработчика: назначение панели. Не рендерится.
  flowDirection?: "horizontal" | "vertical"; // Направление стека кнопок (row / column)
  textDirection?: "horizontal" | "vertical"; // Ориентация текста внутри кнопки (обычный / вертикальный)
  material?: boolean; // true → MaterialButton (камень), false/undefined → Button
  items: SelectItem[]; // Список кнопок (id, name)
  stages?: StageItem[]; // Опциональные стадии (id совпадает с item.id)
  selectedId: string | null; // Выбранная кнопка (id из items). null → ничего не выбрано.
  onClick: (id: string) => void;
  onTooltipClick?: (id: string) => void;
  localePath?: string; // Базовый путь локализации. Для item.id = "general" ищет `${localePath}.general.name` и `${localePath}.general.tooltip`.
  className?: string;
}

interface LocaleEntry {
  name?: string;
  tooltip?: string;
}

export function ButtonsBar({ flowDirection = "horizontal", textDirection = "horizontal", material = false,
  items, stages, selectedId, onClick, onTooltipClick, localePath, className }: ButtonsBarProps) {

  const t = useTranslations(localePath);

  const stageMap = stages ? new Map(stages.map((s) => [s.id, s.stage])) : null;

  const isVerticalFlow = flowDirection === "vertical";
  const isVerticalText = textDirection === "vertical";
  const verticalTextButtonClass = isVerticalText ? "h-auto px-2 py-3" : "";

  return (
    <div
      className={cn(
        "inline-flex gap-1",
        isVerticalFlow ? "flex-col items-stretch" : "flex-row items-center",
        className,
      )}
    >
      {items.map((item) => {
        const stage = stageMap?.get(item.id);
        const isSelected = item.id === selectedId;

        // Локализация: t.path(item.id) → { name, tooltip } (если localePath задан).
        // Fallback — item.name / item.tooltip.
        const entry = localePath
          ? t.obj<LocaleEntry>(item.id)
          : undefined;

        const displayName = entry?.name ?? item.name;
        const tooltipText = entry?.tooltip ?? item.tooltip;

        const content = (
          <span className={cn(isVerticalText && "[writing-mode:vertical-rl]")}>
            {displayName}
          </span>
        );

        const buttonNode = material ? (
          <MaterialButton
            material="stone"
            size="md"
            onClick={() => onClick(item.id)}
            aria-pressed={isSelected}
            className={cn(
              verticalTextButtonClass,
              isSelected && "ring-2 ring-[var(--color-primary)]",
            )}
          >
            {content}
          </MaterialButton>
        ) : (
          <Button
            variant={isSelected ? "primary" : "ghost"}
            size="md"
            onClick={() => onClick(item.id)}
            aria-pressed={isSelected}
            className={verticalTextButtonClass}
          >
            {content}
          </Button>
        );

        const withTooltip = tooltipText ? (
          <Tooltip
            id={item.id}
            content={tooltipText}
            onTooltipClick={onTooltipClick}
          >
            {buttonNode}
          </Tooltip>
        ) : (
          buttonNode
        );

        return (
          <StageIndicator key={item.id} stage={stage}>
            {withTooltip}
          </StageIndicator>
        );
      })}
    </div>
  );
}