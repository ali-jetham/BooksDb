import { CircleIcon, DatabaseIcon, GearIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";
import { useAppUiStore } from "../store/useAppUiStore";
import ProfileDropdown from "./dropdowns/ProfileDropdown";

export default function LifeDbHeader(): React.JSX.Element {
	const showProfileDropsdown = useAppUiStore((state) => state.showProfileDropdown);
	const setShowProfileDropdown = useAppUiStore((state) => state.actions.setShowProfileDropdown);

	return (
		<header className="flex items-center justify-between">
			<NavLink to={"/app/books"}>
				<DatabaseIcon color="#EF4764" size={"3rem"} />
			</NavLink>

			<div className="gap-3">
				{/* <button type="button">
					<GearIcon size={"2rem"} className="dark:fill-white" />
				</button> */}
				<button type="button" onClick={() => setShowProfileDropdown(!showProfileDropsdown)}>
					<CircleIcon className="fill-black dark:fill-white" size={"2rem"} />
				</button>
				{showProfileDropsdown && <ProfileDropdown />}
			</div>
		</header>
	);
}
