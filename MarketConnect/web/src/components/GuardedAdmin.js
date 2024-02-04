import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import { REACT_APP_BASE_API_URL } from "../config";

const GuardedAdmin = () => {
  const { user } = useContext(AuthContext);
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    if (user != undefined)
      axios
        .post(`${REACT_APP_BASE_API_URL}/getAdmin`, {
          user: user?.id,
        })
        .then((res) => {
          setAdmin(res?.data?.Admin);
        })
        .catch((err) => {
          alert(err);
        });
  }, [user]);
  if (admin === "Y") {
    return <Outlet />;
  } else if (admin === "N") {
    // console.log("1")
    alert("You don't have permission to access this page");
    return <Navigate to="/home" />;
  } else {
    return <div />;
  }
};

export default GuardedAdmin;
