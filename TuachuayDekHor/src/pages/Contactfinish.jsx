import React from 'react'
import './Reportfinish.scoped.css'
import Navbar from '../component/Nav'

function Contactfinish() {
  return (
    <div className="report">
      <header>
        <Navbar></Navbar>
      </header>        
    <div className="noti-box">
      <h2>Send Message Complete!</h2>
      <p>We will respond to you within 24 hours.</p>
      <button><a href="home">Back Home</a></button>
    </div>
    </div>
  )
}

export default Contactfinish