'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './nav.module.css'
import Link from 'next/link'
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../config'
import axios from 'axios'


export default function NavBar() {

    // NavBar ยังไม่ได้เชื่อม
    const [isOpen_1, setIsOpen_1] = useState(false);
    const [isOpen_2, setIsOpen_2] = useState(false);
    const [isOpen_3, setIsOpen_3] = useState(false);
    const [isOpen_Profile, setIsOpen_Profile] = useState(false);
    const [isOpen_Categories, setIsOpen_Categories] = useState(false);
    // ส่วนของโปรไฟล์และทำการตรวจสอบว่า User ได้ทำการ login หรือยัง
    const [profileImage, setProfileImage] = useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        // เรียกใช้เพื่อดึงข้อมูลโปรไฟล์ ทำตรงนี้เลยเพื่อน ใช้ตัวแปร profileImage นะ

        // เรียกใช้ isLoggedIn เพื่อตรวจสอบสถานะการเข้าสู่ระบบ
        const checkLoginStatus = async () => {
            try {
                axios.post(`${NEXT_PUBLIC_BASE_API_URL}/check-logged-in`,{})
                .then(res =>{
                    const {loggedIn , picture} = res.data;
                    setIsUserLoggedIn(loggedIn);
                    setProfileImage(picture);
                }).error(error =>{
                    console.log(error);
                })
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);
    

    return (
        <main className={styles.main}>
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

                    {isOpen_1 && <div className={styles.dropdownContent}>
                        <div>
                            <span>
                                <Link href={`/blogs`}>Main</Link>
                            </span>
                        </div>
                        <div>
                            <button className={styles.subdropdown} onClick={() => setIsOpen_Categories((prev) => !prev)}>
                                <span>Categories</span>
                                {!isOpen_Categories ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}
                            </button>
                            {isOpen_Categories && (
                                <div className={styles.subdropdownContent}>
                                    <div>
                                        <span>
                                            <Link href={`/blogs/cleaning`}>Cleaning</Link>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <Link href={`/blogs/decoration`}>Decorations</Link>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <Link href={`/blogs/story`}>Story's DekHor</Link>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <span>
                                <Link href={`/blogs/writeblog`}>Blogging</Link>
                            </span>
                        </div>
                        <div>
                            <span>
                                <Link href={`/blogs/blogger`}>Blogger</Link>
                            </span>
                        </div>
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
                        <div>
                            <span>
                                <Link href={`/dorms`}>Main</Link>
                            </span>
                        </div>
                        <div>
                            <span>
                                <Link href={`/dorms`}>All Dorms</Link>
                            </span>
                        </div>
                        <div>
                            <span>
                                <Link href={`/dorms`}>Add Dorm</Link>
                            </span>
                        </div>
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
                        <div>
                            <span>
                                <Link href={`/markets`}>Main</Link>
                            </span>
                        </div>
                        <div>
                            <span>
                                <Link href={`/markets/food`}>All Products</Link>
                            </span>
                        </div>
                        <div>
                            <span>
                                <Link href={`/markets/addproduct`}>Add Product</Link>
                            </span>
                        </div>
                    </div>}
                </div>

            </div>

            <div className={styles.rightside}>
                {!isUserLoggedIn ? (
                    <button
                        onClick={() => {
                            setIsOpen_Profile((prev) => !prev);
                            setIsOpen_3(false);
                            setIsOpen_2(false);
                            setIsOpen_1(false);
                        }}>
                            {/* ตัวแปรโปรไฟล์อยู่ตรงนี้ใน src */}
                        <div><img alt="Profile" src={profileImage}  className={styles.ProfileImage} /></div>
                    </button>
                ) : (
                    <>
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
                    </>
                )}

                {isOpen_Profile && <div className={styles.dropdownContentProfile}>
                    <div>
                        <Image alt="Profile" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/PersonCircle.svg`} height={30} width={30} />
                        <span>
                            <Link href={`/profile`}>My Profile</Link>
                        </span>
                    </div>
                    <div>
                        <Image alt="Support" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/support.png`} height={30} width={30} />
                        <span>
                            <Link href={`/support`}>Support</Link>
                        </span>
                    </div>
                    <div>
                        <Image alt="logout" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/BoxArrowLeft.svg`} height={30} width={30} className={styles.logout} />
                        <span className={styles.logout}><Link href={`/`}>Log out</Link></span>
                    </div>
                </div>}
            </div>
        </main>
    )
}
