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
      <nav>
        <div>
          <div>
            <a href={REACT_APP_MAIN_URL}><img src={`${REACT_APP_BASE_WEB_PATH}/logo.png`} className="logo" /></a>
          </div>
          <ul className="menu">
            <li>
              <span>Blogs</span>
              <ul className="hidden">
                <a href={`${REACT_APP_MAIN_URL}/blogs`}><li><span>Main</span></li></a>
                <li className="sub-menu">
                  <span>Categories &gt;</span>
                  <ul className="hidden">
                    <a href={`${REACT_APP_MAIN_URL}/blogs/cleaning`}><li><span>Cleaning</span></li></a>
                    <a href={`${REACT_APP_MAIN_URL}/blogs/decoration`}><li><span>Decorations</span></li></a>
                    <a href={`${REACT_APP_MAIN_URL}/blogs/cooking`}><li><span>Cooking</span></li></a>
                    <a href={`${REACT_APP_MAIN_URL}/blogs/story`}><li><span>DekHor's Story</span></li></a>
                  </ul>
                </li>
                <a href={`${REACT_APP_MAIN_URL}/blogs/writeblog`}><li><span>Blogging</span></li></a>
                <a href={`${REACT_APP_MAIN_URL}/blogs/blogger`}><li><span>Blogger</span></li></a>
              </ul>
            </li>
            <li>
              <span>Dorms</span>
              <ul className="main hidden">
                <a href={`${REACT_APP_MAIN_URL}/dorms`}><li><span>Main</span></li></a>
                <a href={`${REACT_APP_MAIN_URL}/dorms`}><li><span>All Dorms</span></li></a>
                <a href={`${REACT_APP_MAIN_URL}/dorms`}><li><span>Add Dorm</span></li></a>
              </ul>
            </li>
            <li>
              <span>Markets</span>
              <ul className="main hidden">
                <Link to={'/home'}><li><span>Main</span></li></Link>
                <Link to={'/food'}><li><span>All Products</span></li></Link>
                <Link to={'/manage'}><li><span>Manage Products</span></li></Link>
              </ul>
            </li>
          </ul>
          <div className="right">
            <>
              <a className="button outlined" href={`${REACT_APP_MAIN_URL}/login`}>Sign up</a>
              <div className="divider" />
              <a className="button primary" href={`${REACT_APP_MAIN_URL}/register`}>Login</a>
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
        </div>
      </nav>
      <div style={{ height: '70px' }} />
    </>
  );
};

const NavIcon = ({ img }) => <img src={img} alt="" className="nav-icon" />;

export default NavBar;
