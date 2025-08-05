import { create } from "zustand";

export type ActiveModal = "addDb" | "addBook" | undefined;

type AppUi = {
	activeModal: ActiveModal;
	showProfileDropdown: boolean;

	actions: {
		setActiveModal: (modal: ActiveModal) => void;
		setShowProfileDropdown: (show: boolean) => void;
	};
};

export const useAppUiStore = create<AppUi>((set) => ({
	activeModal: undefined,
	showProfileDropdown: false,

	actions: {
		setActiveModal: (modal) => set({ activeModal: modal }),
		setShowProfileDropdown: (show: boolean) => set({ showProfileDropdown: show }),
	},
}));
