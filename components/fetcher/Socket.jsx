"use client";
import { createContext, useState, useEffect } from "react";
import { cache } from "react";
import io from "socket.io-client";

export const SocketContext = createContext(null);

const getSocket = cache(() => {
  const newSocket = io("http://localhost:3001/");
  return newSocket;
});

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = getSocket();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
