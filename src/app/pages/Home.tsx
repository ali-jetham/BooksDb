import { Link } from "react-router";

export default function Home(): React.JSX.Element {
	return (
		<div className="flex flex-col items-center">
			<h1 className="pb-6 font-bold text-4xl">Track Your Reading Journey</h1>
			<p className="pb-6 text-xl">Effortlessly log, review, and manage the books you've read.</p>

			{/* TODO: uncomment when LifeDb is completed */}
			{/* <h1 className="pb-6 font-bold text-4xl">Your Personal Database.</h1>
			<p className="pb-6 text-2xl">Organize your </p> */}
			<Link
				to={"/auth/signup"}
				className="cursor-pointer rounded-[.4rem] bg-folly-500 px-6 py-2 text-center font-semibold text-white"
			>
				Sign Up
			</Link>
		</div>
	);
}
