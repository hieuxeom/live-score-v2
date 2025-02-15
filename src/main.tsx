import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IndexRouter from "./routes/index-router";
import CustomToast from "./components/custom-toast";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<CustomToast />
		<IndexRouter />
	</StrictMode>
);
