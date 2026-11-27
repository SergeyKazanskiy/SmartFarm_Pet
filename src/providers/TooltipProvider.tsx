"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

/*
	TooltipProvider — компонент, который оборачивает приложение и предоставляет контекст для управления tooltip'ами.
	Использует createPortal для рендеринга tooltip'ов в body, чтобы они не были ограничены overflow родительских элементов.
	Позиционирует tooltip относительно триггера с учетом размеров viewport и отступов.
	Закрывает tooltip при скролле, клике вне tooltip, нажатии Escape или уходе мыши с триггера (с задержкой).
*/

export interface TooltipPayload {
  id: string;
  content: string;
  rect: DOMRect;
  onTooltipClick?: (id: string) => void;
}

interface TooltipContextValue {
  show: (payload: TooltipPayload) => void;
  scheduleHide: () => void;
  cancelHide: () => void;
}

// Контекст для управления tooltip'ами. Используется в триггерах (hover/focus/press).
const TooltipContext = createContext<TooltipContextValue | null>(null);

// Хук для доступа к контексту tooltip'ов. Выбрасывает ошибку, если используется вне TooltipProvider.
export function useTooltip() {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error("useTooltip must be used within <TooltipProvider>");
  return ctx;
}

const GAP = 6; // Расстояние между триггером и тултипом
const VIEWPORT_MARGIN = 8; // Минимальный отступ тултипа от границ viewport
const HIDE_DELAY = 150; // Задержка перед скрытием тултипа после ухода мыши с триггера

// TooltipProvider — компонент, который оборачивает приложение и предоставляет контекст для управления tooltip'ами.
export function TooltipProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TooltipPayload | null>(null);
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	// Монтируемся после первого рендера, чтобы избежать SSR/CSR mismatch при использовании createPortal.
  useEffect(() => setMounted(true), []);

	// Скрытие тултипа. Очищаем таймер, чтобы избежать гонки с scheduleHide.
  const hide = useCallback(() => {
    clearTimeout(hideTimer.current);
    setState(null);
  }, []);

	// Показ тултипа. Очищаем таймер, чтобы избежать гонки с scheduleHide.
  const show = useCallback((payload: TooltipPayload) => {
    clearTimeout(hideTimer.current);
    setState(payload);
  }, []);

	// Планирование скрытия тултипа с задержкой. Используется при уходе мыши с триггера.
  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(hide, HIDE_DELAY);
  }, [hide]);

	// Отмена планирования скрытия тултипа. Используется при наведении мыши на тултип.
  const cancelHide = useCallback(() => {
    clearTimeout(hideTimer.current);
  }, []);

  // Стабильный context — чтобы триггеры не ре-рендерились при state change
  const ctx = useMemo(
    () => ({ show, scheduleHide, cancelHide }),
    [show, scheduleHide, cancelHide],
  );

  // Позиционирование до paint — без мигания
  useLayoutEffect(() => {
    if (!state || !tooltipRef.current) return;
    const el = tooltipRef.current;
    const tip = el.getBoundingClientRect();
    const trigger = state.rect;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // По вертикали: сверху, если не помещается — снизу, клампим по границам
    let top = trigger.top - tip.height - GAP;
    if (top < VIEWPORT_MARGIN) top = trigger.bottom + GAP;
    if (top + tip.height > vh - VIEWPORT_MARGIN) {
      top = vh - tip.height - VIEWPORT_MARGIN;
    }

    // По горизонтали: по центру триггера, клампим по границам viewport
    let left = trigger.left + trigger.width / 2 - tip.width / 2;
    if (left < VIEWPORT_MARGIN) left = VIEWPORT_MARGIN;
    if (left + tip.width > vw - VIEWPORT_MARGIN) {
      left = vw - tip.width - VIEWPORT_MARGIN;
    }

		// Устанавливаем позицию и делаем тултип видимым
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.visibility = "visible";
  }, [state]);

  // Закрытие: scroll / click outside / Escape
  useEffect(() => {
    if (!state) return; // Если тултип не открыт, не нужно вешать обработчики

		// Закрытие тултипа при скролле, клике вне тултипа или нажатии Escape
    const onScroll = () => hide();
    const onMouseDown = (e: MouseEvent) => {
      if (tooltipRef.current?.contains(e.target as Node)) return;
      hide();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };

		// Вешаем обработчики на window/document, чтобы закрывать тултип при скролле, клике вне тултипа или нажатии Escape
    window.addEventListener("scroll", onScroll, true);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [state, hide]);

  return (
    <TooltipContext.Provider value={ctx}>
      {children}
      {mounted && state &&
        createPortal(
          <div ref={tooltipRef} role="tooltip"
            onMouseEnter={cancelHide}
            onMouseLeave={scheduleHide}
            onClick={() => {
              state.onTooltipClick?.(state.id);
              hide();
            }}
            className={cn(
              "fixed z-[9999] whitespace-nowrap",
              "rounded-[var(--radius-sm)] px-2 py-1 text-xs",
              "bg-[var(--color-foreground)] text-[var(--color-background)]",
              "shadow-[var(--shadow-md)]",
              state.onTooltipClick
                ? "cursor-pointer hover:opacity-90"
                : "cursor-default",
            )}
            style={{ visibility: "hidden", top: -9999, left: -9999 }}
          >
            {state.content}
          </div>,
          document.body,
        )}
    </TooltipContext.Provider>
  );
}