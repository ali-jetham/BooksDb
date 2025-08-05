import { SmileySadIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

export default function NotFound(): React.JSX.Element {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-10">
			<span className="flex items-center gap-1 text-4xl">
				Page not found <SmileySadIcon size={36} />
			</span>

			<Link to="/" className="cursor-pointer rounded-[.4rem] bg-folly-500 px-6 py-2 text-center">
				Go to home
			</Link>
		</div>
	);
}
