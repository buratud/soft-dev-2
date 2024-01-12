import { ArrowDropUp,ArrowDropDown } from '@mui/icons-material';
import { MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { userContext } from '../App';
function Status(porps){
    const {ticketStatus,changeTicketStatus  } = porps
    const { user,setUser } = useContext(userContext)
    const color_status = () => {
        if (ticketStatus == 'completed'){
            return "#36B37E"
        }else if(ticketStatus == 'on hold'){
            return "#FFAB00"
        }else if(ticketStatus == 'in progress'){
            return "#00B8D9"
        }}
    if (user.actor === "admin"){
        return(
            <Select
                size='sm'
                className='h-10 w-full flex'
                value={ticketStatus}
                onChange={changeTicketStatus}
                >
                    <MenuItem value="completed"><div className="flex  items-center">
                        <div className="w-3 h-3 rounded-full mr-2 bg-[#36B37E]"/>completed</div>
                    </MenuItem>
                    <MenuItem value="on hold"><div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2 bg-[#FFAB00]"/>on hold</div>
                    </MenuItem>
                    <MenuItem value="in progress"><div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2 bg-[#00B8D9]"/>in progress</div>
                    </MenuItem>
                </Select>
        )
        
        
    }else{
        return(
            <div className='flex items-center justify-center'>
                <div className={`w-3 h-3 rounded-full mr-2 bg-[${color_status()}]`}/>{ticketStatus}
            </div>
        )
    }
}



function Message(props) {
    const {message} = props

    return(
        <div className=' border-b border-dashed border-gray'>
            <p className=' font-medium'>{message.sender} :</p>
            <p className='ml-4'>{message.message_text}</p>
        </div>
    )
}


function Ticket(props) {
    const { user,setUser } = useContext(userContext)
    const socket = io.connect("http://localhost:3001")
    const navi = useNavigate()
    const {ticket} = props
    const [ status , setStatus ] = useState(false)
    const [ ticketData , setticketData ] = useState([])
    const [ ticketMessage , setticketMessage ] = useState("")
    const [ message , setMessage ] = useState("")
    const [ticketStatus , setTicketStatus] = useState("")
    const open = () => setStatus(!status)
    console.log(ticket.ticket_id,ticket.status)
    useEffect(() => {
        const url = "http://localhost:3001/ticketMessage"
        axios.get(url,{
            params: {
                ticket_id : ticket.ticket_id,
            }
          }).then((response) =>{
        setticketData(response.data);
        }).catch((err) =>{
            console.log(err)
            navi("/error")
        });

        socket.emit("join_ticket",ticket.ticket_id);
    },[ticket]);

    useEffect(() => {
        socket.on("receive message ticket",(result) => {
            console.log("receive")
            setticketData(result)
        })
    },[socket,ticket])

    useEffect(() => setTicketStatus(ticket.status),[ticket])

    const sendMessage = () => {
        var id = 0
        if(ticket.user_id === user.id){
            id = ticket.user_id
        }
        
        socket.emit("send ticket message",{
            ticket_id: ticket.ticket_id,
            sender_id: user.id,
            receiver_id: id,
            message:message
        })
        setMessage("")
    }

    useEffect(() => {
        setticketMessage(
            ticketData
            .map((ticket, index) => {
              return (
                <Message key={index} message={ticket}/>
              );
            })
        );

      }, [ticketData]);

    

    const changeTicketStatus = (e) =>{
        console.log(e.target.value)
        axios.put("http://localhost:3001/update_ticket_status",
        {
            new_status:e.target.value,
            ticket_id:ticket.ticket_id
        })
        setTicketStatus(e.target.value)
    }

    
    return (
        <div className='w-full border-b border-gray border-solid'>
            <div className="head h-10">
                <div className="grid" style={{gridTemplateColumns:"1fr 4fr 2fr 2fr 1fr"}}>
                    <p className=" text-center">{ticket.ticket_id}</p>
                    <p className="ml-4">{ticket.subject}</p>
                    <p className='mx-2'>
                        {/* <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor:color_status()}}/>
                        {ticket.status} */}
                        {/* <Select
                        size='sm'
                        className='h-10 w-full flex'
                        value={ticketStatus}
                        onChange={changeTicketStatus}
                        >
                            <MenuItem value="completed"><div className="flex  items-center">
                                <div className="w-3 h-3 rounded-full mr-2 bg-[#36B37E]"/>completed</div>
                            </MenuItem>
                            <MenuItem value="on hold"><div className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-2 bg-[#FFAB00]"/>on hold</div>
                            </MenuItem>
                            <MenuItem value="in progress"><div className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-2 bg-[#00B8D9]"/>in progress</div>
                            </MenuItem>
                        </Select> */}
                        <Status ticketStatus={ticketStatus} changeTicketStatus={changeTicketStatus} />
                    </p>
                    <p className=" text-center">{ticket.update.slice(0,10)}</p>
                    <ArrowDropDown onClick={open} style={{transform:status?"scale(-1)":"scale(1)"}}></ArrowDropDown>
                </div>
            </div>
            <div className="detail border-gray border-dashed" style={{borderTopWidth:status?"1px":"0"}}>
                {status?ticketMessage:undefined}
                <div className="send w-full flex" style={{height:status?"auto":"0"}}>
                    <input
                        className="mr-2 my-1 h-[34px]  p-2  border border-solid border-black rounded"
                        style={{height:status?"auto":"0",width:status?"100%":"0",opacity:status?"1":"0"}}
                        type="text"
                        placeholder="send message...."
                        value={message}
                        onChange={(e) => {setMessage(e.target.value)}}
                    />
                    <img
                    className='h-11'
                    style={{opacity:status?"1":"0"}}
                    src="\img\Telegram App.png"
                    onClick={sendMessage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Ticket;