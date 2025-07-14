import { useEffect, useState } from "react";

type ModalItem = {
	id: number;
	label: string;
	action: () => void;
};

type ModalProps = {
	items: ModalItem[];
};

export default function Modal({ items }: ModalProps): React.JSX.Element {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const itemsEl = items.map((item) => (
		<button
			key={item.id}
			type="button"
			className={`  ${item.id === selectedIndex ? "dark:bg-folly" : ""}`}
		>
			{item.label}
		</button>
	));

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowDown") {
			setSelectedIndex((prev) => (prev + 1) % items.length);
		} else if (e.key === "ArrowUp") {
			setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="flex min-w-[50%] flex-col items-stretch rounded-md p-4 md:min-w-[40%] dark:bg-neutral-600">
				{itemsEl}
			</div>
		</div>
	);
}
