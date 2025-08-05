/** biome-ignore-all lint/a11y/noAutofocus: <explanation> valid for <input> */
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useAppUiStore } from "../../store/useAppUiStore";

type ModalItem = {
	id: number;
	icon?: React.ReactNode;
	label: string;
	action: () => void;
};

type ModalProps = {
	itemsEl: any[];
	isLoading: boolean;
	hasMouseMoved: React.RefObject<boolean>;
	onSearch: (q: string) => void;
	onItemSelected: () => void;
	setFocusedItem: React.Dispatch<React.SetStateAction<number>>;
};

export default function Modal({
	itemsEl,
	isLoading,
	hasMouseMoved,
	onSearch,
	onItemSelected,
	setFocusedItem,
}: ModalProps): React.JSX.Element {
	//
	const [searchQuery, setSearchQuery] = useState<string>("");
	const searchQueryRef = useRef(searchQuery);
	const inputRef = useRef(null);
	const listRef = useRef(null);

	const setActiveModal = useAppUiStore((state) => state.actions.setActiveModal);

	function handleSearch() {
		onSearch(searchQueryRef.current);
		// TODO: move focus from input to the div
		inputRef.current.blur();
		if (listRef.current) {
			listRef.current.focus();
		}
	}

	function handleItemSelect() {
		setActiveModal(undefined);
		onItemSelected();
	}

	useEffect(() => {
		searchQueryRef.current = searchQuery;
	}, [searchQuery]);

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			console.log(`pressed: ${e.key}`);

			if (e.key === "ArrowDown") {
				console.log(`length: ${itemsEl.length}`);
				setFocusedItem((prev) => (prev + 1) % itemsEl.length);
			} else if (e.key === "ArrowUp") {
				setFocusedItem((prev) => (prev - 1 + itemsEl.length) % itemsEl.length);
			} else if (e.key === "Escape") {
				console.log("esc pressed");
				e.preventDefault();
				setActiveModal(undefined);
			} else if (e.key === "Enter" && inputRef.current === document.activeElement) {
				handleSearch();
			}
		}

		function handleMouseMove() {
			hasMouseMoved.current = true;
			console.log(`hasMouseMoved: ${hasMouseMoved}`);

			setTimeout(() => {
				hasMouseMoved.current = false;
			}, 3000);
		}

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("wheel", handleMouseMove);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("wheel", handleMouseMove);
		};
	}, [itemsEl.length]);

	return (
		<div className="fixed inset-0 z-999 flex items-start justify-center backdrop-blur-sm">
			<div className="mt-30 flex w-[90%] flex-col gap-4 rounded-md p-4 md:max-w-[50%] dark:bg-neutral-700">
				<div className="flex w-[100%] items-center gap-3">
					<input
						ref={inputRef}
						type="text"
						placeholder="Search books"
						value={searchQuery}
						// TODO: check if modal can be closed with only a single esc press, the autofocus consumes the first press
						autoFocus={true}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-10 w-[100%] rounded-md px-2 transition focus:outline-none dark:bg-neutral-600"
					/>
					<button
						type="button"
						onClick={handleSearch}
						className={`h-10 rounded-md bg-folly-500 px-8 outline-none hover:cursor-pointer`}
					>
						{isLoading ? "Loading..." : "Search"}
					</button>
				</div>

				<div ref={listRef} className="scrollbar-thin max-h-96 max-w-[100%] overflow-auto">
					{itemsEl}
				</div>
			</div>
		</div>
	);
}
