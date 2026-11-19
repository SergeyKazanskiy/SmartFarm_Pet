"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/*
    Это компонент, который создает "транспорт" (track) для выдвижной панели.
    Он сдвигается влево или вправо в зависимости от состояния leftOpen.
    duration задает длительность анимации в миллисекундах.
*/

type SlidingTrackProps = {
  leftOpen: boolean;
  duration: number;
  className?: string;
  children: ReactNode;
};

export function SlidingTrack({ leftOpen, duration, className, children }: SlidingTrackProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 shrink-0 transition-transform ease-out",
        leftOpen ? "translate-x-0" : "-translate-x-[var(--nav-w)]",
        className,
      )}
      style={{
        width: "calc(100% + var(--nav-w))",
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}