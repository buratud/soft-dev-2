import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css"
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../../config'

export default function Footer() {
    return (
        <div className={styles.footerframe}>
            <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/DekhorlogoTrans.png`} className={styles.logo} alt="logo"/>
            <div className={styles.footercontent}> 
                <div className={styles.footernavbox}>
                    <Link className={styles.footernav} href="/">Home</Link>
                    <Link className={styles.footernav} href="/blogs">Blogs</Link>
                    <Link className={styles.footernav} href="/dorms">Dorms</Link>
                    <Link className={styles.footernav} href="/eats">Eats</Link>
                    <Link className={styles.footernav} href="/markets">Markets</Link>
                </div>
                <div className={styles.footercontactbox}>
                    <b>Contact Us</b>
                    <div className={styles.footercontact}> 
                        <Image src ={`${NEXT_PUBLIC_BASE_WEB_PATH}/EmailFtico.png`} alt = "email" width={20} height={20} className={styles.icon}/> Email : contact@dekhorsuperapp.com </div>
                    <div className={styles.footercontact}>
                        <Image src ={`${NEXT_PUBLIC_BASE_WEB_PATH}/FBftico.png`} width={20} height={20} className={styles.icon} alt = "FB" /> Facebook : DekHor Super App </div>
                    <div className={styles.footercontact}>
                        <Image src ={`${NEXT_PUBLIC_BASE_WEB_PATH}/phonecallico.png`} width={20} height={20} className={styles.icon} alt = "phone" /> 02-XXX-XXXX </div>
                </div>
            </div>
            <div className={styles.footerline}></div>
            <div className={styles.footerend}>
                <div>Copyright © 2024 DekHor Super App. All rights reserved.</div>
                <div>Made with ♥️ by Cpr.E Year 2</div>
            </div>
        </div>
    )
}