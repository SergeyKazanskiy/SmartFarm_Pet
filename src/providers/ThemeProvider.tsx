"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore } from "@/stores/useThemeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ThemeSync />
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