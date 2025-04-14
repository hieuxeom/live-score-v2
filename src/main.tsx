import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import IndexRouter from "./routes/index-router";
import CustomToast from "./components/custom-toast";
import {HelmetProvider} from "react-helmet-async";
import LanguageProvider from "./components/provider/language-provider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HelmetProvider>
            <LanguageProvider>
                <CustomToast/>
                <IndexRouter/>
            </LanguageProvider>
        </HelmetProvider>
    </StrictMode>
);
