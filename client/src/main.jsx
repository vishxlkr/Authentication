import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// No BrowserRouter here! App.jsx will handle it
createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
