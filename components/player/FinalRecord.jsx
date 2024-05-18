"use client";

import { useSelector, useDispatch } from "react-redux";

export default function FinalRecord() {
  const name = useSelector((state) => state.playerData.playerData.name);
  const score = useSelector((state) => state.playerData.playerData.score);

  return (
    <div className="flex min-w-[500px] min-h-[300px] justify-center items-center flex-col gap-8 border-2  border-[#002060] rounded-[50px] py-[20px] px-[30px] text-[32px] font-[600] text-[#002060]">
      <p>最終結果</p>
      <div className="flex flex-col items-start gap-6">
        <p className="w-[200px] truncate">暱稱:{name}</p>
        <p>總得分：{score}</p>
      </div>
    </div>
  );
}
