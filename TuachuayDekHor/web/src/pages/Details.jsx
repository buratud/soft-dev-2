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
import { REACT_APP_BASE_API_URL, REACT_APP_MAIN_URL } from '../config'


const Details = () => {
  const { id } = useParams();
  // const {username} = useParams();
  const { user, session } = useContext(AuthContext);
  const [like, setLike] = useState([]);
  const [data, setData] = useState([]);
  const [likeyet, setLikeyet] = useState([]);
  const [content, setContent] = useState();
  useEffect(() => {
    axios.post(`${REACT_APP_BASE_API_URL}/detailpost`, {
      id
    })
      .then((res) => {
        setData(res.data[0]);
        let modifiedBody = res.data[0].body;

        const videoRegex = /<video[^>]*>[\s\S]*?<\/video>/g; // Updated regex
        const iframeRegex = /<iframe[^>]*>[\s\S]*?<\/iframe>/g;
        const videoMatches = modifiedBody.match(videoRegex);

        if (videoMatches) {
          // Iterate through each <video> tag found
          videoMatches.forEach(videoTag => {
            const styledVideoTag = videoTag.replace('<video', '<video style="max-width: 100%; max-height: 100%; width: auto; height: auto;"');
            modifiedBody = modifiedBody.replace(videoTag, styledVideoTag);
          });
        }

        // Find all <iframe> tags within the HTML content
        const iframeMatches = modifiedBody.match(iframeRegex);

        if (iframeMatches) {
          // Iterate through each <iframe> tag found
          iframeMatches.forEach(iframeTag => {
            const styledIframeTag = iframeTag.replace('<iframe', '<iframe style="max-width: 100%; max-height: 100%; width: auto; height: auto;"');
            modifiedBody = modifiedBody.replace(iframeTag, styledIframeTag);
          });
        }

        setContent(modifiedBody);
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
    }, [id]);

    useState (() => {
      console.log('session',session?.user?.id)
      if (session?.user?.id !== undefined) {
        axios.post(`${REACT_APP_BASE_API_URL}/isliked`, {
          user: session?.user?.id,
          blog: id,
        }).then(res => {
          setLikeyet(res.data);
          console.log('islike',res.data)
        }).catch((error) => {
          console.error(error);
        });
      } else {
        setLikeyet(false)
      }
    })

  // ระบบ like และ dislike
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async () => {
    // Prevent multiple clicks while a request is in progress
    if (loading) {
      return;
    }

    setLoading(true); // Set loading state to true

    console.log('param', id, 'session', session?.user?.id);
    if (session?.user?.id) {
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
    } else {
      alert('please logged in before like')
    }

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
                  <Avatar src={userData.picture}/>
                </div>
                <Link to={`${REACT_APP_MAIN_URL}/profile/${userData.username}`} className="name">
                  <h6>{userData.username}</h6>
                  </Link>
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
                    <Link to={`/writeblog/${id}`}><button className='icon-Edit'>
                    {/* <Link to={`/writeblog/${id}`}><button className='icon-Edit'> */}
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
          <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
        </Card>
      </div >
      <Footer></Footer>
    </div>
  )
}

export default Details



