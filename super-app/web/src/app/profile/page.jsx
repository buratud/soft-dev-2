'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link"
import NavBar from "../../../components/nav"
import style from "./page.module.css"
import Footer from "../../../components/footer/Footer"
import CardProducts from "../../../components/CardProduct"
import CardBlogs from "../../../components/CardBlogs"
import Fakedata from "../data.js";
import test_data_dorm from '../test_data_dorm';
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../../../config';
import CardDorm from '../../../components/CardDorm';
import { FaCircle } from 'react-icons/fa';

const BlogsCards = () => {

    const [showLikes, setShowLikes] = useState(false);
    const [showYourBlogs, setShowYourBlogs] = useState(false);

    // ส่วนของ front ให้แสดงในส่วนของ Showlikes Blogs ก่อนโดยใช้ UseEffect
    useEffect(() => {
        setShowLikes(true);
        setShowYourBlogs(false);
    }, []);

    const handleLikesClick = () => {
        setShowLikes(true);
        setShowYourBlogs(false);
    };

    const handleYourBlogsClick = () => {
        setShowLikes(false);
        setShowYourBlogs(true);
    };

    return (
        <div>
            <div className={style.blogs_btn} >
                <button
                    className={`${style.like_btn} ${showYourBlogs ? style.notactive_btn : style.active_btn}`}
                    onClick={handleLikesClick}>
                    <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}images/heart.svg`} className={style.img_likes} alt="" />Likes
                </button>
                <button
                    className={`${style.yourblogs_btn} ${showLikes ? style.notactive_btn : ''}`}
                    onClick={handleYourBlogsClick}>
                    <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}images/Pencil.svg`} className={style.img_likes} alt="" />Your Blogs
                </button>
            </div>
            {/* ดึงข้อมูล Blogs ที่ชอบตรงนี้ */}
            {showLikes && (
                <card>
                    {Fakedata.map((card, index) => (
                        <CardBlogs
                            key={index}
                            img={card.cover_img}
                            title={card.title}
                            Blogger={card.Blogger}
                            Categories={card.category}
                            id={card.blog_id}
                        />
                    ))}
                </card>
            )}
            {showYourBlogs && (
                <card>
                    {/* ดึงข้อมูล Blogs ของตัวเองตรงนี้*/}
                    {Fakedata.map((card, index) => (
                        <CardBlogs
                            key={index}
                            img={card.cover_img}
                            title={card.title}
                            Blogger={card.Blogger}
                            Categories={card.category}
                            id={card.blog_id}
                        />
                    ))}
                </card>
            )}
        </div>

    )
}

const ProductCards = () => {
    return (
        <div>
            <div className={style.blogs_btn} >
                {/* เหลือใส่ Link manage products link */}
                <Link href={`/markets/`}>
                    <button className={style.yourblogs_btn}>
                        <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}images/Products.svg`} alt="" className={style.img_likes} />Manage your Products
                    </button>
                </Link>
            </div>
            {/* ดึงข้อมูล Product ของตัวเองตรงนี้*/}
            <card>
                {Fakedata.map((card) => (
                    <CardProducts img={card.product_image} route={card.product_id} />
                ))}
            </card>
        </div>

    )
}

const DormCards = () =>{
    const dorms = test_data_dorm.map((dorm, index) => (
        <CardDorm
            key={index}
            img = {dorm.img}
            dorm_name = {dorm.dorm_name}
            price = {dorm.price}
            id = {dorm.id}
            facilities = {dorm.facilities}
            star = {dorm.star}
        />
    ))

    return(
        <div style={{paddingTop:'40px',display:'grid',gridTemplateColumns:'1fr 1fr',justifyItems:'center',rowGap:'30px'}}>
            {dorms}
        </div>
    )
}

export default function Profile() {

    const [selectedOption, setSelectedOption] = useState('blogs'); // สร้าง state เพื่อเก็บค่า option ที่ถูกเลือก

    const handleChange = (event) => {
        setSelectedOption(event.target.value); // เมื่อเลือก option ใหม่ เปลี่ยนค่า state
    };

    return (

        <div className={style.profile_page}>
            <NavBar />
            <div className={style.container}>

                <div className={style.profile}>Profile</div>

                <div className={style.user}>
                    <img className={style.user_img} src={`${NEXT_PUBLIC_BASE_WEB_PATH}images/user_img.png`} />
                    <div className={style.user_info}>
                        <div className={style.username}>Username</div>
                         {/* เหลือใส่ Link edit profile link */}
                        <Link href={'/'} className={style.edit_profile_button}>
                            <div className={style.edit_profile_img}>
                                <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}images/edit_profile.png`} />
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
                    {selectedOption === 'blogs' && <BlogsCards />} {/* ถ้า option เป็น blogs แสดง BlogsCards */}
                    {selectedOption === 'markets' && <ProductCards />} {/* ถ้า option เป็น markets แสดง ProductCards */}
                    {selectedOption === 'dorms' && <DormCards/>} {/* ถ้า option เป็น dorms แสดง DormCards */}
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}
