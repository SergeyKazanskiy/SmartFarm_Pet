"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/*
	Это компонент, который создает выдвижной боковой панель (drawer) с анимацией.
	Он может быть закреплен слева или справа и управляется пропсом open.
	duration задает длительность анимации в миллисекундах.
*/

type SlidingDrawerProps = {
  side?: "left" | "right";
  open: boolean;
  duration: number;
  className?: string;
  children: ReactNode;
};

export function SlidingDrawer({ side = "right", open, duration, className, children }: SlidingDrawerProps) {
  return (
    <div
      className={cn(
        "absolute inset-y-0 z-10 w-[var(--props-w)] transition-transform ease-out",
        side === "right" ? "right-0" : "left-0",
        open ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full",
        className,
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      <aside
        className={cn(
          "flex h-full flex-col overflow-y-auto bg-background",
          side === "right" ? "border-l border-border" : "border-r border-border",
        )}
      >
        {children}
      </aside>
    </div>
  );
}