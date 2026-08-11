import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const socketUrl =
        import.meta.env.VITE_SOCKET_URL ||
        (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.startsWith('http')
          ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
          : window.location.origin.includes('5173')
          ? 'http://localhost:5000'
          : window.location.origin);

      const newSocket = io(socketUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
      });

      newSocket.on('connect', () => {
        setConnected(true);
        newSocket.emit('join', user._id);
      });

      newSocket.on('disconnect', () => {
        setConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
    }
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
