type BookStatus = "ToRead" | "Reading" | "Read" | "Paused" | "Abandoned";

export type BookRowData = {
	userBookId: string;
	title: string;
	coverUrl: string;
	status: BookStatus;
	rating: number | null;
	favorite: boolean;
	dateStarted: string | null;
	dateFinished: string | null;
	isbn10: string | null;
	isbn13: string | null;
	pageCount: number | null;
	edition: number | null;
	series: string | null;
	publisher: string[];
	publicationDate: string | null;
	genre: string[];
	authors: string[];
};

export const bookColDef = [
	{ field: "Title" },
	{ field: "Cover" },
	{ field: "Cover" },
	{ field: "Author" },
	{ field: "Status" },
	{ field: "Genre" },
	{ field: "Pages" },
	{ field: "Started" },
	{ field: "Completed" },
	{ field: "ISBN10" },
	{ field: "ISBN13" },
	{ field: "Published On" },
];
