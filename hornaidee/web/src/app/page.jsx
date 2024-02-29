"use client";
import styles from "./style.module.css";
import CardDorm from "../../components/CardDorm";
import CardDorm_home from "../../components/CardDorm_home";
import Recent_review from "../../components/Recent_review";
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../../config'
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <img className={styles.banner} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/banner.png`}/>
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
          <CardDorm_home/>
          <CardDorm_home/>
          <CardDorm_home/>
          <CardDorm_home/>
          <CardDorm_home/>
          <CardDorm_home/>
          <CardDorm_home/>
          <CardDorm_home/>
        </div>
      </div>
      
      <Link className={styles.button} href={`${NEXT_PUBLIC_BASE_WEB_PATH}/dorms/all`}>
        <div className={styles.button_text}>Discover</div>
        <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/arrow_right.png`}/>
      </Link>
      
      <div className={styles.recent_review_title}>
        <div className={styles.line}/>
        <div className={styles.recent_review}>Recent reviews</div>
        <div className={styles.line}/>
      </div>

      <div className={styles.recent_review_area}>
        <Recent_review
          img = "https://upload.wikimedia.org/wikipedia/commons/8/84/Sharp_Hall_Dorm_Room.jpg"
          dorm_name = "Ulike apartment"
          review = "very very good"
          star = {4.5}
        />

        <Recent_review
          img = ""
          dorm_name = "Hello dorm"
          review = "bad"
          star = {1.5}
        />
      </div>

      
    </main>
  );
}
