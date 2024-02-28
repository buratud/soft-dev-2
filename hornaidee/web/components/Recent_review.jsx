'use clinet'
import styles from './Recent_review.module.css'
import Link from 'next/link';
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../config'
import Rating from '@mui/material/Rating';
const Recent_review = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.container}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Sharp_Hall_Dorm_Room.jpg" className={styles.image} />
                <div className={styles.infoContainer}>
                    <div className={styles.title}>Sodsai Dorm</div>
                    <div className={styles.stars}>
                        <Rating
                        size="large"
                        name="simple-controlled"
                        value={5}
                        precision={0.5}
                        readOnly
                        />
                    </div>
                    <div className={styles.description}>
                        "Security 24/7 with<br/>
                        access to famous<br/>
                        convenience store"
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recent_review;