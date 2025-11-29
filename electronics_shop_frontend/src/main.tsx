import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// SPL VARIATION POINT: Dark Theme
// Uncomment the line below to enable dark theme
import "./config/theme.dark";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
