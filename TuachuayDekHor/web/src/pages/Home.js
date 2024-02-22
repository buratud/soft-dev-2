import "./Home.scoped.css";
import React from "react";
import Navbar from "../component/Nav";
import { Container } from "reactstrap";
import ContentSlide from "../component/ContentSlide";
import Reccommend from "../component/Reccommend";
import { Link } from "react-router-dom";
import SlidePost from "../component/SlidePost";
import {BsArrowRight} from "react-icons/bs";
import Footer from "../component/footer";
import { REACT_APP_BASE_API_URL } from "../config";

const Home = () => {
  console.log(REACT_APP_BASE_API_URL)
  return (
    <div className="home">
      <header>
        <Navbar />
      </header>
      <main>
        {/* เป็นไปได้อยากกลับมาแก้ */}
        <h1 className="title">Let's know how to be a professional DekHor</h1>
        {/* <Link to={"/signup"}>
          <button className="start-btn">Get Started</button>
        </Link> */}
      </main>
      <body>
        <div className="Container">
          <div className="titleblog">
            <h1 className="title__blogger">Our Blogger</h1>
            <Link to={'/blogger'} className="linkBlogger">
              <button className="btn-blogger">See All<BsArrowRight size={25}/></button>
            </Link>
          </div>
        <SlidePost></SlidePost>
        <div className="rec">
          <div className="rec__title">
            <h2 className="title_sub">DekHor Recommended</h2>
          </div>
          <Reccommend/>
        </div>
        <div className="category">
          <div className="category__title">
            <h2 className="category_sub">Categories</h2>
          </div>
          <div className="category_wrapper">
            <Link to={"/Decoration"}  className="Decoration_wrapper">
                <div className="box">
                    <h3 className="title_category">Decoration</h3>
                    <p className="details" >How to decorate a room to make it livable</p>
                </div>
            </Link>
            <Link to={"/Cleaning"} className="Cleaning_wrapper">
                <div className="box">
                    <h3 className="title_category">Cleaning</h3>
                    <p className="details" >Simple cleaning</p>
                </div>
            </Link>
          </div>
          <div className="category_wrapper">
            <Link to={'/Cooking'} className="Cooking_wrapper">
                <div className="box">
                    <h3 className="title_category">Cooking</h3>
                    <p className="details">Let's cook together</p>
                </div>
            </Link>
            <Link to={"/Story"} className="story_wrapper">
                <div className="box">
                    <h3 className="title_category">Story's DekHor</h3>
                    <p className="details">Share fun stories</p>
                </div>
            </Link>
          </div>
        </div>
        <div className="btn_Search">
          <Link to={"/search"} >Search More Blogs <BsArrowRight size={25}/></Link>
        </div>
      </div>
      </body>
      <Footer></Footer>
    </div>
  );
};

export default Home;
