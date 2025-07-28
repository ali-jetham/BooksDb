import { create } from "zustand";

export type ActiveModal = "addDb" | "addBook" | undefined;

type AppUi = {
	activeModal: ActiveModal;

	actions: {
		setActiveModal: (modal: ActiveModal) => void;
	};
};

export const useAppUiStore = create<AppUi>((set) => ({
	activeModal: undefined,

	actions: {
		setActiveModal: (modal) => set({ activeModal: modal }),
	},
}));
