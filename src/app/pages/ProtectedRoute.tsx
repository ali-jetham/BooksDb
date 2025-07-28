import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "../../store/useAuthStore";

export default function ProtectedRoute(): React.JSX.Element {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isLoading = useAuthStore((state) => state.isLoading);

	if (isLoading)
		return (
			<div className="flex h-full w-full items-center justify-center">
				<h1>Loading...</h1>
			</div>
		);
	if (isAuthenticated) return <Outlet />;

	return <Navigate to={"auth/login"} replace />;
}
