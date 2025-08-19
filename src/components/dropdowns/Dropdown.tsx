import type React from "react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useAppUiStore } from "../../store/useAppUiStore";

export type DropdownItem = {
	label: string;
	action: () => void;
};

type DropdownProps = {
	items: DropdownItem[];
};

export default function Dropdown({ items }: DropdownProps): React.JSX.Element {
	const [hovered, setHovered] = useState<string>("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	function handleClickOutside() {
		useAppUiStore.getState().actions.setShowProfileDropdown(false);
	}

	useOnClickOutside(dropdownRef as React.RefObject<HTMLDivElement>, handleClickOutside);

	return (
		<div
			ref={dropdownRef}
			className="absolute z-50 min-w-[20%] rounded md:min-w-[10%] dark:bg-neutral-700"
		>
			<ul className="flex flex-col items-stretch gap-3 p-4">
				{items.map((item) => (
					<button
						type="button"
						key={item.label}
						onClick={item.action}
						onMouseOver={() => setHovered(item.label)}
						onFocus={() => setHovered(item.label)}
						className={`rounded p-1 shadow-2xl ${hovered === item.label ? "bg-neutral-500" : ""}`}
					>
						<p className="text-left">{item.label}</p>
					</button>
				))}
			</ul>
		</div>
	);
}
