'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./page.module.css";

const Verify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    // The loading state is now set before the timeout to ensure it shows immediately
    setLoading(true);
    
    // Simulate an OTP send request with a timeout
    setTimeout(() => {
      setLoading(false); // Stop loading after the timeout
      alert("Verify Success"); // Or handle the OTP verification response
    }, 2000); // 2-second delay to simulate network request
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

    const { value } = e.target;
    const newOtp = [...otp];
    
    if (/^\d$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        document.getElementById(`input${index + 2}`).focus();
      }

      // If all OTP inputs are filled, add a delay before submitting
      if (newOtp.every((num) => num.trim() !== '')) {
        setTimeout(sendOtp, 100);
      }
    } else if (value === '') {
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        document.getElementById(`input${index}`).focus();
      }
    }
  };

  useEffect(() => {
    // Focus the first input when the component mounts
    document.getElementById("input1").focus();
  }, []);
  
  return (
    <div className={styles.container}>
       <div className={styles.topBar}>
        <img src="./images/logo.png" alt="Logo" className={styles.logo} />
      </div>
      {loading && <div className={styles.overlay}>
        <div className={styles.loading}>Loading...</div>
      </div>}
      <div className={styles.section}>
        <div className={styles.title}>
          <img src="./images/sendotp.png" alt="" />
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

