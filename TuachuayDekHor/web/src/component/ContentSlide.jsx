import React, { useState, useContext, useEffect } from "react";
import "./ContentSlide.scoped.css";
import { TiArrowRight } from "react-icons/ti";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { Col } from 'reactstrap'
import { Link, useParams } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
// import image
import img1 from '../../src/Assets/slide1.png'
import img2 from '../../src/Assets/slide2.png'
import img3 from '../../src/Assets/slide3.png'
import img4 from '../../src/Assets/slide4.png'
import { General } from '../App';
import axios from 'axios';
import { BASE_API_URL } from '../config'



function ContentSlide(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_API_URL}/posttocategory?category=` + props.name)
        .then(res => {
            setData(res.data);
            console.log(data)
        })
        .catch((err) => {
            alert(err);
        });
    }, [props.name]);
    const category = props.name




    return (
        <div className="content">
            <div className="main_content">
                {
                    data.map(({ id_post:id, title, user: { username },image_link }, index) => {
                        return (
                            <div className="singleDest" key={index}>
                                <div className="dastImage">
                                    <img src={image_link??img1} alt="" />
                                </div>
                                <div className="destFooter">
                                    <div className="destText">
                                        <h4>
                                            <Link to={`/${category}/${id}`}>{title}</Link>
                                        </h4>
                                    </div>
                                </div>
                                <div className="userwrite">
                                    <div className="name"><BiSolidPencil size={20} className="icon_pencil" />
                                        {username}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
};
export default ContentSlide;
