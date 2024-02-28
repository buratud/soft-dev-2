import React from 'react'
import "./Cleaning.scoped.css"
import Navbar from "../component/Nav";
import ContentSlide from '../component/ContentSlide';
import Footer from '../component/footer';

function Cleaning() {

  return (
    <div className="Decoration">
      <header>
        <Navbar/>
      </header>
      <main>
        <h1 className="title">
            CLEANING
        </h1>
      </main>
      <div className="Container">
        <div className="rec">
            <div className="Content"></div>
            <div className="rec__title">
              <h2 className="title_sub">Cleaning Ideas By DekHor</h2>
            </div>
            <ContentSlide name={"cleaning"}/>
        </div>
      </div>
      <Footer/>
    </div>   
    )
}
export default Cleaning;