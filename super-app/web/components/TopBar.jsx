'use client'
import Image from 'next/image'
import styles from './TopBar.module.css'
import Link from 'next/link'
import { NEXT_PUBLIC_BASE_WEB_PATH } from '../config'


export default function TopBar() {

    return (
        <main className={styles.main}>
            <div className={styles.leftside}>
                <div className={styles.logo}>
                    <Link href={`/`}>
                        <Image alt="logo" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/logo.png`} height={70} width={80} />
                    </Link>
                </div>
            </div>
            
        </main>
    )
}