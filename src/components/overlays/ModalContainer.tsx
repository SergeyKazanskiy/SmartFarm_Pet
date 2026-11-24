"use client";

import type { ReactNode } from "react";
import type { ModalSize } from "@/stores/useOverlayStore";

/*
	Компонент контейнера для модальных окон.
	Используется в OverlayRenderer.tsx.
*/

type Props = {
  children: ReactNode;
  size: ModalSize;
};

const sizes: Record<ModalSize, string> = {
  xs: "max-w-[400px]",
  sm: "max-w-[560px]",
  md: "max-w-[760px]",
  lg: "max-w-[1000px]",
  xl: "max-w-[1200px]",
};

export default function ModalContainer({ children, size }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`flex max-h-full w-full ${sizes[size]} flex-col overflow-hidden rounded-xl border bg-background shadow-2xl`}>
        {children}
      </div>
    </div>
  );
}