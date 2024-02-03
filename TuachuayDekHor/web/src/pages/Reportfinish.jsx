import React from 'react'
import "./Reportfinish.scoped.css"
import { Link } from "react-router-dom";
import Navbar from '../component/Nav';

function Reportfinish() {
  return (
    <div className="report">
      <header>
        <Navbar></Navbar>
      </header>        
        <div className="noti-box">
            <h2>Report Success</h2>
            <p>Thank you for your feedback</p>
            <button><a href="home">Back Home</a></button>
        </div>
    </div>
  )
}

export default Reportfinish;