// useSocketService.js
import { useState, useEffect } from 'react';
import * as io from 'socket.io-client';

function useSocketService() {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const room = localStorage.getItem('roomId');
    const username = localStorage.getItem('userName');
    const socketUrl = "http://10.10.10.80:8085?room=1&username=sai";
    
    // Create a Netty Socket.IO client instance
    const newSocket = io(socketUrl, {
      transports: ['websocket'], // Ensure to use WebSocket transport
      upgrade: false // Disable upgrade option for WebSocket
    });
    console.log("created socket")

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
  }, []);

  const sendMessage = (data) => {
    console.log('Sending message to server:', data);
    socket.emit('send_message', data);
  };

  return {
    connectionStatus,
    receivedMessage,
    sendMessage,
  };
}

export default useSocketService;
