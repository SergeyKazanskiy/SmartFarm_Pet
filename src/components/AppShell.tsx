"use client";

import { IconButton } from "@/components/icons/icon-button";
import OverlayProvider from "@/components/overlays/OverlayProvider";

import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useLogoStore } from '@/stores/useLogoStore';
import { useOverlayStore } from "@/stores/useOverlayStore";
import { useTranslations } from '@/hooks/useTranslations';

import LanguagePanel from "@/features/language/LanguagePanel";
import LogoPicker from "@/features/logo/LogoPicker";
import SettingsPanel from "@/features/settings/SettingsPanel";
import Login from "@/features/auth/Login";


export default function AppShell({ children }: { children: React.ReactNode }) {
  const themeIcon = useThemeStore((state) => state.themeIcon);
  const language = useLanguageStore((state) => state.language);
  const logo = useLogoStore((state) => state.logo);
  const loginIcon = useUIStore((state) => state.loginIcon);

  const toggleTheme = useThemeStore((state) => state.togleTheme);

  const openPopup = useOverlayStore((state) => state.openPopup);
  const openModal = useOverlayStore((state) => state.openModal);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">

      <OverlayProvider>

        {/* HEADER */}
        <header className="relative z-0 grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b">

          {/* LEFT */}
          <div className="grid grid-cols-[auto_1fr] items-center">
            <div className="flex gap-2">

              <IconButton title="Тема"
                iconName={themeIcon}
                onClick={toggleTheme}
              />

              <IconButton title="Язык"
                iconName={language}
                onClick={() => openPopup(LanguagePanel, { position: "left" })}
              />
            </div>

            <div className="text-center font-semibold">
              Smart Farm
            </div>
          </div>

          {/* CENTER */}
          <IconButton title="Логотип"
            iconName={logo}
            onClick={() => openPopup(LogoPicker, { position: "center" })}
          />

          {/* RIGHT */}
          <div className="grid grid-cols-[1fr_auto] items-center">
            <nav className="flex justify-center gap-4">
              {/* Навигация */}
            </nav>

            <div className="flex gap-2">

              <IconButton title="Вход"
                iconName={loginIcon}
                onClick={() => openModal(Login, { size: "sm" })}
              />

              <IconButton title="Настройки"
                iconName="settings"
                onClick={() => openPopup(SettingsPanel, { position: "right" })}
              />
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="relative min-h-0 flex-1 overflow-hidden">
          {children}
        </main>

      </OverlayProvider>
    </div>
  );
}