import { useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
let socket;

const useSocket = (event, handler) => {
  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_URL);
    }
    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, [event, handler]);
};

export default useSocket;
