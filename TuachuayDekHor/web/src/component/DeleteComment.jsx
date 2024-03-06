import React,{useState,useContext,useEffect} from 'react'
import './CheckDelete.scoped.css'
import { useParams,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {BsFillTrashFill,BsXLg} from "react-icons/bs";
import axios from 'axios';
import { AuthContext } from '../App';
import { REACT_APP_BASE_API_URL, REACT_APP_MAIN_URL } from '../config'

function DeleteComment(){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {id} = useParams();
  const navigate = useNavigate();
  const { supabase_for_use: supabase, session, user } = useContext(AuthContext);
  const handledelete = () => {
  // const [data,setData] = useState([]);
    console.log('blog id',id)
    axios.post(`${REACT_APP_BASE_API_URL}/deleteblog`, {
      blog: id
    })
    .then(res => {
      alert('delete your blog successfully')
      window.location.href = `${REACT_APP_MAIN_URL}/profile`;
    })
    .catch((err) => {
        alert(err)
    })
  }

  useState(() => {
    
  })
  

  return (
    <>
      <BsFillTrashFill size={20} onClick={handleShow}/>
      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header className='modal-header'closeButton> */}
        <Modal.Header className='modal-header' style={{ backgroundColor: 'rgb(64, 102, 156)' }}>
            <h1 className='text-wraning'>Warning!</h1>
            <BsXLg size={25} id="icon-close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <p className='text-delete'>Confirm Delete?</p>
          </Modal.Body>
        <div className='btn_blog'>
          <button className='Close_btn' onClick={handleClose}>
            Close
          </button>
          <button className='Delete_btn'onClick={handledelete}>
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteComment;