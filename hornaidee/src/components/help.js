import { useContext, useState } from "react"
import Bt1 from "./bt1"
import axios from "axios"
import { userContext } from "../App"

function Help(){
    const [subject , setSubject] = useState("")
    const [message , setMessage] = useState("")
    const [Clickhelp, setClickhelp] = useState([false,{height:"0px",width:"0px",opacity:"0"}])
    const {user} = useContext(userContext)
    const onClikehelp = () => {
        if (Clickhelp[0]){
            setClickhelp([false,{height:"0px",width:"0px",opacity:"0"}])
        }else{
            setClickhelp([true,{height:"200px",width:"20%",opacity:"1"}])
        }
    }
    const creat_ticket = () => {
        axios.post("http://localhost:3001/creat_ticket",{
            subject : subject,
            message : message,
            user_id : user.id
        })
        setSubject("")
        setMessage("")
    }
    if (!!user.actor){
        return (
            <div>
                <div  className="fixed right-6 bottom-20 box-border transition-all" style={Clickhelp[1]}>
                    <div className="help_box h-full w-full border-2 border-solid border-black rounded-lg relative right-16 bg-white p-3 ">
                        <p className="mb-1">Do you need help?</p>
                        <input placeholder="title.." value={subject} onChange={(e)=>{setSubject(e.target.value)}} className="border border-solid border-gray-500 rounded-lg w-full mb-2 p-1"></input>
                        <textarea placeholder="type someting ..." value={message} onChange={(e)=>{setMessage(e.target.value)}} className="p-2 border border-solid border-gray-500 rounded-lg h-[40%] w-full resize-none">
                        </textarea>
                        <Bt1 onChange={creat_ticket}>send</Bt1>
                    </div>
                </div>
                    <img onClick={onClikehelp} src="/img/help.png" className="w-16 h-16 ml-auto fixed right-6 bottom-4"/>
            </div>
        )
    }
}

export default Help