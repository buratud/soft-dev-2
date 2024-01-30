import React from 'react'
import { Link } from 'react-router-dom'
import "./Signup.scoped.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup=()=> {
    const navigate = useNavigate();
    const recieve_data = (event) =>{
        // console.log(event);
        event.preventDefault();
        if (event.target[2].value === event.target[3].value){
            axios.post(`${baseApiUrl}/signup`,{
                email: event.target[0].value,
                username: event.target[1].value,
                password: event.target[2].value,
            }).then(res => {
                navigate("/login");
            })
            .catch((err) => {
                alert(err)
            })
        }
        else{
            return alert("Password must be the same");
        }
    }

  return (
    <div className="signup">
      <div className="wrapper">
              <img id="login-img" src="/login.png" alt="" />
              <Link to={"/home"}><img id="icon-close" src="close-outline.svg" alt=""/></Link>
              <div className="form-box-signup">
                  <h2 id="Welcome">Welcome to DekHor</h2>
                  <form action='#'on onSubmit={recieve_data}>
                      <div className="input-box">
                          <input type="text" placeholder="Email" />
                      </div>
                      <div className="input-box">
                          <input type="username" placeholder="Username" />
                      </div>
                      <div className="input-box">
                          <input type="password" placeholder="Password" />
                      </div>
                      <div className="input-box">
                          <input type="password" placeholder="Confirm password" />
                      </div>
                      <button type="submit" className="btn">Sign Up</button>
                  </form>
              </div>
          </div>
    </div>
  )
}

export default Signup;