import React, { useState,useContext,useEffect } from 'react'
import { Input } from 'reactstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaRegComment } from "react-icons/fa";
import './Comments.scoped.css'
import { RiFlag2Line, RiMessage2Line, RiSendPlaneFill } from "react-icons/ri";
import { CiChat1 } from "react-icons/ci";
import { General } from '../App';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../config'


function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {session,user} = useContext(General);
  const {id} = useParams();


  const [comment, setComment] = useState('');
  const [allcomment, setAllComment] = useState([]);

  const fetchComments = () => {
    axios.get(`${BASE_API_URL}/showcomment?id_post=` + id)
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
    if (comment) {
      axios.post(`${BASE_API_URL}/commentpost`, {
        id: user?.id,
        id_post: id,
        comment: comment,
      })
      .then(() => {
        fetchComments(); // ดึงความคิดเห็นใหม่หลังจากบันทึกเสร็จ
      })
      .catch((err) => {
        alert(err);
      })
    }

    setComment('');
  }

  // Elements
  const commentElements = allcomment.map(({user: { username },comment},index) =>{
    return (
      <div className="comment_app" key={index}>
        <h5>{username}</h5>
        <p>{comment}</p>
      </div>
    )
  })
  console.log(allcomment);
  console.log(commentElements);
  
  return (
    <>
      <div className="btn" onClick={handleShow} >
        <CiChat1 size={28} className='comment-icon' /><p>{commentElements.length}</p>
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="title">
              <h4>Comments</h4>
              <p>({commentElements.length})</p>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <form action="#" onSubmit={onCommentSubmit}>
          <textarea
            name="content" id="comments"
            rows="5" className='comments__input'
            placeholder= 'Write a comment...'
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
