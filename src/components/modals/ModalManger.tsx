import type { ActiveModal } from "../../store/useAppUiStore";
import AddBookModal from "./AddBookModal";

export default function ModalManager({ modalType }: { modalType: ActiveModal }) {
	if (modalType === "addBook") return <AddBookModal />;
	return null;
}
