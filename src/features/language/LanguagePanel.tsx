"use client";

import { LANGUAGES } from "../../types/languages";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useOverlayStore } from "@/stores/useOverlayStore";



export default function LanguagePanel() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);

  return (
    <div className="w-52 rounded-xl border border-border bg-background p-2 shadow-xl">
      {Object.entries(LANGUAGES).map(([key, item]) => (
        <button
          key={key}
          onClick={() => {
            setLanguage(key as keyof typeof LANGUAGES);
            closeOverlay();
          }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-panel ${
            language === key ? "bg-panel font-medium" : ""
          }`}
        >
          <span className="text-xl">{item.flag}</span>
          <span>{item.label}</span>
          {language === key && <span className="ml-auto">✓</span>}
        </button>
      ))}
    </div>
  );
}