import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster position="bottom-right" richColors />
    <App />
  </>
);
