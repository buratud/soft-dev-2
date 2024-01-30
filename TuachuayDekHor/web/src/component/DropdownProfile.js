import React, { useRef, useState,useContext } from "react";
import "./DropdownProfile.scoped.css";
import {BiLogOut,BiUserCircle} from "react-icons/bi";
import Avatar from "./Avatar";
import { Link,useNavigate } from "react-router-dom";
import { General } from '../App';
import Profile_img from '../../src/Assets/person-circle-outline.svg'





function DropdownProfile(){
    const {supabase_for_use : supabase,session,user} = useContext(General);
    const navigate = useNavigate();

    const sign__out = () =>{
        supabase.auth.signOut();
    }

    const[open,setOpen] = useState(false)

    const menuRef = useRef();
    const imgRef = useRef();

    window.addEventListener('click', (e)=>{
        if(e.target !== menuRef.current && e.target !== imgRef.current){
            setOpen(false);
        }
    })
    return(
        <div className="profile">
           <img ref={imgRef} src={user?.user_metadata.avatar_url??Profile_img} alt="" className="User__profile" onClick={()=>setOpen(!open)} />
           {open && 
           <div className="menus" ref={menuRef} onClick={()=>setOpen(!open)}>
                <ul className="menu_wrapper">
                    
                    <Link to={`/profile/${user?.id}`}><li><BiUserCircle className="icon-profile" size={25}/>My Profile</li></Link>
                    <Link to={'/home'}><li><BiLogOut size={25} className="icon-logOut"/><a href="/home" id="logout" onClick={sign__out}>Log out</a></li></Link>
                    
                </ul>
           </div>
           }
        </div>

        
    );
};


export default DropdownProfile;