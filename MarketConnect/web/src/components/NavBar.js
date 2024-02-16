import { Link, NavLink } from "react-router-dom";
import "./NavBar.scoped.sass";
import { useSupabase } from "../App";
import { REACT_APP_BASE_WEB_PATH, REACT_APP_MAIN_URL } from "../config";

const NavBar = () => {
  const supabase = useSupabase();
  const nav_class = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";
  const Sign_Out = () => {
    supabase.auth.signOut();
  };
  return (
    <>
    </>
  );
};

const NavIcon = ({ img }) => <img src={img} alt="" className="nav-icon" />;

export default NavBar;
