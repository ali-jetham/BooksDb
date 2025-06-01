import {Link} from "react-router"

export default function Home(): React.JSX.Element {
		return (
				<div className="flex flex-col items-center">
						<h1 className="pb-6 font-bold text-4xl">Your Personal Database.</h1>
						<p className="prose pb-6 text-2xl">
								The app to make database tables with the power of SQL.
						</p>
						<Link to={"/auth/signup"}
									className="cursor-pointer rounded-[.4rem] bg-folly px-6 py-2 text-center font-semibold text-gray-100">
								Sign Up
						</Link>
				</div>
		)
};

