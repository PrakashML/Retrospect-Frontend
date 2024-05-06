import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Header from './Header'


function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]); // Updated to useState
  const { roomId } = useParams();
  const username = localStorage.getItem('userName');
  const [goodMessages ,setGoodMessages] = useState([]);
  const [goodMessageText, setGoodMessageText] = useState('');
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [commonMessageText, setCommonMessageText] = useState('');
  const [badMessages, setBadMessages] = useState([]);
  const [badMessageText, setBadMessageText] = useState('');
  const [posMessages, setPosMessages]  = useState([]);
  const [posMessageText, setPosMessageText] = useState('');
  const [blunderMessages, setBlunderMessages] = useState([]);
  const [blunderMessageText, setBlunderMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const username = localStorage.getItem('userName');
    const socketUrl = `http://192.168.0.228:8085?room=${roomId}&username=${username}`;
    
    const newSocket = io(socketUrl, {
      transports: ['websocket'],
      upgrade: false
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setConnectionStatus(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnectionStatus(false);
    });

    newSocket.on('receive_message', (data) => {
      console.log('Received message from server:', data);
      setReceivedMessage(data);
      
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e, contentType) => {
    e.preventDefault();
    console.log('Sending message to server:', message);
    const data ={
      "room": roomId,
      "username": username,
      "content": message,
      "contentType": 'message'
  }
    socket.emit('message', data);
    setMessage('');
  };

  useEffect(() => {
    if (receivedMessage) {
      switch (receivedMessage.contentType) {
        case 'Good':
          setGoodMessages(prevMessages => [...prevMessages, receivedMessage]);
          break;
        case 'Bad':
          setBadMessages(prevMessages => [...prevMessages, receivedMessage]);
          break;
        case 'Pos':
          setPosMessages(prevMessages => [...prevMessages, receivedMessage]);
          break;
        case 'Blunder':
          setBlunderMessages(prevMessages => [...prevMessages, receivedMessage]);
          break;
        default:
          break;
      }
    }
  }, [receivedMessage]);


  const handleSendMessage = (message, contentType) => {
    const data = {
      content: message,
      room: roomId,
      username,
      contentType
    };
    sendMessage(data);
    switch (contentType) {
      case 'Common':
        setCommonMessageText('');
        break;
      case 'Good':
        setGoodMessageText('');
        break;
      case 'Bad':
        setBadMessageText('');
        break;
      case 'Pos':
        setPosMessageText('');
        break;
      case 'Blunder':
        setBlunderMessageText('');
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageData, goodMessages, badMessages, posMessages, blunderMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (data) => {
    console.log('Sending message to server:', data);
    socket.emit('message', data);
    inputRef.current.focus();
  };


  // different new

  const [tab, setTab] = useState("CHATROOM");


  return (
  
    <div className="container">
      <Header/>
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                </ul>
                <ul>
                    <li onClick={()=>{setTab("Good")}} className={`member ${tab==="Good" && "active"}`}>What Went Good</li>
                </ul>
                <ul>
                    <li onClick={()=>{setTab("Bad")}} className={`member ${tab==="Bad" && "active"}`}>What Went Wrong</li>
                </ul>
                <ul>
                    <li onClick={()=>{setTab("Pos")}} className={`member ${tab==="Pos" && "active"}`}>Positives</li>
                </ul>
                <ul>
                    <li onClick={()=>{setTab("Blunder")}} className={`member ${tab==="Blunder" && "active"}`}>Blunders</li>
                </ul>
            </div>


            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {messageData.map((msg, index)=>(
                        <li className={`message ${username === username} && self`} key={index}>
                            {/* {chat.senderName !== userData.username && <div className="avatar">Incoming</div>} */}
                            <div className="message-data">
                                <p key={index}>{msg.content}</p>
                            </div>
                            {<div className="avatar self">{username}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={message} onChange={handleChange} /> 
                    <button type="button" className="send-button" onClick={handleSubmit}>send</button>
                </div>
            </div>}

            {tab==="Good" && <div className="chat-content">
                <ul className="chat-messages">
                    {goodMessages.map((msg, index)=>(
                        <li className={`message ${username === username && "self"}`} key={index}>
                            {/* {chat.senderName !== userData.username && <div className="avatar">Incoming</div>} */}
                            <div className="message-data">
                                <p key={index}>{msg.content}</p>
                            </div>
                            {<div className="avatar self">{msg.username}</div>}
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={goodMessageText} onChange={(e) => setGoodMessageText(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef}/> 
                    <button type="button" className="send-button" onClick={() => handleSendMessage(goodMessageText, 'Good')}>send</button>
                </div>
            </div>}

            {tab==="Bad" && <div className="chat-content">
                <ul className="chat-messages">
                    {badMessages.map((msg, index)=>(
                        <li className={`message ${username === username && "self"}`} key={index}>
                            {/* {chat.senderName !== userData.username && <div className="avatar">Incoming</div>} */}
                            <div className="message-data">
                                <p key={index}>{msg.content}</p>
                            </div>
                            {<div className="avatar self">{msg.username}</div>}
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={badMessageText} onChange={(e) => setBadMessageText(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef}/> 
                    <button type="button" className="send-button" onClick={() => handleSendMessage(badMessageText, 'Bad')}>send</button>
                </div>
            </div>}

            {tab==="Pos" && <div className="chat-content">
                <ul className="chat-messages">
                    {posMessages.map((msg, index)=>(
                        <li className={`message ${username === username && "self"}`} key={index}>
                            {/* {chat.senderName !== userData.username && <div className="avatar">Incoming</div>} */}
                            <div className="message-data">
                                <p key={index}>{msg.content}</p>
                            </div>
                            {<div className="avatar self">{msg.username}</div>}
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={posMessageText} onChange={(e) => setPosMessageText(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef}/> 
                    <button type="button" className="send-button" onClick={() => handleSendMessage(posMessageText, 'Pos')}>send</button>
                </div>
            </div>}

            {tab==="Blunder" && <div className="chat-content">
                <ul className="chat-messages">
                    {blunderMessages.map((msg, index)=>(
                        <li className={`message ${username === username && "self"}`} key={index}>
                            {/* {chat.senderName !== userData.username && <div className="avatar">Incoming</div>} */}
                            <div className="message-data">
                                <p key={index}>{msg.content}</p>
                            </div>
                            {<div className="avatar self">{msg.username}</div>}
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={blunderMessageText} onChange={(e) => setBlunderMessageText(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef}/> 
                    <button type="button" className="send-button" onClick={() => handleSendMessage(blunderMessageText, 'Blunder')}>send</button>
                </div>
            </div>}

        </div>
        
        </div>
  );
}

export default ChatRoom;


{/* <div>
      <h2>Socket Connection Status: {connectionStatus ? 'Connected' : 'Disconnected'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} placeholder="Enter message" />
        <button type="submit">Send</button>
      </form>
      <div>
        <h3>Received Messages:</h3>
        {messageData.map((msg, index) => (
          <p key={index}>{msg.content}</p> // Display each message
        ))}
      </div>
    </div> */}