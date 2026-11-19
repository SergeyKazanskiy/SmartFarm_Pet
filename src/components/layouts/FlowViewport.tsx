"use client";

import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/*
    Это компонент, который создает область просмотра (viewport) для основного контента.
    Он учитывает открытые боковые панели слева и справа и изменяет свою ширину с анимацией.
    duration задает длительность анимации в миллисекундах.
*/

type FlowViewportProps = {
  leftOpen: boolean;
  rightOpen: boolean;
  duration: number;
  className?: string;
  children: ReactNode;
};

export function FlowViewport({ leftOpen, rightOpen, duration, className, children }: FlowViewportProps) {
  return (
    <div
      className={cn(
        "h-full min-w-0 overflow-auto [scrollbar-gutter:stable]",
        rightOpen && "pr-[var(--props-w)]",
        className,
      )}
      style={{
        // 100% трека = W+N. leftOpen → W−N, иначе W.
        width: leftOpen
          ? "calc(100% - var(--nav-w) * 2)"
          : "calc(100% - var(--nav-w))",
        // открытие → задержка (сужаем после слайда); закрытие → сразу
        transition: leftOpen
          ? `width 0ms linear ${duration}ms`
          : "width 0ms linear 0ms",
      }}
    >
      {children}
    </div>
  );
}