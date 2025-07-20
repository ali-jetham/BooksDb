import { BrowserRouter, Route, Routes } from "react-router";
import LifeDb from "./LifeDb";
import Auth from "./pages/Auth";
import Docs from "./pages/Docs";
import Help from "./pages/Help";
import Home from "./pages/Home";
import HomeLayout from "./pages/HomeLayout";

function App() {
	return (
		<div className="h-screen min-h-screen w-screen min-w-screen">
			<BrowserRouter>
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

					{/* <Route element={<ProtectedRoute />}> */}
					<Route path="/app" element={<LifeDb />} />
					<Route path="/app/:type" element={<LifeDb />} />
					{/* </Route> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
