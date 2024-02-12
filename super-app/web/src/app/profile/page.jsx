'use client'
import React, { useState } from 'react';
import Link from "next/link"
import NavBar from "../../../components/nav"
import style from "./page.module.css"
import Footer from "../../../components/footer/Footer"
import CardProducts from "../../../components/CardProduct"
import CardBlogs from "../../../components/CardBlogs"
import Fakedata from "../data.js";

const BlogsCards = () => {
    return (
        <card>
            {Fakedata.map((card,index) => (
                <CardBlogs
                key={index}
                img={card.cover_img}
                title={card.title}
                Blogger={card.blogger}
                Categories={card.category}
                // ใช้ route แทน id ไปก่อน
                id={card.blog_id}
              />
            ))}
        </card>
    )
}

const ProductCards = () => {
    return (
        <card>
            {Fakedata.map((card) => (
                <CardProducts img={card.product_image} route={card.product_id} />
            ))}
        </card>
    )
}

export default function Profile() {

    const [selectedOption, setSelectedOption] = useState('blogs'); // สร้าง state เพื่อเก็บค่า option ที่ถูกเลือก

    const handleChange = (event) => {
        setSelectedOption(event.target.value); // เมื่อเลือก option ใหม่ เปลี่ยนค่า state
    };

    return (

        <div className={style.profile_page}>
            <NavBar/>
            <div className={style.container}>

                <div className={style.profile}>Profile</div>

                <div className={style.user}>
                    <img className={style.user_img} src="images/user_img.png" />
                    <div className={style.user_info}>
                        <div className={style.username}>Username</div>
                        <Link href={''} className={style.edit_profile_button}>
                            <div className={style.edit_profile_img}>
                                <img src="images/edit_profile.png" />
                            </div>
                            <div className={style.edit_profile}>Edit profile</div>
                        </Link>
                        <div className={style.line} />
                        <select className={style.dropdown} value={selectedOption} onChange={handleChange}>
                            <option value="blogs">DekHor Blogs</option>
                            <option value="dorms">DekHor Dorms</option>
                            <option value="markets">DekHor Markets</option>
                        </select>
                    </div>
                </div>

                <div className={style.data}>
                    {selectedOption === 'blogs' && <BlogsCards/>} {/* ถ้า option เป็น blogs แสดง BlogsCards */}
                    {selectedOption === 'markets' && <ProductCards/>} {/* ถ้า option เป็น markets แสดง ProductCards */}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
