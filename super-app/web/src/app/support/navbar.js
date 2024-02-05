// navbar version iteration 1 updated 04/02/2024 21:49

'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from './nav.module.css'
import { BsBoxArrowLeft } from "react-icons/bs"
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../../../config'
export default function Home() {

    const [isOpen_1, setIsOpen_1] = useState(false);
    const [isOpen_2, setIsOpen_2] = useState(false);
    const [isOpen_3, setIsOpen_3] = useState(false);
    const [isOpen_4, setIsOpen_4] = useState(false);
    const [isOpen_Profile, setIsOpen_Profile] = useState(false);
    const [isOpen_Categories, setIsOpen_Categories] = useState(false);
    const [isOpen_CategoriesEat, setIsOpen_CategoriesEat] = useState(false);

    return (
        <main className={styles.main}>
            <div className={styles.leftside}>
                <div className={styles.logo}>
                    <a href="/develop/homepage">
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
                            setIsOpen_4(false);
                            setIsOpen_Profile(false);
                            setIsOpen_Categories(false);
                        }}>Blogs
                        {!isOpen_1 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_1 && <div className={styles.dropdownContent}>
                        <div>
                            <span>
                                <a href="/">Main</a>
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
                                            <a href="/">Cleaning</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href="/">Decorations</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href="/">Story's DekHor</a>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <span>
                                <a href="/">Blogging</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="/">Blogger</a>
                            </span>
                        </div>
                    </div>}
                </div>


                <div> {/* dropdown 2 */}
                    <button className={styles.dropdown}
                        onClick={() => {
                            setIsOpen_2((prev) => !prev);
                            setIsOpen_3(false);
                            setIsOpen_4(false);
                            setIsOpen_1(false);
                            setIsOpen_Profile(false);
                        }}>Dorms
                        {!isOpen_2 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_2 && <div className={styles.dropdownContent}>
                        <div>
                            <span>
                                <a href="/">Main</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="/">All Dorms</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="/">Add Dorm</a>
                            </span>
                        </div>
                    </div>}
                </div>





                <div>{/* dropdown 3 */}
                    <button className={styles.dropdown}
                        onClick={() => {
                            setIsOpen_3((prev) => !prev);
                            setIsOpen_4(false);
                            setIsOpen_2(false);
                            setIsOpen_1(false);
                            setIsOpen_Profile(false);
                            setIsOpen_CategoriesEat(false);
                        }}>Eats
                        {!isOpen_3 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_3 && <div className={styles.dropdownContent}>
                        <div>
                            <span>
                                <a href="/">Main</a>
                            </span>
                        </div>
                        <div>
                            <button className={styles.subdropdown} onClick={() => setIsOpen_CategoriesEat((prev) => !prev)}>
                                <span>Categories</span>
                                {!isOpen_CategoriesEat ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}
                            </button>
                            {isOpen_CategoriesEat && (
                                <div className={styles.subdropdownContent}>
                                    <div>
                                        <span>
                                            <a href="/">Foods</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href="/">Desserts</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href="/">Drinks</a>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <span>
                                <a href="/">Add Recipe</a>
                            </span>
                        </div>
                    </div>}
                </div>



                <div>{/* dropdown 4 */}
                    <button className={styles.dropdown}
                        onClick={() => {
                            setIsOpen_4((prev) => !prev);
                            setIsOpen_3(false);
                            setIsOpen_2(false);
                            setIsOpen_1(false);
                            setIsOpen_Profile(false);
                        }}>Markets
                        {!isOpen_4 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_4 && <div className={styles.dropdownContent}>
                        <div>
                            <span>
                                <a href="/">Main</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="/">All Products</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="/">Add Product</a>
                            </span>
                        </div>
                    </div>}
                </div>

            </div>

            <div className={styles.rightside}>
                {/* dropdown Profile */}
                <button
                    onClick={() => {
                        setIsOpen_Profile((prev) => !prev);
                        setIsOpen_4(false);
                        setIsOpen_3(false);
                        setIsOpen_2(false);
                        setIsOpen_1(false);
                    }}>
                    <div><img alt="Profile" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/PersonCircle.svg`} className={styles.ProfileImage} /></div>
                </button>

                {isOpen_Profile && <div className={styles.dropdownContentProfile}>
                    <div>
                        <Image alt="Profile" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/PersonCircle.svg`} height={30} width={30} />
                        <span>
                            <a href="/">My Profile</a>
                        </span>
                    </div>
                    <div>
                        <Image alt="Support" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/support.png`} height={30} width={30} />
                        <span>
                            <a href="/">Support</a>
                        </span>
                    </div>
                    <div>
                        <BsBoxArrowLeft size={25} className={styles.logout} />
                        <span className={styles.logout}><a href="/">Log out</a></span>
                    </div>
                </div>}
            </div>
        </main>
    )
}
