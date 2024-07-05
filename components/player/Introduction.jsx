"use client";

import { useSelector } from "react-redux";

export default function Introduction() {
  const name = useSelector((state) => state.playerData.playerData.name);

  return (
    <div className="flex w-[calc(100%-40px)] mx-auto justify-center items-center flex-col gap-8 border-2  border-[#002060] rounded-[50px] pt-[25px] py-[50px] px-[45px] text-[32px] font-[600] text-[#002060] ">
      <p className="w-[300px] text-center truncate">ID: {name}</p>
      <p>遊戲準備中</p>
      <div className="text-center text-[24px] flex flex-col items-start gap-3 ">
        <p className="flex items-center gap-2 whitespace-nowrap">
          點擊小鼓
          <img src="/圖片1.png" className="w-[50px] h-[50px] object-cover" />
          得1分，
        </p>
        <p className="flex items-center gap-2 whitespace-nowrap">
          點擊休止符
          <img src="/休止符.png" className="w-[20px] h-[50px] object-cover" />
          扣1分，
        </p>
        <p>計算分數高者獲勝。</p>
      </div>
    </div>
  );
}
