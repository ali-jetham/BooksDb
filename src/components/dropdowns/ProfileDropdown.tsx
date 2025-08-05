import { useAuthStore } from "../../store/useAuthStore";
import Dropdown from "./Dropdown";
import type { DropdownItem } from "./Dropdown";

export default function ProfileDropdown(): React.JSX.Element {
	const logout = useAuthStore((state) => state.logout);
	const items: DropdownItem[] = [{ label: "Logout", action: logout }];
	return <Dropdown items={items} />;
}
