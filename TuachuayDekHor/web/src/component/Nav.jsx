import { Link, NavLink } from "react-router-dom";
import "./Nav.scoped.css";
import { REACT_APP_MAIN_URL, REACT_APP_BASE_API_URL } from "../config";
import { useState, useContext, useEffect } from "react";
import { AuthContext, Usesupabase } from "../App";
import axios from "axios";
import img1 from '../../src/Assets/person-circle-outline.svg'


const Navbar = () => {
  const [isOpen_1, setIsOpen_1] = useState(false);
  const [isOpen_2, setIsOpen_2] = useState(false);
  const [isOpen_3, setIsOpen_3] = useState(false);
  const [isOpen_Profile, setIsOpen_Profile] = useState(false);
  // ส่วนของโปรไฟล์และทำการตรวจสอบว่า User ได้ทำการ login หรือยัง
  const [profileImage, setProfileImage] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const { supabase_for_use: supabase, session, user } = useContext(AuthContext);

  useEffect(() => {
    //console.log('session', session)

    //เรียกใช้ isLoggedIn เพื่อตรวจสอบสถานะการเข้าสู่ระบบ
    const checkLoginStatus = async () => {
      try {
        const user = session.user;

        if (user) {

          const isAdmin = user.email == 'admin@admin.com'; // แทน 'admin@example.com' ด้วยอีเมลล์ของ Admin

          axios.post(`${REACT_APP_BASE_API_URL}/profile-picture`,
            {
              userID: user.id
            }).then(res => {
              const { picture } = res.data;
              setProfileImage(picture);
              setIsUserLoggedIn(true);
              setIsAdminLoggedIn(isAdmin);
            });
        }
        else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, [session]);


  const SignOut = async () => {
    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;

    if (user) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
    }
    setIsOpen_Profile(false);
    window.location.reload();
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mainElement = document.getElementById('main');
      if (!mainElement.contains(event.target)) {
        setIsOpen_1(false);
        setIsOpen_2(false);
        setIsOpen_3(false);
        setIsOpen_Profile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <main id="main" className="main">
      <div className="leftside">
        <div className="logo">
          <a href={`${REACT_APP_MAIN_URL}/`}>
            <img alt="logo" src={`${REACT_APP_MAIN_URL}/images/logo.png`} height={70} width={80} />
          </a>
        </div>
      </div>
      <div className="middle" >

        <div>{/* dropdown 1 */}
          <button className="dropdown"
            onClick={() => {
              setIsOpen_1((prev) => !prev);
              setIsOpen_2(false);
              setIsOpen_3(false);
              setIsOpen_Profile(false);
            }}>
            <div className="dropdown_text">
              Blogs
            </div>
            {!isOpen_1 ? <span className="arrow">▼</span> : <span className="arrow">▲</span>}</button>

          {isOpen_1 && <div className="dropdownContent_blog">
            <a href={`${REACT_APP_MAIN_URL}/blogs`}>
              <div>
                <span>
                  Main
                </span>
              </div>
            </a>
            <a href={`${REACT_APP_MAIN_URL}/blogs/search`}>
              <div>
                <span>
                  All Blogs
                </span>
              </div>
            </a>
            <a href={`${REACT_APP_MAIN_URL}/blogs/writeblog`}>
              <div>
                <span>
                  Blogging
                </span>
              </div>
            </a>
            <a href={`${REACT_APP_MAIN_URL}/blogs/blogger`}>
              <div>
                <span>
                  Bloggers
                </span>
              </div>
            </a>
          </div>}
        </div>

        <div> {/* dropdown 2 */}
          <button className="dropdown"
            onClick={() => {
              setIsOpen_2((prev) => !prev);
              setIsOpen_3(false);
              setIsOpen_1(false);
              setIsOpen_Profile(false);
            }}>
            <div className="dropdown_text">
              Dorms
            </div>
            {!isOpen_2 ? <span className="arrow">▼</span> : <span className="arrow">▲</span>}</button>

          {isOpen_2 && <div className="dropdownContent">
            <a href={`${REACT_APP_MAIN_URL}/dorms`}>
              <div>
                <span>
                  Main
                </span>
              </div>
            </a>
            <a href={`${REACT_APP_MAIN_URL}/dorms/all`}>
              <div>
                <span>
                  All Dorms
                </span>
              </div>
            </a>
            <a href={`${REACT_APP_MAIN_URL}/dorms/add`}>
              <div>
                <span>
                  Add Dorm
                </span>
              </div>
            </a>
          </div>}
        </div>

        <div>{/* dropdown 3 */}
          <button className="dropdown"
            onClick={() => {
              setIsOpen_3((prev) => !prev);
              setIsOpen_2(false);
              setIsOpen_1(false);
              setIsOpen_Profile(false);
            }}>
            <div className="dropdown_text">
              Markets
            </div>
            {!isOpen_3 ? <span className="arrow">▼</span> : <span className="arrow">▲</span>}</button>

          {isOpen_3 && <div className="dropdownContent">
            <a href={`${REACT_APP_MAIN_URL}/markets/home`}>
              <div>
                <span>
                  Main
                </span>
              </div>
            </a>
            <a href={`${REACT_APP_MAIN_URL}/markets/food`}>
              <div>
                <span>
                  All Products
                </span>
              </div>
            </a>
            <a href={`${REACT_APP_MAIN_URL}/markets/manage`}>
              <div>
                <span>
                  Manage Product
                </span>
              </div>
            </a>
          </div>}
        </div>

      </div>
      {/* isUserLoggedIn  */}
      <div className="rightside">
        {isUserLoggedIn ? (
          <button
            onClick={() => {
              setIsOpen_Profile((prev) => !prev);
              setIsOpen_3(false);
              setIsOpen_2(false);
              setIsOpen_1(false);
            }}>
            {/* ตัวแปรโปรไฟล์อยู่ตรงนี้ใน src */}
            <img alt="Profile" src={profileImage ?? img1} className="ProfileImage" />
          </button>
        ) : (
          <div className="btn_wrap">
            <div className="btn">
              <a href={`${REACT_APP_MAIN_URL}/register`}>
                <button className="signup_btn" >
                  Sign up
                </button>
              </a>
            </div>
            <div>
              <a href={`${REACT_APP_MAIN_URL}/login?redirect=${window.location.href}`}>
                <button className="login_btn" >
                  Login
                </button>
              </a>
            </div>
          </div>
        )}

        {isOpen_Profile && <div className="dropdownContentProfile">
          {isAdminLoggedIn ?
            (<a href={`${REACT_APP_MAIN_URL}/admin`}>
              <div>
                <img alt="Admin" src={`${REACT_APP_MAIN_URL}/images/Admin.png`} height={30} width={30} />
                <span>
                  Admin
                </span>
              </div>
            </a>
            ) : (
              <a href={`${REACT_APP_MAIN_URL}/profile`}>
                <div>
                  <img alt="Profile" src={`${REACT_APP_MAIN_URL}/images/PersonCircle.svg`} height={30} width={30} />
                  <span>
                    My Profile
                  </span>
                </div>
              </a>)}
          <a href={`${REACT_APP_MAIN_URL}/support`}>
            <div>
              <img alt="Support" src={`${REACT_APP_MAIN_URL}/images/support.png`} height={30} width={30} />
              <span>
                Support
              </span>
            </div>
          </a>

          <div onClick={SignOut}>
            <img alt="logout" src={`${REACT_APP_MAIN_URL}/images/BoxArrowLeft.svg`} height={30} width={30} className="logout" />
            <span className="logout_text" >Log out</span>
          </div>
        </div>}
      </div>
    </main>
  );
};

export default Navbar;
