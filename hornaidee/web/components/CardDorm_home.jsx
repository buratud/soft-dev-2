"use client";
import styles from "./CardDorm_home.module.css";
import Rating from '@mui/material/Rating';

export default function CardDorm_home() {
  return (
    <div className={styles.container}>
        <img className={styles.img} src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg"/>
        <div className={styles.info}>
            <p className={styles.name}>test dorm</p>
            <p className={styles.address}>Bangkok, TH</p>
            <Rating
                size="large"
                name="simple-controlled"
                value={2}
                readOnly
            />
        </div>
    </div>
  );
}
