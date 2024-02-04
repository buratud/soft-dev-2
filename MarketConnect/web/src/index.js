import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import "./global.css";
import { REACT_APP_BASE_WEB_PATH } from "./config";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HashRouter basename={"/"}>
    <App />
  </HashRouter>
);

reportWebVitals();
