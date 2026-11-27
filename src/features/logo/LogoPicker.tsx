"use client";

import { LOGO_ICONS } from "@/types/logo-icons";
import { useLogoStore } from "@/stores/useLogoStore";
import { useOverlayStore } from "@/stores/useOverlayStore";

/*
	Компонент выбора иконки логотипа.
	Используется в OverlayRenderer.tsx.
*/

export default function LogoPicker() {
  const logoIcon = useLogoStore((state) => state.logo);
  const setLogo = useLogoStore((state) => state.setLogo);
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);

  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl border border-border bg-background p-3 shadow-xl">
      {Object.entries(LOGO_ICONS).map(([key, icon]) => (
        <button
          key={key}
          onClick={() => {
            setLogo(key as keyof typeof LOGO_ICONS);
            closeOverlay();
          }}
          className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl hover:bg-panel ${
            logoIcon === key ? "bg-panel ring-2 ring-primary" : ""
          }`}
          title={key}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}