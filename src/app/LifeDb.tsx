import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import LifeDbHeader from "../components/LifeDbHeader";
import LifeDbMain from "../components/LifeDbMain";
import AddDbModal from "../components/modals/AddDbModal";
import { useAppUiStore } from "../store/useAppUiStore";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function LifeDb(): React.JSX.Element {
	const showAddDbModal = useAppUiStore((state) => state.showCreateDbModal);
	const showLifeDbMain = useAppUiStore((state) => state.showLifeDbMain);

	return (
		<div className="h-full w-full bg-white dark:bg-neutral-800">
			<LifeDbHeader />
			{showLifeDbMain && <LifeDbMain />}
			{showAddDbModal && <AddDbModal />}
		</div>
	);
}
