'use client'
import React from "react";
import Carousel from "react-multi-carousel";
import CardBlogs from "../../../components/CardBlogs";
import CardList from "../homepage/data.js";
import CardProducts from "../../../components/CardProduct";
import "react-multi-carousel/lib/styles.css";
import styles from "./page.module.css";

export default function App() {
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
        <div className={styles.slider}>
            <div style={{ position: "relative" }}>
                <Carousel responsive={responsive}>
                    {CardList.slice(0, 6).map((card) => (
                        <div><CardProducts img={card.img} route={card.route} /></div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
