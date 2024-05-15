"use client";

import { useSelector } from "react-redux";

export default function Introduction() {
  const name = useSelector((state) => state.playerData.playerData.name);

  return (
    <div className="flex max-w-[600px]  w-full justify-center items-center flex-col gap-8 border-2  border-[#002060] rounded-[50px] py-[20px] px-[30px] text-[32px] font-[600] text-[#002060]">
      <p>ID: {name}</p>
      <p>遊戲準備中</p>
      <p>
        遊戲說明:
        <br />
        點擊中遊戲畫面的小鼓計1分，點擊中休止符扣1分，計算分數高者獲勝
      </p>
    </div>
  );
}
