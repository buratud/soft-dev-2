import React from 'react'
import "./Story.scoped.css"
import Navbar from "../component/Nav";
import ContentSlide from '../component/ContentSlide';

function Story() {
  return (
    <div className="Decoration">
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="title">
          STORY'S DekHor
        </h1>
      </main>
      <div className="Container">
        <div className="rec">
          <div className="Content"></div>
          <div className="rec__title">
            <h2 className="title_sub">Story By DekHor</h2>
          </div>
          <ContentSlide name={"story"} />
        </div>
      </div>
    </div>
    // <div className="Decoration">
    //   <header>
    //     <Navbar/>
    //   </header>
    //   <main>
    //     <h1 className="title">
    //         STORY'S DekHor
    //     </h1>
    //   </main>
    //   <div className="Container">
    //     <div className="rec">
    //         <div className="rec__title">
    //           <h2 className="title_sub">Story By DekHor</h2>
    //         </div>
    //       <ContentSlide name = {"story"}/>
    //     </div>
    //   </div>
    // </div>   
    )
}
export default Story