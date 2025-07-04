import axios from "axios";
import { create } from "zustand/react";

// TODO: separate actions from state
type AuthStore = {
	isAuthenticated: boolean;
	id: string | undefined;
	loading: boolean;
	init: () => void;
	setIsAuthenticated: (val: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	id: undefined,
	loading: true,

	init: async () => {
		try {
			const res = await axios.get(
				"https://yeti-measured-correctly.ngrok-free.app/api/Auth/me",
				{
					withCredentials: true,
				},
			);
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

	setIsAuthenticated: (val: boolean) => {
		set({ isAuthenticated: val });
	},
}));
