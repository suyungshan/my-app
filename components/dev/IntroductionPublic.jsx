"use client";

import { useSelector } from "react-redux";

export default function Introduction() {
  const name = useSelector((state) => state.playerData.playerData.name);

  return (
    <div className="flex w-[calc(100%-40px)] mx-auto justify-center items-center flex-col gap-8 border-2  border-[#002060] rounded-[50px] py-[20px] px-[30px] text-[54px] font-[600] text-[#002060]">
      <p>遊戲說明</p>
      <p className="text-center text-[28px]">
        點擊遊戲畫面的小鼓計1分，點擊休止符扣1分，計算分數高者獲勝。
      </p>
    </div>
  );
}
