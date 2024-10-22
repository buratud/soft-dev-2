"use client";
import Link from "next/link";
import styles from "./CardDorm_home.module.css";
import Rating from '@mui/material/Rating';
import { NEXT_PUBLIC_BASE_WEB_PATH, NEXT_PUBLIC_MAIN_URL } from '../config'
export default function CardDorm_home(props) {
  const { img, dorm_name, address, id , star } = props;
  return (
    <div className={styles.container}>
      <Link className={styles.link} href={`${NEXT_PUBLIC_MAIN_URL}/dorms/detail/${id}`}>
        <img className={styles.img} src={img}/>
        <div className={styles.info}>
            <p className={styles.name}>{dorm_name}</p>
            <p className={styles.address}>{address}</p>
            <Rating
                size="large"
                name="simple-controlled"
                value={star}
                precision={0.5} 
                readOnly
            />
        </div>
      </Link>
    </div>
  );
}
