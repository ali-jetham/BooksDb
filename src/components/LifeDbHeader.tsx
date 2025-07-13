import { DatabaseIcon, StackPlusIcon } from "@phosphor-icons/react";

export default function LifeDbHeader(): React.JSX.Element {
	return (
		<header className="mb-10 flex items-center justify-between bg-white p-1 dark:bg-neutral-700">
			<DatabaseIcon color="#EF4764" size={"3rem"} />

			<button type="button">
				<StackPlusIcon className="fill-black dark:fill-white" size={"2rem"} />
			</button>
		</header>
	);
}
