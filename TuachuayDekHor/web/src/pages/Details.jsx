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
  const { user, session } = useContext(AuthContext);
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
    axios.post(`${REACT_APP_BASE_API_URL}/idtopic`, {
      id: id_user
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
    axios.post(`${REACT_APP_BASE_API_URL}/countlike`, {
      id
    })
      .then((res) => {
        setLike(res.data[0].likes);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.post(`${REACT_APP_BASE_API_URL}/isliked`, {
      user: session?.user?.id,
      blog: id,
    }).then(res => {
      setLikeyet(res.data);
    }).catch((error) => {
      console.error(error);
    });

  }, [id]);


  // ระบบ like และ dislike
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async () => {
    // Prevent multiple clicks while a request is in progress
    if (loading) {
      return;
    }

    setLoading(true); // Set loading state to true

    console.log('param', id, 'session', session?.user?.id);

    axios.post(`${REACT_APP_BASE_API_URL}/isliked`, {
      user: session?.user?.id,
      blog: id,
    })
      .then(res => {
        const liked = res.data;

        if (liked) {
          axios.post(`${REACT_APP_BASE_API_URL}/unlike`, {
            user: session?.user?.id,
            blog: id,
          })
            .then(res => {
              setLikeyet(false); // ตั้งค่าเป็น false หลังจากกด Unlike
              setLike(res.data.likes);
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          axios.post(`${REACT_APP_BASE_API_URL}/like`, {
            user: session?.user?.id,
            blog: id,
          })
            .then(res => {
              setLikeyet(true); // ตั้งค่าเป็น true หลังจากกด Like
              setLike(res.data.likes);
            })
            .catch((err) => {
              alert(err);
            });
        }
      })
      .catch((err) => {
        alert(err);
      });


    // Perform the server request based on the like status
    try {
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };



  const isLikedByUser = likeyet;

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
                    <p>{like}</p>
                  </div>
                </div>

                {/* comment อยู่ตรงนี้นะ */}
                <div className="comment__icon">
                  <Comments />
                </div>
              </div>
              <div className="last">
                {/* เช็คว่า Authen รึยัง ถ้า authen แล้วจะเปลี่ยนเป็น edit กับ delete  */}
                {(data.blogger !== session?.user?.id) ? "" :
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
