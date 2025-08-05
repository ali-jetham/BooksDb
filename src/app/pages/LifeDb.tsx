import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useParams } from "react-router";
import LifeDbHeader from "../../components/LifeDbHeader";

import ModalManager from "../../components/modals/ModalManger";
import { useAppUiStore } from "../../store/useAppUiStore";
import { Outlet } from "react-router";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function LifeDb(): React.JSX.Element {
	let params = useParams();
	// FIXME: i think this needs to be a state
	const type = params.type;
	console.log(`type: ${type}`);
	const activeModal = useAppUiStore((state) => state.activeModal);

	return (
		<div className="scrollbar-thumb-neutral-600 scrollbar-track-[transparent] flex h-full min-h-screen w-full flex-1 flex-col items-center p-4">
			<div className="flex w-[98%] flex-1 flex-col items-stretch gap-6 sm:w-[70%]">
				<LifeDbHeader />
				<hr />
				<Outlet />
				<ModalManager modalType={activeModal} />
			</div>
		</div>
	);
}
