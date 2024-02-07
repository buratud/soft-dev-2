import styles from "./CardProducts.module.css";

const CardProducts = (props) => {
    const {img} = props;

    return (
        <div className={styles.content}>
            <div className={styles.singleDest}>
                <div className={styles.dastImage}>
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default CardProducts;