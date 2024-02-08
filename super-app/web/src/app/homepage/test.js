'use client'
import Link from "next/link";
import style from "./page.module.css";

export default function Home() {
    return (

        <div className={styles.bg_page}>
            <div className={styles.navbar}>
                <img style={{ marginLeft: "53px" }} src="image/DekHor-icon.png" />
                <img style={{ marginRight: "53px" }} src="image/user-icon.png" />
            </div>
            <div className={styles.place_holder}>
                <img style={{ width: '100vw' }} src="image/place_holder.png" />
            </div>
            <div className={styles.search_bar_area}>
                <div className={styles.search_bar}>
                    <input className={styles.search_bar_input} type="text" placeholder="Search..."></input>
                    <div style={{ position: 'absolute', display: 'flex' }}>
                        <img style={{ marginLeft: '21px' }} src="image/search-icon.png" />
                        <div style={{ width: '2px', height: '35px', borderRadius: '1px', backgroundColor: 'rgba(0, 0, 0, 0.10)', marginLeft: '15px' }}></div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "150px", justifyContent: "space-around", width: '100%', height: '100px', display: 'flex' }}>
                <Link style={{ textDecoration: 'none' }} href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms'>
                    <div className={styles.portal}>
                        <div className={styles.icon}><img className={styles.bg_portal} src="image/dekhordorm_portal.png" /></div>
                        <p className={styles.subtitle_portal}>DekHor Dorms</p>
                    </div>
                </Link>
                <Link style={{ textDecoration: 'none' }} href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market'>
                    <div className={styles.portal}>
                        <div className={styles.icon}><img className={styles.bg_portal} src="image/dekhormarket_portal.png" /></div>
                        <p className={styles.subtitle_portal}>DekHor Markets</p>
                    </div>
                </Link>
                <Link style={{ textDecoration: 'none' }} href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs'>
                    <div className={styles.portal}>
                        <div className={styles.icon}><img className={styles.bg_portal} src="image/dekhorblog_portal.png" /></div>
                        <p className={styles.subtitle_portal}>DekHor Blogs</p>
                    </div>
                </Link>
                
            </div>

            {/* dekhor blog */}
            <div>
                <div className={styles.title}>
                    <p className={styles.dekhor_title}>Dekhor</p>
                    <p className={styles.blog_title}>Blog</p>
                    <div style={{ width: '1124px', height: '1px', backgroundColor: '#B5B5B5', marginBottom: '10px' }}></div>
                </div>
                <div className={styles.blog_poster}>
                    {/* bloging(krit) */}
                    <div className={styles.poster_info_blog}>
                        <h1>Start Your Blog Today!</h1>
                        <p>Share tips and tricks from your DekHor experience!</p>
                        <Link href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs' style={{ textDecoration: 'none' }}>
                            <div className={styles.poster_button_blog}>
                                <p style={{ marginRight: '10px' }}>Blogging</p>
                                <img src="image/arrow_right.png" style={{ width: '29px', height: '21px' }} />
                            </div>
                        </Link>
                    </div>
                    <img src="image/poster_img.png" />
                </div>

                <div>
                    {/* reccommended blog(preaw) */}
                </div>
            </div>


            {/* dekhor dorm */}
            <div>
                <div className={styles.title}>
                    <p className={styles.dekhor_title}>Dekhor</p>
                    <p className={styles.blog_title}>Dorms</p>
                    <div style={{ width: '1124px', height: '1px', backgroundColor: '#B5B5B5', marginBottom: '10px' }}></div>
                </div>
                <div className={styles.blog_poster}>
                    <img src="image/poster_img.png" />
                    <div className={styles.poster_info_blog}>
                        <h1>Find Your Dorms in Your Way!</h1>
                        <p>Friendly Interfacebr <br />
                            Verified Reviews <br />
                            Affordable Prices
                        </p>
                        <Link href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms' style={{ textDecoration: 'none' }}>
                            <div className={styles.poster_button_discover}>
                                <p style={{ marginRight: '10px' }}>Discover More</p>
                                <img src="image/arrow_right.png" style={{ width: '29px', height: '21px' }} />
                            </div>
                        </Link>
                    </div>
                </div>

            </div>


            {/* dekhor market */}
            <div>
                <div className={styles.title}>
                    <p className={styles.dekhor_title}>Dekhor</p>
                    <p className={styles.blog_title}>Markets</p>
                    <div style={{ width: '1124px', height: '1px', backgroundColor: '#B5B5B5', marginBottom: '10px' }}></div>
                </div>
                <div className={styles.blog_poster}>
                    {/* discover (krit) */}
                    <img src="image/poster_img.png" />
                    <div className={styles.poster_info_market}>
                        <h1>Find the stuffs you need
                            <br />with Dekhor Markets!</h1>
                        <Link href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market' style={{ textDecoration: 'none'}}>
                            <div className={styles.poster_button_discover}>
                                <p style={{ marginRight: '10px' }}>Discover More</p>
                                <img src="image/arrow_right.png" style={{ width: '29px', height: '21px' }} />
                            </div>
                        </Link>
                    </div>
                </div>
                <div>
                    {/* slider (poohsit) */}
                </div>
            </div>

            <footer>
                {/* footer ( petch )(component) */}
            </footer>

        </div>
    )
}