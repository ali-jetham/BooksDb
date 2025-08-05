import { getIsoDate } from "../utils/date";
import type { BookRowData } from "../utils/types";
import { api } from "./api";

async function search(searchTerm: string) {
	if (searchTerm === "") return;
	try {
		const res = await api.get("books/search", { params: { q: searchTerm } });
		return res.data;
	} catch (error) {
		console.error(error);
	}
}

async function add(bookData: BookRowData) {
	try {
		bookData.dateAdded = getIsoDate();
		const res = await api.post("books", bookData);
		return res.data;
	} catch (error) {}
}

async function update(userBookId: string, bookData: Partial<BookRowData>) {
	try {
		const res = await api.patch(`books/${userBookId}`, bookData);
		return res.data;
	} catch (error) {
		console.error(error);
	}
}

async function get(userBookId: string) {
	try {
		const res = await api.get(`books/${userBookId}`);
		return res.data;
	} catch (error) {
		console.error(error);
	}
}

export const booksApi = { search, get, add, update };
