"use client";
import { useState, useEffect } from "react";
import Shadow from "./Shadow"; // 導入 Shadow 組件

export default function CountDown(props) {
  const [showShadow, setShowShadow] = useState(false);
  const [countdown, setCountdown] = useState(props.countDown);

  useEffect(() => {
    setCountdown(props.countDown);
    setShowShadow(true);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        // console.log(prevCount);
        return prevCount - 1;
      });
    }, 1000);

    const countdownTimeout = setTimeout(() => {
      setShowShadow(false);
      clearInterval(countdownInterval);
    }, props.countDown * 1000); // 這裡設定 4 秒是因為有 3 秒倒數 + 1 秒黑色遮罩顯示時間

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(countdownTimeout);
    };
  }, [props.countDown]);

  return showShadow ? (
    <Shadow onClick={() => {}}>
      <div className="text-white text-6xl flex flex-col items-center">
        {props.text === 1 ? (
          <h1>休息一下</h1>
        ) : props.text === 2 ? (
          <h1>遊戲結束</h1>
        ) : (
          ""
        )}
        {(props.text === 0 || props.text === 1) && <h1>{countdown}</h1>}
      </div>
    </Shadow>
  ) : null;
}
