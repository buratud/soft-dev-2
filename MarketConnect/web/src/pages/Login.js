import "./Login.scoped.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext, useSupabase } from "../App";

const Login = () => {
  const supabase = useSupabase();
  const navigate = useNavigate();
  const { session } = useContext(AuthContext);

  useEffect(() => {
    if (session) {
      navigate("/home");
    }
  }, [session]);

  const handleLogin = (event) => {
    event.preventDefault();
    const { data, error } = supabase.auth
      .signInWithPassword({
        email: event.target[0].value,
        password: event.target[1].value,
      })
      .then((res) => {
        if (res?.error === null) {
          alert("Login success");
        }
        if (res?.error?.message === "Invalid login credentials") {
          alert("Email or password does not correct.");
        }
      })
      .catch((err) => {
        alert("There is an error. Please try again.");
        console.error(err);
      });
  };

  return (
    <div className="container">
      <form className="box" onSubmit={handleLogin}>
        <div>
          <div className="title">MarketConnect</div>
          <div className="input-box">
            <input
              type="email"
              name="Email"
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
        </div>
        <div className="footer">
          <label htmlFor="">
            <Link to={"/register"}>Don't have Account? Register here!</Link>
          </label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
