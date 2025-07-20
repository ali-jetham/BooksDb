import { CircleIcon, DatabaseIcon, GearIcon } from "@phosphor-icons/react";

export default function LifeDbHeader(): React.JSX.Element {
	return (
		<header className="flex items-center justify-between">
			<DatabaseIcon color="#EF4764" size={"3rem"} />

			<div className="gap-3">
				<button type="button">
					<GearIcon size={"2rem"} className="dark:fill-white" />
				</button>
				<button type="button">
					<CircleIcon className="fill-black dark:fill-white" size={"2rem"} />
				</button>
			</div>
		</header>
	);
}
