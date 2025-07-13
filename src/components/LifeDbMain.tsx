import { PlusIcon } from "@phosphor-icons/react";
import {
	colorSchemeDarkWarm,
	themeQuartz,
	type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useAppUiStore } from "../store/useAppUiStore";
import { api } from "../utils/api";

type RowData = { name: string; description: string };

export default function LifeDbMain(): React.JSX.Element {
	const setShowCreateDbModal = useAppUiStore(
		(state) => state.actions.setShowCreateDbModal,
	);

	const colorScheme = themeQuartz.withPart(colorSchemeDarkWarm);
	const [rowData, setRowData] = useState([]);
	const [colDefs] = useState<ColDef<RowData>[]>([
		{ field: "name" },
		{ field: "description" },
	]);

	useEffect(() => {
		async function fetchData() {
			const res = await api.get("/collections");
			console.log(res.data);
			setRowData(res.data);
		}

		fetchData();
	}, []);

	return (
		<main className="flex flex-col items-center gap-10">
			<h1 className="prose text-center text-3xl text-gray-300">
				Your Databases
			</h1>
			<div className="h-100 w-[90%] md:w-[50%] lg:w-[40%] ">
				<AgGridReact
					theme={colorScheme}
					rowData={rowData}
					columnDefs={colDefs}
				/>
			</div>
			<button
				className="flex items-center rounded-xl bg-folly p-2"
				type="button"
				onClick={() => setShowCreateDbModal(true)}
			>
				<PlusIcon className="fill-black dark:fill-white" size={"1.2rem"} />
				<p className="prose text-white">Add DB</p>
			</button>
		</main>
	);
}
