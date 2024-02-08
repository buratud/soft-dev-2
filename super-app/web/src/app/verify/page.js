'use client'
import { useState, useEffect } from "react";
import { useRouter,useSearchParams } from "next/navigation"; 
import styles from "./page.module.css";
import axios from 'axios';
import {NEXT_PUBLIC_BASE_WEB_PATH,NEXT_PUBLIC_BASE_API_URL} from "../../../config";
const Verify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const sendOtp = () => {
    // The loading state is now set before the timeout to ensure it shows immediately
    setLoading(true);

    axios.put(`${NEXT_PUBLIC_BASE_API_URL}/verify-otp`,
    { 
      email: email, 
      otp: otp.join("") 
    })
    .then((res) =>{
      const {message , error } = res.data;
      setLoading(false);
      if(error){
        alert(error);
      }
      else{
        alert(message);
        router.push('/');
      }
    })
    .catch((error) =>{
      console.log(error);
    })
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = paste.split('');
    setOtp(newOtp);

    if (newOtp.length === 6) {
      // Add a delay before submitting
      setTimeout(sendOtp, 100);
    }
  };

  const handleInputChange = (e, index) => {
    if (loading) return; // Prevent input when loading
    const { value, id } = e.target;
    let newOtp = [...otp];
    // Handle backspace/delete key for empty field
    if (value === '' && e.keyCode === 8 && index !== 0) {
      newOtp[index] = '';
      newOtp[index - 1] = ''; // Clear the previous field
      setOtp(newOtp);
      document.getElementById(`input${index}`).focus(); // Focus the previous field
    } else if (/^\d$/.test(value)) { // Check if the value is a single digit
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to next field if not the last
      if (index < otp.length - 1) {
        document.getElementById(`input${index + 2}`).focus();
      }
      // If all OTP inputs are filled, add a delay before submitting
      if (newOtp.every((num) => num.trim() !== '')) {
        setTimeout(sendOtp, 100);
      }
    } else {
      // Handle case where non-digit character is entered
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };
  
  useEffect(() => {
    // Focus the first input when the component mounts
    document.getElementById("input1").focus();
  }, []);
  
  return (
    <div className={styles.container}>
       <div className={styles.topBar}>
        <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/logo.png`} alt="Logo" className={styles.logo} />
      </div>
      {loading && <div className={styles.overlay}>
        <div className={styles.loading}>Loading...</div>
      </div>}
      <div className={styles.section}>
        <div className={styles.title}>
          <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/sendotp.png`} alt="" />
          <div>Verification Code</div>
        </div>
        <div className={styles.describ}>We have sent a verification code to your Email</div>
        <div id="inputs" onPaste={handlePaste}>
          {otp.map((value, index) => (
            <input
              key={index}
              id={`input${index + 1}`}
              className={styles.input}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleInputChange(e, index)}
              autoComplete="off" // Disable autocomplete for security
            />
          ))}
        </div>
        <div className={styles.footer}>
          <button className={styles.button} onClick={sendOtp}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;

