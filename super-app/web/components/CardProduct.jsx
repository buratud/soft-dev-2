'use clinet'
import styles from "./CardProducts.module.css";
import Link from 'next/link';


const CardProducts = (props) => {
    const { img, route } = props;

    return (
        <div>
            <Link href={`/markets/dessertRecipe/${route}`} >
                    <img src={img} alt="" className={styles.card} />
            </Link>
        </div>
    );
};

export default CardProducts;
