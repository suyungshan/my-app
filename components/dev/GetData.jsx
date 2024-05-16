"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../fetcher/Socket";
import { useContext, useEffect, useState } from "react";
import RankBar from "./RankBar";

export default function GetData() {
  const { socket } = useContext(SocketContext);
  const [rank, setRank] = useState([]);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth - 40);
  const [containerHeight, setContainerHeight] = useState(
    window.innerHeight - 40
  );
  const [replay, setReplay] = useState(false);

  console.log(rank);

  useEffect(() => {
    if (socket) {
      socket.on("allMessage", (data) => {
        setRank(data.reverse());
      });
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

  // 取出前 10 名的 hit 值
  const top10Hits = rank
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      name: item.name,
      hit: item.score,
    }));

  return (
    <div
      className="flex flex-col overflow-hidden p-5 border-x-2 border-b-2  border-[#002060]"
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      <div className="flex justify-between items-baseline">
        <p className="text-[44px] font-[600] text-[#002060]">Time: 60.29</p>
        <p className="text-[32px] font-[600] text-[#002060]">目前排名</p>
        <p className="text-[44px] font-[600] text-[#002060] invisible">
          Time: 60.29
        </p>
      </div>
      <RankBar top10Hits={top10Hits}></RankBar>
    </div>
  );
}
