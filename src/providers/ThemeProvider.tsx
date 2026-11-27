"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore } from "@/stores/useThemeStore";
import { UISync } from "@/components/theme/UISync";

/*
  ThemeProvider — компонент, который оборачивает приложение и предоставляет контекст темы.
  Использует next-themes для управления темой (light/dark) и zustand для хранения параметров темы.
  Синхронизирует параметры темы с CSS-переменными через ThemeSync.
*/

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeSync />
      <UISync />
      {children}
    </NextThemesProvider>
  );
}

function ThemeSync() {
  const hue = useThemeStore((state) => state.hue);
  const lightness = useThemeStore((state) => state.lightness);
  const chroma = useThemeStore((state) => state.chroma);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--p-h", String(hue));
    root.style.setProperty("--p-l", String(lightness));
    root.style.setProperty("--p-c", String(chroma));
  }, [hue, lightness, chroma]);

  return null;
}