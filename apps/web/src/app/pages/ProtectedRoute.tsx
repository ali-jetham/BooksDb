import { Navigate, Outlet } from "react-router"

import { useAuthStore } from "../../store/useAuthStore";

export default function ProtectedRoute(): React.JSX.Element {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.loading);

  console.log(isAuthenticated);

  if (isLoading) return <h1>Loading</h1>
  if (isAuthenticated) return <Outlet />
  return <Navigate to={"auth/login"} replace />

};

