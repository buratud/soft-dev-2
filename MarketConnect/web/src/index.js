import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

reportWebVitals();
