import "./detaidom.scoped.css";
import { Typography, Rating } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Footer from "../components/footer";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/nav";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FacilityDetail from "../components/facility_detail";
import SafetyDetail from "../components/safety_detail";
import Reviewbox from "../components/reviewbox";
import Writereview from "../components/Writereviwe";
import { userContext } from "../App";
import { REACT_APP_BASE_API_URL } from "../config"


function Distance(distance){
  if(distance >= 1000){
      return distance/1000 + " กม."
  } else {
      return distance + " ม."
  }
}

function MoreDetail(props){
  const {data} = props
  if (data){
    return(
      <div className="mt-4">
        <div className=" text-lg clo font-semibold">เพิ่มเติม</div>
        <div className="more_info">{data}</div>
      </div>)
  }
}

function ChatButton(props){
  const {dormData,navi} = props
  const {user} = useContext(userContext)
  const getChanel = () => {
    axios.get(`${REACT_APP_BASE_API_URL}/get_chanel`,{
      params: {
        user1 : user.id,
        user2 : dormData.owner_id
      }
    }).then((response) => {
      console.log(response)
      navi("/chat/"+user.id+"/"+response.data.chanel_id)
    })
  }
  if(!!user.actor){
    return(
      <div className="chat-button" onClick={getChanel}>
        <div className="bt">
          <QuestionAnswerIcon />
          <p>chat</p>
        </div>
      </div>
    )
  }
}

function Detaildorm() {

  const location = useLocation();
  const { dormID } = useParams();
  const [dormData, setDormData] = useState({});
  const [ reviewData, setreviewData ] = useState([]);
  const [ reviews, setReviews ] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    const url = `${REACT_APP_BASE_API_URL}/detail/${dormID}`
    axios.get(url).then((response) =>{
    setDormData(response.data);
    console.log(JSON.parse(response.data.url));
    }).catch((err) =>{
      navi("/error")
    });
  },[location]);

  useEffect(() => {
    const url = `${REACT_APP_BASE_API_URL}/review/${dormID}`
    axios.get(url).then((response) =>{
    setreviewData(response.data);
    }).catch((err) =>{
      console.log(err)
    });
  },[location]);

  useEffect(() => {
    setReviews(reviewData.map((review,index)=>{
      return(
        <Reviewbox name={review.writer} star={review.star} comment={review.comment} key={index}></Reviewbox>
      )
    }))
  },[reviewData]);

  // const getChanel = () => {
  //   axios.get(`${REACT_APP_BASE_API_URL}/get_chanel`,{
  //     params: {
  //       user1 : 1,
  //       user2 : dormData.owner_id
  //     }
  //   }).then((response) => {
  //     console.log(response)
  //     navi("/chat/"+userID+"/"+response.data.chanel_id)
  //   })
  // }

  const dormImg = JSON.parse(dormData.url??"[]").map((URL,index) =>{
    return(<div className="flex h-full items-center bg-black justify-center" key={index}>
      <img
        className=""
        src= {URL.url}
      />
    </div>)
  })

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="containei">
        <div className="background">
          <div className="card">
            {/*  */}
            <div className="carousel-wrapper flex justify-center">
              <Carousel
                width={"100%"}
                infiniteLoop
                useKeyboardArrows
                autoPlay
                className="flex flex-col items-center"
              >
                {dormImg}
              </Carousel>
            </div>
          </div>
          <div className="register_box">
            <h2 className="clo text-2xl font-bold">{dormData.dorm_name}</h2>
            <div className="grid main_detail m-8 p-3 bg-light_gray rounded-xl">
              <div>รายเดือน </div>
              <div className="justify-end">
                {dormData.min_price?dormData.min_price.toLocaleString('en-US'):dormData.min_price} - {dormData.max_price?dormData.max_price.toLocaleString('en-US'):dormData.max_price} บาท
              </div>
              <div>ระยะทางไปมอ</div> 
              <div className="justify-end">{Distance(dormData.distance)}</div>
              <div>ขนาดของห้อง</div>
              <div className=" justify-end">{dormData.size} ตารางเมตร</div>
              <div className="flex items-end h-8">อินเทอร์เน็ต</div>
              <div className="flex items-end justify-end h-8">{dormData.wifi == "free"?dormData.wifi:dormData.wifi  +" บาท"}</div>
            </div>

            {/* address */}
            <div className=" text-lg clo font-semibold">ที่อยู่</div>
            <div className="address">{dormData.address}</div>

            {/* more info */}
            <MoreDetail data={dormData.more_info}/>

            {/* Facility */}
            <div className="mt-8 text-lg clo font-semibold">
              สิ่งอำนวยความสะดวก
            </div>
            <FacilityDetail dorm={dormData} />

            {/* Safety */}
            <div className="mt-8 text-lg clo font-semibold">
              ระบบความปลอดภัย
            </div>
            <SafetyDetail dorm={dormData} />

            <ChatButton dormData={dormData} navi={navi}/>
            {/* <div className="chat-button" onClick={getChanel}>
              <div className="bt">
                <QuestionAnswerIcon />
                <p>chat</p>
              </div>
            </div> */}
          </div>

          <div className="register_box">
            <h2 className="text-2xl mb-2">review</h2>
            <Writereview dormID={dormID}></Writereview>
            {reviews}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Detaildorm;
