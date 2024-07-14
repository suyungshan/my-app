"use client";
import { useState, useEffect } from "react";

export default function RankBar({ topHits, pauseAnimation }) {
  const [rank, setRank] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setRank(topHits);
    if (!pauseAnimation) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [topHits, pauseAnimation]);

  const getRankIcon = (index) => {
    if (index === 0) return "🏆";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "⭐";
  };

  return (
    <div className="flex flex-col w-full h-full p-2 gap-2">
      {rank.map((item, index) => (
        <div
          className={`flex w-full justify-between items-center rounded-md border-4 border-[#002060] p-[20px] font-[600] text-[#002060] ${
            index <= 2 ? "text-[26px]" : "text-[24px]"
          } ${
            index === 0
              ? "bg-[#FFE699]"
              : index === 1
              ? "bg-[#D7D7D7]"
              : index === 2
              ? "bg-[#FBE5D6]"
              : "bg-decoration-white"
          } ${
            isAnimating && !pauseAnimation ? "stretch-animation" : ""
          } shadow-xl`}
          key={index}
          style={{ height: "calc(100% / 13)" }}
        >
          <div className="flex gap-3 w-[200px] ">
            <span className="text-2xl w-8 text-center">
              {getRankIcon(index)}
            </span>
            {/* <p>{`${item.rank}.`}</p> */}
            <p className="w-full truncate ">{item.name}</p>
          </div>
          <p>{item.hit}</p>
        </div>
      ))}
    </div>
  );
}
