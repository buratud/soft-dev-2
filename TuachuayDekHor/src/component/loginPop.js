import React, { useState } from 'react';
import "./loginPop.scoped.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'reactstrap';
import { Link } from "react-router-dom";
import Popsignup from "./signupPop";

function Poplogin(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className="Loginbtn" onClick={toggle}>
        Log in
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <div className="wrapper">
            <img id="login-img" src="/login.png" alt="" />
            <img id="icon-close" src="close-outline.svg" alt="" onClick={toggle} />
            <div className="form-box-login">
                <h2>Login</h2>
                <div className="login-signup">
                    <p>Are you new DekHor?</p>
                    <Popsignup></Popsignup>
                </div>
                <form action="#">
                    <div className="input-box">
                        <input type="username" placeholder="Username" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" />
                    </div>
                    <div className="remember-forget">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forget Password?</a>
                    </div>
                    <button type="submit" className="login-submit" onClick={toggle} >Login</button>
                </form>
            </div>
        </div>
      </Modal>
    </div>
  );
}

export default Poplogin;
