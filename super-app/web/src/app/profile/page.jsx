'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link"
import NavBar from "../../../components/nav"
import style from "./page.module.css"
import Footer from "../../../components/footer/Footer"
import CardProducts from "../../../components/CardProduct"
import CardBlogs from "../../../components/CardBlogs"
import Fakedata from "../data.js";
import { NEXT_PUBLIC_BASE_WEB_PATH,NEXT_PUBLIC_BASE_API_URL } from '../../../config';
import axios from 'axios';

const BlogsCards = () => {

    const [showLikes, setShowLikes] = useState(false);
    const [showYourBlogs, setShowYourBlogs] = useState(false);

    // ส่วนของ front ให้แสดงในส่วนของ Showlikes Blogs ก่อนโดยใช้ UseEffect
    useEffect(() => {
        setShowLikes(true);
        setShowYourBlogs(false);
    }, []);

    let user = '95c6d7a8-b73f-4f51-8dca-e734b38fe21c'; //รอการ authen

    const [Likes, setLikes] = useState([]);
    useState(()=>{
        axios.post(`${NEXT_PUBLIC_BASE_API_URL}/liked_blog`, {
            user: user,
        })
        .then(res => {
            setLikes(res.data)
            console.log('likes',res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const [yourblog, setyourblog] = useState([]);
    useState(()=>{
        axios.post(`${NEXT_PUBLIC_BASE_API_URL}/your_blog`, {
            user: user,
        })
        .then(res => {
            setyourblog(res.data)
            console.log('your blog',res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

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
                    {Likes.map((card, index) => (
                        <CardBlogs
                            key={index}
                            img={card.cover_img}
                            title={card.title}
                            Blogger={card.blogger}
                            Categories={card.category}
                            id={card.blog_id}
                        />
                    ))}
                </card>
            )}
            {showYourBlogs && (
                <card>
                    {/* ดึงข้อมูล Blogs ของตัวเองตรงนี้*/}
                    {yourblog.map((card, index) => (
                        <CardBlogs
                            key={index}
                            img={card.cover_img}
                            title={card.title}
                            Blogger={card.blogger}
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
    
    let user = '95c6d7a8-b73f-4f51-8dca-e734b38fe21c'; //รอการ authen

    const [yourproduct, setyourproduct] = useState([]);
    useState(()=>{
        axios.post(`${NEXT_PUBLIC_BASE_API_URL}/your_product`, {
            user: user,
        })
        .then(res => {
            setyourproduct(res.data)
            console.log('your product',res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

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
                {yourproduct.map((card) => (
                    <CardProducts img={card.product_image} route={card.product_id} />
                ))}
            </card>
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
                </div>
            </div>
            <Footer />
        </div>
    )
}
