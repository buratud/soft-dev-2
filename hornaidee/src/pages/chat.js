import { useEffect, useState } from "react";
import MessageOwn from "../components/meesageOwn";
import Message from "../components/message";
import Navbar from "../components/nav";
import PersonCard from "../components/person_card";
import "./chat.scoped.css"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";


function Chat(){
    // const student_id = 1;
    const dorm_id = 2;
    const location = useLocation();
    const { userID : student_id,chanel} = useParams();
    const [chatData , setChatData] = useState([]);
    const [personData , setPersonData] = useState([]);
    const [searchFilter, setsearchFilter] = useState("");
    const navi = useNavigate();
    const [textBox , setTextBox] = useState("");
    const socket = io.connect("http://localhost:3001")



    useEffect(() => {
        console.log("chanel : "+chanel)
        socket.emit("join_chanel",chanel);
    },[chanel]);

    const sendMessage = () => {
        const receiver_id = personData.filter((person) => {
            return chanel == person.chanel_id
        }).map((person) =>{
            return person.member1 == student_id ? person.member2:person.member1
        })
        socket.emit("send message",{
            chanel:chanel,
            sender_id:student_id,
            receiver_id:receiver_id[0],
            message:textBox
        })
        setTextBox("")
    }
    useEffect(() => {
        socket.on("receive_message",(result) => {
            console.log("receive")
            setChatData(result)
        })
    },[socket])

    useEffect(() => {
        axios.get("http://localhost:3001/chat/"+chanel).then((response) =>{
        setChatData(response.data);
        }).catch((err) =>{
            console.log(err)
            navi("/error")
        });
        axios.get("http://localhost:3001/person/"+ student_id).then((response) =>{
                const person_data = response.data.filter((person) => {
                const name = person.member1 == student_id ? person.user2:person.user1
                return name.includes(searchFilter);
            })
        setPersonData(person_data);
        }).catch((err) =>{
            console.log(err)
            navi("/error")
        });
      },[location,searchFilter]);

    const messages = chatData.map((message,index)=> {
                if(message.sender_id == student_id){
                    return  <MessageOwn key={index} data={message}></MessageOwn>   
                }else{
                    return <Message key={index} data={message}></Message>   
                }})
    
    const person_cards = personData.map((person,index) => {
        const name = person.member1 == student_id ? person.user2:person.user1
        const profile = person.member1 == student_id ? person.profile2:person.profile1
        return <Link to={"/chat/"+student_id+'/'+person.chanel_id} key={index}>
            <PersonCard name={name} profile={profile}></PersonCard> 
        </Link>
    })

    const chat_name = personData.filter((person) => {
        return chanel == person.chanel_id
    }).map((person) =>{
        return person.member1 == student_id ? person.user2:person.user1
    })



    return(
        <div className="h-screen box-border">
            <Navbar></Navbar>
            <div className="flex h">
                <div className="left w-1/3 h-full border-black border-solid border-r">
                    <div className="head text-white bg-brown h-14 flex items-center p-4 font-bold text-3xl">Chat</div>
                    <div className="search m-auto justify-center flex my-4">
                        <input
                        className="border-black border-solid border rounded-xl w-5/6 h-8 p-4"
                        type="text"
                        value={searchFilter}
                        onChange={(e) => {setsearchFilter(e.target.value)}}
                        />
                    </div>
                    <div className="people overflow-scroll">
                        {person_cards}
                    </div>
                </div>
                <div className="chat w-2/3 ">
                    <div className="name text-black font-normal bg-brown h-14 flex items-center p-4 text-3xl">{chat_name}</div>
                    <div className="chat overflow-scroll">

                        {messages}

                    </div>
                    <div className="input flex border-black border-solid border-t h-16">
                        <input 
                        className="h-16 p-5 w-full" 
                        type="text" 
                        placeholder="Type somthing..." 
                        value={textBox} 
                        onChange={(event) => {
                            setTextBox(event.target.value)
                        }}/>
                        <img src="\img\Telegram App.png" onClick={sendMessage}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Chat;