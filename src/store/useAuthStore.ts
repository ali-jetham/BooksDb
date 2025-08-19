import { create } from "zustand/react";
import { api } from "../api/api";

// TODO: separate actions from state
type AuthStore = {
	isAuthenticated: boolean;
	id: string | undefined;
	isLoading: boolean;
	login: () => void;
	logout: () => void;
	refresh: () => void;
	revoke: () => Promise<boolean>;
	setIsAuthenticated: (val: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: true,
	isLoading: true,
	id: undefined,

	login: async function () {
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
			set({ isAuthenticated: true, isLoading: false });
		}
	},

	logout: async () => {
		const res: boolean = await useAuthStore.getState().revoke();
		if (res) {
			// TODO: show a successfully logged out page
			console.log("logged out successfully");
			set({ isAuthenticated: false, isLoading: false });
		}
	},

	refresh: async () => {
		set({ isLoading: true });
		try {
			console.log("Refreshing access token");
			const res = await api.get("/token/refresh");
			console.log(`Token refresh result: ${res}`);
			useAuthStore.getState().login();
		} catch (error) {
			console.error("Token refresh failed", error);
			set({ isLoading: false });
		}
	},

	revoke: async () => {
		try {
			const res = await api.delete("/token/revoke");
			console.log(`Revoked: ${res.data.isRevoked}`);
			return res.data.isRevoked;
		} catch (error) {
			console.error(error);
		}
	},

	setIsAuthenticated: (val: boolean) => {
		set({ isAuthenticated: val });
	},
}));
