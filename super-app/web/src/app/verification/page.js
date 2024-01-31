'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Verify = () => {
  const router = useRouter();
  const email  = router.query?.email; // Assuming you pass email as a query parameter

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const sendOtp = () => {
    // Implement your axios request here to send and verify OTP
    // Use the 'otp' state to get the entered OTP
    alert("Implement sendOtp functionality");
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    // Validate the input and move focus to the next input
    if (/^\d+$/.test(value) && value.length === 1) {
      newOtp[index] = value;
      if (index < 5) {
        document.getElementById(`input${index + 2}`).focus();
      }
    } else if (value === "" && index > 0) {
      // Handle backspace/delete key
      newOtp[index] = value;
      document.getElementById(`input${index}`).focus();
    } else {
      // Clear the input if it's not a digit
      newOtp[index] = "";
    }

    setOtp(newOtp);
  };

  useEffect(() => {
    // Focus the first input when the component mounts
    document.getElementById("input1").focus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.title}>
          <img src="./images/sendotp.png" alt="" />
        </div>
        <div className={styles.title}>Verification Code</div>
        <div className={styles.describ}>We have sent a verification code to your Email</div>
        <div id="inputs">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`input${index + 1}`}
              className={styles.input}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
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
