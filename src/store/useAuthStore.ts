import { create } from "zustand/react";
import { api } from "../api/api";

// TODO: separate actions from state
type AuthStore = {
	isAuthenticated: boolean;
	id: string | undefined;
	isLoading: boolean;
	init: () => void;
	refresh: () => void;
	setIsAuthenticated: (val: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	isLoading: true,
	id: undefined,

	init: async function () {
		console.log("useAuthStore: init called");

		try {
			set({ isLoading: true });
			const res = await api.get("/auth/me");
			console.log(res.data.isAuthenticated);
			set({
				isAuthenticated: res.data.isAuthenticated,
				id: res.data.id,
				isLoading: false,
			});
		} catch (error) {
			console.error(`Cannot authenticate user, ${error}`);
			set({ isAuthenticated: false, isLoading: false });
		}
	},

	refresh: async () => {
		set({ isLoading: true });
		try {
			console.log("Refreshing access token");
			const res = await api.get("/token/refresh");
			console.log(`Token refresh result: ${res}`);
			useAuthStore.getState().init();
		} catch (error) {
			console.error("Token refresh failed", error);
			set({ isLoading: false });
		}
	},

	setIsAuthenticated: (val: boolean) => {
		set({ isAuthenticated: val });
	},
}));
