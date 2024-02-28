'use clinet'
import styles from './Recent_review.module.css'
import Link from 'next/link';
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../config'
import Rating from '@mui/material/Rating';
const Recent_review = (props) => {
    const { img, dorm_name, review, id , star } = props;
    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <img src={img} className={styles.image} />
                <div className={styles.infoContainer}>
                    <div className={styles.title}>{dorm_name}</div>
                    <div className={styles.stars}>
                        <Rating
                        size="large"
                        name="simple-controlled"
                        value={star}
                        precision={0.5}
                        readOnly
                        />
                    </div>
                    <div className={styles.description}>
                        {review}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recent_review;