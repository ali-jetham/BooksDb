import { create } from "zustand";

export type ActiveModal = "addDb" | "addBook" | undefined;

type AppUi = {
	activeModal: ActiveModal;
	showProfileDropdown: boolean;
	refreshTriggers: {
		[key: string]: number;
	};

	actions: {
		setActiveModal: (modal: ActiveModal) => void;
		setShowProfileDropdown: (show: boolean) => void;
		triggerRefresh(type: keyof AppUi["refreshTriggers"]): void;
	};
};

export const useAppUiStore = create<AppUi>((set) => ({
	activeModal: undefined,
	showProfileDropdown: false,
	refreshTriggers: {
		books: 0,
	},

	actions: {
		setActiveModal: (modal) => set({ activeModal: modal }),
		setShowProfileDropdown: (show: boolean) => set({ showProfileDropdown: show }),
		triggerRefresh: (type: keyof AppUi["refreshTriggers"]) => {
			set((state) => ({
				refreshTriggers: {
					...state.refreshTriggers,
					[type]: state.refreshTriggers[type] + 1,
				},
			}));
		},
	},
}));
