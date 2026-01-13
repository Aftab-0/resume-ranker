import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScoreProvider } from "./ScoreContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ScoreProvider>
    <App />
  </ScoreProvider>
);
