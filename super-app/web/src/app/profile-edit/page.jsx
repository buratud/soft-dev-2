'use client'
import Image from "next/image"
import { useState, useEffect } from 'react'
import Link from "next/link"
import styles from "./pfedit.module.css"
import Footer from "../../../components/footer/Footer";
import NavBar from "../../../components/nav";
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../../../config'

export default function Home() {

    const [username, setusername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [Imagefile, setImagefile] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setProfileImage(reader.result); };
            reader.readAsDataURL(file);
        }
    };
    
    useEffect(() => {
        setProfileImage('https://nypzyitcvjrnisjdsbpk.supabase.co/storage/v1/object/public/Profile_User/PersonCircle.svg');
    }, []);


    return (
        <main>
            <title> DekHor | Profile Edit </title>
            <NavBar/>
            <div className={styles.main}>
                <div className={styles.editcontainer}>
                    <div className={styles.edittitle}>Edit Profile</div>
                    <div className={styles.editline}/>
                    <div className={styles.editframe}>
                        <div className={styles.framecontent}>
                            <div className={styles.profile}>
                                <div className={styles.profiledisplay}><img className={styles.pfp} alt="Profile" src={profileImage} width={265} height={265} /></div>
                                <label className={styles.uploadbtn}>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                    <div>Upload Your Photo <Image src={`${NEXT_PUBLIC_BASE_WEB_PATH}/pfpcamicon.png`} alt="cam" width={35} height={28}/></div>
                                </label>
                            </div>
                            <div className={styles.username}>
                                Username Change
                                <input className={styles.usernameedit}
                                    placeholder="Username"
                                    type="text" 
                                    name="username"
                                />
                            </div>
                        </div>
                        <div className={styles.frameline}/>
                        <div className={styles.button}>
                            <a href={`${NEXT_PUBLIC_BASE_WEB_PATH}/`} className={styles.update}>Update</a>
                            <a href={`${NEXT_PUBLIC_BASE_WEB_PATH}/`} className={styles.cancel}>Cancel</a>
                        </div>
                        <div className={styles.frameremind}>
                            This information will be displayed publicly so be careful what you share.
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.editfooter}><Footer/></div>
        </main>
    )
}