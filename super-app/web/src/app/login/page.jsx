'use client'
import Image from "next/image"
import Link from "next/link"
import styles from "./login.module.css"
import { useState } from 'react';
import { redirect, useRouter } from "next/navigation"; 
import axios from 'axios';
import {NEXT_PUBLIC_BASE_API_URL,NEXT_PUBLIC_BASE_WEB_URL,NEXT_PUBLIC_BASE_WEB_PATH} from "../../../config.js";


export default function Login() {

    const initialFormData = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            alert('Login Invalid. Please make sure you filled both username and password in correctly');
            return;
        }
        else {
            axios.put(`${NEXT_PUBLIC_BASE_API_URL}/login`,{
                UsernameorEmail: formData.username,
                password: formData.password,
            })
            .then(res => {
                router.push(`${NEXT_PUBLIC_BASE_WEB_URL}`);
            })
            .catch((err) => {
                alert(err.response.data.message);
            })
        }
    }

   

    return (
        <>
            <title>DekHor | Login or Signup</title>

            <div className={styles.Loginnavbar}>
                <div className={styles.navimage}>
                    <Image src={`${NEXT_PUBLIC_BASE_WEB_PATH}/Dekhorlogo.png`} width={85} height={85} alt="logo"/>
                </div>
            </div>
            <div className={styles.Logincontainer}>
                <div className={styles.Loginframe}>
                    <Image src={`${NEXT_PUBLIC_BASE_WEB_PATH}/Dekhorlogo.png`} width={150} height={150} alt="logo"/>
                    <h1 className={styles.Loginfont}>Sign In with DekHor ID</h1>
                    <div className={styles.Loginform}>
                        <div className={styles.inputicon}>
                            <Image src={`${NEXT_PUBLIC_BASE_WEB_PATH}/usericon.png`} width={16} height={18} alt="user"/> 
                        </div>  
                        <div>| </div>
                        <input  className={styles.Loginblock}
                                // placeholder="Email"
                                placeholder="Email or Username"
                                type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                    </div>
                    <div className={styles.Loginform}>
                        <div className={styles.inputicon}>
                            <Image src={`${NEXT_PUBLIC_BASE_WEB_PATH}/pwicon.png`} width={16} height={15} alt="pw"/> 
                        </div> 
                        <div>| </div>
                        <input  className={styles.Loginblock}
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                    </div>
                    <button onClick={handleSubmit} className={styles.Loginbutton}>Login</button>
                </div>
                <div className={styles.signuplabel}>
                    <label>Don't have an account?</label>
                    <div>
                        <Link href={`/register`} className={styles.signuplink}>Sign Up.</Link>  
                    </div>
                </div>
            </div>    
        </>
    ) 
}