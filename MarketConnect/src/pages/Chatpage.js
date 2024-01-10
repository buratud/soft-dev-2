import React, { useState, useEffect } from 'react';
import './Chatpage.scoped.css';
import io from 'socket.io-client';

function Chatpage() {
  const [socket, setSocket] = useState(null);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'NongWin' },
    { id: 2, name: 'MarkMuayHuaMin' },
    { id: 3, name: 'GimJuay' }
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // สร้างการเชื่อมต่อ WebSocket ไปยังเซิร์ฟเวอร์ WebSocket
    const socket = io('http://localhost:3000/chatpage');
    setSocket(socket);

    // ตอนถอดเชื่อมต่อ WebSocket
    return () => {
      socket.disconnect();
    };
  }, []);

  // ส่วนของการส่งข้อความผ่าน WebSocket
  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && socket && selectedContact) {
      // สร้างข้อความที่จะส่ง


      const messageToSend = {
        text: newMessage,
        sender: 'PatcharaPetch', // คุณอาจต้องใช้ข้อมูลจากการล็อกอินของผู้ใช้ที่คุณเก็บไว้
        timestamp: new Date().toLocaleString(),
        receiver: selectedContact.id,
      };

      // ส่งข้อมูลผ่าน WebSocket
      socket.emit('message', messageToSend);

      // เพิ่มข้อความลงใน messages state ด้วยตัวเอง
      setMessages([...messages, messageToSend]);

      // ล้างข้อความใน input
      setNewMessage('');

    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="chat-container">
      <div className="contacts">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact ${selectedContact && selectedContact.id === contact.id ? 'active' : ''}`}
            onClick={() => handleContactClick(contact)}
          >
            {contact.name}
          </div>
        ))}
      </div>
      <div className="chat">
        {selectedContact ? (
          <div className="chat-header">
            <div className="contact-name">{selectedContact.name}</div>
          </div>
        ) : (
          <div className="chat-header">
            <div className="no-contact">Choose Contact to Start Chat</div>
          </div>
        )}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
              <span className="message-sender">{message.sender}</span>: <span className="message-text">{message.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
