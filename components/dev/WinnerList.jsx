"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../fetcher/Socket";
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import WinnerBar from "./WinnerBar";

export default function WinnerList() {
  const { socket, setShouldReconnect } = useContext(SocketContext);
  const [rank, setRank] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setContainerWidth(window.innerWidth - 40);
      setContainerHeight(window.innerHeight - 40);
    }

    const handleResize = () => {
      setContainerWidth(window.innerWidth - 40);
      setContainerHeight(window.innerHeight - 40);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      console.log("Socket connected");
      if (!initializedRef.current) {
        console.log("Initializing...");
        initializedRef.current = true;

        // 只在首次連接時發送 "firstConnect"
        socket.emit("firstConnect");

        // 設置一次性監聽器
        const handleAllMessage = (data) => {
          console.log("Received all messages");
          setRank([...data].reverse());
          // 接收到數據後立即移除監聽器
          socket.off("allMessage", handleAllMessage);
        };

        socket.on("allMessage", handleAllMessage);

        // 設置計時器，5 秒後斷開連線
        const timer = setTimeout(() => {
          console.log("Disconnecting after 5 seconds");
          socket.disconnect();
        }, 5000);

        return () => {
          clearTimeout(timer);
          socket.off("allMessage", handleAllMessage);
        };
      }
    };

    socket.on("connect", onConnect);

    // 如果 socket 已經連接，立即執行 onConnect
    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
    };
  }, [socket]);

  // 使用 useMemo 計算 topHits
  const topHits = useMemo(() => {
    return [...rank]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item, index) => ({
        rank: index + 1,
        name: item.name,
        hit: item.score,
      }));
  }, [rank]);

  return (
    <div className="flex flex-col items-center h-[100vh] p-2 gap-8">
      <div className="flex justify-center items-baseline">
        <p className="text-[32px] font-[600] text-[#002060]">排行榜</p>
      </div>
      <div
        className="flex overflow-hidden px-5 border-x-2 border-b-2 border-[#002060]"
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
      >
        <WinnerBar topHits={topHits}></WinnerBar>
      </div>
    </div>
  );
}
