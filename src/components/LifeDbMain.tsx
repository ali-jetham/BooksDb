import { PlusIcon } from "@phosphor-icons/react";
import { colorSchemeDarkWarm, themeQuartz, type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useAppUiStore } from "../store/useAppUiStore";
import { api } from "../utils/api";

type LifeDbMainProps = {
	type: string | undefined;
};
type RowData = { name: string; description: string };

export default function LifeDbMain({ type }: LifeDbMainProps): React.JSX.Element {
	const setShowCreateDbModal = useAppUiStore((state) => state.actions.setShowCreateDbModal);
	const setShowLifeDbMain = useAppUiStore((state) => state.actions.setShowLifeDbMain);

	const colorScheme = themeQuartz.withPart(colorSchemeDarkWarm);
	const [rowData, setRowData] = useState([]);
	const [colDefs] = useState<ColDef<RowData>[]>([{ field: "name" }, { field: "description" }]);

	useEffect(() => {
		async function fetchData() {
			const res = await api.get(`/${type}`);
			console.log(res.data);
			setRowData(res.data);
		}

		fetchData();
	}, [type]);

	return (
		<main className="flex flex-col items-center gap-10">
			<div className="flex w-full justify-between">
				<h1 className="prose text-center text-3xl text-gray-300">Your {type ?? "databases"}</h1>

				<button
					className="flex items-center gap-0.5 rounded-md bg-folly p-1"
					type="button"
					onClick={() => {
						setShowCreateDbModal(true);
					}}
				>
					<PlusIcon className="fill-black dark:fill-white" size={"1.1rem"} />
					<p className="prose text-white">Add {type ?? "DB"}</p>
				</button>
			</div>

			<div className="h-100 w-[90%] md:w-[50%] lg:w-[40%] ">
				<AgGridReact theme={colorScheme} rowData={rowData} columnDefs={colDefs} />
			</div>
		</main>
	);
}
