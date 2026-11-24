import { create } from "zustand";
import type { ComponentType } from "react";

/*
	OverlayStore — zustand-store для управления оверлеями (popup/modal).
	Используется в layout.tsx и в OverlayRenderer.tsx.
*/

export type PopupPosition = "left" | "center" | "right";
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";

export type OverlayComponent = ComponentType<any>;
export type OverlayState =
  | {
      type: "popup";
      component: OverlayComponent;
      position: PopupPosition;
    }
  | {
      type: "modal";
      component: OverlayComponent;
      size: ModalSize;
    }
  | null;

type OverlayStore = {
  activeOverlay: OverlayState;

  openPopup: (component: OverlayComponent, options?: { position?: PopupPosition }) => void;
  openModal: (component: OverlayComponent, options?: { size?: ModalSize }) => void;
  closeOverlay: () => void;
};

export const useOverlayStore = create<OverlayStore>((set) => ({
  activeOverlay: null,

  openPopup: (component, options) =>
    set({
      activeOverlay: {
        type: "popup",
        component,
        position: options?.position ?? "center",
      },
    }),

  openModal: (component, options) =>
    set({
      activeOverlay: {
        type: "modal",
        component,
        size: options?.size ?? "md",
      },
    }),

  closeOverlay: () => set({ activeOverlay: null }),
}));