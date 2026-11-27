"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useUIStore } from "@/stores/useUIStore";
import { isCrystalMaterial, type ContainerFamily } from "@/types/materials";
import { buttonBaseClass, buttonSizeClass, type ButtonSize } from "./shared";

/*
	MaterialButton — декоративная кнопка с материалом поверхности.
	material: stone | glass | crystal (без metal/wood — они для Plate/Surface).
	Фон/бордер/тень/текст из data-material. crystal → .surface-crystal (фасеты).
	Эффекты (hover/focus/pressed) через data-interactive.
*/

export type ButtonMaterial = Extract<ContainerFamily, "stone" | "glass"> | "crystal"; // Только эти семейства имеют смысл для кнопок

interface MaterialButtonProps extends ComponentPropsWithoutRef<"button"> {
  material?: ButtonMaterial;
  size?: ButtonSize;
  children?: ReactNode;
}

export const MaterialButton = forwardRef<HTMLButtonElement, MaterialButtonProps>(
  function MaterialButton(
    { material = "stone", size = "md", disabled, className, children, ...rest },
    ref,
  ) {
    const familyVariants = useUIStore((s) => s.materialFamilyVariants);
    const materialId = familyVariants[material];
    const isCrystal = isCrystalMaterial(materialId);

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        data-material={materialId}
        data-interactive={disabled ? undefined : ""}
        className={cn(
          buttonBaseClass,
          buttonSizeClass[size],
          "border border-[var(--surface-border,var(--color-border))]",
          "shadow-[var(--surface-shadow,var(--shadow-sm))]",
          "bg-[var(--surface-bg,var(--color-surface))]",
          "text-[var(--surface-fg,var(--color-foreground))]",
          "hover:brightness-110 active:brightness-95",
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
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  },
);