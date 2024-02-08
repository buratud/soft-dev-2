"use client";
import Link from "next/link";
import styles from "./page.module.css";
import CardBlogs from "../../../components/CardBlogs";
import CardList from "./data.js";
import CardProducts from "../../../components/CardProduct";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className={styles.bg_page}>
      <div className={styles.navbar}>
        <img style={{ marginLeft: "53px" }} src="image/DekHor-icon.png" />
        <img style={{ marginRight: "53px" }} src="image/user-icon.png" />
      </div>
      <div className={styles.place_holder}>
        <img style={{ width: "100vw" }} src="image/place_holder.png" />
      </div>
      <div className={styles.search_bar_area}>
        <div className={styles.search_bar}>
          <input
            className={styles.search_bar_input}
            type="text"
            placeholder="Search..."
          ></input>
          <div style={{ position: "absolute", display: "flex" }}>
            <img style={{ marginLeft: "21px" }} src="image/search-icon.png" />
            <div
              style={{
                width: "2px",
                height: "35px",
                borderRadius: "1px",
                backgroundColor: "rgba(0, 0, 0, 0.10)",
                marginLeft: "15px",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "150px",
          justifyContent: "space-around",
          width: "100%",
          height: "100vh",
          display: "flex",
        }}
      >
        <Link
          style={{ textDecoration: "none" }}
          href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms"
        >
          <div className={styles.portal}>
            <div className={styles.icon}>
              <img
                className={styles.bg_portal}
                src="image/dekhordorm_portal.png"
              />
            </div>
            <p className={styles.subtitle_portal}>DekHor Dorms</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market"
        >
          <div className={styles.portal}>
            <div className={styles.icon}>
              <img
                className={styles.bg_portal}
                src="image/dekhormarket_portal.png"
              />
            </div>
            <p className={styles.subtitle_portal}>DekHor Markets</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs"
        >
          <div className={styles.portal}>
            <div className={styles.icon}>
              <img
                className={styles.bg_portal}
                src="image/dekhorblog_portal.png"
              />
            </div>
            <p className={styles.subtitle_portal}>DekHor Blogs</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          href="https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats"
        >
          <div className={styles.portal}>
            <div className={styles.icon}>
              <img
                className={styles.bg_portal}
                src="image/dekhoreat_portal.png"
              />
            </div>
            <p className={styles.subtitle_portal}>DekHor Eats</p>
          </div>
        </Link>
      </div>

      {/* dekhor blog */}
      <div>
        <div>{/* bloging(krit) */}</div>

        <div className={styles.ReccommendedBlogs}>
          {/* reccommended blog(preaw) */}
          <div className={styles.ReccommendedBlogs_text}>Recommended Blogs</div>
          <main className={styles.mainBlogs}>
            {/* Back-end ทำการเพิ่มข้อมูลตรงนี้ CardList_Blogs เป็น Reccommend แบบ Random*/}
            {CardList.slice(0, 3).map((card) => (
              <CardBlogs
                img={card.img}
                title={card.title}
                Blogger={card.Blogger}
                Categories={card.Categories}
                // ใช้ route แทน id ไปก่อน
                id={card.route}
              />
            ))}
          </main>
        </div>
      </div>

      {/* dekhor dorm */}
      <div></div>

      {/* dekhor market */}
      <div>
        <div>{/* discover (krit) */}</div>


        <div className={styles.ReccommendedProducts}>
          {/* slider (poohsit) */}
          <div className={styles.ReccommendedBlogs_text}>
            Recommended Products
            {/* CARD SLIDER */}
            <div className={styles.slider}>
              <Carousel responsive={responsive}>
                {CardList.slice(0, 6).map((card) => (
                  <div><CardProducts img={card.img} route={card.route} /></div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>


      <footer>{/* footer ( petch )(component) */}</footer>
    </div>
  );
}
