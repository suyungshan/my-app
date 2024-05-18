"use client";
import { createContext, useState, useEffect } from "react";
import { cache } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(
      window.location.host === "https://gameplay.zeabur.app/"
        ? "https://one0-hit-game-backend.onrender.com/"
        : "http://localhost:3001"
    );

    setSocket(newSocket);

    newSocket.on("disconnect", () => {
      // 斷開的話 2秒後重新連線
      setTimeout(() => {
        newSocket.connect();
      }, 2000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  if (socket) {
    socket.on("redirectToGame", () => {
      // Check if the current URL is /dev/intro
      if (window.location.pathname === "/dev/intro") {
        // Redirect to /dev/rank
        window.location.href = "/dev/rank";
      } else {
        // Redirect to /player/game for other URLs
        router.push("/player/game");
      }
    });
    // socket.on("allMessage", (data) => {
    //   dispatch(playerDataActions.updateRecord(data));
    // });
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
