import { createRoot } from "react-dom/client";
import "./globals.css";
import AppRoutes from "./infraestructure/AppRoutes";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster position="bottom-right" richColors />
    <AppRoutes />
  </>
);
