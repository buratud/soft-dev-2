'use client'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import styles from './nav.module.css'
import Link from 'next/link'
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../config'
import axios from 'axios'
import { General, supabase } from '../session'


export default function NavBar() {
    const [isOpen_1, setIsOpen_1] = useState(false);
    const [isOpen_2, setIsOpen_2] = useState(false);
    const [isOpen_3, setIsOpen_3] = useState(false);
    const [isOpen_Profile, setIsOpen_Profile] = useState(false);
    const [isOpen_Categories, setIsOpen_Categories] = useState(false);
    // ส่วนของโปรไฟล์และทำการตรวจสอบว่า User ได้ทำการ login หรือยัง
    const [profileImage, setProfileImage] = useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    const { session } = useContext(General);

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

                    const isAdmin = user.email == 'admin@admin.com'; // แทน 'admin@example.com' ด้วยอีเมลล์ของ Admin

                    axios.post(`${NEXT_PUBLIC_BASE_API_URL}/profile-picture`,
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
                setIsOpen_Categories(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <main id="main" className={styles.main}>
            <div className={styles.leftside}>
                <div className={styles.logo}>
                    <Link href={`/`}>
                        <Image alt="logo" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/logo.png`} height={70} width={80} />
                    </Link>
                </div>
            </div>
            <div className={styles.middle} >

                <div>{/* dropdown 1 */}
                    <button className={styles.dropdown}
                        onClick={() => {
                            setIsOpen_1((prev) => !prev);
                            setIsOpen_2(false);
                            setIsOpen_3(false);
                            setIsOpen_Profile(false);
                            setIsOpen_Categories(false);
                        }}>
                        <div className={styles.dropdown_text}>
                            Blogs
                        </div>
                        {!isOpen_1 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_1 && <div className={styles.dropdownContent_blog}>
                        <Link href={`/blogs`}>
                            <div>
                                <span>
                                    Main
                                </span>
                            </div>
                        </Link>
                        <Link href={`/blogs/search`}>
                            <div>
                                <span>
                                    All Blogs
                                </span>
                            </div>
                        </Link>
                        <Link href={`/blogs/writeblog`}>
                            <div>
                                <span>
                                    Blogging
                                </span>
                            </div>
                        </Link>
                        <Link href={`/blogs/blogger`}>
                            <div>
                                <span>
                                    Bloggers
                                </span>
                            </div>
                        </Link>
                    </div>}
                </div>

                <div> {/* dropdown 2 */}
                    <button className={styles.dropdown}
                        onClick={() => {
                            setIsOpen_2((prev) => !prev);
                            setIsOpen_3(false);
                            setIsOpen_1(false);
                            setIsOpen_Profile(false);
                        }}>
                        <div className={styles.dropdown_text}>
                            Dorms
                        </div>
                        {!isOpen_2 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_2 && <div className={styles.dropdownContent}>
                        <Link href={`/dorms`}>
                            <div>
                                <span>
                                    Main
                                </span>
                            </div>
                        </Link>
                        <Link href={`/dorms/all`}>
                            <div>
                                <span>
                                    All Dorms
                                </span>
                            </div>
                        </Link>

                        <Link href={`/dorms/add`}>
                            <div>
                                <span>
                                    Add Dorm
                                </span>
                            </div>
                        </Link>
                    </div>}
                </div>

                <div>{/* dropdown 3 */}
                    <button className={styles.dropdown}
                        onClick={() => {
                            setIsOpen_3((prev) => !prev);
                            setIsOpen_2(false);
                            setIsOpen_1(false);
                            setIsOpen_Profile(false);
                        }}>
                        <div className={styles.dropdown_text}>
                            Markets
                        </div>
                        {!isOpen_3 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_3 && <div className={styles.dropdownContent}>
                        <Link href={`/markets`}>
                            <div>
                                <span>
                                    Main
                                </span>
                            </div>
                        </Link>
                        <Link href={`/markets/food`}>
                            <div>
                                <span>
                                    All Products
                                </span>
                            </div>
                        </Link>
                        <Link href={`/markets/manage`}>
                            <div>
                                <span>
                                    Manage Product
                                </span>
                            </div>
                        </Link>
                    </div>}
                </div>

            </div>

            <div className={styles.rightside}>
                {isUserLoggedIn ? (
                    <button
                        onClick={() => {
                            setIsOpen_Profile((prev) => !prev);
                            setIsOpen_3(false);
                            setIsOpen_2(false);
                            setIsOpen_1(false);
                        }}>
                        {/* ตัวแปรโปรไฟล์อยู่ตรงนี้ใน src */}
                        <img alt="Profile" src={profileImage} className={styles.ProfileImage} />
                    </button>
                ) : (
                    <div className={styles.btn_wrap}>
                        <div className={styles.btn}>
                            <Link href={`/register`}>
                                <button className={styles.signup_btn} >
                                    Sign up
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link href={`/login`}>
                                <button className={styles.login_btn} >
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {isOpen_Profile && <div className={styles.dropdownContentProfile}>
                    {isAdminLoggedIn ? (
                        <Link href={`/admin`}> {/* ตั้ง Link ไปยังหน้า Admin */}
                            <div>
                                <Image alt="Admin" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/Admins.png`} height={30} width={30} />
                                <span>
                                    Admin
                                </span>
                            </div>
                        </Link>
                    ) : (
                        <Link href={`/profile`}>
                            <div>
                                <Image alt="Profile" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/PersonCircle.svg`} height={30} width={30} />
                                <span>
                                    My Profile
                                </span>
                            </div>
                        </Link>
                    )}
                    <Link href={`/support`}>
                        <div>
                            <Image alt="Support" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/support.png`} height={30} width={30} />
                            <span>
                                Support
                            </span>
                        </div>
                    </Link>
                    <div onClick={SignOut}>
                        <Image alt="logout" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/BoxArrowLeft.svg`} height={30} width={30} className={styles.logout} />
                        <span className={styles.logout_text} >Log out</span>
                    </div>
                </div>}
            </div>
        </main>
    )
}