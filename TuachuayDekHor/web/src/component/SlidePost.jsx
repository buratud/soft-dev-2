import React, { Component,useEffect,useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BsHeartFill} from "react-icons/bs";
import { Link } from "react-router-dom";
import {BiSolidPencil} from "react-icons/bi";
// import image
import img1 from '../../src/Assets/person-circle-outline.svg'
import "./SlidePost.scoped.css"
import axios from "axios";
import { REACT_APP_BASE_API_URL } from '../config'

function SlidePost() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.post(`${REACT_APP_BASE_API_URL}/blogger`,{
       
    })
    .then(res => {
      console.log(res.data.data)
      setData(res.data.data);
    })
    .catch((err) => {
        alert(err)
    })
}, [])

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 600
  };

  return (
    <div>
      <Slider {...settings}>
        {
          data.map(({ user: { username, id }, image: { picture } },index) => {
            return (
              <Link to={`/profile/${id}`} >
                <div className="box" >
                  <div className="singleDest" key = {index}>
                    <img src={picture??img1} alt=""/>
                  </div>
                  <div className="userwrite">
                    <Link to={`/profile/${id}`}>{username}</Link>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </Slider>
    </div>
  );
}



export default SlidePost;