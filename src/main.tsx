
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("Main.tsx: Starting application mount");

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  console.log("Main.tsx: Found root element", rootElement);

  createRoot(rootElement).render(<App />);
  console.log("Main.tsx: Render called");
} catch (error) {
  console.error("Main.tsx: Fatal Error during mount:", error);
  document.body.innerHTML = `<div style="color:red; padding: 20px;"><h1>Application Error</h1><pre>${String(error)}</pre></div>`;
}
