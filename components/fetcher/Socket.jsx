"use client";
import { createContext, useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch();
  const isConnected = useRef(false);
  const hasRunTest = useRef(false);
  const socketRef = useRef(null);
  const maxConnectionsReached = useRef(false);
  const maxDataReached = useRef(false);

  const initializeSocket = useCallback(() => {
    if (!isConnected.current && pathname !== "/") {
      if (!hasRunTest.current) {
        // startLoadTest("http://localhost:3001");
        // startLoadTest("https://one0-hit-game-backend.onrender.com/");
        // startLoadTest("https://hitgameback.zeabur.app/");
        hasRunTest.current = true;
      }

      // socketRef.current = io("http://localhost:3001");
      socketRef.current = io("https://one0-hit-game-backend.onrender.com/");
      // socketRef.current = io("https://hitgameback.zeabur.app/");

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
        if (!maxConnectionsReached.current || !maxDataReached.current) {
          if (pathname !== "/dev/winner") {
            setTimeout(() => {
              console.log(pathname);
              socketRef.current.connect();
            }, 2000);
          }
        }
      });

      socketRef.current.on("maxConnectionsReached", () => {
        console.log("達到最大連接數，停止重新連接");
        maxConnectionsReached.current = true;
        socketRef.current.disconnect();
      });

      socketRef.current.on("maxDataReached", () => {
        console.log("達到最大數參加遊戲數量，停止重新連接");
        maxDataReached.current = true;
        socketRef.current.disconnect();
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        isConnected.current = false;
      }
    };
  }, [pathname]); // 空依賴數組，確保只執行一次

  useEffect(() => {
    const cleanup = initializeSocket();
    return cleanup;
  }, [initializeSocket]);

  useEffect(() => {
    if (socket && (pathname !== "/" || pathname !== "/player/enterName")) {
      socket.on("redirectToGame", () => {
        if (pathname === "/dev/intro") {
          router.push("/dev/rank");
        } else if (pathname === "/player/instructions") {
          router.push("/player/game");
        }
      });

      socket.on("allMessage", (data) => {
        dispatch(playerDataActions.updateRecord(data));
      });
    }
  }, [socket, pathname, router, dispatch]);

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

// 壓力測試函數
const startLoadTest = (baseUrl) => {
  const concurrency = 300; // 並發連線數，增加到15以測試超過限制的情況
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
