"use client";

import { useEffect, type ReactNode } from "react";
import { useOverlayStore } from "@/stores/useOverlayStore";

import MainBackdrop from "./MainBackdrop";
import HeaderShield from "./HeaderShield";
import PopupContainer from "./PopupContainer";
import ModalContainer from "./ModalContainer";

/*
	Компонент провайдера для управления оверлеями.
	Используется в layout.tsx.
*/

type Props = {
  children: ReactNode;
};

export default function OverlayProvider({ children }: Props) {
  const activeOverlay = useOverlayStore((state) => state.activeOverlay);
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);

	// Обработчик нажатия клавиши Escape для закрытия активного оверлея.
  useEffect(() => {
    if (!activeOverlay) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => { window.removeEventListener("keydown", handleKeyDown);};

  }, [activeOverlay, closeOverlay]);

	// Получаем компонент активного оверлея, если он есть.
  const Feature = activeOverlay?.component;

  return (
		<div>
    {/* <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden"> */}
      {children}

      {activeOverlay && (
        <>
					<MainBackdrop onClick={activeOverlay.type === "popup" ? closeOverlay : undefined}/>
          <HeaderShield />

          {activeOverlay.type === "popup" && Feature && (
            <PopupContainer position={activeOverlay.position}>
              <Feature />
            </PopupContainer>
          )}

          {activeOverlay.type === "modal" && Feature && (
            <ModalContainer size={activeOverlay.size}>
              <Feature />
            </ModalContainer>
          )}
        </>
      )}
    </div>
  );
}
