import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css"
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../config'

export default function Footer() {
    return (
        <div className={styles.footerframe}>
            <Image src={`${NEXT_PUBLIC_BASE_WEB_PATH}/DekhorlogoTrans.png`} width={96} height={96} alt="logo"/>
            <div className={styles.footercontent}> 
                <div className={styles.footernavbox}>
                    <Link className={styles.footernav} href="/homepage">Home</Link>
                    <Link className={styles.footernav} href="/blogs">Blogs</Link>
                    <Link className={styles.footernav} href="/dorms">Dorms</Link>
                    <Link className={styles.footernav} href="/eats">Eats</Link>
                    <Link className={styles.footernav} href="/market">Markets</Link>
                </div>
                <div className={styles.footercontactbox}>
                    <b>Contact Us</b>
                    <div className={styles.footercontact}> 
                        <Image src ={`${NEXT_PUBLIC_BASE_WEB_PATH}/EmailFtico.png`} alt = "email" width={20} height={20}/> Email : contact@dekhorsuperapp.bruh </div>
                    <div className={styles.footercontact}>
                        <Image src ={`${NEXT_PUBLIC_BASE_WEB_PATH}/FBftico.png`} alt = "FB" width={20} height={20}/> Facebook : DekHor Super App </div>
                    <div className={styles.footercontact}>
                        <Image src ={`${NEXT_PUBLIC_BASE_WEB_PATH}/phonecallico.png`} alt = "phone" width={20} height={20}/> 02-XXX-XXXX </div>
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