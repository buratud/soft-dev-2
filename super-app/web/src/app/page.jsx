'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation"; 
import Image from 'next/image';
import styles from './register.module.css';
import Link from 'next/link';
import axios from 'axios';
import config from './config';

export default function Home() {
    const router = useRouter();
    const initialFormData = {
        username: '',
        email: '',
        password: '',
        reenterPassword: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password || !formData.reenterPassword) {
            alert('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (formData.password != formData.reenterPassword) {
            alert('Please enter the same password.');
            return;
        }

        console.log('Submitted Data:', formData);

        // ทำสิ่งที่คุณต้องการทำหลังจาก Submit ที่นี่
        axios.post(config.API + "/register",{
            email: formData.email,
            username: formData.username,
            password: formData.password,
        })
        .then(res => {
            alert('go to verify')
            // navigate("/verify");
        })
        .catch((err) => {
            // if (err.response && err.response.data && err.response.data.message) {
            //     alert(err.response.data.message);
            // } else {
            //     alert("An error occurred during login.");
            // }
            // if (err.response.message === "User already registered") {
            //     alert("Internal Server Error (500). Please don't submit too frequently.");
            //     // alert("Internal Server Error (500). Please don't submit too frequently.");
            // } else {
                alert(err);
            // }
        })

        setFormData(initialFormData);

        // router.push('/verify');
    };

    return (
        <main className={styles.main}>
            <div className={styles.topBar}>
                <img src="./images/logo.png" alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.register_form}>
                <div className={styles.leftside}>
                    <div className={styles.Intro}>
                        <div className={styles.Intro_1}>
                            <head1>Get Started with</head1>  <br />
                            <head2>DekHor ID</head2>
                        </div>
                        <div className={styles.Intro_2}>
                            One account for everything. <br />
                            Blogs, Dorms, Eats, Markets <br />
                            We’ve got you covered!
                        </div>
                    </div>

                    <div className={styles.pic}>
                        <Image alt="dekhor1" src="/images/dekhor_1.png" height={412} width={288} />
                    </div>
                </div>

                <div className={styles.rightside}>
                    <div className={styles.form}>
                        <div className={styles.block}>
                            <div>Username</div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <div>Email</div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                title="Please enter a valid email address."
                            />
                        </div>
                        <div className={styles.block}>
                            <div>Password</div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.block}>
                            <div>Re-enter Password</div>
                            <input
                                type="password"
                                name="reenterPassword"
                                value={formData.reenterPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button onClick={handleSubmit}>Register</button>
                    </div>
                    <account>
                        <span>
                            Already have an account? <Link href="/">Sign In.</Link>
                        </span>
                    </account>
                </div>
            </div>
        </main>
    );
}
