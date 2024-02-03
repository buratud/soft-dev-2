'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from './navbar.module.css'
import { BsBoxArrowLeft } from "react-icons/bs"

export default function Navbar() {

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
                    <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/">
                        <Image alt="logo" src="/images/LOGO.png" height={70} width={80} />
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
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs">Main</a>
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
                                            <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/cleaning">Cleaning</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/decoration">Decorations</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/story">Story's DekHor</a>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <span>
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/writeblog">Blogging</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs/blogger">Blogger</a>
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
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms">Main</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms">All Dorms</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms">Add Dorm</a>
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
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats">Main</a>
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
                                            <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats/foodRecipe">Foods</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats/dessertRecipe">Desserts</a>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats">Drinks</a>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <span>
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats/addnewmenu">Add Recipe</a>
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
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market">Main</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market/food">All Products</a>
                            </span>
                        </div>
                        <div>
                            <span>
                                <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market/addproduct">Add Product</a>
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
                    <div><img alt="Profile" src="/images/PersonCircle.svg" className={styles.ProfileImage} /></div>
                </button>

                {isOpen_Profile && <div className={styles.dropdownContentProfile}>
                    <div>
                        <Image alt="Profile" src="/images/PersonCircle.svg" height={30} width={30} />
                        <span>
                            <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/">My Profile</a>
                        </span>
                    </div>
                    <div>
                        <Image alt="Support" src="/images/support.png" height={30} width={30} />
                        <span>
                            <a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/">Support</a>
                        </span>
                    </div>
                    <div>
                        <BsBoxArrowLeft size={25} className={styles.logout} />
                        <span className={styles.logout}><a href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/">Log out</a></span>
                    </div>
                </div>}
            </div>
        </main>
    )
}
