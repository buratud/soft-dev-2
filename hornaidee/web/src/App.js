import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login";
import Register from "./pages/register";
import Detaildorm from "./pages/detaidom";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/chat";
import Manage_detail from "./pages/manage_detail";
import Error from "./pages/error";
import Helppage from "./pages/helppage";
import axios from "axios";
import Main from "./pages/main";
import { BASE_WEB_PATH, BASE_API_URL } from "./config";

const router = createHashRouter([
  {
    path: `${BASE_WEB_PATH}`,
    element: <Main />,
  },
  {
    path: `${BASE_WEB_PATH}/Login`,
    element: <Login />,
  },
  {
    path: `${BASE_WEB_PATH}/Register`,
    element: <Register />,
  },
  {
    path: `${BASE_WEB_PATH}/detail/:dormID`,
    element: <Detaildorm />,
  },
  {
    path: `${BASE_WEB_PATH}/chat/:userID/:chanel`,
    element: <Chat />,
  },
  {
    path: `${BASE_WEB_PATH}/chat/:userID`,
    element: <Chat />,
  },
  {
    path: `${BASE_WEB_PATH}/manage/:dormID`,
    element: <Manage_detail></Manage_detail>,
  },
  {
    path: "*",
    element: <Error></Error>,
  },
  {
    path: `${BASE_WEB_PATH}/help`,
    element: <Helppage></Helppage>,
  },
  {
    path: `${BASE_WEB_PATH}/help/:ticketID`,
    element: <Helppage></Helppage>,
  }
]);

function App() {
  const [user, setUser] = useState({actor:null})
  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  useEffect(() => {
    axios.post(`${BASE_API_URL}/auten`, {},
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`
        }
      }
    ).then((response) => {
      console.log(response.data.decoded);
      setUser(response.data.decoded)

    }).catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <userContext.Provider value={{user: user, setUser: setUser}}>
      <RouterProvider router={router} />
    </userContext.Provider>
  );
}
export const userContext = createContext()
export default App;
