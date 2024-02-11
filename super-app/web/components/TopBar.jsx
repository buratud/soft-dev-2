'use client'
import Image from 'next/image'
import { useState } from 'react'
import styles from './TopBar.module.css'
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../config'


export default function TopBar() {

    return (
        <main className={styles.main}>
            <div className={styles.leftside}>
                <div className={styles.logo}>
                    <a href={`${NEXT_PUBLIC_BASE_WEB_PATH}`}>
                        <Image alt="logo" src="/images/logo.png" height={70} width={80} />
                    </a>
                </div>
            </div>
            
        </main>
    )
}