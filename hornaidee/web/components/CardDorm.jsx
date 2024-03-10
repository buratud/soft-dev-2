'use clinet'
import styles from "./CardDorm.module.css";
import Link from 'next/link';
import { NEXT_PUBLIC_BASE_WEB_PATH, NEXT_PUBLIC_MAIN_URL } from '../config'
import Rating from '@mui/material/Rating';

const CardDorm = (props) => {
    const { img, dorm_name, price, id , facilities,star } = props;
    const new_price = Number(price.toFixed(0));
    return (
        <div className={styles.dorm_card}>
            <img className={styles.image} src={img}/>
            <div className={styles.card_info}>
                <h1 className={styles.dorm_name}>{dorm_name}</h1>
                <div className={styles.star}>
                    <Rating
                    size="large"
                    name="simple-controlled"
                    value={star}
                    readOnly
                    />
                </div>
                <div style={{height:'70px'}}>
                    <p className={styles.facilities}>{facilities}</p>
                    <p className={styles.price}> THB {new_price.toLocaleString()}/mo.</p>
                </div>
                <Link href={`${NEXT_PUBLIC_MAIN_URL}/dorms/detail/${id}`} style={{textDecoration:'none'}}>
                    <div className={styles.see_info_button}>
                        <p className={styles.see_info}>See Info</p>
                        <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/arrow_right.png`}/>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CardDorm;