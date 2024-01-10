import React, { useState, useEffect, useContext } from 'react'
import "./Decoration.scoped.css"
import Navbar from "../component/Nav";
import { Col, Row, Container } from "reactstrap";
import ContentSlide from '../component/ContentSlide';
import { General } from '../App';
import axios from 'axios';

function Decoration() {
  // const { supabase_for_use: supabase, session, user } = useContext(General);
  // const [data, setData] = useState([]);
  // // const [title, setTitle] = useState("")
  // useEffect(() => {
  //     axios.get("http://localhost:3300//posttodecoration?category=" + Decoration)
  //     .then(res => {
  //       console.log(res.data)
  //         setData(res.data);
  //     })
  //     .catch((err) => {
  //         alert(err)
  //     })
  // }, [])
  return (
    <div className="Decoration">
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="title">
          DECORATION
        </h1>
      </main>
      <div className="Container">
        <div className="rec">
          <div className="Content"></div>
          <div className="rec__title">
            <h2 className="title_sub">Ideas for Your Room By DekHor</h2>
          </div>
          <ContentSlide name={'decoration'} />
        </div>
      </div>
    </div>
    // <div className="Decoration">
    //   <header>
    //     <Navbar/>
    //   </header>
    //   <main>
    //     <h1 className="title">
    //         DECORATION
    //     </h1>
    //   </main>
    //   <div className="Container">
    //     <div className="rec">
    //         <div className="rec__title">
    //           <h2 className="title_sub">Idea for Your Room By DekHor</h2>
    //         </div>
    //       <ContentSlide name={'decoration'} />
    //     </div>
    //   </div>
    // </div>   
  )
}


export default Decoration