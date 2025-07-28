import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function Header(): React.JSX.Element {
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const navLinks = [
		{ to: "/", label: "Home" },
		{ to: "/help", label: "Help" },
		{ to: "/docs", label: "Docs" },
		{ to: "/auth/login", label: "Login" },
	];

	const navLinksElements = navLinks.map((link) => (
		<NavLink
			key={link.to}
			to={link.to}
			className={({ isActive }) =>
				`rounded ${isActive ? "underline" : ""} ${link.label === "Login" ? "flex h-10 w-20 cursor-pointer items-center justify-center rounded-[.2rem] bg-folly text-white" : ""}`
			}
		>
			{link.label}
		</NavLink>
	));

	return (
		<header className="flex items-center justify-between p-4 shadow-2xl">
			<NavLink to={"/"} className="text-2xl">
				{/* LifeDB */}
				BooksDb
			</NavLink>

			<nav className="hidden items-center gap-6 md:flex">{navLinksElements}</nav>

			<div className="ml-auto md:hidden">
				<button type="button" onClick={() => setIsSideMenuOpen(true)}>
					<ListIcon size={32} />
				</button>
			</div>

			<nav
				className={`fixed top-0 right-0 h-full w-60 bg-neutral-600 ${isSideMenuOpen ? "" : "hidden"}`}
			>
				<div className="flex justify-end">
					<button type="button" className="p-4 " onClick={() => setIsSideMenuOpen(false)}>
						<XIcon size={32} />
					</button>
				</div>

				<div className="flex flex-col items-stretch px-4 text-2xl">{navLinksElements}</div>
			</nav>
		</header>
	);
}
