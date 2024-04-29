import React, { useState, useEffect, useRef} from 'react';
import Header from './Header';
import { Box } from '@mui/material';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Send from '../Asserts/send.png';
const ChatRoom = ({ roomName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { sender: 'Me', text: newMessage, time: currentTime}]);
      setNewMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-room">
      <Header />
      
      <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
      >
      <Box
          backgroundColor="#f2f2f2"
          height="80%"
          width="95%"
          marginTop='2%'
          marginBottom='2%'
          display="flex"
          flexDirection="row"
          p={2}
          borderRadius={6}
          sx={{ border: '1px solid white' }}
      >
      
      <Box
        backgroundColor="white"
        height="70vh"
        width="70%"
        marginTop="2%"
        marginBottom="2%"
        marginLeft="1%"
        borderRadius="3%"
        position="relative"
        overflow="auto"
      >

        <div
          style={{ 
            marginBottom: '10%', 
            marginTop: '10%',
            marginLeft: '5%',
            marginRight: '5%',
            color: 'white', 
            backgroundColor: 'rgb(60,179,113)',
            padding: '2%',
            width: "fit-content",
            borderRadius: "15px 40px 40px",
            padding: "1%"
            }}
        >
          <span>Hi I am the Server</span>
        </div>
        {messages.map((message, index) => (
              <div
              key={index}
              style={{
                maxWidth: '40%',
                minWidth: '10%',
                marginBottom: '1%',
                marginTop: '1%',
                marginLeft: message.sender === 'Me' ? 'auto' : '5%',
                marginRight: message.sender === 'Me' ? '5%' : 'auto',
                color: 'white',
                backgroundColor: message.sender === 'Me' ? '#2196f3' : 'grey',
                padding: '2%',
                width: 'fit-content',
                borderRadius: message.sender === 'Me' ? '40px 40px 15px' : '40px 15px 40px',
                textAlign: message.sender === 'Me' ? 'left' : 'left'
              }}
              >
                <strong>{message.sender}: </strong>
                <span>{message.text}</span>
                <p style={{ fontSize: '0.6rem', color: 'black', textAlign: 'right', margin: '0' }}>{message.time}</p>
                <div ref={messagesEndRef} />
              </div>
         ))}

        <div
          style={{ 
            marginBottom: '10%', 
            marginTop: '10%',
            marginLeft: '5%',
            marginRight: '5%',
            color: 'white', 
            backgroundColor: 'rgb(60,179,113)',
            width: "fit-content",
            borderRadius: "15px 40px 40px",
            padding: "1%"
            }}
        >
          <span>Hi I am the Server</span>
        </div>

      </Box>

      <Box
        backgroundColor="black"
        height="70vh"
        width="27%"
        marginTop="2%"
        marginBottom="2%"
        marginRight="-5%"
        borderRadius="6%"
        marginLeft="2%"
        position="relative"
      >

        <h2 style={{color:"white", textAlign:"center"}}>{roomName}</h2>
        <div style={{position: "absolute", bottom: 0, width:"100%", marginLeft:"3%", marginBottom: "5%"}}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          style={{padding: '3%', paddingRight:'20%', borderRadius: '40px 40px'}}
        />
        <Button variant="contained" color="success" onClick={handleSendMessage} sx={{padding:"2.4%", marginLeft:"3%", borderRadius: "40px 40px"}}>
            <img src={Send} alt='send' height={20}/>
        </Button>

        </div>
      </Box>

      </Box>
      </Box>
    </div>
  );
};

export default ChatRoom;

