import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LogoIcon } from '@/types/logo-icons';

/*
	Хранение состояния выбранного логотипа.
	Используется в приложении для управления логотипом интерфейса.
*/

type LogoState = {
    logo: LogoIcon;
    setLogo: (logo: LogoIcon) => void;
  };
  
  export const useLogoStore = create<LogoState>()(
		persist(
			(set) => ({
				logo: "sprout",
				setLogo: (logo) => set({ logo }),
			}),
			{
				name: "smartfarm-logo",
				partialize: (state) => ({
					logo: state.logo,
				}),
			}
		)
	);