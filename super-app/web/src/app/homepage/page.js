'use client'
import Link from "next/link";
import style from "./page.module.css";
import { NEXT_PUBLIC_BASE_WEB_URL } from "../config";
export default function Home() {
    return (
        
        <div className={style.bg_page}>
            <div className={style.navbar}>
                <img style={{marginLeft:"53px"}} src="image/DekHor-icon.png"/>
                <img style={{marginRight:"53px"}} src="image/user-icon.png"/>
            </div>
            <div className={style.place_holder}>
                <img style={{width:'100vw'}} src="image/place_holder.png"/>
            </div>
            <div className={style.search_bar_area}>
                <div className={style.search_bar}>
                    <input className={style.search_bar_input} type="text" placeholder="Search..."></input>
                    <div style={{position:'absolute',display:'flex'}}>
                        <img style={{marginLeft:'21px'}} src="image/search-icon.png"/>
                        <div style={{width:'2px',height:'35px',borderRadius:'1px',backgroundColor:'rgba(0, 0, 0, 0.10)',marginLeft:'15px'}}></div>
                    </div>
                </div>
            </div>
            <div style={{marginTop:"150px",justifyContent:"space-around",width:'100%',height:'100vh',display:'flex'}}>
                <Link style={{textDecoration:'none'}} href={`${NEXT_PUBLIC_BASE_WEB_URL}/dorms`}>
                    <div className={style.portal}>
                        <div className={style.icon}><img className={style.bg_portal} src="image/dekhordorm_portal.png"/></div>
                        <p className={style.subtitle_portal}>DekHor Dorms</p>
                    </div>
                </Link>
                <Link style={{textDecoration:'none'}} href={`${NEXT_PUBLIC_BASE_WEB_URL}/market`}>
                    <div className={style.portal}>
                        <div className={style.icon}><img className={style.bg_portal} src="image/dekhormarket_portal.png"/></div>
                        <p className={style.subtitle_portal}>DekHor Markets</p>
                    </div>
                </Link>
                <Link style={{textDecoration:'none'}} href={`${NEXT_PUBLIC_BASE_WEB_URL}/blogs`}>
                    <div className={style.portal}>
                        <div className={style.icon}><img className={style.bg_portal} src="image/dekhorblog_portal.png"/></div>
                        <p className={style.subtitle_portal}>DekHor Blogs</p>
                    </div>
                    </Link>
                <Link style={{textDecoration:'none'}} href={`${NEXT_PUBLIC_BASE_WEB_URL}/eats`}>
                    <div className={style.portal}>
                        <div className={style.icon}><img className={style.bg_portal} src="image/dekhoreat_portal.png"/></div>
                        <p className={style.subtitle_portal}>DekHor Eats</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}