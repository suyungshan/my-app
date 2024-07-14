"use client";
import { useState, useEffect } from "react";
import Celebrate from "./Celebrate";

export default function WinnerBar(props) {
  const [rank, setRank] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true); // 新增状态
  const Dammy = [
    { rank: 1, name: "namdfsdgasgafe", hit: 765 },
    { rank: 2, name: "name", hit: 654 },
    { rank: 3, name: "name", hit: 435 },
    { rank: 4, name: "name", hit: 355 },
    { rank: 5, name: "name", hit: 245 },
  ];

  useEffect(() => {
    setRank(sortByRank(props.topHits));
    setIsAnimating(true);

    // 在初始渲染时启动五秒庆祝画面;
    // const celebrationTimeout = setTimeout(() => {
    //   setShowCelebration(false);
    // }, 10000);

    setTimeout(() => {
      setIsAnimating(false);
    }, 4000);

    // return () => {
    //   clearTimeout(celebrationTimeout); // 清除定时器
    // };
  }, [props.topHits]);

  function sortByRank(topHits) {
    const rankOrder = [5, 3, 1, 2, 4];
    return topHits.sort((a, b) => {
      const aRankIndex = rankOrder.indexOf(a.rank);
      const bRankIndex = rankOrder.indexOf(b.rank);

      if (aRankIndex === -1 && bRankIndex === -1) {
        return 0; // 如果两个元素的 rank 值都不在指定顺序中,则不改变它们的顺序
      } else if (aRankIndex === -1) {
        return 1; // 如果 a 的 rank 值不在指定顺序中,则将其放在后面
      } else if (bRankIndex === -1) {
        return -1; // 如果 b 的 rank 值不在指定顺序中,则将其放在前面
      } else {
        return aRankIndex - bRankIndex; // 根据 rank 值在指定顺序中的位置进行排序
      }
    });
  }

  return (
    <div className="flex w-full gap-6 h-full px-2 relative justify-center items-end">
      {showCelebration && <Celebrate />}
      {rank.map((item, index) => (
        <div
          className={`flex flex-col w-[250px] justify-between items-center rounded-t-md border-4 border-[#002060] p-[20px] font-[600] text-[#002060] ${
            index <= 2 ? "text-[26px]" : "text-[24px]"
          } ${
            index === 2
              ? "bg-[#FFE699] h-full"
              : index === 3
              ? "bg-[#D7D7D7] h-[calc(100%-4rem)]"
              : index === 1
              ? "bg-[#FBE5D6] h-[calc(100%-8rem)]"
              : index === 0
              ? "bg-decoration-white h-[calc(100%-12rem)]"
              : "bg-decoration-white h-[calc(100%-16rem)]"
          } ${isAnimating ? "winner-animation" : ""} shadow-2xl `}
          key={index}
        >
          <div className="flex gap-5 flex-col items-center ">
            <p className="text-center text-[60px]">{`${item.rank}`}</p>
            <div
              className={`relative ${
                item.rank <= 3 ? "w-[200px] h-[120px]" : "w-[200px] h-[120px]"
              }`}
            >
              <div
                className={`absolute inset-0 border-4 border-[#002060] ${
                  item.rank <= 3 ? "p-4" : "p-2"
                }`}
              ></div>
              <p
                className="absolute text-center text-[#002060] px-3 overflow-hidden"
                style={{
                  top: "50%",
                  left: 0,
                  right: 0,
                  transform: "translateY(-50%)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  wordBreak: "break-word",
                  fontSize: item.rank <= 3 ? "24px" : "20px",
                  lineHeight: "1.2em",
                  maxHeight: "2.4em",
                }}
              >
                {item.name}
              </p>
            </div>
          </div>
          <p>{item.hit}</p>
        </div>
      ))}
    </div>
  );
}
