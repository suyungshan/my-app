// GameSet.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";
import Shadow from "./Shadow";
import Drum from "./Drum";
import io from "socket.io-client";

const socket = io("http://localhost:3001/");
export default function GameSet() {
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 80,
    y: window.innerHeight / 2 - 80,
  });
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const dispatch = useDispatch();
  const hit = useSelector((state) => state.playerData.playerData);
  const countRef = useRef(count);
  const [showShadow, setShowShadow] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [data, setData] = useState({ name: "", hit: 0 });

  const hitBlock = () => {
    setData((prevData) => ({ name: "Sam", hit: prevData.hit + 1 }));
    socket.emit("hit", data);
  };

  const touchHandler = () => {
    // if (shouldAnimate) {
    //   const plus = count + 1;
    //   setCount(plus);
    //   countRef.current = plus;
    // }
    const plus = count + 1;
    setCount(plus);
    countRef.current = plus;
  };

  const speedRef = useRef({
    magnitude: 0,
    // angle: Math.random() * 2 * Math.PI, // 隨機方向（0 到 2π）
    angle: (3 * Math.PI) / 4, //從左下 45 度出發
  });

  const updateSpeed = (isFaster) => {
    const speedSize = isFaster ? 6 : 3; // 根據條件決定速度大小
    speedRef.current.magnitude = speedSize;
  };

  const animate = () => {
    if (shouldAnimate) {
      setPosition((prevPos) => {
        const newX =
          prevPos.x +
          speedRef.current.magnitude * Math.cos(speedRef.current.angle);
        const newY =
          prevPos.y +
          speedRef.current.magnitude * Math.sin(speedRef.current.angle);

        if (newX < 0 || newX > window.innerWidth - 160) {
          // 計算碰到視窗邊緣時的反彈角度
          speedRef.current.angle = Math.PI - speedRef.current.angle;
        }

        if (newY < 0 || newY > window.innerHeight - 160) {
          // 計算碰到視窗邊緣時的反彈角度
          speedRef.current.angle = -speedRef.current.angle;
        }

        return { x: newX, y: newY };
      });

      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    const countdownTimeout = setTimeout(() => {
      setShowShadow(false);
      clearInterval(countdownInterval);
      // 載入完後再開始動畫
      animate();
      setCountdown(4);
    }, 3000); // 這裡設定 4 秒是因為有 3 秒倒數 + 1 秒黑色遮罩顯示時間

    const restTimeout = setTimeout(() => {
      const restCountdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

      const seconedStageTimeout = setTimeout(() => {
        setShowShadow(false);
        clearInterval(restCountdownInterval);
      }, 4000);

      return () => {
        clearInterval(restCountdownInterval);
        clearTimeout(seconedStageTimeout);
      };
    }, 33000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(countdownTimeout);
      clearTimeout(restTimeout);
    };
  }, []);

  useEffect(() => {
    if (!showShadow) {
      //每五秒自動獲取點擊數據
      const scoreUpdateInterval = setInterval(() => {
        console.log(countRef.current); // 使用 ref 取得最新的 count 值
        const currentCount = countRef.current;
        dispatch(playerDataActions.updateScore(currentCount));
      }, 5000);

      const stopUpdatingTimeout = setTimeout(() => {
        clearInterval(scoreUpdateInterval);
      }, 30000);

      return () => {
        clearInterval(scoreUpdateInterval);
        clearTimeout(stopUpdatingTimeout);
      };
    }
  }, [showShadow]);

  useEffect(() => {
    // 開始動畫
    if (!shouldAnimate) {
      animate();
    }

    if (!showShadow) {
      // 設置 5 秒後自動調整速度
      const firstTimeout = setTimeout(() => {
        console.log("20");
        updateSpeed(false); // 使用原始速度
      }, 10000);

      // 設置 10 秒後自動調整速度（更快）
      const secondTimeout = setTimeout(() => {
        console.log("40");
        updateSpeed(true); // 使用更快的速度
      }, 20000);

      // 設置 60 秒後停止動畫和禁用觸發事件
      const stopTimeout = setTimeout(() => {
        console.log("60");
        setShouldAnimate(false);
        speedRef.current.magnitude = 0;
        setShowShadow(true);
      }, 30000);

      // 清理動畫和 timeout，防止組件卸載時仍然執行
      return () => {
        cancelAnimationFrame(animate);
        clearTimeout(firstTimeout);
        clearTimeout(secondTimeout);
        clearTimeout(stopTimeout);
      };
    }
  }, [showShadow]);

  useEffect(() => {
    console.log("Updated hit:", hit);
  }, [hit]);

  return (
    <>
      {showShadow && (
        <Shadow onClick={() => {}}>
          <h1 className="text-white text-6xl">{countdown}</h1>
        </Shadow>
      )}
      <div className="w-full h-full overflow-hidden relative select-none">
        <h1
          style={{
            // outline: "3px solid tomato",
            position: "absolute",
            marginLeft: "50vw",
            fontSize: "6rem",
          }}
        >
          {count}
        </h1>
        <div
          onClick={touchHandler}
          style={{
            // outline: "3px solid tomato",
            position: "absolute",
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <Drum></Drum>
        </div>
      </div>
    </>
  );
}
