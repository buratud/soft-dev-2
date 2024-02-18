'use client'
import Image from "next/image"
import Link from "next/link"
import styles from "./login.module.css"
import { Suspense, useState } from 'react';
import { redirect, useRouter } from "next/navigation";
import axios from 'axios';
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_URL, NEXT_PUBLIC_BASE_WEB_PATH } from "../../../config.js";
import { supabase } from '../../../session'
import TopBar from "../../../components/TopBar";


export default function Login({ searchParams }) {
    const redirectUrl = searchParams.redirect;
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

    const handleSubmit = async (e) => {
        console.log(NEXT_PUBLIC_BASE_API_URL)
        e.preventDefault();
        if (!formData.username || !formData.password) {
            alert('Login Invalid. Please make sure you filled both username and password in correctly');
            return;
        }
        else {
            axios.put(`${NEXT_PUBLIC_BASE_API_URL}/login`, {
                UsernameorEmail: formData.username

            }).then(async res => {
                const { email } = res.data;
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: formData.password,
                });

                if (error) {
                    console.log("Internal server error");
                } else {
                    if (data.user === null) {
                        alert("Incorrect username, email or password");
                    } else {
                        if (!redirectUrl) {
                            router.push(`${NEXT_PUBLIC_BASE_WEB_URL}`);
                        } else {
                            window.location.replace(redirectUrl);
                        }
                    }
                }
            });


        }
    }



    return (
        <>  
            <title>DekHor | Login or Signup</title>

            <div>
                <TopBar/>
            </div>
            <div className={styles.Logincontainer}>
                <div className={styles.Loginframe}>
                    <img className={styles.Loginlogo} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/Dekhorlogo.png`} alt="logo" />
                    <h1 className={styles.Loginfont}>Sign In with DekHor ID</h1>
                    <div className={styles.Loginform}>
                        <div className={styles.inputicon}>
                            <img className={styles.inputicon} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/usericon.png`} alt="user" />
                        </div>
                        <div>| </div>
                        <input className={styles.Loginblock}
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
                            <img className={styles.inputicon} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/pwicon.png`} alt="pw" />
                        </div>
                        <div>| </div>
                        <input className={styles.Loginblock}
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