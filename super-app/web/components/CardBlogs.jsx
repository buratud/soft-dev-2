import styles from "./CardBlogs.module.css";

const CardBlogs = (props) => {
    const { img, title, Blogger,Categories } = props;

    return (
        <div className={styles.content}>
            <div className={styles.main_content}>

                <div className={styles.singleDest}>
                    <div className={styles.dastImage}>
                        <img src={img} alt="" />
                    </div>
                    <div className={styles.destFooter}>
                        <div className={styles.destText}>
                            <h4>
                                <a to={'/'}>{title}</a>
                            </h4>
                        </div>
                        <div className={styles.userwrite}>
                            By
                            <div className={styles.name}>
                                {Blogger}
                            </div>
                        </div>
                        <div className={styles.Category}>
                            <div className={styles.Category_box}>
                                <div className={styles.Catagory_text}>{Categories}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CardBlogs;