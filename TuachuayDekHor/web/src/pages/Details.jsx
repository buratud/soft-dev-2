import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../component/Nav'
import { Container, Input, Card } from 'reactstrap'
import { RiFlag2Line, RiMessage2Line, RiSendPlaneFill } from "react-icons/ri";
import { BsHeart, BsFillTrashFill, BsHeartFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import Avatar from '../component/Avatar';
import Comments from '../component/Comments';
import "./Details.scoped.css"
import axios from 'axios';
import { AuthContext } from '../App';
import CheckDelete from '../component/CheckDelete';
import img1 from '../../src/Assets/slide1.png'
import { FaRegEdit } from "react-icons/fa";
import Footer from "../component/footer";
// title,username,content,like,comments
import { REACT_APP_BASE_API_URL } from '../config'

const Details = () => {
  const { id } = useParams();
  // const {username} = useParams();
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState([]);
  const [data, setData] = useState([]);
  const [likeyet, setLikeyet] = useState([]);
  useEffect(() => {
    axios.post(`${REACT_APP_BASE_API_URL}/detailpost`, {
      id
    })
      .then((res) => {
        
        setData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [id]);

  const id_user = data.blogger
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.post(`${REACT_APP_BASE_API_URL}/idtopic` ,{
      id : id_user
    })
      .then((res) => {
        setUserData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [id_user]);

  if (!data) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    axios.get(`${REACT_APP_BASE_API_URL}/countlike?id_post=` + id)
      .then((res) => {
        setLike(res.data);
      })
      .catch((error) => {
        console.error(error);
      })

  }, [id]);


  // ระบบ like และ dislike
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async () => {
    // Prevent multiple clicks while a request is in progress
    if (loading) {
      return;
    }
  
    setLoading(true); // Set loading state to true
  
    // Optimistically update the UI before the server response
    setLike((currentLikes) => {
      const liked = currentLikes.some(({ id }) => id === user?.id);
      if (liked) {
        // If already liked, remove the like
        return currentLikes.filter((like) => like.id !== user?.id);
      } else {
        // If not liked, add the like
        return [...currentLikes, { id: user?.id }];
      }
    });
  
    // Perform the server request based on the like status
    try {
      if (liked) {
        await axios.delete(`${REACT_APP_BASE_API_URL}/unlike?id=${user?.id}&id_post=${id}`);
      } else {
        await axios.post(`${REACT_APP_BASE_API_URL}/likepost`, {
          id_post: id,
          id: user?.id,
        });
      }
      
      // Update the UI after the server response
      setLike((currentLikes) => {
        const liked = currentLikes.some(({ id }) => id === user?.id);
        if (liked) {
          // If already liked, return current likes
          return currentLikes;
        } else {
          // If not liked, add the like
          return [...currentLikes, { id: user?.id }];
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };
  
  

  const isLikedByUser = like.some(({ id }) => id === user?.id);
  
  return (
    <div className="story">
      <header>
        <Navbar></Navbar>
      </header>
      <div className="story__content">
        <Card>
          <div className="head">
            <div className="title">
              <h2>{data.title}</h2>
            </div>
            <div className="writer">
              <div className="user__photo">
                <Avatar src={userData.picture} />
              </div>
              <div className="name">
                <h6>{userData.username}</h6>
                <div />

                {/* <div className="heart">
                    <BsBookmark size={25} 
                    className={like === 0 ? "nolike" : "like"}
                    onClick={handleLikeClick}
                    />
                  </div> */}

              </div>
            </div>
            <div className="menu__icon">
              <div className="first">
              <div className="like__box">
                <div className="heart">
                  {isLikedByUser ? (
                    <BsHeartFill size={25} className='heart liked' onClick={handleLikeClick} />
                  ) : (
                    <BsHeart size={25} className='heart' onClick={handleLikeClick} />
                  )}
                  <p>{like.length}</p>
                </div>
              </div>

                {/* comment อยู่ตรงนี้นะ */}
                <div className="comment__icon">
                  <Comments />
                </div>
              </div>
              <div className="last">
                {/* เช็คว่า Authen รึยัง ถ้า authen แล้วจะเปลี่ยนเป็น edit กับ delete  */}
                {(user?.user_metadata.username !== data.name?.username) ? "" :
                  <div className="edit">
                    {/* edit อยู่ตรงนี้คับ */}
                    <Link to={'/writeblog'}><button className='icon-Edit'>
                      <FaRegEdit size={25} /> <p>Edit</p>
                    </button></Link>
                    <button className='icon-delete'>
                      <CheckDelete></CheckDelete>
                    </button>
                  </div>}
              </div>
            </div>
          </div>
          <div className="img__box">
            <img src={data.cover_img ?? img1} alt="" />
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: data.body }} />
        </Card>
      </div >
      <Footer></Footer>
    </div>
  )
}

export default Details



// {/* <div className="box">
//                   <div className="last">
//                   {(user?.user_metadata.username !== data.name?.username)? <div className="heart">
//                   { like === 0?
//                     <BsBookmark size={25}
//                     onClick={handleLikeClick}
//                     className='noBookmark'
//                     />:<BsBookmarkFill size={25} className='Bookmark' onClick={handleLikeClick}/>}
//                   </div> :
//                   <div className="icon_edit">
//                     {/* <button >
//                       <BsFillTrashFill size={25} className='icon-delete'/>
//                     </button> */}
//     <button className='icon-delete'>
//       <CheckDelete></CheckDelete>
//     </button>
//   </div>}
// </div> */}
