"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useMaterialStyle } from "@/hooks/useMaterialStyle";
import type { ContainerFamily, MaterialId } from "@/types/materials";

/*
	Surface — декоративная "поверхность" с материалом.
	material: metal | wood | stone | glass | crystal.
	Фон/бордер/тень/текст из data-material. crystal → .surface-crystal (фасеты).
	Можно передать дополнительные props для <div>.
*/

interface SurfaceProps extends ComponentPropsWithoutRef<"div"> {
  material?: ContainerFamily;
  materialOverride?: MaterialId;
  children?: ReactNode;
}

export function Surface({
  material = "wood",
  materialOverride,
  className,
  children,
  ...rest
}: SurfaceProps) {
  const { materialId, style } = useMaterialStyle(material, materialOverride);

  return (
    <div
      data-material={materialId}
      className={cn(
        "relative h-full w-full",
        "bg-[var(--surface-bg,var(--color-surface))]",
        "text-[var(--surface-fg,var(--color-foreground))]",
        className,
      )}
      style={style}
      {...rest}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}