import { CircleIcon, DatabaseIcon, GearIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";
import { useAppUiStore } from "../store/useAppUiStore";
import ProfileDropdown from "./dropdowns/ProfileDropdown";
import { useAuthStore } from "../store/useAuthStore";

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
					<span className="relative inline-flex items-center justify-center">
						<CircleIcon weight="fill" fill="#EF4764" size={"2.2rem"} />
						<span
							className="pointer-events-none absolute inset-0 flex items-center justify-center text-white"
							style={{ fontSize: "1rem" }}
						>
							{useAuthStore.getState().name?.charAt(0)}
						</span>
					</span>
				</button>
				{showProfileDropsdown && <ProfileDropdown />}
			</div>
		</header>
	);
}
