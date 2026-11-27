// src/components/ui/Button/shared.ts
import { cn } from "@/utils/cn";

export type ButtonSize = "sm" | "md" | "lg";

export const buttonSizeClass: Record<ButtonSize, string> = {
  sm: "h-control-sm px-3 text-sm gap-1.5",
  md: "h-control-md px-4 text-sm gap-2",
  lg: "h-control-lg px-6 text-base gap-2.5",
};

/** База: без цвета/фона. Только структура и поведение. */
export const buttonBaseClass = cn(
  "inline-flex items-center justify-center whitespace-nowrap",
  "rounded-[var(--radius-md)]",
  "font-[var(--font-weight-medium)]",
  "cursor-pointer transition-all",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-[var(--color-primary)]",
);