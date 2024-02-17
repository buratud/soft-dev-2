"use client";
import Link from "next/link";
import styles from "./page.module.css";
import CardList from "./data.js";
import CardBlogs from "../../components/CardBlogs";
import CardProducts from "../../components/CardProduct";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../../config';
import { useState } from 'react';
import NavBar from "../../components/nav";
import Footer from "../../components/footer/Footer";

export default function Home() {
  const [RecDataProduct, setRecDataProduct] = useState([]);
  useState(()=>{
    axios.post(`${NEXT_PUBLIC_BASE_API_URL}/recommended-product`, {
      "MaxRecommended":4
    })
    .then(res => {
      //console.log(res)
      setRecDataProduct(res.data);
      //console.log(res.data);
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const [data, setData] = useState([]);
  useState(()=>{
      axios.post(`${NEXT_PUBLIC_BASE_API_URL}/recommended-blog`, {
      })
      .then(res => {
          setData(res.data)
          //console.log('this',res.data)
      })
      .catch((err) => {
          console.log(err)
      })
  
  },[])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className={styles.bg_page}>
      <NavBar/>
      <div className={styles.place_holder}>
        <img style={{ width: "100%" }} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/place_holder.png`} />
      </div>
      <div className={styles.search_bar_area}>
        <div className={styles.search_bar}>
          <input
            className={styles.search_bar_input}
            type="text"
            placeholder="Search..."
          ></input>
          <div style={{ position: "absolute", display: "flex" }}>
            <img style={{ marginLeft: "21px" }} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/search-icon.png`} />
            <div
              style={{
                width: "2px",
                height: "35px",
                borderRadius: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.10)",
                marginLeft: "15px",
              }}
            ></div>
          </div>
        </div>
      </div>

        <div className={styles.portalwrap}>
          <Link style={{ textDecoration: 'none' }} href={`/dorms`}>
            <div className={styles.portal}>
              <div className={styles.icon}><img className={styles.bg_portal} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/dekhordorm_portal.png`} /></div>
              <p className={styles.subtitle_portal}>DekHor Dorms</p>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} href={`/markets`}>
            <div className={styles.portal}>
              <div className={styles.icon}><img className={styles.bg_portal} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/dekhormarket_portal.png`} /></div>
              <p className={styles.subtitle_portal}>DekHor Markets</p>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} href={`/blogs`}>
            <div className={styles.portal}>
              <div className={styles.icon}><img className={styles.bg_portal} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/dekhorblog_portal.png`} /></div>
              <p className={styles.subtitle_portal}>DekHor Blogs</p>
            </div>
          </Link>
        </div>

      <div className={styles.container}>
        {/* dekhor blog */}
        <div>
          <div>{/* bloging(krit) */}
            <div className={styles.title}>
              <p className={styles.dekhor_title}>Dekhor</p>
              <p className={styles.blog_title}>Blog</p>
              <div style={{ width: '80vw', height: '1px', backgroundColor: '#B5B5B5', marginBottom: '10px' }}></div>
            </div>
            <div className={styles.blog_poster}>
              {/* bloging(krit) */}
              <div className={styles.poster_info_blog}>
                <h1>Start Your Blog Today!</h1>
                <p>Share tips and tricks from your DekHor experience!</p>
                <Link href={`/blogs/writeblog`} style={{ textDecoration: 'none' }}>
                  <div className={styles.poster_button_blog}>
                    <p style={{ marginRight: '10px' }}>Blogging</p>
                    <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/arrow_right.png`} style={{ width: '29px', height: '21px' }} />
                  </div>
                </Link>
              </div>
              <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/poster_img.png`} />
            </div>
          </div>
          <div className={styles.ReccommendedBlogs}>
            {/* reccommended blog(preaw) */}
            <div className={styles.ReccommendedBlogs_text}>Recommended Blogs</div>
            <main className={styles.mainBlogs}>
              {/* Back-end ทำการเพิ่มข้อมูลตรงนี้ CardList_Blogs เป็น Reccommend แบบ Random*/}
              {data.slice(0, 3).map((card,index) => (
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
            </main>
          </div>
        </div>
        {/* dekhor dorm */}
        <div>
          <div className={styles.title}>
            <p className={styles.dekhor_title}>Dekhor</p>
            <p className={styles.blog_title}>Dorms</p>
            <div style={{ width: '80vw', height: '1px', backgroundColor: '#B5B5B5', marginBottom: '10px' }}></div>
          </div>
          <div className={styles.blog_poster}>
            <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/poster_img.png`}/>
            <div className={styles.poster_info_blog}>
              <h1>Find Your Dorms in Your Way!</h1>
              <p>Friendly Interfacebr <br />
                Verified Reviews <br />
                Affordable Prices
              </p>
              <Link href={`/dorms`} style={{ textDecoration: 'none' }}>
                <div className={styles.poster_button_discover}>
                  <p style={{ marginRight: '10px' }}>Discover More</p>
                  <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/arrow_right.png`} style={{ width: '29px', height: '21px' }} />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* dekhor market */}
        <div>
          <div>
            <div className={styles.title}>
              <p className={styles.dekhor_title}>Dekhor</p>
              <p className={styles.blog_title}>Markets</p>
              <div style={{ width: '80vw', height: '1px', backgroundColor: '#B5B5B5', marginBottom: '10px' }}></div>
            </div>
            <div className={styles.blog_poster}>
              {/* discover (krit) */}
              <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/poster_img.png`} />
              <div className={styles.poster_info_market}>
                <h1>Find the stuffs you need
                  <br />with Dekhor Markets!</h1>
                <Link href={`/markets`} style={{ textDecoration: 'none' }}>
                  <div className={styles.poster_button_discover}>
                    <p style={{ marginRight: '10px' }}>Discover More</p>
                    <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/arrow_right.png`} style={{ width: '29px', height: '21px' }} />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.ReccommendedProducts}>
            {/* slider (poohsit) */}
            <div className={styles.ReccommendedBlogs_text}>
              Recommended Products
            </div>
            {/* CARD SLIDER */}
            <div className={styles.slider}>
              <Carousel responsive={responsive} style={{zIndex: "900"}}>
                {RecDataProduct.slice(0, 6).map((card) => (
                  <div><CardProducts img={card.product_image} route={card.product_id} /></div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>


      <Footer></Footer>
    </div>
  );
}