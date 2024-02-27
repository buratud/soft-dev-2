import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ContentSlide.scoped.css';
import img1 from '../../src/Assets/slide1.png';
import { BiSolidPencil } from 'react-icons/bi';
import axios from 'axios';
import { REACT_APP_BASE_API_URL } from '../config';

function Reccommend() {
  const [data, setData] = useState([]); 

  const countToShow = 6;
  const limitedData = data.slice(0, countToShow);

    useState(() => {
      axios.post(`${REACT_APP_BASE_API_URL}/preview-blog`,{
        amount : countToShow
      })
      .then((res) => {
        if(res?.data.success){
          setData(res.data.data);
        }
      })
      .catch((error) => {
      console.error(error);
      });
    }, []);


  return (
    <div className="content">
      <div className="main_content">
        {limitedData.map(({ blog_id, title, category, user: { username }, cover_img }, index) => {
          return (
            <Link to={`/${category}/${blog_id}`} className="singleDest" key={index}>
              <div className="dastImage">
                <img src={cover_img??img1} alt="" />
              </div>
              <div className="destFooter">
                  <div className="destText">
                    <h4>{title}</h4> 
                  </div>
                  <div className="userwrite">
                    <div className="name">
                    <BiSolidPencil size={20} className="icon_pencil" />
                      {username}
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    );
}

export default Reccommend;
