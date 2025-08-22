import { useEffect, useRef, useState } from "react";
import { booksApi } from "../../api/booksApi";
import type { BookRowData } from "../../utils/types";
import Modal from "./Modal";
import { useAppUiStore } from "../../store/useAppUiStore";

export default function AddBookModal(): React.JSX.Element {
	const [items, setItems] = useState<BookRowData[]>([]);
	const [focusedItem, setFocusedItem] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const hasMouseMoved = useRef(false);
	const setActiveModal = useAppUiStore((state) => state.actions.setActiveModal);
	const triggerRefresh = useAppUiStore((state) => state.actions.triggerRefresh);

	console.log(items);
	const itemsEl = items?.map((item, index) => (
		<button
			key={item.internalId ?? item.externalId}
			ref={(el) => {
				itemRefs.current[index] = el;
			}}
			type="button"
			// FIXME: find the same bg-color used by ag grid to highlight rows
			className={`flex w-[100%] items-start gap-2 rounded-md p-1 hover:cursor-pointer ${index === focusedItem ? "bg-[rgba(239,71,100,0.15)]" : ""}`}
			onClick={() => {
				addBook();
			}}
			onMouseOver={() => {
				if (hasMouseMoved.current) {
					setFocusedItem(index);
				}
			}}
			onFocus={() => setFocusedItem(index)}
		>
			<img src={item.coverUrl} alt="book cover" width={65} className="rounded" />
			<div className="flex flex-col items-start gap-0.5 text-left">
				<span className="text-base">{item.title}</span>
				<span className="text-sm">{`${item.authors.join(", ")}, ${item.publisher}`}</span>
			</div>
		</button>
	));

	async function searchBooks(searchTerm: string) {
		setIsLoading(true);
		// TODO: only call when the search term is not same AND items is empty
		const books = await booksApi.search(searchTerm);
		// TODO: is books are empty show no result found
		setItems(books);
		setIsLoading(false);
	}

	async function addBook() {
		setActiveModal(undefined);
		const bookData = items[focusedItem];
		console.log(bookData);
		const res = await booksApi.add(bookData);
		// TODO: add res.data back somewhere in state
		if (res) {
			triggerRefresh("books");
		}
	}

	useEffect(() => {
		const el = itemRefs.current[focusedItem];
		if (el) el.scrollIntoView({ block: "nearest" });
	}, [focusedItem]);

	return (
		<Modal
			itemsEl={itemsEl}
			isLoading={isLoading}
			hasMouseMoved={hasMouseMoved}
			onSearch={searchBooks}
			onItemSelected={addBook}
			setFocusedItem={setFocusedItem}
		/>
	);
}
