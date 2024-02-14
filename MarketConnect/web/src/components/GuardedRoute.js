import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { REACT_APP_MAIN_URL } from "../config";

const GuardedRoute = () => {
  const { session, isFetching } = useContext(AuthContext);
  if (session != null || isFetching) return <Outlet />;
  else return <LoginRedirector />;
};

const LoginRedirector = function () {
  useEffect(() => {
    window.location.replace(`${REACT_APP_MAIN_URL}/login?redirect=${window.location.href}`);
  }, []);
  return <span>Redirecting to login...</span>;
}

export default GuardedRoute;
