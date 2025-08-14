import { Route, Routes, useNavigate } from "react-router";
import LifeDb from "./pages/LifeDb";
import Auth from "./pages/Auth";
import Docs from "./pages/Docs";
import Help from "./pages/Help";
import Home from "./pages/Home";
import HomeLayout from "./pages/HomeLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Book from "./pages/Book";
import LifeDbMain from "../components/LifeDbMain";

function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isLoading: boolean = useAuthStore((state) => state.isLoading);
	const navigate = useNavigate();

	useEffect(() => {
		useAuthStore.getState().login();
	}, []);

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			navigate("/app/books", { replace: true });
		}
	}, [isLoading, isAuthenticated]); // NOTE: [isLoading, isAuthenticated] add if issues

	if (isLoading) {
		return <div className="dark:bg-neutral-800" />;
	}

	return (
		<div className="flex h-screen min-h-screen w-screen min-w-screen flex-col selection:bg-folly-500/50 dark:bg-neutral-800 dark:text-white">
			<Routes>
				<Route path="/" element={<HomeLayout />}>
					<Route index element={<Home />} />
					<Route path="help" element={<Help />} />
					<Route path="docs" element={<Docs />} />
				</Route>

				{/* <Route path="/auth" element={<Auth />}> */}
				<Route path="/auth/login" element={<Auth type="signin" />} />
				<Route path="/auth/signup" element={<Auth type="signup" />} />
				{/* </Route> */}

				<Route element={<ProtectedRoute />}>
					<Route path="/app" element={<LifeDb />}>
						<Route path=":type" element={<LifeDbMain />} />
						<Route path="books/:id" element={<Book />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
