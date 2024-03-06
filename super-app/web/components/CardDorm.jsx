'use clinet'
import styles from "./CardDorm.module.css";
import Link from 'next/link';
import { NEXT_PUBLIC_BASE_DORMS_WEB_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../config'
import Rating from '@mui/material/Rating';
import Image from "next/image";

const CardDorm = (props) => {
    const { img, dorm_name, price, id, facilities, star } = props;
    return (
        <div className={styles.dorm_card}>
            <img className={styles.image} src={img} />
            <div className={styles.card_info}>
                <h1 className={styles.dorm_name}>{dorm_name}</h1>
                <div className={styles.star}>
                    <Rating
                        size="large"
                        name="simple-controlled"
                        value={star}
                        precision={0.1}
                        readOnly
                    />
                </div>
                <div style={{ height: '70px' }}>
                    <p className={styles.facilities}>{facilities}</p>
                    <p className={styles.price}> THB{price.toLocaleString()}/mo.</p>
                </div>
                <Link href={`${NEXT_PUBLIC_BASE_DORMS_WEB_URL}/detail/${id}`} style={{ textDecoration: 'none' }}>
                    <div className={styles.see_info_button}>
                        <p className={styles.see_info}>See Info</p>
                        <Image src={`${NEXT_PUBLIC_BASE_WEB_PATH}/image/arrow_right.png`} width={16} height={16} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CardDorm;