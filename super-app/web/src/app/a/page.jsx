'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from './nav.module.css'

export default function Home() {

    const [isOpen_1, setIsOpen_1] = useState(false);
    const [isOpen_2, setIsOpen_2] = useState(false);
    const [isOpen_3, setIsOpen_3] = useState(false);
    const [isOpen_4, setIsOpen_4] = useState(false);
    const [isOpen_Profile, setIsOpen_Profile] = useState(false);
    const [isOpen_5, setIsOpen_5] = useState(false);

    return (
        <main className={styles.main}>
            <div className={styles.leftside}>
                <div className={styles.logo}>
                    <Image alt="logo" src="/images/LOGO.png" height={78} width={80} />
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
                            setIsOpen_5(false);
                        }}>Blogs
                        {!isOpen_1 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_1 && <div className={styles.dropdownContent}>
                        <div>
                            <span>Main</span>
                        </div>
                        <div>
                            <arrow>▼</arrow><span>Categories</span>
                            <div className={styles.subdropdownContent}>
                                <div>
                                    <span>Cleaning</span>
                                </div>
                                <div>
                                    <span>Decoration</span>
                                </div>
                                <div>
                                    <span>Story's DekHor</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span>Blogging</span>
                        </div>
                        <div>
                            <span>Blogger</span>
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
                            <span>Main</span>
                        </div>
                        <div>
                            <span>All Dorms</span>
                        </div>
                        <div>
                            <span>Add Dorm</span>
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
                        }}>Eats
                        {!isOpen_3 ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                    {isOpen_3 && <div className={styles.dropdownContent}>
                        <div>
                            <span>Main</span>
                        </div>

                        <div>
                            <arrow>▼</arrow><span>Categories</span>
                        </div>
                        <div>
                            <span>Add Recipe</span>
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
                            <span>Main</span>
                        </div>
                        <div>
                            <span>All Products</span>
                        </div>
                        <div>
                            <span>Add Product</span>
                        </div>
                    </div>}
                </div>

            </div>

            <div className={styles.rightside}>
                {/* dropdown Profile */}
                <button className={styles.dropdown}
                    onClick={() => {
                        setIsOpen_Profile((prev) => !prev);
                        setIsOpen_4(false);
                        setIsOpen_3(false);
                        setIsOpen_2(false);
                        setIsOpen_1(false);
                    }}>Pro
                    {!isOpen_Profile ? <span className={styles.arrow}>▼</span> : <span className={styles.arrow}>▲</span>}</button>

                {isOpen_Profile && <div className={styles.dropdownContent}>
                    <div>
                        <span>My profile</span>
                    </div>
                    <div>
                        <span>Support</span>
                    </div>
                    <div>
                        <span>Log out</span>
                    </div>
                </div>}
            </div>
        </main>
    )
}
