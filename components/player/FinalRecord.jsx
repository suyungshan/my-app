"use client";

import { useSelector } from "react-redux";

export default function FinalRecord() {
  const name = useSelector((state) => state.playerData.playerData.name);
  const score = useSelector((state) => state.playerData.playerData.score);

  return (
    <div className="flex w-[calc(100%-40px)] mx-auto h-[600px] justify-between items-center flex-col gap-8 border-2 border-[#002060] rounded-[50px] p-10 text-[32px] font-[600] text-[#002060]">
      <div className="flex flex-col gap-[4px] justify-center items-center">
        <p className="text-[54px]">恭喜</p>
        <p className="text-[36px] w-[260px] line-clamp-2 text-center overflow-hidden">
          {name || "上天下地唯我獨尊清天天攤天ssfdsdfasdfdsaf"}
        </p>
      </div>
      <div className="flex flex-col gap-[4px] justify-center items-center">
        <p className="text-[42px]">怒打了</p>
        <p className="text-[72px]">{score}</p>
        <p className="text-[72px]">Hit</p>
      </div>
    </div>
  );
}
