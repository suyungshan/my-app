"use client";
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import WinnerBar from "../WinnerBar";
import { getAllUsers } from "@/components/fetcher/FireBaseNameLogic";

export default function WinnerList() {
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
    const fetchInitialData = async () => {
      try {
        const users = await getAllUsers();
        setRank(users.reverse());
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const topHits = useMemo(() => {
    return [...rank]
      .sort((a, b) => b.hit - a.hit)
      .slice(0, 5)
      .map((item, index) => ({
        rank: index + 1,
        name: item.name,
        hit: item.hit,
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
