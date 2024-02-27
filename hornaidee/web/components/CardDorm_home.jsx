"use client";
import styles from "./CardDorm_home.module.css";
import Rating from '@mui/material/Rating';

export default function CardDorm_home(props) {
  const { img, dorm_name, address, id , star } = props;
  console.log(star)
  return (
    <div className={styles.container}>
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
    </div>
  );
}
