import { NavLink } from "react-router-dom";
import "./NavBar.scoped.css";
import { useSupabase } from "../App";

const NavBar = () => {
  const supabase = useSupabase();
  const nav_class = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";
  const Sign_Out = () => {
    supabase.auth.signOut();
  };
  return (
    <header>
      <NavLink className="logo" to="/home">
        <img src="/logonav.svg" alt="" />
      </NavLink>
      <nav className="nav-bar">
        <NavLink className={nav_class} to="/home">
          Home <NavIcon img="/homeicon.png" />
        </NavLink>
        <NavLink className={nav_class} to="/food">
          Food <NavIcon img="/foodicon.png" />
        </NavLink>
        <NavLink className={nav_class} to="/manage">
          Manage <NavIcon img="/manage.png" />
        </NavLink>
        <NavLink className={nav_class} to="/support">
          Support <NavIcon img="/supporticon.png" />
        </NavLink>
        <NavLink className={nav_class} to="/profile">
          Profile <NavIcon img="/profileicon.png" />
        </NavLink>
        <NavLink className="nav_copy" onClick={Sign_Out}>
          Logout <NavIcon img="/logouticon.png" />
        </NavLink>
      </nav>
    </header>
  );
};

const NavIcon = ({ img }) => <img src={img} alt="" className="nav-icon" />;

export default NavBar;
