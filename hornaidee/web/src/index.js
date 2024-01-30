import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login";
import Register from "./pages/register";
import Detaildorm from "./pages/detaidom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/chat";
import Manage_detail from "./pages/manage_detail";
import Error from "./pages/error";
import Helppage from "./pages/helppage";
import axios from "axios";
import Main from "./pages/main";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
