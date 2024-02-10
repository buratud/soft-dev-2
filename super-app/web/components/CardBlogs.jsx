'use clinet'
import styles from "./CardBlogs.module.css";
import Link from 'next/link';
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../config';

const CardBlogs = (props) => {
    const { img, title, Blogger, Categories,id } = props;
    return (
        <Link href={`${NEXT_PUBLIC_BASE_WEB_PATH}/blogs/${Categories}/${id}`} className={styles.link_blog}>
            <div className={styles.content}>
                <div className={styles.main_content}>

                    <div className={styles.singleDest}>
                        <div className={styles.dastImage}>
                            <img src={img} alt="" className={styles.Imagecover} />
                        </div>
                        <div className={styles.destFooter}>
                            <div className={styles.destText}>
                                <h4>
                                    {title}
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
        </Link>
    );
};

export default CardBlogs;