import React, { useState, useContext, useEffect } from 'react'
import { Input } from 'reactstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaRegComment } from "react-icons/fa";
import './Comments.scoped.css'
import { RiFlag2Line, RiMessage2Line, RiSendPlaneFill } from "react-icons/ri";
import { CiChat1 } from "react-icons/ci";
import { AuthContext } from '../App';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_BASE_API_URL } from '../config'
import DeleteComment from './DeleteComment';


function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { session, user } = useContext(AuthContext);
  const { id } = useParams();


  const [comment, setComment] = useState('');
  const [allcomment, setAllComment] = useState([]);

  const fetchComments = () => {
    axios.post(`${REACT_APP_BASE_API_URL}/showcomment`, {
      blog_id: id
    })
      .then((response) => {
        setAllComment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchComments(); // เรียกใช้เมื่อคอมโพเนนต์ถูกโหลด
  }, [id]); // เมื่อ 'id' หรือรหัสโพสที่คุณอ้างถึงเปลี่ยนแปลง

  const onCommentSubmit = (event) => {
    event.preventDefault();
    if (user) {
      if (comment) {
        axios.post(`${REACT_APP_BASE_API_URL}/commentpost`, {
          user_id: user.id,
          blog_id: id,
          comment: comment,
        })
          .then(() => {
            fetchComments(); // ดึงความคิดเห็นใหม่หลังจากบันทึกเสร็จ
          })
          .catch((err) => {
            alert(err);
          })
      }
    } else {
      alert('You must login before comment');
    }

    setComment('');
  }

  // Elements
  const commentElements = allcomment.map(({ user: { username }, content }, index) => {
    const isOwner = session && commentUserId === session.user.id; // เช็คว่าผู้ใช้ที่ login เป็นเจ้าของคอมเมนต์หรือไม่
    return (
      <div className="comment_app" key={index}>
        <div className="comment_Username">
          <h5>{username}</h5>
          {isOwner && (
            <button className="Delete_wrap">
              <DeleteComment></DeleteComment>
            </button>
          )}
        </div>
        <p1>{content}</p1>
      </div>
    )
  })
  console.log(allcomment);
  console.log(commentElements);

  return (
    <>
      <div className="btn" onClick={handleShow} >
        <CiChat1 size={28} className='comment-icon' />
        <p>{commentElements.length}</p>
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton style={{ backgroundColor: 'rgb(64, 102, 156)' }}>
          <Offcanvas.Title>
            <div className="title">
              <p2>Comments</p2>
              <p2>({commentElements.length})</p2>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form action="#" onSubmit={onCommentSubmit}>
            <textarea
              name="content" id="comments"
              rows="5" className='comments__input'
              placeholder='Write a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
            <div className="send_btn">
              <button type='submit' className='send__btn'>
                Submit
              </button>
            </div>
          </form>

          <div className="comment_blog">
            {commentElements}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

//show frontend 
function Comments() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default Comments
