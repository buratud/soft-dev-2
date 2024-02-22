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

    useState(()=>{
        axios.post(`${REACT_APP_BASE_API_URL}/randompost`,{
        
        })
        .then((res) => {
        setData(res.data);
        })
        .catch((error) => {
        console.error(error);
        });

    },[])


    return (
      <div className="content">
        <div className="main_content">
          {limitedData.map(({ id_post: id, title, category, user: { username }, image_link }, index) => {
            return (
              //แก้ link ให้คลุมทั้ง Card
              <Link to={`/${category}/${id}`} className="singleDest" key={index}>
                <div className="dastImage">
                  <img src={image_link??img1} alt="" />
                </div>
                <div className="destFooter">
                  <div className="destText">
                    <h4>{title}</h4> 
                  </div>
                </div>
                <div className="userwrite">
                  <div className="name">
                    <BiSolidPencil size={20} className="icon_pencil" />
                    {username}
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
