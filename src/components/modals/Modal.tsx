import type React from "react";
import { useEffect, useState } from "react";
import { useAppUiStore } from "../../store/useAppUiStore";

type ModalItem = {
	id: number;
	icon?: React.ReactNode;
	label: string;
	action: () => void;
};

type ModalProps = {
	items: ModalItem[];
};

export default function Modal({ items }: ModalProps): React.JSX.Element {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const setShowCreateDbModal = useAppUiStore((state) => state.actions.setShowCreateDbModal);

	function handleSelect(action: () => void) {
		action();
		setShowCreateDbModal(false);
	}

	const itemsEl = items.map((item, index) => (
		<button
			key={item.id}
			type="button"
			className={`flex items-center gap-2 rounded-md p-1 text-left text-xl ${item.id === selectedIndex ? "bg-[#EF476495]" : ""}`}
			onClick={() => handleSelect(item.action)}
			onMouseOver={() => setSelectedIndex(index)}
			onFocus={() => setSelectedIndex(index)}
		>
			{item.icon ?? item.icon}
			{item.label}
		</button>
	));

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowDown") {
			setSelectedIndex((prev) => (prev + 1) % items.length);
		} else if (e.key === "ArrowUp") {
			setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
		} else if (e.key === "Escape") {
			console.log("esc pressed");
			setShowCreateDbModal(false);
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black opacity-50">
			<div className="z-999 flex min-w-[50%] flex-col rounded-md p-4 shadow-2xl md:min-w-[30%] dark:bg-neutral-600">
				{itemsEl}
			</div>
		</div>
	);
}
