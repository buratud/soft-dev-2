import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { REACT_APP_BASE_WEB_PATH } from "./config";


const container = document.getElementById("root");
const root = createRoot(container);
console.log(REACT_APP_BASE_WEB_PATH);
root.render(
  <BrowserRouter basename={REACT_APP_BASE_WEB_PATH}> 
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

