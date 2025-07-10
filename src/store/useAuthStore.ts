import { create } from "zustand/react";
import { api } from "../utils/api";

// TODO: separate actions from state
type AuthStore = {
	isAuthenticated: boolean;
	id: string | undefined;
	loading: boolean;
	refreshing: boolean;
	init: () => void;
	refresh: () => void;
	setIsAuthenticated: (val: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	id: undefined,
	loading: true,
	refreshing: false,

	init: async function () {
		try {
			const res = await api.get("/auth/me");
			console.log(res.data.isAuthenticated);
			set({
				isAuthenticated: res.data.isAuthenticated,
				id: res.data.id,
				loading: false,
			});
		} catch (error) {
			console.error(`Cannot authenticate user, ${error}`);
		} finally {
			set({ loading: false });
		}
	},

	refresh: async () => {
		set({ refreshing: true });
		try {
			console.log("Refreshing access token");
			await api.post("/token/refresh");
			useAuthStore.getState().init();
		} catch (error) {
			console.error("Token refresh failed", error);
			set({ isAuthenticated: false, id: undefined });
		} finally {
			set({ refreshing: false });
		}
	},

	setIsAuthenticated: (val: boolean) => {
		set({ isAuthenticated: val });
	},
}));
