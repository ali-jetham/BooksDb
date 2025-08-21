import { create } from "zustand/react";
import { api } from "../api/api";

// TODO: separate actions from state
type AuthStore = {
	isAuthenticated: boolean;
	id: string | undefined;
	name: string | undefined;
	isLoading: boolean;
	login: () => void;
	logout: () => void;
	refresh: () => void;
	setIsAuthenticated: (val: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	isLoading: true,
	id: undefined,
	name: undefined,

	login: async function () {
		console.log("useAuthStore: init called");

		try {
			set({ isLoading: true });
			const res = await api.get("/auth/me");
			console.log(res.data.isAuthenticated);
			set({
				isAuthenticated: res.data.isAuthenticated,
				id: res.data.id,
				name: res.data.name,
				isLoading: false,
			});
		} catch (error) {
			console.error(`Cannot authenticate user, ${error}`);
			set({ isAuthenticated: false, isLoading: false });
		}
	},

	logout: async () => {
		try {
			const res = await api.delete("/auth/logout");
			if (res.data.isRevoked) {
				set({ isAuthenticated: false, isLoading: false });
			}
		} catch (error) {
			console.error("Failed to logout", error);
		}
	},

	refresh: async () => {
		set({ isLoading: true });
		try {
			console.log("Refreshing access token");
			const res = await api.get("/auth/refresh");
			console.log(`Token refresh result: ${res}`);
			useAuthStore.getState().login();
		} catch (error) {
			console.error("Token refresh failed", error);
			set({ isLoading: false });
		}
	},

	setIsAuthenticated: (val: boolean) => {
		set({ isAuthenticated: val });
	},
}));
