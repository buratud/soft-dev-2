'use client'
import React, { useState, useEffect, useContext } from 'react';
import Link from "next/link"
import NavBar from "../../../../components/nav"
import style from "./page.module.css"
import Footer from "../../../../components/footer/Footer"
import CardProducts from "../../../../components/CardProduct"
import CardBlogs from "../../../../components/CardBlogs"
import Fakedata from "../../data.js";
import test_data_dorm from '../../test_data_dorm';
import CardDorm from '../../../../components/CardDorm';
import { FaCircle } from 'react-icons/fa';
import { NEXT_PUBLIC_BASE_WEB_PATH, NEXT_PUBLIC_BASE_API_URL } from '../../../../config';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { General, supabase } from '../../../../session'

const BlogsCards = ({ params }) => {

    const [showLikes, setShowLikes] = useState(false);
    const [showYourBlogs, setShowYourBlogs] = useState(false);

    const { session } = useContext(General);

    // ส่วนของ front ให้แสดงในส่วนของ Showlikes Blogs ก่อนโดยใช้ UseEffect
    useEffect(() => {
        setShowLikes(true);
        setShowYourBlogs(false);
    }, []);


    const [Likes, setLikes] = useState([]);
    const [yourblog, setyourblog] = useState([]);

    useState(() => {
        const checkLoginStatus = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.log(error);
                }
                const user = data?.session?.user?.id;

                if (user) {
                    axios.post(`${NEXT_PUBLIC_BASE_API_URL}/liked_blog`, {
                        user: params,
                        // params: params // ส่ง params ไปยัง API เพื่อให้เรียกข้อมูล Blogs ตาม params ที่ส่งมา
                    })
                        .then(res => {
                            setLikes(res.data)
                            console.log('likes', res.data)
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    axios.post(`${NEXT_PUBLIC_BASE_API_URL}/your_blog`, {
                        user: params,
                        // params: params // ส่ง params ไปยัง API เพื่อให้เรียกข้อมูล Blogs ตาม params ที่ส่งมา
                    })
                        .then(res => {
                            setyourblog(res.data)
                            console.log('your blog', res.data)
                        })
                        .catch((err) => {
                            console.log(err)
                        })

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
                    <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/heart.svg`} className={style.img_likes} alt="" />Likes
                </button>
                <button
                    className={`${style.yourblogs_btn} ${showLikes ? style.notactive_btn : ''}`}
                    onClick={handleYourBlogsClick}>
                    <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/Pencil.svg`} className={style.img_likes} alt="" />Your Blogs
                </button>
            </div>
            {/* ดึงข้อมูล Blogs ที่ชอบตรงนี้ */}
            {showLikes && (
                <card>
                    {Likes.map((card, index) => (
                        <CardBlogs
                            key={index}
                            img={card.blog.cover_img}
                            title={card.blog.title}
                            Blogger={card.users.username}
                            Categories={card.blog.blog_category.category}
                            id={card.blog.blog_id}
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
                            Blogger={card.users.username}
                            Categories={card.blog_category.category}
                            id={card.blog_id}
                        />
                    ))}
                </card>
            )}
        </div>

    )
}

const ProductCards = ({ params }) => {

    const { session } = useContext(General);
    const [yourproduct, setyourproduct] = useState([]);
    const [isUserOwner, setIsUserOwner] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.log(error);
                }
                const user = data?.session?.user?.id;

                if (user) {
                    axios.post(`${NEXT_PUBLIC_BASE_API_URL}/your_product`, {
                        user: user,
                        params: params
                    })
                        .then(res => {
                            setyourproduct(res.data);
                            console.log('your product', res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    // เช็คว่า user เป็นเจ้าของโปรไฟล์หรือไม่
                    if (user === params.userID) {
                        setIsUserOwner(true);
                    }
                } else {
                    setIsUserOwner(false);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, [session]);


    return (
        <div>
            {isUserOwner ? <div className={style.blogs_btn}>
                <Link href={`/markets/manage`} style={{ textDecoration: 'none' }}>
                    <button className={style.yourblogs_btn}>
                        <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/Products.svg`} alt="" className={style.img_likes} />
                        <p style={{ textDecoration: 'none' }}>Manage your Products</p>
                    </button>
                </Link>
            </div>
                :
                " "
            }
            {/* ดึงข้อมูล Product ของตัวเองตรงนี้*/}
            <card>
                {yourproduct.map((card) => (
                    <CardProducts img={card.URL} route={card.id} />
                ))}
            </card>
        </div>

    )
}

const DormCards = () => {
    const dorms = test_data_dorm.map((dorm, index) => (
        <CardDorm
            key={index}
            img={dorm.img}
            dorm_name={dorm.dorm_name}
            price={dorm.price}
            id={dorm.id}
            facilities={dorm.facilities}
            star={dorm.star}
        />
    ))

    return (
        <div style={{ paddingTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', justifyItems: 'center', rowGap: '30px' }}>
            {dorms}
        </div>
    )
}

export default function Profile({ params }) {

    const [selectedOption, setSelectedOption] = useState('blogs'); // สร้าง state เพื่อเก็บค่า option ที่ถูกเลือก
    const [profileImage, setProfileImage] = useState('');
    const [profileUsername, setProfileUsername] = useState('XXXXX');
    const router = useRouter();

    const handleChange = (event) => {
        setSelectedOption(event.target.value); // เมื่อเลือก option ใหม่ เปลี่ยนค่า state
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error || !data || !data.session || !data.session.user) {
                    router.push('/');
                    return;
                }

                const user = data.session.user;

                axios.post(`${NEXT_PUBLIC_BASE_API_URL}/profile-picture`, {
                    userID: user.id
                })
                    .then(res => {
                        setProfileImage(res.data.picture);
                    });

                axios.post(`${NEXT_PUBLIC_BASE_API_URL}/profile-username`, {
                    userID: user.id
                })
                    .then(res => {
                        setProfileUsername(res.data.username);
                    });
            } catch (error) {
                console.error('Error getting profile:', error);
            }
        }

        getProfile();
    }, [router]);


    return (

        <div className={style.profile_page}>
            <NavBar />
            <div className={style.container}>

                <div className={style.profile}>Profile</div>

                <div className={style.user}>
                    {/* ดึงรูป Username */}
                    <img className={style.user_img} src={profileImage} />
                    <div className={style.user_info}>
                        <div className={style.username}>{params.username}</div>
                        {/* เหลือใส่ Link edit profile link */}
                        <Link href={'/profile-edit'} className={style.edit_profile_button}>
                            <div className={style.edit_profile_img}>
                                <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/edit_profile.png`} />
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
                    {selectedOption === 'blogs' && <BlogsCards params={params} />} {/* ถ้า option เป็น blogs แสดง BlogsCards */}
                    {selectedOption === 'markets' && <ProductCards params={params} />} {/* ถ้า option เป็น markets แสดง ProductCards */}
                    {selectedOption === 'dorms' && <DormCards params={params} />} {/* ถ้า option เป็น dorms แสดง DormCards */}

                </div>
            </div>
            <Footer />
        </div>
    )
}
