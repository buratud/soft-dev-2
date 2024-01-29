import React,{useState, useEffect, useContext} from 'react'
import img1 from '../../src/Assets/slide1.png'
import img2 from '../../src/Assets/slide2.png'
import img3 from '../../src/Assets/slide3.png'
import img4 from '../../src/Assets/slide4.png'
import {BsHeartFill,BsBookmarkFill} from "react-icons/bs";
import { Link } from "react-router-dom";
import {BiSolidPencil} from "react-icons/bi";
import './LikeSlide.scoped.css'
import { General } from '../App';
import axios from 'axios';
import { baseApiUrl } from '../config'


function LikeSlide (props){
    const { supabase_for_use: supabase, session, user } = useContext(General);
    const [data, setData] = useState([]);
    console.log(props.id)
    useEffect(() => {
        if (props.id) {
            axios.get(`${baseApiUrl}/showlike?id=` + props.id)
            .then(res => {
                setData(res.data);
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
                alert(err)
            })
        } else {
            console.log("props.id is empty or invalid");
        }
    }, [props.id])

  return (
    <div className="content">
            <div className="main_content">
                {
                    data.map(({id_post:id,title:{title},user:{username},category:{category},image:{image_link}}, index)=>{
                        return(
                            <div className="singleDest" key = {index}>
                                <div className="dastImage">
                                    <img src= {image_link??img1} alt="" />
                                </div>
                                <div className="destFooter">
                                    <div className="heart">
                                        <BsBookmarkFill size={25} className='like-icon'/>
                                    </div>
                                    <div className="destText">
                                        <h4>
                                            <Link to={`/${category}/${id}`}>{title}</Link>
                                        </h4>
                                        <span className="userwrite">
                                            <span className="name"><BiSolidPencil size={20} className="icon_pencil"/>
                                                {username}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )
                }
                
            </div>
        </div>
  )
}

export default LikeSlide;