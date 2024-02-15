import { NavLink } from "react-router-dom";
import "./NavBar.scoped.sass";
import { useSupabase } from "../App";
import { REACT_APP_BASE_WEB_PATH } from "../config";

const NavBar = () => {
  const supabase = useSupabase();
  const nav_class = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";
  const Sign_Out = () => {
    supabase.auth.signOut();
  };
  return (
    <nav>
      <div>
        <img src={`${REACT_APP_BASE_WEB_PATH}/logo.png`} className="logo" />
      </div>
      <ul className="menu">
        <li>
          <span>Blogs</span>
          <ul className="main hidden">
            <li>Main</li>
            <li className="sub-menu">
              <span>Categories &gt;</span>
              <ul className="hidden left">
                <li>Cleaning</li>
                <li>Decorations</li>
                <li>Cooking</li>
                <li>DekHor's Story</li>
              </ul>
            </li>
            <li>Blogging</li>
            <li>Blogger</li>
          </ul>
        </li>
        <li>
          <span>Dorms</span>
          <ul className="main hidden">
            <li>Main</li>
            <li>All Dorms</li>
            <li>Add Dorm</li>
          </ul>
        </li>
        <li>
          <span>Markets</span>
          <ul className="main hidden">
            <li>Main</li>
            <li>All Products</li>
            <li>Manage Products</li>
          </ul>
        </li>
      </ul>
      <div className="right">
        <>
          <a className="button outlined">Sign up</a>
          <div className="divider" />
          <a className="button primary">Login</a>
        </>
        {/* <div>
          <img src={`${REACT_APP_BASE_WEB_PATH}/logo.png`} className="logo" />
          <ul>
            <li>
              <img src={`${REACT_APP_BASE_WEB_PATH}/logo.png`} className="logo" />
              <span>My Profile</span>
            </li>
            <li>
              <img src={`${REACT_APP_BASE_WEB_PATH}/logo.png`} className="logo" />
              <span>Support</span>
            </li>
            <li>
              <img src={`${REACT_APP_BASE_WEB_PATH}/logo.png`} className="logo" />
              <span>Log out</span>
            </li>
          </ul>
        <div/> */}
      </div>
    </nav>
  );
};

const NavIcon = ({ img }) => <img src={img} alt="" className="nav-icon" />;

export default NavBar;
