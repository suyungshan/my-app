"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../fetcher/Socket";
import { useContext, useEffect, useState, useMemo } from "react";
import RankBar from "./RankBar";

export default function GetData() {
  const { socket } = useContext(SocketContext);
  const [rank, setRank] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [replay, setReplay] = useState(false);
  const [countdown, setCountdown] = useState(60); // 初始倒數時間為 60 秒
  const router = useRouter();

  console.log(rank);

  useEffect(() => {
    if (socket) {
      socket.on("allMessage", (data) => {
        setRank(data.reverse());
      });
    }
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
  }, [socket]);

  // 使用另一個 useEffect 來設置計時器
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(timer); // 清除計時器
          router.push("/dev/winner"); // 導向到新的頁面
          return 0; // 防止倒數計時變成負數
        }
        return prevCountdown - 1;
      });
    }, 1000); // 每 1 秒鐘更新一次

    return () => {
      clearInterval(timer); // 在組件卸載時清除計時器
    };
  }, [router]);

  // 使用 useMemo 計算 topHits
  const topHits = useMemo(() => {
    return rank
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((item, index) => ({
        rank: index + 1,
        name: item.name,
        hit: item.score,
      }));
  }, [rank]);

  return (
    <div
      className="flex flex-col overflow-hidden p-5 border-x-2 border-b-2  border-[#002060]"
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      <div className="flex justify-between items-baseline">
        <p className="text-[44px] font-[600] text-[#002060]">
          Time: {countdown}
        </p>
        <p className="text-[32px] font-[600] text-[#002060]">目前排名</p>
        <p className="text-[44px] font-[600] text-[#002060] invisible">
          Time: 60.29
        </p>
      </div>
      <RankBar topHits={topHits}></RankBar>
    </div>
  );
}
