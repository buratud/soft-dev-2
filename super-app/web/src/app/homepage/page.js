'use client'
import Link from "next/link";
import style from "./page.module.css";

export default function Home() {
    return (
        <div style={{alignItems:"center",justifyContent:"space-around",width:'100%',height:'100vh',display:'flex'}}>
            <Link style={{textDecoration:'none'}} href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/dorms'>
                <div className={style.portal}>
                    <div className={style.icon}><img className={style.bg_portal} src="image/dekhordorm_portal.png"/></div>
                    <p className={style.subtitle_portal}>DekHor Dorms</p>
                </div>
            </Link>
            <Link style={{textDecoration:'none'}} href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/market'>
                <div className={style.portal}>
                    <div className={style.icon}><img className={style.bg_portal} src="image/dekhormarket_portal.png"/></div>
                    <p className={style.subtitle_portal}>DekHor Markets</p>
                </div>
            </Link>
            <Link style={{textDecoration:'none'}} href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/blogs'>
                <div className={style.portal}>
                    <div className={style.icon}><img className={style.bg_portal} src="image/dekhorblog_portal.png"/></div>
                    <p className={style.subtitle_portal}>DekHor Blogs</p>
                </div>
                </Link>
            <Link style={{textDecoration:'none'}} href='https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com/eats'>
                <div className={style.portal}>
                    <div className={style.icon}><img className={style.bg_portal} src="image/dekhoreat_portal.png"/></div>
                    <p className={style.subtitle_portal}>DekHor Eats</p>
                </div>
            </Link>
            
        </div>
    )
}