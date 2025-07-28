import "@fontsource-variable/roboto";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./app/App.tsx";
import { BrowserRouter } from "react-router";

// biome-ignore lint/style/noNonNullAssertion: root div is always present
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
