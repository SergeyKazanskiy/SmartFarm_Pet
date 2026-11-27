"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { buttonBaseClass, buttonSizeClass, type ButtonSize } from "./shared";

/*
	Button — компонент кнопки с семантическими вариантами (primary, secondary, outline, ghost, link).
	Использует токены темы для цвета и фона.
	Эффекты hover/focus/pressed подключаются через data-interactive и глобальные стили.
	Размер кнопки задаётся через size (sm, md, lg).
	Можно передать дополнительные props для <button>.
*/

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  interactive?: boolean; // Подключён к глобальным hover/focus/pressed эффектам
  children?: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] " +
    "border border-[var(--color-border)] hover:bg-[var(--color-muted)]",
  outline:
    "bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] " +
    "hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]",
  ghost:
    "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
  link:
    "bg-transparent text-[var(--color-primary)] underline-offset-4 " +
    "hover:underline h-auto px-0 py-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      interactive = true,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    // link не участвует в эффектах (странно светится)
    const isInteractive = interactive && variant !== "link" && !disabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        data-interactive={isInteractive ? "" : undefined}
        className={cn(
          buttonBaseClass,
          variant !== "link" && buttonSizeClass[size],
          variantClass[variant],
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);