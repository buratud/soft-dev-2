'use client'
import Image from "next/image"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link"
import styles from "./pfedit.module.css"
import Footer from "../../../components/footer/Footer";
import NavBar from "../../../components/nav";
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../../../config'
import { supabase } from '../../../session'
import axios from "axios";

export default function Home() {

    const router = useRouter();

    const initialFormData = {
        userID: '',
        username: '',
        imageURL: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const [profileImage, setProfileImage] = useState('');
    const [oldUsername, setoldUsername] = useState('');
    const [Imagefile, setImagefile] = useState('');

    useEffect(() => {
        const getProfile = async () => {
            const { data } = await supabase.auth.getSession();
            const user = data?.session?.user;
            if (user) {
                formData.userID = user.id;

                axios.post(`${NEXT_PUBLIC_BASE_API_URL}/profile-picture`, {
                    userID: user.id
                })
                    .then((res) => {
                        setProfileImage(res.data?.data.picture);
                    })

                axios.post(`${NEXT_PUBLIC_BASE_API_URL}/profile-username`, {
                    userID: user.id
                })
                    .then((res) => {
                        setoldUsername(res.data?.username);
                    })
            } else {
                router.push('/');
            }
        }

        getProfile();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImagefile(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRandomImage = () => {
        axios.post(`${NEXT_PUBLIC_BASE_API_URL}/random-avatar`)
        .then(res => {
            console.log(res);
            setProfileImage(res.data?.picture);
        })
        .catch(err => {
            console.error("Error fetching random profile picture:", err);
        });
    };

    const updateProfile = async () => {
        const currentDate = new Date();
        const fileName = `${currentDate.getTime()}_${formData.userID}`
        if (formData.username === '') {
            formData.username = undefined;
        }
        if (Imagefile === '') {
            setImagefile(undefined);
        }
        else {
            const { error } = await supabase.storage.from('Profile_User').upload(fileName, Imagefile);
            if (error) {
                console.log(error);
            }
        }
        if (Imagefile) {
            const { data } = supabase.storage.from('Profile_User').getPublicUrl(fileName);
            formData.imageURL = data.publicUrl;
        }
        else{
            formData.imageURL = profileImage;
        }
        axios.post(`${NEXT_PUBLIC_BASE_API_URL}/set-profile`, {
            userID: formData.userID,
            username: formData.username,
            imageURL: formData.imageURL
        })
            .then(res => {
                if (res?.data) {
                    alert(res.data.message);
                    if (!res.data.err) {
                        window.location.reload();
                    }
                }
            });
    }


    return (
        <main>
            <title> DekHor | Profile Edit </title>
            <NavBar />
            <div className={styles.main}>
                <div className={styles.editcontainer}>
                    <div className={styles.edittitle}>Edit Profile</div>
                    <div className={styles.editline} />
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
                                    <div>Upload Your Photo
                                        <img className={styles.uploadicon} src={`${NEXT_PUBLIC_BASE_WEB_PATH}/pfpcamicon.png`} alt="cam" /></div>
                                </label>
                                <button onClick={handleRandomImage} className={styles.random}>
                                    Random Avatar 
                                </button>
                            </div>
                            <div className={styles.username}>
                                Username Change
                                <input className={styles.usernameedit}
                                    placeholder={oldUsername}
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.frameline} />
                        <div className={styles.button}>
                            <button onClick={updateProfile} className={styles.update}>Update</button>
                            <a href={`${NEXT_PUBLIC_BASE_WEB_PATH}/profile`} className={styles.cancel}>Cancel</a>
                        </div>
                        <div className={styles.frameremind}>
                            This information will be displayed publicly so be careful what you share.
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

