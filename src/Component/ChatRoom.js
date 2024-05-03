import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Createroom from './CreateRoom';
import { useParams } from 'react-router-dom';

function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]); // Updated to useState
  const { roomId } = useParams();

  useEffect(() => {
    const username = localStorage.getItem('userName');
    const socketUrl = `http://10.10.10.80:8085?room=${roomId}&username=${username}`;
    
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
      setMessageData(prevMessages => [...prevMessages, data]); // Update messageData
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending message to server:', message);
    socket.emit('send_message', message);
    setMessage('');
  };

  return (
    <div>
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
    </div>
  );
}

export default ChatRoom;
