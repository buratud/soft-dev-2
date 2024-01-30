
import "./nav.scoped.css"
import Bt1 from "./bt1";
import Bt2 from "./bt2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";


function Actor(){
    const navi = useNavigate()
    const { user,setUser } = useContext(userContext)
    console.log(user)
    if(!user.actor){
        return(
            <div>
                <Link to="/login"><Bt1 classname="mr-[10px]">login</Bt1></Link>
                <Link to="/register"><Bt2 classname="mr-[10px]">register</Bt2></Link>
            </div>
        )
    }else if(user.actor === "dorm" || user.actor === "user"){
        return(
            <div className="flex items-center">
                <Link to="/help" className="mr-[10px]"><p className=" text-lg">help</p></Link>
                <div className="line mr-[10px]"></div>
                <Link to={"/chat/"+user.id} className="mr-[10px]"><p className=" text-lg">chat</p></Link>
                <div className="line mr-[10px]"></div>
                <img className="w-14 h-14 rounded-[50%] object-cover mr-3" src={user.profile}/>
                <div className="mr-[10px]">
                    <div className=" text-right mb-1">
                        user : {user.username}
                    </div>
                    <Bt1  Width="75px" Height="25px" onChange={()=>{
                        setUser({actor:null})
                        navi("/login")
                    }}>logout</Bt1>
                </div> 
            </div>
        )
    }else if(user.actor = "admin"){
        return(
            <div className="flex items-center">
                <Link to="/help" className="mr-[10px]"><p className=" text-lg">help</p></Link>
                <div className="line mr-[10px]"></div>
                <img className="w-14 h-14 rounded-[50%] object-cover mr-3" src={user.profile}/>
                <div className="mr-[10px]">
                    <div className=" text-right mb-1">
                        user : {user.username}
                    </div>
                    <Bt1  Width="75px" Height="25px" onChange={()=>{
                        setUser({actor:null})
                        navi("/login")
                    }}>logout</Bt1>
                </div> 
            </div>
        )
    }
    
}




function Navbar(){
    const { user,setUser } = useContext(userContext)
    const [ linklogo ,setLinklogo] = useState("/")
    useEffect(() => {
        axios("http://localhost:3001/dorm_id",{
            params : {
              username : user.username
            }}).then((response) => {
              console.log(response.data)
              if(!!response.data[0]){
                setLinklogo("/manage/"+response.data[0].dorm_id)
              }
            })
    },[user])
    return(
        <div className="nav w-full bg-cream">
            <div className="container h-full items-center m-auto flex">
                <div className="left_nav items-center">
                    <Link to={linklogo}> <img className=" w-36" src="/img/logo_hornaid.png"/></Link>
                    
                </div>
                <div className="right_nav items-center">
                    
                    <Actor></Actor>
                   
                </div>
            </div>
        </div>
    )
}
export default Navbar;