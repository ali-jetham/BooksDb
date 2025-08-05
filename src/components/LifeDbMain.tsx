import { PlusIcon } from "@phosphor-icons/react";
import { colorSchemeDarkWarm, themeQuartz, type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAppUiStore, type ActiveModal } from "../store/useAppUiStore";
import { bookColDef } from "../utils/types";
import { booksApi } from "../api/booksApi";
import { useParams } from "react-router";

type LifeDbMainProps = {
	type: string | undefined;
};

export default function LifeDbMain(): React.JSX.Element {
	const setActiveModal = useAppUiStore((state) => state.actions.setActiveModal);
	const colorScheme = themeQuartz.withPart(colorSchemeDarkWarm).withParams({
		accentColor: "#EF4764",
		wrapperBorder: true,
		headerRowBorder: true,
		rowBorder: false,
		backgroundColor: "#262626",
	});
	const { type } = useParams();
	const [rowData, setRowData] = useState([]);
	const [colDefs, setColDefs] = useState<ColDef[]>(bookColDef);

	// FIXME: make sure this runs first completely before loading rowData in the AgGridReact component
	useEffect(() => {
		// TODO: maybe this should be called from the <type>Api file
		async function fetchData() {
			const res = await api.get(`/${type}`);
			console.log(res.data);
			setRowData(res.data);
		}

		fetchData();
	}, []);

	function handleClick() {
		console.log(`handle click called with type ${type}`);
		const modalMap: Record<string, ActiveModal> = {
			books: "addBook",
		};
		setActiveModal(modalMap[type] ?? undefined);
	}

	function handleCellVaueChanged(params) {
		console.log(params.data);
		const { userBookId, status, rating, dateAdded, dateStarted, dateFinished, notes, favourite } =
			params.data;
		const bookData = {
			status,
			rating,
			dateAdded,
			dateStarted,
			dateFinished,
			notes,
			favourite,
		};
		booksApi.update(userBookId, bookData);
	}

	return (
		<main className="flex flex-1 flex-col items-center gap-10">
			<div className="flex w-full justify-between">
				<h1 className="prose text-center text-3xl text-gray-300">Your {type ?? "databases"}</h1>

				<button
					className="flex items-center gap-0.5 rounded-md bg-folly-500 p-1"
					type="button"
					onClick={() => {
						handleClick();
					}}
				>
					<PlusIcon className="fill-black dark:fill-white" size={"1.1rem"} />
					<p className="prose text-white">Add {type ?? "DB"}</p>
				</button>
			</div>

			{/* TODO: find out if this div/aggrid component can take up height automatically */}
			<div className="w-[100%] flex-1 overflow-auto">
				<AgGridReact
					theme={colorScheme}
					rowData={rowData}
					columnDefs={colDefs}
					rowHeight={150}
					onCellValueChanged={handleCellVaueChanged}
					// TODO: make a sidebar like this example https://www.ag-grid.com/react-data-grid/themes/
					// sideBar={true}
				/>
			</div>
		</main>
	);
}
