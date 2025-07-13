import { Navigate, Outlet } from "react-router"

import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

export default function ProtectedRoute(): React.JSX.Element {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    useAuthStore.getState().refresh();
  }, [])

  if (isLoading) return <h1>Loading</h1>
  if (isAuthenticated) return <Outlet />

  return <Navigate to={"auth/login"} replace />
};

