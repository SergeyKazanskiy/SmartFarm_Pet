"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useMaterialStyle } from "@/hooks/useMaterialStyle";
import type { ContainerFamily, MaterialId } from "@/types/materials";

/*
	Plate — декоративная "плашка" с материалом поверхности.
	material: metal | wood | stone | glass | crystal.
	relief: raised | sunken | flat (тень/вдавленность).
	Фон/бордер/тень/текст из data-material. crystal → .surface-crystal (фасеты).
	Можно передать дополнительные props для <div>.
*/

export type PlateRelief = "raised" | "sunken" | "flat";

interface PlateProps extends ComponentPropsWithoutRef<"div"> {
  material?: ContainerFamily;
  materialOverride?: MaterialId;
  relief?: PlateRelief;
  children: ReactNode;
}

const reliefClass: Record<PlateRelief, string> = {
  raised: "shadow-[var(--elevation-1)]",
  sunken: "shadow-[var(--recess-sm)]",
  flat:   "shadow-none",
};

export function Plate({
  material = "metal",
  materialOverride,
  relief = "raised",
  className,
  children,
  ...rest
}: PlateProps) {
  const { materialId, style } = useMaterialStyle(material, materialOverride);

  return (
    <div
      data-material={materialId}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-[var(--radius-md)]",
        "border border-[var(--surface-border,var(--color-border))]",
        reliefClass[relief],
        "bg-[var(--surface-bg,var(--color-surface))]",
        "text-[var(--surface-fg,var(--color-foreground))]",
        "px-3 py-1",
        "text-xs uppercase tracking-wider",
        "font-[var(--font-weight-semibold)]",
        className,
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}