import { Link, NavLink } from "react-router-dom";
import "./NavBar.scoped.css";
import {  REACT_APP_MAIN_URL, REACT_APP_MAIN_API_URL } from "../config";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../App";
const NavBar = () => {
  const [isOpen_1, setIsOpen_1] = useState(false);
  const [isOpen_2, setIsOpen_2] = useState(false);
  const [isOpen_3, setIsOpen_3] = useState(false);
  const [isOpen_Profile, setIsOpen_Profile] = useState(false);
  const [isOpen_Categories, setIsOpen_Categories] = useState(false);
  // ส่วนของโปรไฟล์และทำการตรวจสอบว่า User ได้ทำการ login หรือยัง
  const [profileImage, setProfileImage] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const { session } = useContext(AuthContext);

  useEffect(() => {
    //console.log('session', session)

    //เรียกใช้ isLoggedIn เพื่อตรวจสอบสถานะการเข้าสู่ระบบ
    const checkLoginStatus = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.log(error);
        }
        const user = data?.session?.user;

        if (user) {
          axios.post(`${REACT_APP_MAIN_API_URL}/profile-picture`,
            {
              userID: user.id
            }).then(res => {
              const { picture } = res.data;
              setProfileImage(picture);
              setIsUserLoggedIn(true);
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
        setIsOpen_Categories(false);
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
              setIsOpen_Categories(false);
            }}>
            <div className="dropdown_text">
              Blogs
            </div>
            {!isOpen_1 ? <span className="arrow">▼</span> : <span className="arrow">▲</span>}</button>

          {isOpen_1 && <div className="dropdownContent">
            <div>
              <span>
                <a href={`${REACT_APP_MAIN_URL}/blogs`}>Main</a>
              </span>
            </div>
            <div>
              <button className="subdropdown" onClick={() => setIsOpen_Categories((prev) => !prev)}>
                <span>Categories</span>
                {!isOpen_Categories ? <span className="arrow">▼</span> : <span className="arrow">▲</span>}
              </button>
              {isOpen_Categories && (
                <div className="subdropdownContent">
                  <div>
                    <span>
                      <a href={`${REACT_APP_MAIN_URL}/blogs/cleaning`}>Cleaning</a>
                    </span>
                  </div>
                  <div>
                    <span>
                      <a href={`${REACT_APP_MAIN_URL}/blogs/decoration`}>Decorations</a>
                    </span>
                  </div>
                  <div>
                    <span>
                      <a href={`${REACT_APP_MAIN_URL}/blogs/cooking`}>cooking</a>
                    </span>
                  </div>
                  <div>
                    <span>
                      <a href={`${REACT_APP_MAIN_URL}/blogs/story`}>Story's DekHor</a>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <span>
                <a href={`${REACT_APP_MAIN_URL}/blogs/writeblog`}>Blogging</a>
              </span>
            </div>
            <div>
              <span>
                <a href={`${REACT_APP_MAIN_URL}/blogs/blogger`}>Blogger</a>
              </span>
            </div>
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
            <div>
              <span>
                <a href={`${REACT_APP_MAIN_URL}/dorms`}>Main</a>
              </span>
            </div>
            <div>
              <span>
                <a href={`${REACT_APP_MAIN_URL}/dorms`}>All Dorms</a>
              </span>
            </div>
            <div>
              <span>
                <a href={`${REACT_APP_MAIN_URL}/dorms`}>Add Dorm</a>
              </span>
            </div>
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
            <div>
              <span>
                <Link to={`/home`}>Main</Link>
              </span>
            </div>
            <div>
              <span>
                <Link to={`/food`}>All Products</Link>
              </span>
            </div>
            <div>
              <span>
                <Link to={`/addproduct`}>Manage Product</Link>
              </span>
            </div>
          </div>}
        </div>

      </div>

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
            <div><img alt="Profile" src={profileImage} className="ProfileImage" /></div>
          </button>
        ) : (
          <>
            <div className="btn">
              <a href={`${REACT_APP_MAIN_URL}/register`}>
                <button className="signup_btn" >
                  Sign up
                </button>
              </a>
            </div>
            <div>
              <a href={`${REACT_APP_MAIN_URL}/login`}>
                <button className="login_btn" >
                  Login
                </button>
              </a>
            </div>
          </>
        )}

        {isOpen_Profile && <div className="dropdownContentProfile">
          <div>
            <img alt="Profile" src={`${REACT_APP_MAIN_URL}/images/PersonCircle.svg`} height={30} width={30} />
            <span>
              <a href={`${REACT_APP_MAIN_URL}/profile`}>My Profile</a>
            </span>
          </div>
          <div>
            <img alt="Support" src={`${REACT_APP_MAIN_URL}/images/support.png`} height={30} width={30} />
            <span>
              <a href={`${REACT_APP_MAIN_URL}/support`}>Support</a>
            </span>
          </div>

          <div onClick={SignOut}>
            <img alt="logout" src={`${REACT_APP_MAIN_URL}/images/BoxArrowLeft.svg`} height={30} width={30} className="logout" />
            <span className="logout_text" >Log out</span>
          </div>
        </div>}
      </div>
    </main>
  );
};

const NavIcon = ({ img }) => <img src={img} alt="" className="nav-icon" />;

export default NavBar;
