import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme() {
	const [theme, setTheme] = useState<Theme | undefined>(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme === "light" || storedTheme === "dark") {
			return storedTheme as Theme;
		}
	});
}
