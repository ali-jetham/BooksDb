import type { ActiveModal } from "../../store/useAppUiStore";
import AddBookModal from "./AddBookModal";
// import AddDbModal from "./AddDbModal";

export default function ModalManager({ modalType }: { modalType: ActiveModal }) {
	// if (modalType === "addDb") return <AddDbModal />;
	if (modalType === "addBook") return <AddBookModal />;
	return null;
}
