import React, { useState } from "react";
import "./PopChat.scoped.css";

export const PopChat = (props) => {
  let hide = {
    display: "none",
  };
  let show = {
    display: "block",
  };
  let textRef = React.createRef();
  const { messages } = props;

  const [chatopen, setChatopen] = useState(false);
  const toggle = (e) => {
    setChatopen(!chatopen);
  };

  const handleSend = (e) => {
    const get = props.getMessage;
    get(textRef.current.value);
  };

  return (
    <div id='chatCon'>
      <div className="chat-box" style={chatopen ? show : hide}>
    <div className="header">Chat</div>
    <div className="msg-area">
      <div className='box1'>
        <img src="people.png" alt="" />
        <div className='text1'>ไงเพื่อน เมื่อคืนได้นอนกี่โมง ?</div>
      </div>
      <div className='box2'>
        <div className='text2'>เมื่อคืนไม่ได้นอนเลยเพื่อน</div>
      </div>
      <div className='box3'>
        <img src="people.png" alt="" />
        <div className='text3'>อ้าว เขียนเว็ปเสร็จแล้วหนิ ทำไมไม่นอน</div>
      </div>
      <div className='box4'>
        <div className='text4'>นั่งทำหน้า Chat นี่ไงเพื่อน มาช่วยกูไหม</div>
      </div>
      <div className='box5'>
        <img src="people.png" alt="" />
        <label htmlFor="">markmin Leave Chat</label>
      </div>
      
      
      {
        messages.map((msg, i) => (
          i%2 ? (
          <p className="right"><span>{ msg }</span></p>
          ) : (
            <p className="left"><span>{ msg }</span></p>
          )
        ))
      }

    </div>
    <div className="footer">
      <input type="text"  ref={textRef} />
      <button onClick={handleSend} >Send</button>
    </div>
  </div>
    <div className="pop">
      <p><img onClick={toggle} src="/chat6.png" alt="" /></p>
    </div>
    </div>
  )
}

export default PopChat
