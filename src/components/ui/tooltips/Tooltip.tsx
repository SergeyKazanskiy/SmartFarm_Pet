"use client";

import type { FocusEvent, MouseEvent, ReactNode } from "react";
import { useTooltip } from "@/providers/TooltipProvider";

/*
	Tooltip — компонент, который оборачивает кнопку (или любой элемент) и показывает tooltip при наведении мыши или фокусе.
	Использует контекст TooltipProvider для управления состоянием tooltip'а.
	Если content пуст — рендерит children без обёртки.
*/

interface TooltipProps {
  id: string;
  content?: string;
  onTooltipClick?: (id: string) => void;
  children: ReactNode;
}

export function Tooltip({ id, content, onTooltipClick, children }: TooltipProps) {
  const { show, scheduleHide, cancelHide } = useTooltip();

  if (!content) return <>{children}</>;

  const open = (e: MouseEvent<HTMLSpanElement> | FocusEvent<HTMLSpanElement>) => {
    show({ id, content, rect: e.currentTarget.getBoundingClientRect(), onTooltipClick });
  };

  return (
    <span
      className="inline-flex"
      onMouseEnter={open}
      onMouseLeave={scheduleHide}
      onFocus={open}
      onBlur={scheduleHide}
    >
      {children}
    </span>
  );
}