import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useParams } from "react-router";
import LifeDbHeader from "../components/LifeDbHeader";
import LifeDbMain from "../components/LifeDbMain";
import AddDbModal from "../components/modals/AddDbModal";
import { useAppUiStore } from "../store/useAppUiStore";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function LifeDb(): React.JSX.Element {
	let params = useParams();
	const type = params.type;
	console.log(`type: ${type}`);
	const showAddDbModal = useAppUiStore((state) => state.showCreateDbModal);
	const showLifeDbMain = useAppUiStore((state) => state.showLifeDbMain);

	return (
		<div className="flex h-full w-full flex-col items-center bg-white p-4 dark:bg-neutral-800">
			<div className="flex flex-col gap-10 md:w-[60%]">
				<LifeDbHeader />
				<hr />
				{showLifeDbMain && <LifeDbMain type={type} />}
				{showAddDbModal && <AddDbModal />}
			</div>
		</div>
	);
}
