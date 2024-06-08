"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../fetcher/Socket";
import { useContext, useEffect, useState, useMemo } from "react";
import RankBar from "./RankBar";

export default function WinnerList() {
  const { socket } = useContext(SocketContext);
  const [rank, setRank] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  console.log(rank);

  useEffect(() => {
    if (socket) {
      socket.emit("firstConnect");

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

  // 使用 useMemo 計算 topHits
  const topHits = useMemo(() => {
    return rank
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((item, index) => ({
        rank: index + 1,
        name: item.name,
        hit: item.score,
      }));
  }, [rank]);

  return (
    <div>
      <div className="flex justify-center items-baseline">
        <p className="text-[32px] font-[600] text-[#002060]">排行榜</p>
      </div>
      <div
        className="flex flex-col overflow-hidden p-5 border-x-2 border-b-2  border-[#002060]"
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
      >
        <RankBar topHits={topHits}></RankBar>
      </div>
    </div>
  );
}
