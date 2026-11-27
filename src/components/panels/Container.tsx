"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useMaterialStyle } from "@/hooks/useMaterialStyle";
import type { ContainerFamily, MaterialId } from "@/types/materials";

/*
	Декоративный блок с контентом.
	material: metal | wood | stone | glass (без crystal — только у кнопок).
	relief: raised | sunken | flat (тень/вдавленность).
	Фон/бордер/тень/текст из data-material. crystal → .surface-crystal (фасеты).
	Можно передать дополнительные props для <div>.
*/

export type ContainerRelief = "raised" | "sunken" | "flat";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  material?: ContainerFamily; // Семейство материала. Без него — нейтральный фон темы
  materialOverride?: MaterialId; // Конкретный материал (escape-hatch)
  relief?: ContainerRelief; // Тень/вдавленность. Без него — тень по умолчанию (raised)
  children?: ReactNode;
}

const reliefClass: Record<ContainerRelief, string> = {
  raised: "shadow-[var(--elevation-2)]",
  sunken: "shadow-[var(--recess-md)]",
  flat:   "shadow-none",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { material, materialOverride, relief, className, children, ...rest },
    ref,
  ) {
    const { materialId, hasMaterial, style } = useMaterialStyle(material, materialOverride);

    const shadowClass = relief
      ? reliefClass[relief]
      : hasMaterial
        ? "shadow-[var(--surface-shadow,var(--shadow-sm))]"
        : "shadow-sm";

    return (
      <div
        ref={ref}
        data-material={materialId}
        className={cn(
          "relative rounded-lg border p-4",
          "border-[var(--surface-border,var(--color-border))]",
          "bg-[var(--surface-bg,var(--color-surface))]",
          "text-[var(--surface-fg,var(--color-foreground))]",
          shadowClass,
          className,
        )}
        style={style}
        {...rest}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);