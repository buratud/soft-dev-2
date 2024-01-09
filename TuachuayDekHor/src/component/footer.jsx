import React from 'react';
import './footer.scoped.css';
import { Link } from 'react-router-dom'; 
import {BiLogoFacebookCircle,BiSolidPhone,BiSolidEnvelope,BiSolidMap} from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section1">
          <div className='title_footer1'>
            <h3 className= 'title1'>Contact Us</h3>
          </div>
          <p className='text_footer'><BiSolidEnvelope id='icon1'/>example@email.com</p>
          <p className='text_footer'><BiSolidPhone id='icon1'/>xxx-xxx-xxxx</p>
          <p className='text_footer'><BiSolidMap id='icon1'/>King Mongkut's University of Technology North Bangkok</p>
        </div>
        <div className="footer-section">
          <div className="logo">
            <img id="logo" src="/DekHor.png" alt="" />
          </div> 
        </div>
        <div className="footer-section2">
          <div className='title_footer'>
            <h3 className= 'title'>Follow Us</h3>
          </div>
          <Link to={"/home"}><BiLogoFacebookCircle id='icon'/></Link>
          <Link to={"/home"}><img id="icon" src="logo-instagram.svg" alt=""/></Link>
          <Link to={"/home"}><img id="icon" src="logo-twitter.svg" alt=""/></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p className='last_footer'>&copy; {new Date().getFullYear()} TuaychuyDekHor Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
