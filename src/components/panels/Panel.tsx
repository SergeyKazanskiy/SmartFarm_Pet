"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useUIStore } from "@/stores/useUIStore";
import { isCrystalMaterial, type MaterialId } from "@/types/materials";

/*
	Панель — композит: Surface + шапка + тело.
	Использование:
			• PropertiesPanel / ActionsPanel — карточка с заголовком и списком
			• Модалка — шапка (title + actions) + тело
			• Аккордеон — с collapsible
			• Групповой список — несколько Panel подряд
	
	Рельеф (relief) — форма тени:
			raised (по умолчанию) — выпуклая (elevation)
			sunken               — вдавленная (recess)
			flat                 — без тени
	Relief НЕ переопределяет цвета материала, только форму тени.
*/

export type PanelRelief = "raised" | "sunken" | "flat";

interface PanelProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title?: ReactNode; // Заголовок. Без него — панель без шапки (просто Surface)
  actions?: ReactNode; // Кнопки в правом углу шапки
  materialOverride?: MaterialId; // Переопределить материал для этого экземпляра
  relief?: PanelRelief; // Форма тени. По умолчанию — из материала (--surface-shadow)
  interactive?: boolean; // Подключён ли к глобальным hover/focus/pressed эффектам
  children?: ReactNode;
}

const reliefClass: Record<PanelRelief, string> = {
  raised: "shadow-[var(--elevation-2)]",
  sunken: "shadow-[var(--recess-md)]",
  flat: "shadow-none",
};

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  {
    title,
    actions,
    materialOverride,
    relief,
    interactive = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const globalMaterial = useUIStore((s) => s.material);
  const effectiveMaterial = materialOverride ?? globalMaterial;
  const isCrystal = isCrystalMaterial(effectiveMaterial);

  // Тень: relief (если задан) → иначе default материала
  const shadowClass = relief
    ? reliefClass[relief]
    : "shadow-[var(--surface-shadow,var(--shadow-sm))]";

  return (
    <div
      ref={ref}
      data-interactive={interactive ? "" : undefined}
      data-material={materialOverride}
      className={cn(
        "flex min-h-0 flex-col",
        "rounded-[var(--radius-lg)]",
        "border border-[var(--surface-border,var(--color-border))]",
        shadowClass,
        "bg-[var(--surface-bg,var(--color-surface))]",
        "text-[var(--surface-fg,var(--color-foreground))]",
        isCrystal && "surface-crystal",
        className,
      )}
      style={
        {
          backdropFilter: "var(--surface-backdrop, none)",
          WebkitBackdropFilter: "var(--surface-backdrop, none)",
        } as React.CSSProperties
      }
      {...rest}
    >
      {title && (
        <header
          className={cn(
            "relative z-10 flex shrink-0 items-center justify-between gap-2",
            "border-b border-[var(--surface-border,var(--color-border))]",
            "px-4 py-2",
          )}
        >
          <h2 className="truncate text-base font-[var(--font-weight-semibold)]">
            {title}
          </h2>
          {actions && (
            <div className="flex shrink-0 items-center gap-1">{actions}</div>
          )}
        </header>
      )}

      <div className="relative z-10 min-h-0 flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
});