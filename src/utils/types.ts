import ImgRenderer from "../components/cellRenderer/ImgRenderer";

type BookStatus = "ToRead" | "Reading" | "Read" | "Paused" | "Abandoned";

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
	{ headerName: "Title", field: "title", width: 300 },
	{
		headerName: "Cover",
		field: "coverUrl",
		cellRenderer: ImgRenderer,
		width: 120,
		resizable: false,
	},
	{
		headerName: "Rating",
		field: "rating",
		editable: true,
	},
	{ headerName: "Author", field: "authors" },
	{ headerName: "Status", field: "status" },
	{ headerName: "Genre", field: "genre" },
	{ headerName: "Pages", field: "pageCount" },
	{ headerName: "Created on", field: "dateAdded", editable: true },
	{ headerName: "Started", field: "dateStarted", editable: true },
	{ headerName: "Completed", field: "dateFinished", editable: true },
	{ headerName: "ISBN10", field: "isbn10" },
	{ headerName: "ISBN13", field: "isbn13" },
	{ headerName: "Published On", field: "publicationDate" },
];
