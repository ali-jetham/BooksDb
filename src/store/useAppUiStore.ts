import { create } from "zustand";

type AppUi = {
	showLifeDbMain: boolean;
	showCreateDbModal: boolean;

	actions: {
		setShowLifeDbMain: (show: boolean) => void;
		setShowCreateDbModal: (show: boolean) => void;
	};
};

export const useAppUiStore = create<AppUi>((set) => ({
	showLifeDbMain: true,
	showCreateDbModal: false,

	actions: {
		setShowLifeDbMain: (show: boolean) => set({ showLifeDbMain: show }),
		setShowCreateDbModal: (show: boolean) => set({ showCreateDbModal: show }),
	},
}));
