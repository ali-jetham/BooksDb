import { create } from "zustand";

type AppUi = {
	showLifeDbMain: boolean;
	showCreateDbModal: boolean;
	actions: {
		setShowCreateDbModal: (show: boolean) => void;
	};
};

export const useAppUiStore = create<AppUi>((set) => ({
	showLifeDbMain: false,
	showCreateDbModal: true,

	actions: {
		setShowCreateDbModal: (show: boolean) => set({ showCreateDbModal: show }),
	},
}));
