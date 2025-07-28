import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router";
import Header from "../../components/Header";
import { useAuthStore } from "../../store/useAuthStore";

export default function HomeLayout(): React.JSX.Element {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	if (isAuthenticated) return <Navigate to={"app/books"} />;

	return (
		<div>
			<Header />
			<main className="flex justify-center pt-10">
				<Outlet />
			</main>
		</div>
	);
}
