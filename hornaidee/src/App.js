import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "Register",
    element: <Register />,
  },
  {
    path: "detail/:dormID",
    element: <Detaildorm />,
  },
  {
    path: "chat/:userID/:chanel",
    element: <Chat />,
  },
  {
    path: "chat/:userID",
    element: <Chat />,
  },
  {
    path: "manage/:dormID",
    element: <Manage_detail></Manage_detail>,
  },
  {
    path: "*",
    element: <Error></Error>,
  },
  {
    path: "help",
    element: <Helppage></Helppage>,
  },
  {
    path: "help/:ticketID",
    element: <Helppage></Helppage>,
  }
]);

function App() {
  const [user, setUser] = useState({actor:null})
  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  useEffect(() => {
    axios.post("http://localhost:3001/auten", {},
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
