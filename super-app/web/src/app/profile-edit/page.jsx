import Image from "next/image"
import Link from "next/link"
import styles from "./pfedit.module.css"
import Footer from "../../../components/footer/Footer";
import NavBar from "../../../components/nav";

export default function Home() {


    return (
        <div>
            <NavBar/>
            <div className={styles.main}>
                <title> DekHor | Profile Edit </title>
                <div className={styles.editcontainer}>
                    <div className={styles.edittitle}>Edit Profile</div>
                    <div className={styles.editline}/>
                    <div className={styles.editframe}>
                        <div className={styles.framecontent}>
                            <div className={styles.profile}>
                                <div className={styles.profiledisplay}></div>
                                <button className={styles.uploadbtn}>
                                    <div>Upload Your Photo <Image src="/pfpcamicon.png" alt="cam" width={35} height={28}/></div>
                                </button>
                            </div>
                            <div className={styles.username}>
                                Username
                                <input className={styles.usernameedit}
                                    placeholder="Username"
                                    type="text" 
                                    name="username"
                                />
                            </div>
                        </div>
                        <div className={styles.frameline}/>
                        <div className={styles.button}>
                            <button className={styles.update}>Update</button>
                            <button className={styles.cancel}>Cancel</button>
                        </div>
                        <div className={styles.frameremind}>
                            This information will be displayed publicly so be careful what you share.
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.editfooter}><Footer/></div>
        </div>
    )
}