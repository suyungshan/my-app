// "use client";
// import { createContext, useState, useEffect } from "react";
// import { cache } from "react";
// import io from "socket.io-client";
// import { useRouter } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { playerDataActions } from "@/store/playerData";

// export const SocketContext = createContext(null);

// export default function SocketProvider({ children }) {
//   const [socket, setSocket] = useState(null);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const newSocket = io(
//       "http://localhost:3001"
//       // "https://one0-hit-game-backend.onrender.com/"
//     );

//     setSocket(newSocket);

//     newSocket.on("disconnect", () => {
//       // 斷開的話 2秒後重新連線
//       setTimeout(() => {
//         newSocket.connect();
//       }, 2000);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   if (socket) {
//     socket.on("redirectToGame", () => {
//       // Check if the current URL is /dev/intro
//       if (window.location.pathname === "/dev/intro") {
//         // Redirect to /dev/rank
//         window.location.href = "/dev/rank";
//       } else {
//         // Redirect to /player/game for other URLs
//         router.push("/player/game");
//       }
//     });
//     // socket.on("allMessage", (data) => {
//     //   dispatch(playerDataActions.updateRecord(data));
//     // });
//   }

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

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
      // "http://localhost:3001"
      "https://one0-hit-game-backend.onrender.com/"
    );

    setSocket(newSocket);

    newSocket.on("disconnect", () => {
      // 斷開的話 2秒後重新連線
      setTimeout(() => {
        newSocket.connect();
      }, 2000);
    });

    // 啟動壓力測試
    startLoadTest("https://one0-hit-game-backend.onrender.com/");

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

// 壓力測試函數
const startLoadTest = (baseUrl) => {
  const concurrency = 500; // 並發連線數
  let totalConnections = 0;
  let failedConnections = 0;

  const startTime = new Date().getTime();

  // 建立指定數量的 WebSocket 連線
  for (let i = 0; i < concurrency; i++) {
    const socket = io(baseUrl);

    socket.on("connect", () => {
      totalConnections++;
      console.log(`WebSocket 連線成功, 目前連線數: ${totalConnections}`);
    });

    socket.on("connect_error", (err) => {
      failedConnections++;
      console.error(`WebSocket 連線失敗: ${err}`);
    });
  }

  // 每隔一段時間輸出統計結果
  setInterval(() => {
    const now = new Date().getTime();
    const elapsed = now - startTime;
    console.log(`---------- 統計結果 ----------`);
    console.log(`總連線數: ${totalConnections}`);
    console.log(`失敗連線數: ${failedConnections}`);
    console.log(`連線時間: ${elapsed / 1000} 秒`);
  }, 10000);
};
