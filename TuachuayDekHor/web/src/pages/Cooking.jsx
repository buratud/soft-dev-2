import React from 'react'
import "./Cooking.scoped.css"
import Navbar from "../component/Nav";
import ImgSlide from '../component/ImgSlide';
import { Container } from 'reactstrap'
import ContentSlide from '../component/ContentSlide';

function Cooking() {
  return (
    <div className="Decoration">
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="title">
          COOKING
        </h1>
      </main>
      <div className="Container">
        <div className="searchbar">
          Search Bar Here
        </div>
        <div className="rec">
          <div className="Content"></div>
          <div className="rec__title">
            <h2 className="title_sub">Let's make easy food with DekHor</h2>
          </div>
          <ContentSlide name={"cooking"} />
        </div>
      </div>
    </div>
    // <div className="Decoration">
    //   <header>
    //     <Navbar/>
    //   </header>
    //   <main>
    //     <h1 className="title">
    //         COOKING
    //     </h1>
    //   </main>
    //   <div className="Container">
    //     <div className="rec">
    //         <div className="rec__title">
    //           <h2 className="title_sub">Let's make easy food with DekHor</h2>
    //         </div>
    //       <ContentSlide name={"cooking"}/>
    //     </div>
    //   </div>
    // </div>   
  )
}


export default Cooking