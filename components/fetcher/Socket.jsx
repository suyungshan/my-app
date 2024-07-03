"use client";
import { createContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const isConnected = useRef(false);
  const hasRunTest = useRef(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!isConnected.current) {
      if (!hasRunTest.current) {
        // startLoadTest("http://localhost:3001");
        // startLoadTest("https://one0-hit-game-backend.onrender.com/");
        hasRunTest.current = true;
      }

      // socketRef.current = io("http://localhost:3001");
      socketRef.current = io("https://one0-hit-game-backend.onrender.com/");

      socketRef.current.on("connect", () => {
        setSocket(socketRef.current);
        isConnected.current = true;
        console.log("WebSocket 連線成功");
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("連接錯誤:", error);
        isConnected.current = false;
      });

      socketRef.current.on("disconnect", () => {
        console.log("斷開連接");
        isConnected.current = false;
        // 2秒後嘗試重新連接
        setTimeout(() => {
          socketRef.current.connect();
        }, 2000);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        isConnected.current = false;
      }
    };
  }, []); // 空依賴數組，確保只執行一次

  useEffect(() => {
    if (socket) {
      socket.on("redirectToGame", () => {
        if (window.location.pathname === "/dev/intro") {
          window.location.href = "/dev/rank";
        } else {
          router.push("/player/game");
        }
      });

      socket.on("allMessage", (data) => {
        dispatch(playerDataActions.updateRecord(data));
      });
    }
  }, [socket, router, dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

// 壓力測試函數
const startLoadTest = (baseUrl) => {
  const concurrency = 10; // 並發連線數，增加到15以測試超過限制的情況
  let totalConnections = 0;
  let failedConnections = 0;

  const startTime = new Date().getTime();

  // 建立指定數量的 WebSocket 連線
  for (let i = 0; i < concurrency; i++) {
    const newSocket = io(baseUrl);

    newSocket.on("connect", () => {
      totalConnections++;
      console.log(`WebSocket 連線成功, 目前連線數: ${totalConnections}`);
    });

    newSocket.on("connect_error", (err) => {
      failedConnections++;
      console.error(`WebSocket 連線失敗: ${err}`);
    });

    newSocket.on("disconnect", (reason) => {
      console.log(`WebSocket 斷開連接: ${reason}`);
      if (reason === "io server disconnect") {
        failedConnections++;
        console.log("連接被服務器拒絕");
      }
    });
  }

  // 每隔一段時間輸出統計結果
  const intervalId = setInterval(() => {
    const now = new Date().getTime();
    const elapsed = now - startTime;
    console.log(`---------- 統計結果 ----------`);
    console.log(`總連線數: ${totalConnections}`);
    console.log(`失敗連線數: ${failedConnections}`);
    console.log(`連線時間: ${elapsed / 1000} 秒`);
  }, 10000);

  // 30秒後停止測試並清除計時器
  setTimeout(() => {
    clearInterval(intervalId);
    console.log("---------- 測試結束 ----------");
    console.log(`最終總連線數: ${totalConnections}`);
    console.log(`最終失敗連線數: ${failedConnections}`);
    console.log(`總測試時間: 30 秒`);
  }, 30000);
};
