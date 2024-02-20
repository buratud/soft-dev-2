import React,{useState,useContext,useEffect} from 'react'
import './CheckDelete.scoped.css'
import { useParams,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {BsFillTrashFill,BsXLg} from "react-icons/bs";
import axios from 'axios';
import { AuthContext } from '../App';
import { REACT_APP_BASE_API_URL } from '../config'

function CheckDelete(){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {id} = useParams();
  const navigate = useNavigate();
  const { supabase_for_use: supabase, session, user } = useContext(AuthContext);
  const handledelete = () => {
  // const [data,setData] = useState([]);
    axios.delete(`${REACT_APP_BASE_API_URL}/deletepost?id_post=` + id)
    .then(res => {
      navigate(`/profile/${user?.id}`)
    })
    .catch((err) => {
        alert(err)
    })
  }

  

  return (
    <>
      <BsFillTrashFill size={25} onClick={handleShow}/>
      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header className='modal-header'closeButton> */}
        <Modal.Header className='modal-header'>
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

export default CheckDelete;