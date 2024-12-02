"use client";
import styles from "./style.module.css";
import CardDorm from "../../components/CardDorm";
import CardDorm_home from "../../components/CardDorm_home";
import Recent_review from "../../components/Recent_review";
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH, NEXT_PUBLIC_MAIN_URL } from '../../config'
import Link from "next/link";
import Footer from "./footer";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import test_data from './test_data';
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [recent_reviews, setRecent_reviews] = useState([]);
  const [top_dorms, setTop_dorms] = useState([]);

  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/top-dorms`)
      .then(res => {
        setTop_dorms(res.data.slice(0,8));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/recent-reviews`)
      .then(res => {
        setRecent_reviews(res.data);
        // console.log(res.data[0].photo[0].photo_url);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const reviews = recent_reviews.slice(0, 6).map((dorm, index) => (
    <Recent_review
      key={index}
      img={dorm.photos[0].photo_url}
      dorm_name={dorm.name}
      id={dorm.dorm_id}
      star={dorm.stars}
      review={dorm.review}
    />
  ));
  
  const top_dorm = top_dorms.map((dorm, index) => (
    <CardDorm_home
        key={index}
        img = {dorm.photos[0].photo_url}
        dorm_name = {dorm.name}
        id = {dorm.dorm_id}
        star = {dorm.average}
        address = {dorm.province}
    />
  ))

  return (
    <main>
      <div className={styles.container_banner}>
        <div style={{position:'relative'}}>
          <img className={styles.bannerimg} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/banner1.png`}/>
          <div className={styles.dekhordorm}>DekHor Dorms</div>
        </div>
        
      </div>
      
      <img className={styles.banner2} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/banner2.png`}/>
      
      <div className={styles.info_area}>
        <div className={styles.info_container}>
          <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/icon.png`}/>
          <div className={styles.title_info}>Affordable Price</div>
          <div className={styles.info}>
            Each and every dorm is priced<br/>
            reasonably.We want to make sure<br/>
            that students get what they paid for.
          </div>
        </div>

        <div className={styles.info_container}>
          <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/icon2.png`}/>
          <div className={styles.title_info}>Ask Anything</div>
          <div className={styles.info}>
            Chat easily with dorm hosts so you<br/>
            can get any information from<br/>
            your fingertips.
          </div>
        </div>
      </div>

      <div className={styles.top_list_area}>
        <div className={styles.top_list_title}>
          Top list of dorms
        </div>
        <div className={styles.top_list_card}>
          {top_dorm}
        </div>
      </div>
      
      <Link className={styles.button} href={`${NEXT_PUBLIC_MAIN_URL}/dorms/all`}>
        <div className={styles.button_text}>Discover</div>
        <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/arrow_right.png`}/>
      </Link>
      
      <div className={styles.recent_review_title}>
        <div className={styles.line}/>
        <div className={styles.recent_review}>Recent reviews</div>
        <div className={styles.line}/>
      </div>

      <div className={styles.recent_review_area}>
      <Carousel 
      responsive={
        {
          superLargeDesktop: {
          breakpoint: { max: 4000, min: 0 },
          items: 2}
        }
      }
      className={styles.recent_review_area}>
        {reviews}
      </Carousel>;
      </div>

      <Footer/>
    </main>
  );
}
