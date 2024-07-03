"use client";

export default function Introduction() {
  return (
    <div className="relative flex w-[calc(100%-40px)] mx-auto justify-center items-center flex-col gap-6 border-2 border-[#002060] rounded-[50px] pt-[10px] pb-[45px] px-[100px] text-[64px] font-[600] text-[#002060]">
      <p className="w-[400px] text-center"> 遊戲說明</p>
      <div className="text-center text-[58px] flex flex-col items-start gap-4 ">
        <p className="flex items-center gap-2 whitespace-nowrap">
          點擊小鼓
          <img src="/圖片1.png" className="w-[180px] h-[160px] object-cover" />
          得1分，
        </p>
        <p className="flex items-center gap-2 whitespace-nowrap">
          點擊休止符
          <img src="/休止符.png" className="w-[120px] h-[140px] object-cover" />
          扣1分，
        </p>
        <p>計算分數高者獲勝。</p>
      </div>
    </div>
  );
}
