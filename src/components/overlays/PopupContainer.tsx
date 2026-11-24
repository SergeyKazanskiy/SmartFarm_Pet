"use client";

import type { ReactNode } from "react";
import type { PopupPosition } from "@/stores/useOverlayStore";

/*
	Компонент контейнера для popup-ов.
	Используется в OverlayRenderer.tsx.
*/

type Props = {
  children: ReactNode;
  position: PopupPosition;
};

const positions: Record<PopupPosition, string> = {
  left: "left-4",
  center: "left-1/2 -translate-x-1/2",
  right: "right-4",
};

export default function PopupContainer({ children, position }: Props) {
  return (
    <div className={`absolute top-20 z-30 ${positions[position]} max-h-[calc(100%-5rem)] max-w-[calc(100%-2rem)]`}>
      {children}
    </div>
  );
}