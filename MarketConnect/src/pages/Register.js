import axios from "axios";
import "./Register.scoped.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (event.target[1].value !== event.target[2].value)
      return alert("Password and comfrim Password does not match.");
    axios
      .post("http://localhost:3200/register", {
        email: event.target[0].value,
        password: event.target[1].value,
      })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          alert("Email is already used.");
          console.error(res);
          setIsLoading(false);
          return;
        }
        navigate("/verify", {
          state: {
            email: event.target[0].value,
          },
        });
      })
      .catch((err) => {
        alert("There is an error. Please try again.");
        console.log(err);
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <form action="" className="box" onSubmit={handleRegister}>
        <div>
          <div className="title">MarketConnect</div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <img src="/-icon-person.svg" alt="" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <img src="/-icon-lock-locked.svg" alt="" />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
            />
            <img src="/-icon-lock-locked.svg" alt="" />
          </div>
        </div>
        <button disabled={isLoading} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
