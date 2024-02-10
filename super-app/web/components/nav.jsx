'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from './nav.module.css'
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../config'

export default function NavBar() {

    // NavBar ยังไม่ได้เชื่อม

    const [isOpen_1, setIsOpen_1] = useState(false);
    const [isOpen_2, setIsOpen_2] = useState(false);
    const [isOpen_3, setIsOpen_3] = useState(false);
    const [isOpen_Profile, setIsOpen_Profile] = useState(false);
    const [isOpen_Categories, setIsOpen_Categories] = useState(false);

    const isLoggedIn = false;
    

    return (
        <main className={styles.main}>
            <div className={styles.leftside}>
                <div className={styles.logo}>
                    <a href={`${NEXT_PUBLIC_BASE_WEB_PATH}`}>
                        <Image alt="logo" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/logo.png`} height={70} width={80} />
                    </a>
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
                                <a href={`/blogs`}>Main</a>
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
                                            <a href={`/blogs/cleaning`}>Cleaning</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href={`/blogs/decoration`}>Decorations</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href={`/blogs/story`}>Story's DekHor</a>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <span>
                                <a href={`/blogs/writeblog`}>Blogging</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href={`/blogs/blogger`}>Blogger</a>
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
                                <a href={`/dorms`}>Main</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href={`/dorms`}>All Dorms</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href={`/dorms`}>Add Dorm</a>
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
                                <a href={`/markets`}>Main</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href={`/markets`}>All Products</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href={`/markets/addproduct`}>Add Product</a>
                            </span>
                        </div>
                    </div>}
                </div>

            </div>

            <div className={styles.rightside}>
                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            setIsOpen_Profile((prev) => !prev);
                            setIsOpen_3(false);
                            setIsOpen_2(false);
                            setIsOpen_1(false);
                        }}>
                        <div><img alt="Profile" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/PersonCircle.svg`}  className={styles.ProfileImage} /></div>
                    </button>
                ) : (
                    <>
                        <div className={styles.btn}>
                            <a href={`/register`}>
                                <button className={styles.signup_btn} >
                                    Sign up
                                </button>
                            </a>
                        </div>
                        <div>
                            <a href={`/login`}>
                                <button className={styles.login_btn} >
                                    Login
                                </button>
                            </a>
                        </div>
                    </>
                )}

                {isOpen_Profile && <div className={styles.dropdownContentProfile}>
                    <div>
                        <Image alt="Profile" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/PersonCircle.svg`} height={30} width={30} />
                        <span>
                            <a href={`/profile`}>My Profile</a>
                        </span>
                    </div>
                    <div>
                        <Image alt="Support" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/support.png`} height={30} width={30} />
                        <span>
                            <a href={`/support`}>Support</a>
                        </span>
                    </div>
                    <div>
                        <Image alt="logout" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/BoxArrowLeft.svg`} height={30} width={30} className={styles.logout} />
                        <span className={styles.logout}><a href={`${NEXT_PUBLIC_BASE_WEB_PATH}`}>Log out</a></span>
                    </div>
                </div>}
            </div>
        </main>
    )
}
