import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useParams } from "react-router";
import LifeDbHeader from "../components/LifeDbHeader";

import LifeDbMain from "../components/LifeDbMain";
import ModalManager from "../components/modals/ModalManger";
import { useAppUiStore } from "../store/useAppUiStore";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function LifeDb(): React.JSX.Element {
	let params = useParams();
	// FIXME: i think this needs to be a state
	const type = params.type;
	console.log(`type: ${type}`);
	const activeModal = useAppUiStore((state) => state.activeModal);

	return (
		<div className="flex-1 min-h-screen scrollbar-thumb-neutral-600 scrollbar-track-[transparent] flex h-full w-full flex-col items-center p-4">
			<div className="flex flex-1 flex-col w-[98%] gap-10 items-stretch  sm:w-[80%] sm:w-[70%]">
				<LifeDbHeader />
				<hr />
				<LifeDbMain type={type} />
				<ModalManager modalType={activeModal} />
			</div>
		</div>
	);
}
