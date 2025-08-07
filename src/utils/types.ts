import ImgRenderer from "../components/cellRenderer/ImgRenderer";
import LinkRenderer from "../components/cellRenderer/LinkRenderer";

type BookStatus = "ToRead" | "Reading" | "Read" | "Paused" | "Abandoned";

export type BookData = BookRowData & {
	notes: string;
};

export type BookRowData = {
	internalId: string;
	externalId: string;
	userBookId: string;
	type: number;
	title: string;
	authors: string[];
	coverUrl: string;
	genre: string[];
	isbn10: string | null;
	isbn13: string | null;
	pageCount: number | null;
	publicationDate: string | null;
	publisher: string[];
	dateAdded: string;
	status: BookStatus;
	rating: number | null;
	favourite: boolean;
	dateStarted: string | null;
	dateFinished: string | null;
	edition: number | null;
	series: string | null;
};

export const bookColDef = [
	{ headerName: "Title", field: "title", width: 300, cellRenderer: LinkRenderer },
	{
		headerName: "Cover",
		field: "coverUrl",
		width: 120,
		resizable: false,
		cellRenderer: ImgRenderer,
	},
	{
		headerName: "Rating",
		field: "rating",
		editable: true,
		width: 100,
	},
	{ headerName: "Author", field: "authors" },
	{ headerName: "Status", field: "status", width: 100 },
	{ headerName: "Genre", field: "genre" },
	{ headerName: "Pages", field: "pageCount", width: 100 },
	{ headerName: "Created on", field: "dateAdded", editable: true, width: 120 },
	{ headerName: "Started", field: "dateStarted", editable: true, width: 120 },
	{ headerName: "Completed", field: "dateFinished", editable: true, width: 120 },
	{ headerName: "ISBN10", field: "isbn10", width: 120 },
	{ headerName: "ISBN13", field: "isbn13", width: 120 },
	{ headerName: "Published On", field: "publicationDate" },
];
