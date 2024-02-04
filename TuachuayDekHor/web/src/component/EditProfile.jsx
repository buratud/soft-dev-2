import React, { useState,useContext, useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./EditProfile.scoped.css";
import axios from 'axios';
import { General } from '../App';
import { REACT_APP_BASE_API_URL } from '../config'

function Editprofile(props) {
    const{supabase_for_use : supabase,user} = useContext(General);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    async function handleUpdate(event) {
        event.preventDefault();
        const newName = event.target[0].value;
        // const newDescribe = event.target[1].value;
        console.log(event)
        const file = event.target[1].files[0]
        const image_title =`${user?.id}.${file.type.replace(/(.*)\//g, '')}`
        const { error } = await supabase
        .storage
        .from('avatars')
        .upload(image_title, file, {
            cacheControl: '3600',
            upsert: true
        })
        if (error){
            return alert(error)
        }
        const { data:{publicUrl:image_link} } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(image_title)

        axios.post(`${REACT_APP_BASE_API_URL}/edit_profile`,{
            id: user.id,
            username: newName,
            email: user.email,
            avatar_url: image_link,
        })
        .then(res=>{
            supabase.auth.refreshSession();
            // props.setName(newName);
        })
        .catch((err) => {
            alert(err)
        })


        
        
        handleClose();
    }

    return (
        <>
            <button className="edit__profile" onClick={handleShow}>
                Edit Profile
            </button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="editmodal" onSubmit={handleUpdate}>
                        <div className="wrapper">
                            <div className="head">
                                <p className="head__text">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                                <div className='Input__text'>
                                    <div className='text__label'>
                                        <label for="username" className='block text-sm font-medium leading-6 text-gray-900'>
                                            Username
                                        </label>
                                        <div className='text__Input'>
                                            <div className='Input__box'>
                                                <input type="text" name='username' id='username' className='input_user' defaultValue={props.name} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="input__Image">
                                    <label for="photo" class="Photo__head">Photo</label>
                                    <div class="photo__body">
                                        <input 
                                            type="file"
                                            id='Photo' 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='close-btn' onClick={handleClose}>
                        Close
                    </Button>
                    <button type='submit' className="Update-btn" form='editmodal'>
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
            {/* <Modal show={show} onHide={handleClose} animation={false} dialogClassName="modal-90w" >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="editmodal" onSubmit={handleUpdate}>
                        <div className="wrapper space-y-12">
                            <div className="head">
                                <p className="head__text">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                                <div className='Input__text'>
                                    <div className='text__label'>
                                        <label for="username" className='block text-sm font-medium leading-6 text-gray-900'>
                                            Username
                                        </label>
                                        <div className='text__Input'>
                                            <div className='Input__box'>
                                                <input type="text" name='username' id='username' className='input_user' defaultValue={props.name} />
                                            </div>
                                        </div>

                                        <div className='descisbe__text'>
                                            <label for="descisbe" className='descisbe'>Describe about yoursellf</label>
                                            <div className='describe__box'>
                                                <textarea
                                                    name="describe" id="describe"
                                                    rows="3" className='describe__box__2'
                                                    placeholder='Write a few sentences about yourself...'
                                                    defaultValue={props.describe} >
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="input__Image">
                                    <label for="photo" class="Photo__head">Photo</label>
                                    <div class="photo__body">
                                        <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                        </svg>
                                        <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button type='submit' className="" form='editmodal'>
                        Update
                    </button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export default Editprofile;