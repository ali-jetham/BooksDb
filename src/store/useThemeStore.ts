import { create } from "zustand";

type ThemeStore = {
	theme: string | null;
	loading: boolean;
	init: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
	theme: localStorage.getItem("theme"),
	loading: true,

	init: () => {
		const localTheme = localStorage.getItem("theme");
		if (localTheme) {
			set({ theme: localTheme, loading: false });
		} else {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
			console.log(`Prefers dark: ${prefersDark}`);
			const preferredTheme = prefersDark ? "dark" : "light";
			set({ theme: preferredTheme, loading: false });
		}
	},
}));
